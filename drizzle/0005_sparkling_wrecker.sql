ALTER TABLE `detail_ormas` MODIFY COLUMN `sk_badan_hukum` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `sk_badan_keperguruan` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `ad_art` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `alamat_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `no_telp_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` MODIFY COLUMN `link_dokumen` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `nama_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `singkatan_ormas` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` ADD `judul_dokumen` varchar(255) NOT NULL;