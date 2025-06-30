CREATE TABLE `ormas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`nama_ormas` varchar(10) NOT NULL,
	`singkatan_ormas` varchar(10) NOT NULL,
	CONSTRAINT `ormas_id` PRIMARY KEY(`id`),
	CONSTRAINT `ormas_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(10) NOT NULL,
	`username` varchar(10) NOT NULL,
	`email` varchar(20) NOT NULL,
	`password` varchar(20) NOT NULL,
	`role` enum('admin','akun ormas') NOT NULL DEFAULT 'akun ormas',
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `detail_ormas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ormas_id` int NOT NULL,
	`sk_badan_hukum` varchar(10) NOT NULL,
	`sk_badan_keperguruan` varchar(10) NOT NULL,
	`ad_art` varchar(10) NOT NULL,
	`alamat_ormas` varchar(10) NOT NULL,
	`no_telp_ormas` varchar(10) NOT NULL,
	CONSTRAINT `detail_ormas_id` PRIMARY KEY(`id`),
	CONSTRAINT `detail_ormas_ormas_id_unique` UNIQUE(`ormas_id`)
);
--> statement-breakpoint
CREATE TABLE `dokumen_ormas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`detail_ormas_id` int NOT NULL,
	`link_dokumen` varchar(20) NOT NULL,
	`status_dokumen` enum('pengajuan','ditolak','diterima','tidak ada') NOT NULL DEFAULT 'pengajuan',
	CONSTRAINT `dokumen_ormas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ormas` ADD CONSTRAINT `ormas_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `detail_ormas` ADD CONSTRAINT `detail_ormas_ormas_id_ormas_id_fk` FOREIGN KEY (`ormas_id`) REFERENCES `ormas`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `dokumen_ormas` ADD CONSTRAINT `dokumen_ormas_detail_ormas_id_detail_ormas_id_fk` FOREIGN KEY (`detail_ormas_id`) REFERENCES `detail_ormas`(`id`) ON DELETE cascade ON UPDATE cascade;