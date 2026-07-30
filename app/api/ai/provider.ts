import {
  parseCloudResponse,
  validateCloudProject,
  type GeneratedProject,
} from "../../workspace/project-generator";
import type { AiGenerationInput } from "./policy";

const OPENROUTER_CHAT_URL =
  "https://openrouter.ai/api/v1/chat/completions";
const MAX_RESPONSE_CHARACTERS = 1_200_000;
const TOTAL_DEADLINE_MS = 75_000;
const ATTEMPT_DEADLINE_MS = 70_000;
const MAX_ATTEMPTS = 1;
const RETRYABLE_STATUSES = new Set([429, 502, 503, 504]);
const FREE_CODING_MODELS = [
  "openai/gpt-oss-20b:free",
  "google/gemma-4-26b-a4b-it:free",
  "nvidia/nemotron-nano-9b-v2:free",
] as const;

type CompletionResponse = {
  raw: string;
  response: Response;
};

type OpenRouterResponse = {
  model?: string;
  error?: { message?: string } | string;
  choices?: {
    message?: {
      content?: string | { type?: string; text?: string }[];
    };
  }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    cost?: number;
  };
};

export type AiProviderUsage = {
  completionTokens: number | null;
  costUsd: number | null;
  promptTokens: number | null;
  totalTokens: number | null;
};

export type ManagedProjectResult = {
  model: string;
  project: GeneratedProject;
  provider: "openrouter";
  usage: AiProviderUsage;
};

export class AiProviderError extends Error {
  readonly code: string;
  readonly retryable: boolean;
  readonly status: number;

  constructor(
    code: string,
    status: number,
    message: string,
    retryable = false,
  ) {
    super(message);
    this.code = code;
    this.name = "AiProviderError";
    this.retryable = retryable;
    this.status = status;
  }
}

export async function generateManagedProject({
  apiKey,
  input,
  model,
  siteOrigin,
}: {
  apiKey: string;
  input: AiGenerationInput;
  model: string;
  siteOrigin: string;
}): Promise<ManagedProjectResult> {
  const deadline = Date.now() + TOTAL_DEADLINE_MS;
  let completion: CompletionResponse | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      completion = await requestCompletion({
        apiKey,
        deadline,
        input,
        model,
        siteOrigin,
      });
    } catch (error) {
      const canRetry =
        error instanceof AiProviderError &&
        error.retryable &&
        attempt < MAX_ATTEMPTS &&
        Date.now() + 400 < deadline;
      if (!canRetry) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400));
      continue;
    }

    if (
      completion.response.ok ||
      !RETRYABLE_STATUSES.has(completion.response.status) ||
      attempt === MAX_ATTEMPTS
    ) {
      break;
    }

    const delayMs = retryDelay(completion.response);
    if (Date.now() + delayMs >= deadline) break;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  if (!completion) {
    throw new AiProviderError(
      "PROVIDER_UNAVAILABLE",
      503,
      "Cloud AI is temporarily unavailable.",
      true,
    );
  }

  const { raw, response } = completion;
  let data: OpenRouterResponse;
  try {
    data = JSON.parse(raw) as OpenRouterResponse;
  } catch {
    throw new AiProviderError(
      "PROVIDER_RESPONSE",
      502,
      "Cloud AI returned an invalid response.",
    );
  }

  if (!response.ok) {
    throw providerHttpError(response.status);
  }

  const rawContent = data.choices?.[0]?.message?.content;
  const content = Array.isArray(rawContent)
    ? rawContent.map((item) => item.text ?? "").join("")
    : rawContent;
  if (!content) {
    throw new AiProviderError(
      "PROVIDER_EMPTY",
      502,
      "Cloud AI returned an empty response.",
    );
  }

  let project: GeneratedProject;
  try {
    project = validateCloudProject(parseCloudResponse(content));
  } catch {
    throw new AiProviderError(
      "PROVIDER_PROJECT",
      502,
      "Cloud AI did not return a valid browser project.",
    );
  }

  return {
    model: cleanProviderModel(data.model, model),
    project,
    provider: "openrouter",
    usage: {
      completionTokens: safeUsageNumber(data.usage?.completion_tokens),
      costUsd: safeUsageNumber(data.usage?.cost),
      promptTokens: safeUsageNumber(data.usage?.prompt_tokens),
      totalTokens: safeUsageNumber(data.usage?.total_tokens),
    },
  };
}

async function requestCompletion({
  apiKey,
  deadline,
  input,
  model,
  siteOrigin,
}: {
  apiKey: string;
  deadline: number;
  input: AiGenerationInput;
  model: string;
  siteOrigin: string;
}): Promise<CompletionResponse> {
  const remainingMs = deadline - Date.now();
  if (remainingMs <= 0) {
    throw timeoutError();
  }

  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    Math.min(ATTEMPT_DEADLINE_MS, remainingMs),
  );

  try {
    const response = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteOrigin,
        "X-OpenRouter-Title": "SkyCode AI Workspace",
      },
      body: JSON.stringify({
        models: modelCandidates(model),
        stream: false,
        temperature: 0.25,
        max_tokens: 4_200,
        reasoning: {
          effort: "low",
          exclude: true,
        },
        provider: {
          allow_fallbacks: true,
          require_parameters: true,
          sort: "throughput",
        },
        messages: [
          {
            role: "system",
            content:
              "You are SkyCode, a senior frontend engineer. Build or edit a complete, polished, accessible, responsive browser project. Return only the requested JSON object. Use semantic HTML, modern CSS, and browser JavaScript. The HTML file is body markup only. Do not reference external scripts, fonts, images, APIs, CDNs, forms, iframes, or network resources. Make every requested interaction work in app.js. Never include secrets. Keep the combined project concise enough for browser preview.",
          },
          {
            role: "user",
            content: JSON.stringify({
              category: input.category,
              request: input.prompt,
              currentFiles: input.currentFiles,
            }),
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "skycode_browser_project",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                name: { type: "string", maxLength: 42 },
                summary: { type: "string", maxLength: 280 },
                files: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    "index.html": { type: "string", maxLength: 80_000 },
                    "styles.css": { type: "string", maxLength: 80_000 },
                    "app.js": { type: "string", maxLength: 80_000 },
                    "package.json": { type: "string", maxLength: 80_000 },
                  },
                  required: [
                    "index.html",
                    "styles.css",
                    "app.js",
                    "package.json",
                  ],
                },
              },
              required: ["name", "summary", "files"],
            },
          },
        },
        plugins: [{ id: "response-healing" }],
      }),
      signal: controller.signal,
    });
    const raw = await readBoundedResponse(response);
    return { raw, response };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw timeoutError();
    }
    throw new AiProviderError(
      "PROVIDER_NETWORK",
      503,
      "Cloud AI could not be reached.",
      true,
    );
  } finally {
    clearTimeout(timer);
  }
}

async function readBoundedResponse(response: Response) {
  const declaredLength = Number(response.headers.get("content-length"));
  if (
    Number.isFinite(declaredLength) &&
    declaredLength > MAX_RESPONSE_CHARACTERS
  ) {
    throw responseTooLarge();
  }

  const raw = await response.text();
  if (raw.length > MAX_RESPONSE_CHARACTERS) throw responseTooLarge();
  return raw;
}

function retryDelay(response: Response) {
  const seconds = Number(response.headers.get("retry-after"));
  return Number.isFinite(seconds) && seconds > 0
    ? Math.min(1_500, Math.ceil(seconds * 1_000))
    : 400;
}

function providerHttpError(status: number) {
  if (status === 401 || status === 403) {
    return new AiProviderError(
      "PROVIDER_AUTH",
      503,
      "The Cloud AI API key is not valid.",
    );
  }
  if (status === 402) {
    return new AiProviderError(
      "PROVIDER_CREDIT",
      503,
      "The Cloud AI provider account needs credit or a free model.",
    );
  }
  if (status === 429) {
    return new AiProviderError(
      "PROVIDER_RATE_LIMIT",
      429,
      "The Cloud AI provider is rate-limited. Instant Builder is still available.",
      true,
    );
  }
  return new AiProviderError(
    "PROVIDER_FAILURE",
    status >= 500 ? 503 : 502,
    "Cloud AI could not complete this request.",
    status >= 500,
  );
}

function timeoutError() {
  return new AiProviderError(
    "PROVIDER_TIMEOUT",
    504,
    "Cloud AI timed out. Instant Builder is still available.",
    true,
  );
}

function responseTooLarge() {
  return new AiProviderError(
    "PROVIDER_SIZE",
    502,
    "Cloud AI returned an unexpectedly large response.",
  );
}

function safeUsageNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : null;
}

function cleanProviderModel(value: unknown, fallback: string) {
  return typeof value === "string" && value.length <= 160
    ? value
    : fallback;
}

function modelCandidates(model: string) {
  const usesFreePool =
    model === "openrouter/free" ||
    (FREE_CODING_MODELS as readonly string[]).includes(model);
  if (!usesFreePool) return [model];

  const preferred =
    model === "openrouter/free" ? FREE_CODING_MODELS[0] : model;
  return [
    preferred,
    ...FREE_CODING_MODELS.filter((candidate) => candidate !== preferred),
  ];
}
