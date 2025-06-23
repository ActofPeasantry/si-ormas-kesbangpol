import {
  serial,
  mysqlTable,
  int,
  varchar,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const UsersTable = mysqlTable("users", {
  id: serial("id").primaryKey(),
  nama: varchar("name", { length: 10 }).notNull(),
  username: varchar("username", { length: 10 }).notNull(),
  email: varchar("email", { length: 20 }).notNull(),
  password: varchar("password", { length: 20 }).notNull(),
  role: mysqlEnum("role", ["admin", "akun ormas"])
    .notNull()
    .default("akun ormas"),
});

export const OrmasTable = mysqlTable("ormas", {
  id: serial("id").primaryKey(),
  userId: int("user_id")
    .references(() => UsersTable.id)
    .unique()
    .notNull(),
  namaOrmas: varchar("nama_ormas", { length: 10 }).notNull(),
  singkatanOrmas: varchar("singkatan_ormas", { length: 10 }).notNull(),
});

export const detailOrmasTable = mysqlTable("detail_ormas", {
  id: serial("id").primaryKey(),
  idOrmas: int("id_ormas")
    .references(() => OrmasTable.id)
    .unique()
    .notNull(),
  skBadanHukum: varchar("sk_badan_hukum", { length: 10 }).notNull(),
  skBadanKeperguruan: varchar("sk_badan_keperguruan", { length: 10 }).notNull(),
  adArt: varchar("ad_art", { length: 10 }).notNull(),
  alamatOrmas: varchar("alamat_ormas", { length: 10 }).notNull(),
  noTelpOrmas: varchar("no_telp_ormas", { length: 10 }).notNull(),
});

export const dokumenOrmasTable = mysqlTable("dokumen_ormas", {
  id: serial("id").primaryKey(),
  idDetailOrmas: int("id_detail_ormas")
    .references(() => detailOrmasTable.id)
    .notNull(),
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
