"use client";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { getOrmasDetail } from "@/lib/queries/ormas";
import { getDokumenOrmasData } from "@/lib/queries/dokumenOrmas";

export const OrmasSchema = z.object({
  id: z.number(),
  statusOrmas: z.string().nullable(),
  namaOrmas: z.string().nullable(),
  singkatanOrmas: z.string().nullable(),
  namaKetuaOrmas: z.string().nullable(),
  namaSekretarisOrmas: z.string().nullable(),
  alamatOrmas: z.string().nullable(),
  noTelpOrmas: z.string().nullable(),
  skBadanHukum: z.string().nullable(),
  skKeperguruan: z.string().nullable(),
  adArt: z.string().nullable(),
});
type OrmasRecord = z.infer<typeof OrmasSchema>;

export const DokumenSchema = z.object({
  id: z.number(),
  judulDokumen: z.string(),
  linkDokumen: z.string(),
  statusDokumen: z.enum(["pengajuan", "ditolak", "diterima", "tidak ada"]),
});
type DokumenRecord = z.infer<typeof DokumenSchema>;

type OrmasData = {
  ormasRecords: OrmasRecord[];
  dokumenRecords: DokumenRecord[];
};

export const FormCard = ({ numericId }: { numericId: number }) => {
  const { data, isLoading, error } = useQuery<OrmasData>({
    queryKey: ["ormasRecords", numericId],
    queryFn: async () => {
      const ormasRecords = await getOrmasDetail(numericId);
      const dokumenRecords = await getDokumenOrmasData(numericId);
      return { ormasRecords, dokumenRecords };
    },
    enabled: !!numericId,
  });

  // const ormas = await getOrmasDetail(id);
  if (isLoading || !data?.ormasRecords?.[0]) {
    return <div>Loading...</div>;
  }
  if (error || !data) return <div>Error loading data.</div>;
  return (
    <>
      <Card className="@container/card mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.ormasRecords[0].namaOrmas}
          </CardTitle>
          <CardDescription>
            {data.ormasRecords[0].singkatanOrmas}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-3 lg:mb-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Status</span>
              <span>
                <Badge variant="outline" className=" px-1.5">
                  {data.ormasRecords[0].statusOrmas === "Aktif" ? (
                    <FaCheckCircle className="fill-green-500 dark:fill-green-400" />
                  ) : (
                    <MdOutlineError className="fill-yellow-500 dark:fill-yellow-400" />
                  )}
                  {data.ormasRecords[0].statusOrmas}
                </Badge>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Alamat Ormas</span>
              <span>{data.ormasRecords[0].alamatOrmas}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">No. telepon Ormas</span>
              <span>{data.ormasRecords[0].noTelpOrmas}</span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-1 lg:mb-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Nama Ketua Ormas</span>
              <span>{data.ormasRecords[0].namaKetuaOrmas}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">SK Badan Keperguruan</span>
              <span>{data.ormasRecords[0].namaSekretarisOrmas}</span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-1 lg:mb-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Nama Sekretaris Ormas</span>
              <span>{data.ormasRecords[0].skBadanHukum}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">SK Badan Keperguruan</span>
              <span>{data.ormasRecords[0].skKeperguruan}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">AD/ART</span>
              <span>{data.ormasRecords[0].adArt}</span>
            </div>
          </div>
          <h1>Dokumen Ormas</h1>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
      </Card>
    </>
  );
};
