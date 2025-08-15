CREATE TYPE "public"."status_dokumen" AS ENUM('pengajuan', 'diterima', 'ditolak', 'tidak aktif');--> statement-breakpoint
CREATE TYPE "public"."status_ormas" AS ENUM('aktif', 'non aktif');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'ormas');--> statement-breakpoint
CREATE TABLE "detail_ormas" (
	"id" serial PRIMARY KEY NOT NULL,
	"ormas_id" integer NOT NULL,
	"nama_ketua_ormas" text NOT NULL,
	"nama_sekretaris_ormas" text NOT NULL,
	"sk_badan_hukum" text NOT NULL,
	"sk_keperguruan" text NOT NULL,
	"ad_art" text NOT NULL,
	"alamat_ormas" text NOT NULL,
	"no_telp_ormas" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "detail_ormas_ormas_id_unique" UNIQUE("ormas_id")
);
--> statement-breakpoint
CREATE TABLE "dokumen_ormas" (
	"id" serial PRIMARY KEY NOT NULL,
	"detail_ormas_id" integer NOT NULL,
	"judul_dokumen" text NOT NULL,
	"link_dokumen" text NOT NULL,
	"status_dokumen" "status_dokumen" DEFAULT 'pengajuan' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ormas" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"nama_ormas" text NOT NULL,
	"singkatan_ormas" text NOT NULL,
	"status_ormas" "status_ormas" DEFAULT 'non aktif' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "reset_password_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'ormas' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "detail_ormas" ADD CONSTRAINT "detail_ormas_ormas_id_ormas_id_fk" FOREIGN KEY ("ormas_id") REFERENCES "public"."ormas"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dokumen_ormas" ADD CONSTRAINT "dokumen_ormas_detail_ormas_id_detail_ormas_id_fk" FOREIGN KEY ("detail_ormas_id") REFERENCES "public"."detail_ormas"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ormas" ADD CONSTRAINT "ormas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
<<<<<<< HEAD:supabase/migrations/0001_nostalgic_phil_sheldon.sql
ALTER TABLE "reset_password_table" ADD CONSTRAINT "reset_password_table_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
=======
ALTER TABLE "reset_password_table" ADD CONSTRAINT "reset_password_table_user_id_ormas_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ormas"("id") ON DELETE cascade ON UPDATE cascade;
>>>>>>> 11bcb47d4f48d6aead9c285a091abb94ce7b00ea:supabase/migrations/0001_wooden_donald_blake.sql
