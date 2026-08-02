export const dynamic = "force-static";

import { ProjectInputError, assertTrustedMutation } from "../projects/policy";
import {
  takeFixedWindowRateLimit,
  type RateLimitState,
} from "../shared/rate-limit";
import {
  applyIdentityCookie,
  getRequestIdentity,
  type RequestIdentity,
} from "../shared/session";
import { AiInputError, readAiGenerationInput } from "./policy";
import {
  AiProviderError,
  generateManagedProject,
  type AiProviderUsage,
} from "./provider";
import { getAiRuntimeConfig } from "./runtime";
import { recordAiUsage } from "./store";

const MINUTE_LIMIT = 4;
const GUEST_DAILY_LIMIT = 5;
const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * 60 * 1000;
const EMPTY_USAGE: AiProviderUsage = {
  completionTokens: null,
  costUsd: null,
  promptTokens: null,
  totalTokens: null,
};

function json(
  data: unknown,
  init: ResponseInit = {},
  requestId = crypto.randomUUID(),
  identity: RequestIdentity | null = null,
) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Request-Id", requestId);
  applyIdentityCookie(headers, identity);
  return Response.json(data, { ...init, headers });
}

export async function GET(request: Request) {
  const requestId = crypto.randomUUID();
  let identity: RequestIdentity | null = null;
  try {
    identity = await getRequestIdentity(request);
    const config = getAiRuntimeConfig();
    const dailyLimit = effectiveDailyLimit(identity, config.dailyLimit);

    return json(
      {
        accountType: identity.accountType,
        authenticated: true,
        available: config.configured,
        configured: config.configured,
        dailyLimit,
        model: config.model,
        provider: "openrouter",
      },
      {},
      requestId,
      identity,
    );
  } catch (error) {
    console.error("AI status request failed", { requestId, error });
    return json(
      {
        authenticated: false,
        available: false,
        configured: false,
        error: "Cloud AI status is temporarily unavailable.",
      },
      { status: 503 },
      requestId,
      identity,
    );
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  let identity: RequestIdentity | null = null;
  let ownerId = "";
  let configuredModel = "poolside/laguna-s-2.1:free";

  try {
    await assertTrustedMutation(request);
    identity = await getRequestIdentity(request);
    ownerId = identity.ownerId;

    const config = getAiRuntimeConfig();
    configuredModel = config.model;
    if (!config.apiKey) {
      return json(
        {
          code: "AI_NOT_CONFIGURED",
          error:
            "The secure Cloud AI backend is ready, but its server API key has not been configured.",
        },
        { status: 503 },
        requestId,
        identity,
      );
    }

    const minuteRateLimit = await takeFixedWindowRateLimit({
      bucket: "ai:minute",
      identity: ownerId,
      limit: MINUTE_LIMIT,
      windowMs: MINUTE_MS,
    });
    if (!minuteRateLimit.allowed) {
      return rateLimitFailure(
        minuteRateLimit,
        null,
        requestId,
        "AI_MINUTE_LIMIT",
        identity,
      );
    }

    const dailyRateLimit = await takeFixedWindowRateLimit({
      bucket: "ai:day",
      identity: ownerId,
      limit: effectiveDailyLimit(identity, config.dailyLimit),
      windowMs: DAY_MS,
    });
    if (!dailyRateLimit.allowed) {
      return rateLimitFailure(
        minuteRateLimit,
        dailyRateLimit,
        requestId,
        "AI_DAILY_LIMIT",
        identity,
      );
    }

    const input = await readAiGenerationInput(request);
    try {
      const result = await generateManagedProject({
        apiKey: config.apiKey,
        input,
        model: config.model,
        siteOrigin: new URL(request.url).origin,
      });
      await recordUsageSafely({
        durationMs: Date.now() - startedAt,
        errorCode: null,
        model: result.model,
        ownerEmail: ownerId,
        provider: result.provider,
        requestId,
        status: "success",
        usage: result.usage,
      });

      return json(
        {
          meta: {
            accountType: identity.accountType,
            dailyRemaining: dailyRateLimit.remaining,
            model: result.model,
            provider: result.provider,
            usage: result.usage,
          },
          project: result.project,
        },
        {
          headers: aiRateLimitHeaders(
            minuteRateLimit,
            dailyRateLimit,
          ),
        },
        requestId,
        identity,
      );
    } catch (error) {
      if (error instanceof AiProviderError) {
        console.warn("AI provider request failed", {
          code: error.code,
          durationMs: Date.now() - startedAt,
          model: config.model,
          requestId,
          retryable: error.retryable,
          status: error.status,
        });
        await recordUsageSafely({
          durationMs: Date.now() - startedAt,
          errorCode: error.code,
          model: config.model,
          ownerEmail: ownerId,
          provider: "openrouter",
          requestId,
          status: "error",
          usage: EMPTY_USAGE,
        });
      }
      throw error;
    }
  } catch (error) {
    return apiFailure(
      error,
      requestId,
      ownerId,
      configuredModel,
      identity,
    );
  }
}

function effectiveDailyLimit(identity: RequestIdentity, configuredLimit: number) {
  return identity.accountType === "guest"
    ? Math.min(configuredLimit, GUEST_DAILY_LIMIT)
    : configuredLimit;
}

function rateLimitFailure(
  minute: RateLimitState,
  daily: RateLimitState | null,
  requestId: string,
  code: string,
  identity: RequestIdentity,
) {
  const blocked = daily?.allowed === false ? daily : minute;
  return json(
    {
      code,
      error:
        code === "AI_DAILY_LIMIT"
          ? "Daily Cloud AI limit reached. Instant Builder is still available."
          : "Too many Cloud AI requests. Please wait before trying again.",
    },
    {
      status: 429,
      headers: {
        ...aiRateLimitHeaders(minute, daily),
        "Retry-After": String(blocked.retryAfterSeconds),
      },
    },
    requestId,
    identity,
  );
}

function aiRateLimitHeaders(
  minute: RateLimitState,
  daily: RateLimitState | null,
) {
  return {
    "X-AI-RateLimit-Limit": String(minute.limit),
    "X-AI-RateLimit-Remaining": String(minute.remaining),
    ...(daily
      ? {
          "X-AI-Daily-Limit": String(daily.limit),
          "X-AI-Daily-Remaining": String(daily.remaining),
        }
      : {}),
  };
}

function apiFailure(
  error: unknown,
  requestId: string,
  ownerId: string,
  model: string,
  identity: RequestIdentity | null,
) {
  const inputError = normalizeInputError(error);
  if (inputError) {
    return json(
      { code: inputError.code, error: inputError.message },
      { status: inputError.status },
      requestId,
      identity,
    );
  }
  if (error instanceof AiProviderError) {
    return json(
      {
        code: error.code,
        error: error.message,
        retryable: error.retryable,
      },
      { status: error.status },
      requestId,
      identity,
    );
  }

  console.error("AI API request failed", {
    model,
    owner: ownerId ? "session" : "anonymous",
    requestId,
  });
  return json(
    {
      code: "AI_UNAVAILABLE",
      error: "The Cloud AI service is temporarily unavailable.",
    },
    { status: 503 },
    requestId,
    identity,
  );
}

function normalizeInputError(error: unknown) {
  if (error instanceof AiInputError || error instanceof ProjectInputError) {
    return {
      code: error.code,
      message: error.message,
      status: error.status,
    };
  }
  if (!error || typeof error !== "object") return null;
  const candidate = error as Record<string, unknown>;
  if (
    typeof candidate.code !== "string" ||
    typeof candidate.message !== "string" ||
    typeof candidate.status !== "number"
  ) {
    return null;
  }
  return {
    code: candidate.code,
    message: candidate.message,
    status: candidate.status,
  };
}

async function recordUsageSafely(
  input: Parameters<typeof recordAiUsage>[0],
) {
  try {
    await recordAiUsage(input);
  } catch {
    console.error("AI usage event could not be recorded", {
      requestId: input.requestId,
      status: input.status,
    });
  }
}
