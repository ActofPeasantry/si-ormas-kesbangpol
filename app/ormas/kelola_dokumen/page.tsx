"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "@/app/ormas/kelola_dokumen/data-table";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getAllDokumenOrmasWithNamaOrmas } from "@/lib/queries/dokumenOrmas";

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
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<DokumenData>({
    queryKey: ["dokumenRecords"],
    queryFn: async () => {
      const dokumenRecords = await getAllDokumenOrmasWithNamaOrmas();
      return { dokumenRecords };
    },
  });

  const refreshData = useMutation({
    mutationFn: async () => {
      const dokumenRecords = await getAllDokumenOrmasWithNamaOrmas();
      return { dokumenRecords };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["dokumenRecords"], data);
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
                    {/* Table */}
                    <DataTable
                      data={data?.dokumenRecords || []}
                      loading={isLoading || refreshData.isPending}
                    />
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
