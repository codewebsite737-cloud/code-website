import {
  rateLimitHeaders,
  takeFixedWindowRateLimit,
  type RateLimitState,
} from "../shared/rate-limit";

const WINDOW_MS = 60_000;
const REQUEST_LIMITS = {
  GET: 120,
  POST: 20,
  PUT: 60,
  DELETE: 10,
} as const;

export type ProjectApiMethod = keyof typeof REQUEST_LIMITS;

export { rateLimitHeaders, type RateLimitState };

export async function takeProjectApiRateLimit(
  ownerEmail: string,
  method: ProjectApiMethod,
): Promise<RateLimitState> {
  return takeFixedWindowRateLimit({
    bucket: `projects:${method}`,
    identity: ownerEmail,
    limit: REQUEST_LIMITS[method],
    windowMs: WINDOW_MS,
  });
}
