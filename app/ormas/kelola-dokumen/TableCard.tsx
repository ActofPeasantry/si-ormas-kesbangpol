"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { SubmittedDataTable } from "./SubmittedDataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconCheckbox } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  acceptDokumenOrmas,
  getAcceptedDokumenOrmasDataWithNamaOrmas,
  getRejectedDokumenOrmasDataWithNamaOrmas,
  // getAllDokumenOrmasDataWithNamaOrmas,
  getSubmittedDokumenOrmasDataWithNamaOrmas,
  refuseDokumenOrmas,
} from "@/lib/queries/dokumenOrmas";

export const OrmasSchema = z.object({
  id: z.number(),
  namaOrmas: z.string().nullable(),
  judulDokumen: z.string(),
  linkDokumen: z.string(),
  statusDokumen: z.string(),
});

type OrmasData = z.infer<typeof OrmasSchema>;
type DokumenData = {
  submittedRecords: OrmasData[];
  acceptedRecords: OrmasData[];
  rejectedRecords: OrmasData[];
  allRecords: OrmasData[];
};

export const TableCard = () => {
  const [storedId, setStoredId] = useState<number[]>([]);
  const [disableButton, setDisableButton] = useState(true);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const handleAcceptedDocuments = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Promise.all(storedId.map((id) => acceptDokumenOrmas(id)));
      refreshData.mutate();
      setStoredId([]); //make storedId empty to disable button
      setRowSelection({}); //so all checked row on table immediately unchecked
      console.log("Documents accepted and selections cleared");
    } catch (error) {
      console.error("Error accepting documents:", error);
    }
  };
  const handleRefusedDocuments = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Promise.all(storedId.map((id) => refuseDokumenOrmas(id)));
      refreshData.mutate();
      setStoredId([]); //make storedId empty to disable button
      setRowSelection({}); //so all checked row on table immediately unchecked
      console.log("Documents refused and selections cleared");
    } catch (error) {
      console.error("Error refusing documents:", error);
    }
  };

  useEffect(() => {
    if (storedId.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [storedId]);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<DokumenData>({
    queryKey: ["dokumenRecords"],
    queryFn: async () => {
      const submittedRecords =
        await getSubmittedDokumenOrmasDataWithNamaOrmas();
      const acceptedRecords = await getAcceptedDokumenOrmasDataWithNamaOrmas();
      const rejectedRecords = await getRejectedDokumenOrmasDataWithNamaOrmas();
      const allRecords = [
        ...submittedRecords,
        ...acceptedRecords,
        ...rejectedRecords,
      ];
      return { submittedRecords, acceptedRecords, rejectedRecords, allRecords };
    },
  });

  const refreshData = useMutation({
    mutationFn: async () => {
      const submittedRecords =
        await getSubmittedDokumenOrmasDataWithNamaOrmas();
      const acceptedRecords = await getAcceptedDokumenOrmasDataWithNamaOrmas();
      const rejectedRecords = await getRejectedDokumenOrmasDataWithNamaOrmas();
      const allRecords = [
        ...submittedRecords,
        ...acceptedRecords,
        ...rejectedRecords,
      ];
      return { submittedRecords, acceptedRecords, rejectedRecords, allRecords };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["dokumenRecords"], data);
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
                  Kelola Dokumen Organisasi Masyarakat
                </CardTitle>
                <CardDescription>
                  {/* <span>Lorem Ipsum Sit Dolor Amet</span> */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pengajuan">
                  <TabsList>
                    <TabsTrigger value="pengajuan">
                      Pengajuan{" "}
                      <Badge variant="secondary">
                        {data?.submittedRecords.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="diterima">
                      Diterima{" "}
                      <Badge variant="secondary">
                        {data?.acceptedRecords.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="ditolak">
                      Ditolak{" "}
                      <Badge variant="secondary">
                        {data?.rejectedRecords.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="seluruhDokumen">
                      Seluruh Dokumen{" "}
                      <Badge variant="secondary">
                        {data?.allRecords.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                  {/* pengajuan table */}
                  <TabsContent value="pengajuan">
                    <div className="flex w-full items-center my-2 gap-1  ">
                      {/* accept/refuse button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600"
                            disabled={disableButton}
                            size="sm"
                          >
                            <IconCheckbox /> Terima Dokumen
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={(e) => handleAcceptedDocuments(e)}>
                            <div className="mb-4">
                              <DialogHeader>
                                <DialogTitle>Terima Dokumen</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                            </div>
                            <div className="grid gap-4">
                              <DialogDescription>
                                Apakah anda yakin ingin menerima dokumen?
                              </DialogDescription>
                            </div>
                            <DialogFooter className="mt-3">
                              <DialogClose asChild>
                                <Button variant="outline" type="button">
                                  Batal
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="outline" type="submit">
                                  Terima
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
                            disabled={disableButton}
                            size="sm"
                          >
                            <IconX />
                            Tolak Dokumen
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={(e) => handleRefusedDocuments(e)}>
                            <div className="mb-4">
                              <DialogHeader>
                                <DialogTitle>Terima Dokumen</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                            </div>
                            <div className="grid gap-4">
                              <DialogDescription>
                                Apakah anda yakin ingin menolak dokumen?
                              </DialogDescription>
                            </div>
                            <DialogFooter className="mt-3">
                              <DialogClose asChild>
                                <Button variant="outline" type="button">
                                  Batal
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="outline" type="submit">
                                  Tolak
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <SubmittedDataTable
                      data={data?.submittedRecords || []}
                      loading={isLoading || refreshData.isPending}
                      isSubmittedTable={true}
                      setStoredId={setStoredId}
                      rowSelection={rowSelection}
                      setRowSelection={setRowSelection}
                    />
                  </TabsContent>
                  {/* diterima table */}
                  <TabsContent value="diterima">
                    <DataTable
                      data={data?.acceptedRecords || []}
                      loading={isLoading || refreshData.isPending}
                      onDeleteData={refreshData.mutate}
                      onUpdateData={refreshData.mutate}
                    />
                  </TabsContent>
                  <TabsContent value="ditolak">
                    <DataTable
                      data={data?.rejectedRecords || []}
                      loading={isLoading || refreshData.isPending}
                      onDeleteData={refreshData.mutate}
                      onUpdateData={refreshData.mutate}
                    />
                  </TabsContent>
                  <TabsContent value="seluruhDokumen">
                    <DataTable
                      data={data?.allRecords || []}
                      loading={isLoading || refreshData.isPending}
                      onDeleteData={refreshData.mutate}
                      onUpdateData={refreshData.mutate}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
