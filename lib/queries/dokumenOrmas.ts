"use server";

import { db } from "@/lib/db";
import {
  DetailOrmasTable,
  DokumenOrmasTable,
  OrmasTable,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function acceptDokumenOrmas(id: number) {
  try {
    await db
      .update(DokumenOrmasTable)
      .set({ statusDokumen: "diterima", updatedAt: new Date() })
      .where(eq(DokumenOrmasTable.id, id));
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}
export async function refuseDokumenOrmas(id: number) {
  try {
    await db
      .update(DokumenOrmasTable)
      .set({ statusDokumen: "ditolak", updatedAt: new Date() })
      .where(eq(DokumenOrmasTable.id, id));
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function getSubmittedDokumenOrmasDataWithNamaOrmas() {
  return await db
    .select({
      namaOrmas: OrmasTable.namaOrmas,
      id: DokumenOrmasTable.id,
      judulDokumen: DokumenOrmasTable.judulDokumen,
      linkDokumen: DokumenOrmasTable.linkDokumen,
      statusDokumen: DokumenOrmasTable.statusDokumen,
    })
    .from(DokumenOrmasTable)
    .leftJoin(
      DetailOrmasTable,
      eq(DokumenOrmasTable.detailOrmasId, DetailOrmasTable.id)
    )
    .leftJoin(OrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId))
    .where(eq(DokumenOrmasTable.statusDokumen, "pengajuan"));
}

export async function getAcceptedDokumenOrmasDataWithNamaOrmas() {
  return await db
    .select({
      namaOrmas: OrmasTable.namaOrmas,
      id: DokumenOrmasTable.id,
      judulDokumen: DokumenOrmasTable.judulDokumen,
      linkDokumen: DokumenOrmasTable.linkDokumen,
      statusDokumen: DokumenOrmasTable.statusDokumen,
    })
    .from(DokumenOrmasTable)
    .leftJoin(
      DetailOrmasTable,
      eq(DokumenOrmasTable.detailOrmasId, DetailOrmasTable.id)
    )
    .leftJoin(OrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId))
    .where(eq(DokumenOrmasTable.statusDokumen, "diterima"));
}
export async function getRejectedDokumenOrmasDataWithNamaOrmas() {
  return await db
    .select({
      namaOrmas: OrmasTable.namaOrmas,
      id: DokumenOrmasTable.id,
      judulDokumen: DokumenOrmasTable.judulDokumen,
      linkDokumen: DokumenOrmasTable.linkDokumen,
      statusDokumen: DokumenOrmasTable.statusDokumen,
    })
    .from(DokumenOrmasTable)
    .leftJoin(
      DetailOrmasTable,
      eq(DokumenOrmasTable.detailOrmasId, DetailOrmasTable.id)
    )
    .leftJoin(OrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId))
    .where(eq(DokumenOrmasTable.statusDokumen, "ditolak"));
}

export async function getDokumenOrmasData(id: number) {
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

export async function editDokumenOrmasData(id: number) {
  const result = await db
    .select({
      judulDokumen: DokumenOrmasTable.judulDokumen,
      linkDokumen: DokumenOrmasTable.linkDokumen,
      statusDokumen: DokumenOrmasTable.statusDokumen,
    })
    .from(DokumenOrmasTable)
    .where(eq(DokumenOrmasTable.id, id));
  return result[0];
}

export async function updateDokumenOrmasData(formData: FormData, id: number) {
  const linkDokumen = formData.get("linkDokumen") as string;
  const judulDokumen = formData.get("judulDokumen") as string;
  try {
    await db
      .update(DokumenOrmasTable)
      .set({ judulDokumen, linkDokumen, statusDokumen: "pengajuan" })
      .where(eq(DokumenOrmasTable.id, id));
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function updateDokumenOrmasStatus(id: number, formData: FormData) {
  const statusDokumen = formData.get("statusDokumen") as
    | "pengajuan"
    | "diterima"
    | "ditolak"
    | "tidak ada";
  try {
    await db
      .update(DokumenOrmasTable)
      .set({
        statusDokumen,
      })
      .where(eq(DokumenOrmasTable.id, id));
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
