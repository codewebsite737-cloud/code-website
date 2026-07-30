const DEFAULT_MODEL = "poolside/laguna-s-2.1:free";
const DEFAULT_DAILY_LIMIT = 20;
const MAX_DAILY_LIMIT = 200;
const MODEL_PATTERN = /^[a-z0-9][a-z0-9._:-]*\/[a-z0-9][a-z0-9._:-]*$/i;

export type AiRuntimeConfig = {
  apiKey: string | null;
  configured: boolean;
  dailyLimit: number;
  model: string;
};

function safeModel(value: string | undefined) {
  const model = value?.trim();
  return model && model.length <= 120 && MODEL_PATTERN.test(model)
    ? model
    : DEFAULT_MODEL;
}

function safeDailyLimit(value: string | undefined) {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0
    ? Math.min(parsed, MAX_DAILY_LIMIT)
    : DEFAULT_DAILY_LIMIT;
}

export function getAiRuntimeConfig(): AiRuntimeConfig {
  const runtime = globalThis.__SKYCODE_AI_CONFIG__;
  const apiKey = runtime?.openRouterApiKey?.trim() || null;

  return {
    apiKey,
    configured: Boolean(apiKey),
    dailyLimit: safeDailyLimit(runtime?.dailyLimit),
    model: safeModel(runtime?.openRouterModel),
  };
}
