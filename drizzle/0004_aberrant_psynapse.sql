ALTER TABLE `detail_ormas` MODIFY COLUMN `sk_badan_hukum` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `sk_badan_keperguruan` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `ad_art` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `alamat_ormas` varchar(225) NOT NULL;--> statement-breakpoint
ALTER TABLE `detail_ormas` MODIFY COLUMN `no_telp_ormas` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `nama_ormas` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `ormas` MODIFY COLUMN `singkatan_ormas` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(20) NOT NULL;