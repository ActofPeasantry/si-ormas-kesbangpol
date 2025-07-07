"use server";

import { db } from "@/lib/db";
import { DokumenOrmasTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getDokumenOrmas(id: number) {
  return await db
    .select({
      id: DokumenOrmasTable.id,
      judulDokumen: DokumenOrmasTable.judulDokumen,
      linkDokumen: DokumenOrmasTable.linkDokumen,
      statusDokumen: DokumenOrmasTable.statusDokumen,
    })
    .from(DokumenOrmasTable)
    .where(eq(DokumenOrmasTable.detailOrmasId, id));
}

export async function addDokumenOrmasData(formData: FormData, id: number) {
  const linkDokumen = formData.get("linkDokumen") as string;
  const judulDokumen = formData.get("judulDokumen") as string;
  try {
    await db.insert(DokumenOrmasTable).values({
      detailOrmasId: id,
      judulDokumen,
      linkDokumen,
      statusDokumen: "pengajuan",
    });
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function deleteDokumenOrmasData(id: number) {
  try {
    await db.delete(DokumenOrmasTable).where(eq(DokumenOrmasTable.id, id));
    console.log("Deleted ormasId:", id);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
