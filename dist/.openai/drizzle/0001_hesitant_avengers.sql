CREATE TABLE `api_rate_limits` (
	`bucket_key` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`request_count` integer DEFAULT 1 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `api_rate_limits_updated_idx` ON `api_rate_limits` (`updated_at`);--> statement-breakpoint
CREATE TABLE `project_audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_email` text NOT NULL,
	`action` text NOT NULL,
	`project_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `project_audit_owner_created_idx` ON `project_audit_events` (`owner_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `project_audit_project_created_idx` ON `project_audit_events` (`project_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `project_audit_created_idx` ON `project_audit_events` (`created_at`);