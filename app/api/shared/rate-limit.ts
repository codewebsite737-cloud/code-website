import { getD1Binding } from "../../../db";

export type RateLimitState = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

type FixedWindowRateLimitInput = {
  bucket: string;
  identity: string;
  limit: number;
  windowMs: number;
};

async function pseudonymousIdentity(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value.trim().toLowerCase()),
  );
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function takeFixedWindowRateLimit({
  bucket,
  identity,
  limit,
  windowMs,
}: FixedWindowRateLimitInput): Promise<RateLimitState> {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const identityHash = await pseudonymousIdentity(identity);
  const bucketKey = `${bucket}:${identityHash}`;
  const row = await getD1Binding()
    .prepare(
      `INSERT INTO api_rate_limits (
        bucket_key,
        window_start,
        request_count,
        updated_at
      ) VALUES (?, ?, 1, ?)
      ON CONFLICT(bucket_key) DO UPDATE SET
        request_count = CASE
          WHEN window_start = excluded.window_start
          THEN request_count + 1
          ELSE 1
        END,
        window_start = excluded.window_start,
        updated_at = excluded.updated_at
      RETURNING request_count`,
    )
    .bind(bucketKey, windowStart, new Date(now).toISOString())
    .first<{ request_count: number }>();

  if (!row || !Number.isFinite(row.request_count)) {
    throw new Error("The API rate limiter did not return a valid result.");
  }

  return {
    allowed: row.request_count <= limit,
    limit,
    remaining: Math.max(0, limit - row.request_count),
    retryAfterSeconds: Math.max(
      1,
      Math.ceil((windowStart + windowMs - now) / 1000),
    ),
  };
}

export function rateLimitHeaders(state: RateLimitState) {
  return {
    "X-RateLimit-Limit": String(state.limit),
    "X-RateLimit-Remaining": String(state.remaining),
    ...(state.allowed
      ? {}
      : { "Retry-After": String(state.retryAfterSeconds) }),
  };
}
