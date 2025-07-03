"use server";

import { db } from "@/lib/db";
import { DokumenOrmasTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getDokumenOrmas(id: number) {
  return await db
    .select()
    .from(DokumenOrmasTable)
    .where(eq(DokumenOrmasTable.detailOrmasId, id));
}
