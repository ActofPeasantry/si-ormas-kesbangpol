"use client";
import { z } from "zod";
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/app/ormas/DataTable";
import { getOrmasData } from "@/lib/queries/ormas";
import { STATUS_ORMAS } from "@/lib/enums/StatusOrmas";

export const OrmasSchema = z.object({
  id: z.number(),
  namaOrmas: z.string(),
  singkatanOrmas: z.string(),
  alamatOrmas: z.string().nullable(),
  noTelpOrmas: z.string().nullable(),
  statusOrmas: z.enum([STATUS_ORMAS.AKTIF, STATUS_ORMAS.NON_AKTIF]),
});

export const OrmasDataSchema = z.object({
  records: z.array(OrmasSchema),
});
type OrmasData = z.infer<typeof OrmasDataSchema>;

export const OrmasCard = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<OrmasData>({
    queryKey: ["ormasRecords"],
    queryFn: async () => {
      const records = await getOrmasData();
      return { records };
    },
  });

  const refreshData = useMutation({
    mutationFn: async () => {
      const records = await getOrmasData();
      return { records };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["ormasRecords"], data);
    },
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <Card className="@container/card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  Daftar Organisasi Masyarakat
                </CardTitle>
              </CardHeader>
              <DataTable
                data={data?.records || []}
                loading={isLoading || refreshData.isPending}
                onDeleteData={() => refreshData.mutate()}
                onUpdateData={() => refreshData.mutate()}
              />
              <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
