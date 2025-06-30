ALTER TABLE `detail_ormas` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `dokumen_ormas` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `dokumen_ormas` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `dokumen_ormas` MODIFY COLUMN `deleted_at` date;--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `deleted_at` date;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `deleted_at` date;