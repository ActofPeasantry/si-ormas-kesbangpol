"use server";

import { db } from "@/lib/db";
import { DetailOrmasTable, OrmasTable, UsersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getOrmasData() {
  const result = await db
    .select({
      id: OrmasTable.id,
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
      statusOrmas: OrmasTable.statusOrmas,
    })
    .from(OrmasTable)
    .leftJoin(DetailOrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId));
  return result;
}

export async function getOrmasDetail(id: number) {
  return await db
    .select({
      id: OrmasTable.id,
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      statusOrmas: OrmasTable.statusOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
      skBadanHukum: DetailOrmasTable.skBadanHukum,
      skBadanKeperguruan: DetailOrmasTable.skBadanKeperguruan,
      adArt: DetailOrmasTable.adArt,
    })
    .from(OrmasTable)
    .leftJoin(DetailOrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId))
    .where(eq(OrmasTable.id, id));
}

export async function addOrmasData(formData: FormData) {
  // Users data
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Ormas data
  const namaOrmas = formData.get("namaOrmas") as string;
  const singkatanOrmas = formData.get("singkatanOrmas") as string;

  // Detail Ormas
  const alamatOrmas = formData.get("alamatOrmas") as string;
  const noTelpOrmas = formData.get("noTelpOrmas") as string;
  const skBadanHukum = formData.get("skBadanHukum") as string;
  const skBadanKeperguruan = formData.get("skBadanKeperguruan") as string;
  const adArt = formData.get("adArt") as string;

  try {
    // Insert user
    const userResult = await db
      .insert(UsersTable)
      .values({ username, email, password, role: "akun ormas" })
      .$returningId();

    const userId = userResult[0].id;

    // Insert ormas
    const ormasResult = await db
      .insert(OrmasTable)
      .values({
        userId: userId,
        namaOrmas,
        singkatanOrmas,
        statusOrmas: "Non Aktif",
      })
      .$returningId();

    const ormasId = ormasResult[0].id;

    // Insert detail_ormas
    await db.insert(DetailOrmasTable).values({
      OrmasId: ormasId,
      alamatOrmas,
      noTelpOrmas,
      skBadanHukum,
      skBadanKeperguruan,
      adArt,
    });

    console.log("Inserted userId:", userId);
    console.log("Inserted ormasId:", ormasId);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function editOrmasData(id: number) {
  const result = await db
    .select({
      id: OrmasTable.id,
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      // statusOrmas: OrmasTable.statusOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      skBadanHukum: DetailOrmasTable.skBadanHukum,
      skBadanKeperguruan: DetailOrmasTable.skBadanKeperguruan,
      adArt: DetailOrmasTable.adArt,
    })
    .from(OrmasTable)
    .leftJoin(DetailOrmasTable, eq(OrmasTable.id, DetailOrmasTable.OrmasId))
    .where(eq(OrmasTable.id, id));
  return result;
}

export async function updateOrmasData(id: number, formData: FormData) {
  // Ormas data
  const namaOrmas = formData.get("namaOrmas") as string;
  const singkatanOrmas = formData.get("singkatanOrmas") as string;

  // Detail Ormas
  const alamatOrmas = formData.get("alamatOrmas") as string;
  const noTelpOrmas = formData.get("noTelpOrmas") as string;
  const skBadanHukum = formData.get("skBadanHukum") as string;
  const skBadanKeperguruan = formData.get("skBadanKeperguruan") as string;
  const adArt = formData.get("adArt") as string;

  try {
    // Update ormas
    await db
      .update(OrmasTable)
      .set({
        namaOrmas,
        singkatanOrmas,
      })
      .where(eq(OrmasTable.id, id));

    // Update detail_ormas
    await db
      .update(DetailOrmasTable)
      .set({
        alamatOrmas,
        noTelpOrmas,
        skBadanHukum,
        skBadanKeperguruan,
        adArt,
      })
      .where(eq(DetailOrmasTable.OrmasId, id));

    console.log("Updated ormasId:", id);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function deleteOrmasData(id: number) {
  try {
    await db.delete(OrmasTable).where(eq(OrmasTable.id, id));
    console.log("Deleted ormasId:", id);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
