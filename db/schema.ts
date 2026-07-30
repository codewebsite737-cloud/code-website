import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey(),
    ownerEmail: text("owner_email").notNull(),
    name: text("name").notNull(),
    template: text("template").notNull().default("web"),
    filesJson: text("files_json").notNull().default("{}"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("projects_owner_updated_idx").on(table.ownerEmail, table.updatedAt),
  ],
);

export const apiRateLimits = sqliteTable(
  "api_rate_limits",
  {
    bucketKey: text("bucket_key").primaryKey(),
    windowStart: integer("window_start").notNull(),
    requestCount: integer("request_count").notNull().default(1),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("api_rate_limits_updated_idx").on(table.updatedAt),
  ],
);

export const projectAuditEvents = sqliteTable(
  "project_audit_events",
  {
    id: text("id").primaryKey(),
    ownerEmail: text("owner_email").notNull(),
    action: text("action").notNull(),
    projectId: text("project_id").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("project_audit_owner_created_idx").on(
      table.ownerEmail,
      table.createdAt,
    ),
    index("project_audit_project_created_idx").on(
      table.projectId,
      table.createdAt,
    ),
    index("project_audit_created_idx").on(table.createdAt),
  ],
);

export const aiUsageEvents = sqliteTable(
  "ai_usage_events",
  {
    id: text("id").primaryKey(),
    ownerEmail: text("owner_email").notNull(),
    provider: text("provider").notNull(),
    model: text("model").notNull(),
    status: text("status").notNull(),
    promptTokens: integer("prompt_tokens"),
    completionTokens: integer("completion_tokens"),
    totalTokens: integer("total_tokens"),
    costUsd: text("cost_usd"),
    durationMs: integer("duration_ms").notNull(),
    errorCode: text("error_code"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("ai_usage_owner_created_idx").on(
      table.ownerEmail,
      table.createdAt,
    ),
    index("ai_usage_status_created_idx").on(
      table.status,
      table.createdAt,
    ),
    index("ai_usage_created_idx").on(table.createdAt),
  ],
);
