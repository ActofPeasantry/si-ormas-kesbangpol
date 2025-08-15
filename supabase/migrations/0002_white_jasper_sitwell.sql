ALTER TABLE "reset_password_table" DROP CONSTRAINT "reset_password_table_user_id_ormas_id_fk";
--> statement-breakpoint
ALTER TABLE "reset_password_table" ADD CONSTRAINT "reset_password_table_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "reset_password_table" ADD CONSTRAINT "reset_password_table_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "reset_password_table" ADD CONSTRAINT "reset_password_table_token_unique" UNIQUE("token");