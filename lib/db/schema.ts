import {
  integer,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: varchar("role", { enum: ["admin", "ormas"] })
    .notNull()
    .default("ormas"),
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
  role: varchar("status_ormas", { enum: ["aktif", "non aktif"] })
    .notNull()
    .default("non aktif"),
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

  statusDokumen: varchar("status_dokumen", {
    enum: ["pengajuan", "ditolak", "diterima", "tidak ada"],
  })
    .notNull()
    .default("pengajuan"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp("deleted_at"),
});
