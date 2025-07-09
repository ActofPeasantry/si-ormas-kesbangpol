ALTER TABLE `detail_ormas` ADD `nama_ketua_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` ADD `nama_sekretaris_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` DROP COLUMN `nama_ketua_ormas`;--> statement-breakpoint
ALTER TABLE `ormas` DROP COLUMN `nama_sekretaris_ormas`;