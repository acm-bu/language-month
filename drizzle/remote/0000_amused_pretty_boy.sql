CREATE TABLE `comment_votes` (
	`userId` text NOT NULL,
	`commentId` text NOT NULL,
	`positive` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`commentId`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`replyTo` text NOT NULL,
	`replyType` text DEFAULT 'comment',
	`content` text(100000) NOT NULL,
	`author` text NOT NULL,
	`timestamp` integer DEFAULT '"2025-07-27T06:21:07.448Z"' NOT NULL,
	`score` integer DEFAULT 0 NOT NULL,
	`language` text NOT NULL,
	`depth` integer DEFAULT 0 NOT NULL,
	`path` text,
	FOREIGN KEY (`author`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `comments_id_unique` ON `comments` (`id`);--> statement-breakpoint
CREATE TABLE `resets` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`key` text NOT NULL,
	FOREIGN KEY (`username`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resets_id_unique` ON `resets` (`id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE TABLE `solution_votes` (
	`userId` text NOT NULL,
	`solutionId` text NOT NULL,
	`positive` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`solutionId`) REFERENCES `solutions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `solutions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`explanation` text NOT NULL,
	`code` text NOT NULL,
	`timestamp` integer DEFAULT '"2025-07-27T06:21:07.448Z"' NOT NULL,
	`language` text NOT NULL,
	`puzzleId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `solutions_id_unique` ON `solutions` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`hashedPassword` text NOT NULL,
	`verified` integer DEFAULT true NOT NULL,
	`bio` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);