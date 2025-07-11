"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/app/ormas/kelola_dokumen/data-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  // getAllDokumenOrmasDataWithNamaOrmas,
  getSubmittedDokumenOrmasDataWithNamaOrmas,
  refuseDokumenOrmas,
} from "@/lib/queries/dokumenOrmas";

type DokumenRecord = {
  id: number;
  namaOrmas: string | null;
  judulDokumen: string;
  linkDokumen: string;
  statusDokumen: string;
};

type DokumenData = {
  dokumenRecords: DokumenRecord[];
};

const breadcrumb = [
  {
    title: "Dashboard",
    url: "/",
  },
  {
    title: "Ormas",
    url: "/ormas",
  },
  {
    title: "Kelola Dokumen Ormas",
    url: "/ormas/kelola_dokumen",
  },
];

export default function Page() {
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

  const { data: submittedDokumen, isLoading } = useQuery<DokumenData>({
    queryKey: ["submittedDokumenRecords"],
    queryFn: async () => {
      const dokumenRecords = await getSubmittedDokumenOrmasDataWithNamaOrmas();
      return { dokumenRecords };
    },
  });
  const refreshData = useMutation({
    mutationFn: async () => {
      const dokumenRecords = await getSubmittedDokumenOrmasDataWithNamaOrmas();
      return { dokumenRecords };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["submittedDokumenRecords"], data);
    },
  });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        {/* <CardDescription /> */}
        <SiteHeader breadcrumb={breadcrumb} />
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
                      <span>Lorem Ipsum Sit Dolor Amet</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pengajuan">
                      <TabsList>
                        <TabsTrigger value="pengajuan">Pengajuan</TabsTrigger>
                        <TabsTrigger value="diterima">Diterima</TabsTrigger>
                        <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
                        <TabsTrigger value="seluruhDokumen">
                          Seluruh Dokumen
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="pengajuan">
                        <div className="flex w-full items-center my-2 gap-1  ">
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
                              <form
                                onSubmit={(e) => handleAcceptedDocuments(e)}
                              >
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
                        <DataTable
                          data={submittedDokumen?.dokumenRecords || []}
                          loading={isLoading || refreshData.isPending}
                          isSubmittedTable={true}
                          setStoredId={setStoredId}
                          rowSelection={rowSelection}
                          setRowSelection={setRowSelection}
                        />
                      </TabsContent>
                      <TabsContent value="diterima">
                        {/* <DataTable
                          data={data?.dokumenRecords || []}
                          loading={isLoading || refreshData.isPending}
                        /> */}
                      </TabsContent>
                      <TabsContent value="ditolak">
                        {/* <DataTable
                          data={data?.dokumenRecords || []}
                          loading={isLoading || refreshData.isPending}
                        /> */}
                      </TabsContent>
                      <TabsContent value="seluruhDokumen">
                        {/* <DataTable
                          data={data?.dokumenRecords || []}
                          loading={isLoading || refreshData.isPending}
                        /> */}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
