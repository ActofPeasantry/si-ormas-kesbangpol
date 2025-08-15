"use server";

import { db } from "@/lib/drizzle";
import { DetailOrmasTable, OrmasTable, UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { STATUS_ORMAS } from "../enums/StatusOrmas";

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
      namaKetuaOrmas: DetailOrmasTable.namaKetuaOrmas,
      namaSekretarisOrmas: DetailOrmasTable.namaSekretarisOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
      skBadanHukum: DetailOrmasTable.skBadanHukum,
      skKeperguruan: DetailOrmasTable.skKeperguruan,
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
  const namaKetuaOrmas = formData.get("namaKetuaOrmas") as string;
  const namaSekretarisOrmas = formData.get("namaSekretarisOrmas") as string;
  const alamatOrmas = formData.get("alamatOrmas") as string;
  const noTelpOrmas = formData.get("noTelpOrmas") as string;
  const skBadanHukum = formData.get("skBadanHukum") as string;
  const skKeperguruan = formData.get("skKeperguruan") as string;
  const adArt = formData.get("adArt") as string;

  try {
    // Insert user
    const userResult = await db
      .insert(UsersTable)
      .values({
        username,
        email,
        password,
        role: "ormas",
      })
      .returning({ id: UsersTable.id });

    const userId = userResult[0].id;

    // Insert ormas
    const ormasResult = await db
      .insert(OrmasTable)
      .values({
        userId: userId,
        namaOrmas,
        singkatanOrmas,
        statusOrmas: STATUS_ORMAS.NON_AKTIF,
      })
      .returning({ id: OrmasTable.id });

    const ormasId = ormasResult[0].id;

    // Insert detail_ormas
    await db.insert(DetailOrmasTable).values({
      OrmasId: ormasId,
      namaKetuaOrmas,
      namaSekretarisOrmas,
      alamatOrmas,
      noTelpOrmas,
      skBadanHukum,
      skKeperguruan,
      adArt,
    });

    console.log("Inserted userId:", userId);
    console.log("Inserted ormasId:", ormasId);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function activateOrmas(id: number) {
  await db
    .update(OrmasTable)
    .set({ statusOrmas: STATUS_ORMAS.AKTIF })
    .where(eq(OrmasTable.id, id));
}

export async function editOrmasData(id: number) {
  const result = await db
    .select({
      id: OrmasTable.id,
      namaOrmas: OrmasTable.namaOrmas,
      singkatanOrmas: OrmasTable.singkatanOrmas,
      // statusOrmas: OrmasTable.statusOrmas,
      namaKetuaOrmas: DetailOrmasTable.namaKetuaOrmas,
      namaSekretarisOrmas: DetailOrmasTable.namaSekretarisOrmas,
      alamatOrmas: DetailOrmasTable.alamatOrmas,
      noTelpOrmas: DetailOrmasTable.noTelpOrmas,
      skBadanHukum: DetailOrmasTable.skBadanHukum,
      skKeperguruan: DetailOrmasTable.skKeperguruan,
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
  const namaKetuaOrmas = formData.get("namaKetuaOrmas") as string;
  const namaSekretarisOrmas = formData.get("namaSekretarisOrmas") as string;
  const alamatOrmas = formData.get("alamatOrmas") as string;
  const noTelpOrmas = formData.get("noTelpOrmas") as string;
  const skBadanHukum = formData.get("skBadanHukum") as string;
  const skKeperguruan = formData.get("skKeperguruan") as string;
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
        namaKetuaOrmas,
        namaSekretarisOrmas,
        alamatOrmas,
        noTelpOrmas,
        skBadanHukum,
        skKeperguruan,
        adArt,
      })
      .where(eq(DetailOrmasTable.OrmasId, id));
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

export async function deleteOrmasData(id: number) {
  try {
    await db.delete(OrmasTable).where(eq(OrmasTable.id, id));
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
