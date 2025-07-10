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
import { IconCheckbox } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  // getAllDokumenOrmasDataWithNamaOrmas,
  getSubmittedDokumenOrmasDataWithNamaOrmas,
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

  useEffect(() => {
    if (storedId.length > 0) {
      console.log("storedId:", storedId);
      setDisableButton(false);
    } else {
      console.log("storedId:", storedId);
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
                          <Button
                            className="bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600"
                            disabled={disableButton}
                            size="sm"
                          >
                            <IconCheckbox /> Diterima
                          </Button>
                          <Button
                            className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
                            disabled={disableButton}
                            size="sm"
                          >
                            <IconX />
                            Ditolak
                          </Button>
                        </div>
                        <DataTable
                          data={submittedDokumen?.dokumenRecords || []}
                          loading={isLoading || refreshData.isPending}
                          isSubmittedTable={true}
                          setStoredId={setStoredId}
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
