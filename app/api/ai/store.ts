import { getD1Binding } from "../../../db";
import type { AiProviderUsage } from "./provider";

const AI_AUDIT_RETENTION_DAYS = 90;
const RATE_LIMIT_RETENTION_DAYS = 8;

export async function recordAiUsage({
  durationMs,
  errorCode,
  model,
  ownerEmail,
  provider,
  requestId,
  status,
  usage,
}: {
  durationMs: number;
  errorCode: string | null;
  model: string;
  ownerEmail: string;
  provider: string;
  requestId: string;
  status: "success" | "error";
  usage: AiProviderUsage;
}) {
  const binding = getD1Binding();
  const now = new Date().toISOString();
  const auditCutoff = new Date(
    Date.now() - AI_AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();
  const rateLimitCutoff = new Date(
    Date.now() - RATE_LIMIT_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  await binding.batch([
    binding
      .prepare(
        `INSERT INTO ai_usage_events (
          id,
          owner_email,
          provider,
          model,
          status,
          prompt_tokens,
          completion_tokens,
          total_tokens,
          cost_usd,
          duration_ms,
          error_code,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        requestId,
        ownerEmail,
        provider.slice(0, 40),
        model.slice(0, 160),
        status,
        usage.promptTokens,
        usage.completionTokens,
        usage.totalTokens,
        usage.costUsd === null ? null : String(usage.costUsd),
        Math.max(0, Math.round(durationMs)),
        errorCode?.slice(0, 80) ?? null,
        now,
      ),
    binding
      .prepare("DELETE FROM ai_usage_events WHERE created_at < ?")
      .bind(auditCutoff),
    binding
      .prepare("DELETE FROM api_rate_limits WHERE updated_at < ?")
      .bind(rateLimitCutoff),
  ]);
}
