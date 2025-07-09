ALTER TABLE `detail_ormas` CHANGE `sk_badan_keperguruan` `sk_keperguruan` VARCHAR(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` ADD `nama_ketua_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` ADD `nama_sekretaris_ormas` varchar(255) NOT NULL;