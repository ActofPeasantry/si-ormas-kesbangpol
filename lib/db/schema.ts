import {
  pgTable,
  pgEnum,
  integer,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { USER_ROLES } from "../enums/UserRole";
import { STATUS_ORMAS } from "../enums/StatusOrmas";
import { STATUS_DOKUMEN } from "../enums/StatusDokumen";

export const userRoleEnum = pgEnum("user_role", [
  USER_ROLES.ADMIN,
  USER_ROLES.ORMAS,
]);
export const statusOrmasEnum = pgEnum("status_ormas", [
  STATUS_ORMAS.AKTIF,
  STATUS_ORMAS.NON_AKTIF,
]);
export const statusDokumenEnum = pgEnum("status_dokumen", [
  STATUS_DOKUMEN.PENGAJUAN,
  STATUS_DOKUMEN.DITERIMA,
  STATUS_DOKUMEN.DITOLAK,
  STATUS_DOKUMEN.TIDAK_AKTIF,
]);

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("ormas"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});

//-------------------------------------------------------------------------

//UserTable-OrmasTable relation is one-to-many for now
export const OrmasTable = pgTable("ormas", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => UsersTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  namaOrmas: text("nama_ormas").notNull(),
  singkatanOrmas: text("singkatan_ormas").notNull(),
  statusOrmas: statusOrmasEnum("status_ormas").notNull().default("non aktif"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});

//-------------------------------------------------------------------------

export const DetailOrmasTable = pgTable("detail_ormas", {
  id: serial("id").primaryKey(),
  OrmasId: integer("ormas_id")
    .notNull()
    .unique()
    .references(() => OrmasTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  namaKetuaOrmas: text("nama_ketua_ormas").notNull(),
  namaSekretarisOrmas: text("nama_sekretaris_ormas").notNull(),
  skBadanHukum: text("sk_badan_hukum").notNull(),
  skKeperguruan: text("sk_keperguruan").notNull(),
  adArt: text("ad_art").notNull(),
  alamatOrmas: text("alamat_ormas").notNull(),
  noTelpOrmas: text("no_telp_ormas").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

//-------------------------------------------------------------------------

export const DokumenOrmasTable = pgTable("dokumen_ormas", {
  id: serial("id").primaryKey(),
  detailOrmasId: integer("detail_ormas_id")
    .notNull()
    .references(() => DetailOrmasTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  judulDokumen: text("judul_dokumen").notNull(),
  linkDokumen: text("link_dokumen").notNull(),

  statusDokumen: statusDokumenEnum("status_dokumen")
    .notNull()
    .default("pengajuan"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});
