CREATE TABLE `project_locks` (
  `project_id` text NOT NULL,
  `file_path` text NOT NULL,
  `locked_by` text NOT NULL,
  `lock_token` text NOT NULL,
  `updated_at_ms` integer NOT NULL,
  PRIMARY KEY (`project_id`, `file_path`),
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `project_locks_updated_idx` ON `project_locks` (`updated_at_ms`);
