"use client";
import { use, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { DataTable } from "@/app/ormas/detail/[id]/data-table";
import { getOrmasDetail } from "@/lib/queries/ormas";
import { getDokumenOrmasData } from "@/lib/queries/dokumenOrmas";
import { addDokumenOrmasData } from "@/lib/queries/dokumenOrmas";

type OrmasRecord = {
  id: number;
  statusOrmas: string | null;
  namaOrmas: string | null;
  singkatanOrmas: string | null;
  alamatOrmas: string | null;
  noTelpOrmas: string | null;
  skBadanHukum: string | null;
  skBadanKeperguruan: string | null;
  adArt: string | null;
};

type DokumenRecord = {
  id: number;
  judulDokumen: string;
  linkDokumen: string;
  statusDokumen: string;
};

type OrmasData = {
  ormasRecords: OrmasRecord[];
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
    title: "Detail Ormas",
    url: "/ormas/detail/[id]",
  },
];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = useQueryClient();
  const { id } = use(params);
  const numericId = Number(id);

  const { data, isLoading, error } = useQuery<OrmasData>({
    queryKey: ["ormasRecords", numericId],
    queryFn: async () => {
      const ormasRecords = await getOrmasDetail(numericId);
      const dokumenRecords = await getDokumenOrmasData(numericId);
      return { ormasRecords, dokumenRecords };
    },
    enabled: !!numericId,
  });

  const refreshData = useMutation({
    mutationFn: async () => {
      const ormasRecords = await getOrmasDetail(numericId);
      const dokumenRecords = await getDokumenOrmasData(numericId);
      return { ormasRecords, dokumenRecords };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["ormasRecords", numericId], data);
    },
  });

  const [judulDokumen, setJudulDokumen] = useState<string>("");
  const [linkDokumen, setLinkDokumen] = useState<string>("");
  const handleAddDokumen = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("judulDokumen", judulDokumen ?? "");
    formData.append("linkDokumen", linkDokumen ?? "");

    try {
      await addDokumenOrmasData(formData, numericId);
      setLinkDokumen("");
      setJudulDokumen("");
      refreshData.mutate();
      console.log("submit success");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  // const ormas = await getOrmasDetail(id);
  if (isLoading || !data?.ormasRecords?.[0]) {
    return <div>Loading...</div>;
  }
  if (error || !data) return <div>Error loading data.</div>;

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
                        <span className="font-semibold">SK Badan Hukum</span>
                        <span>{data.ormasRecords[0].skBadanHukum}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          SK Badan Keperguruan
                        </span>
                        <span>{data.ormasRecords[0].skBadanKeperguruan}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">AD/ART</span>
                        <span>{data.ormasRecords[0].adArt}</span>
                      </div>
                    </div>
                    <h1>Dokumen Ormas</h1>
                    {/* Dialog Tambah Dokumen */}
                    <div className="my-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Tambah Dokumen</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                          <form onSubmit={handleAddDokumen}>
                            <div className="mb-4">
                              <DialogHeader>
                                <DialogTitle>Tambah Dokumen</DialogTitle>
                                <DialogDescription></DialogDescription>
                              </DialogHeader>
                            </div>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Judul Dokumen</Label>
                                <Input
                                  id="name-1"
                                  name="judulDokumen"
                                  value={judulDokumen}
                                  onChange={(e) =>
                                    setJudulDokumen(e.target.value)
                                  }
                                  required
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Link Dokumen</Label>
                                <Input
                                  id="name-1"
                                  name="linkDokumen"
                                  value={linkDokumen}
                                  onChange={(e) =>
                                    setLinkDokumen(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>
                            <DialogFooter className="mt-3">
                              <DialogClose asChild>
                                <Button variant="outline" type="button">
                                  Cancel
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button variant="outline" type="submit">
                                  Tambah
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/* Table */}
                    <div className="my-4">
                      <DataTable
                        data={data.dokumenRecords}
                        loading={isLoading || refreshData.isPending}
                        onUpdateData={refreshData.mutate}
                        onDeleteData={refreshData.mutate}
                      />
                    </div>
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
