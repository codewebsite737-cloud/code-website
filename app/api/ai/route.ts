import { getChatGPTUser } from "../../chatgpt-auth";
import {
  ProjectInputError,
  assertTrustedMutation,
} from "../projects/policy";
import {
  takeFixedWindowRateLimit,
  type RateLimitState,
} from "../shared/rate-limit";
import {
  AiInputError,
  readAiGenerationInput,
} from "./policy";
import {
  AiProviderError,
  generateManagedProject,
  type AiProviderUsage,
} from "./provider";
import { getAiRuntimeConfig } from "./runtime";
import { recordAiUsage } from "./store";

const MINUTE_LIMIT = 4;
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
) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Request-Id", requestId);
  return Response.json(data, { ...init, headers });
}

export async function GET() {
  const requestId = crypto.randomUUID();
  try {
    const [user, config] = await Promise.all([
      getChatGPTUser(),
      Promise.resolve(getAiRuntimeConfig()),
    ]);

    return json(
      {
        authenticated: Boolean(user),
        available: Boolean(user) && config.configured,
        configured: config.configured,
        dailyLimit: config.dailyLimit,
        model: config.model,
        provider: "openrouter",
      },
      {},
      requestId,
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
    );
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  let ownerEmail = "";
  let configuredModel = "poolside/laguna-s-2.1:free";

  try {
    const user = await getChatGPTUser();
    if (!user) {
      return json(
        {
          code: "AUTH_REQUIRED",
          error: "Sign in with ChatGPT to use server Cloud AI.",
          signInPath: `/signin-with-chatgpt?return_to=${encodeURIComponent("/workspace")}`,
        },
        { status: 401 },
        requestId,
      );
    }
    ownerEmail = user.email;
    assertTrustedMutation(request);

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
      );
    }

    const minuteRateLimit = await takeFixedWindowRateLimit({
      bucket: "ai:minute",
      identity: ownerEmail,
      limit: MINUTE_LIMIT,
      windowMs: MINUTE_MS,
    });
    if (!minuteRateLimit.allowed) {
      return rateLimitFailure(
        minuteRateLimit,
        null,
        requestId,
        "AI_MINUTE_LIMIT",
      );
    }

    const dailyRateLimit = await takeFixedWindowRateLimit({
      bucket: "ai:day",
      identity: ownerEmail,
      limit: config.dailyLimit,
      windowMs: DAY_MS,
    });
    if (!dailyRateLimit.allowed) {
      return rateLimitFailure(
        minuteRateLimit,
        dailyRateLimit,
        requestId,
        "AI_DAILY_LIMIT",
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
        ownerEmail,
        provider: result.provider,
        requestId,
        status: "success",
        usage: result.usage,
      });

      return json(
        {
          meta: {
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
          ownerEmail,
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
      ownerEmail,
      configuredModel,
    );
  }
}

function rateLimitFailure(
  minute: RateLimitState,
  daily: RateLimitState | null,
  requestId: string,
  code: string,
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
  ownerEmail: string,
  model: string,
) {
  if (error instanceof AiInputError || error instanceof ProjectInputError) {
    return json(
      { code: error.code, error: error.message },
      { status: error.status },
      requestId,
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
    );
  }

  console.error("AI API request failed", {
    model,
    owner: ownerEmail ? "authenticated" : "anonymous",
    requestId,
  });
  return json(
    {
      code: "AI_UNAVAILABLE",
      error: "The Cloud AI service is temporarily unavailable.",
    },
    { status: 503 },
    requestId,
  );
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
