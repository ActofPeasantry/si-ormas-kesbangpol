// import { relations } from "drizzle-orm";
import { mysqlTable, int, varchar, mysqlEnum } from "drizzle-orm/mysql-core";

export const UsersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  nama: varchar("nama", { length: 10 }).notNull(),
  username: varchar("username", { length: 10 }).notNull(),
  email: varchar("email", { length: 20 }).notNull(),
  password: varchar("password", { length: 20 }).notNull(),
  role: mysqlEnum("role", ["admin", "akun ormas"])
    .notNull()
    .default("akun ormas"),
});

//-------------------------------------------------------------------------

export const OrmasTable = mysqlTable("ormas", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id")
    .notNull()
    .unique()
    .references(() => UsersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  namaOrmas: varchar("nama_ormas", { length: 10 }).notNull(),
  singkatanOrmas: varchar("singkatan_ormas", { length: 10 }).notNull(),
});

//-------------------------------------------------------------------------

export const detailOrmasTable = mysqlTable("detail_ormas", {
  id: int("id").primaryKey().autoincrement().notNull(),
  OrmasId: int("ormas_id")
    .notNull()
    .unique()
    .references(() => OrmasTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  skBadanHukum: varchar("sk_badan_hukum", { length: 10 }).notNull(),
  skBadanKeperguruan: varchar("sk_badan_keperguruan", { length: 10 }).notNull(),
  adArt: varchar("ad_art", { length: 10 }).notNull(),
  alamatOrmas: varchar("alamat_ormas", { length: 10 }).notNull(),
  noTelpOrmas: varchar("no_telp_ormas", { length: 10 }).notNull(),
});

//-------------------------------------------------------------------------

export const dokumenOrmasTable = mysqlTable("dokumen_ormas", {
  id: int("id").primaryKey().autoincrement().notNull(),
  detailOrmasId: int("detail_ormas_id")
    .notNull()
    .references(() => detailOrmasTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  linkDokumen: varchar("link_dokumen", { length: 20 }).notNull(),
  statusDokumen: mysqlEnum("status_dokumen", [
    "pengajuan",
    "ditolak",
    "diterima",
    "tidak ada",
  ])
    .notNull()
    .default("pengajuan"),
});
