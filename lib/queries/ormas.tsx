"use server";

import { db } from "@/lib/db";
import { DetailOrmasTable, OrmasTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getOrmasData() {
  const result = await db
    .select({
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
    })
    .from(OrmasTable)
    .leftJoin(DetailOrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId));
  return result;
}
