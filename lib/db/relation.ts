// db/relations.ts
import { relations } from "drizzle-orm";
import {
  UsersTable,
  OrmasTable,
  detailOrmasTable,
  dokumenOrmasTable,
} from "./schema";

// 1. User has one Ormas (1:1)
export const userRelations = relations(UsersTable, ({ one }) => ({
  ormas: one(OrmasTable, {
    fields: [UsersTable.id],
    references: [OrmasTable.userId],
  }),
}));

// 2. Ormas belongs to User (1:1), and has one DetailOrmas (1:1)
export const ormasRelations = relations(OrmasTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [OrmasTable.userId],
    references: [UsersTable.id],
  }),
  detailOrmas: one(detailOrmasTable, {
    fields: [OrmasTable.id],
    references: [detailOrmasTable.OrmasId],
  }),
}));

// 3. DetailOrmas belongs to Ormas (1:1), and has many DokumenOrmas (1:N)
export const detailOrmasRelations = relations(
  detailOrmasTable,
  ({ one, many }) => ({
    ormas: one(OrmasTable, {
      fields: [detailOrmasTable.OrmasId],
      references: [OrmasTable.id],
    }),
    dokumenOrmas: many(dokumenOrmasTable),
  })
);

// 4. DokumenOrmas belongs to DetailOrmas (N:1)
export const dokumenOrmasRelations = relations(
  dokumenOrmasTable,
  ({ one }) => ({
    detailOrmas: one(detailOrmasTable, {
      fields: [dokumenOrmasTable.detailOrmasId],
      references: [detailOrmasTable.id],
    }),
  })
);
