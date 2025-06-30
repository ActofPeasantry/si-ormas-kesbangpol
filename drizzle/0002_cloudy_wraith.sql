ALTER TABLE `ormas` ADD `created_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` ADD `updated_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` ADD `deleted_at` date NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` ADD `status_ormas` enum('Aktif','Non Aktif') DEFAULT 'Non Aktif' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `deleted_at` date NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` ADD `created_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` ADD `updated_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` ADD `created_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` ADD `updated_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` ADD `deleted_at` date NOT NULL;