CREATE TABLE `ai_usage_events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_email` text NOT NULL,
	`provider` text NOT NULL,
	`model` text NOT NULL,
	`status` text NOT NULL,
	`prompt_tokens` integer,
	`completion_tokens` integer,
	`total_tokens` integer,
	`cost_usd` text,
	`duration_ms` integer NOT NULL,
	`error_code` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `ai_usage_owner_created_idx` ON `ai_usage_events` (`owner_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `ai_usage_status_created_idx` ON `ai_usage_events` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `ai_usage_created_idx` ON `ai_usage_events` (`created_at`);