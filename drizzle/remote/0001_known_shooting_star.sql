DROP TABLE `comment_votes`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
DROP TABLE `solution_votes`;--> statement-breakpoint
DROP INDEX "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX "resets_id_unique";--> statement-breakpoint
DROP INDEX "solutions_id_unique";--> statement-breakpoint
DROP INDEX "user_id_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `solutions` ALTER COLUMN "timestamp" TO "timestamp" integer NOT NULL DEFAULT '"2025-08-14T21:04:48.010Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `resets_id_unique` ON `resets` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `solutions_id_unique` ON `solutions` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);