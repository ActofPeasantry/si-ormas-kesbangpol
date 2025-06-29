"use server";

import { db } from "@/lib/db";
import { detailOrmasTable, OrmasTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getOrmasData() {
  const result = await db
    .select({
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      noTelpOrmas: detailOrmasTable.noTelpOrmas,
      alamatOrmas: detailOrmasTable.alamatOrmas,
    })
    .from(OrmasTable)
    .leftJoin(detailOrmasTable, eq(OrmasTable.id, detailOrmasTable.OrmasId));
  return result;
}
