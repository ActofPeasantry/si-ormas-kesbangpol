// import { relations } from "drizzle-orm";
import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  date,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const UsersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement().notNull(),
  username: varchar("username", { length: 10 }).notNull(),
  email: varchar("email", { length: 20 }).notNull(),
  password: varchar("password", { length: 20 }).notNull(),
  role: mysqlEnum("role", ["admin", "akun ormas"])
    .notNull()
    .default("akun ormas"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: date("deleted_at"),
});

//-------------------------------------------------------------------------

//UserTable-OrmasTable relation is one-to-many for now
export const OrmasTable = mysqlTable("ormas", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => UsersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  namaOrmas: varchar("nama_ormas", { length: 10 }).notNull(),
  singkatanOrmas: varchar("singkatan_ormas", { length: 10 }).notNull(),
  statusOrmas: mysqlEnum("status_ormas", ["Aktif", "Non Aktif"])
    .notNull()
    .default("Non Aktif"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: date("deleted_at"),
});

//-------------------------------------------------------------------------

export const DetailOrmasTable = mysqlTable("detail_ormas", {
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

//-------------------------------------------------------------------------

export const DokumenOrmasTable = mysqlTable("dokumen_ormas", {
  id: int("id").primaryKey().autoincrement().notNull(),
  detailOrmasId: int("detail_ormas_id")
    .notNull()
    .references(() => DetailOrmasTable.id, {
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: date("deleted_at"),
});
