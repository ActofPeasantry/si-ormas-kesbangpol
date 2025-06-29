"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/ormas/data-table";
import { getOrmasData } from "@/lib/queries/ormas";

type OrmasRecord = {
  namaOrmas: string;
  singkatanOrmas: string;
  alamatOrmas: string | null;
  noTelpOrmas: string | null;
};

type OrmasData = {
  records: OrmasRecord[];
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
];
export default function Page() {
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
                      Daftar Organisasi Masyarakat
                    </CardTitle>
                  </CardHeader>
                  <DataTable
                    data={data?.records || []}
                    loading={isLoading || refreshData.isPending}
                  />
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
