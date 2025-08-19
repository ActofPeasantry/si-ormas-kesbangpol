import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
// import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

// import dbContent from "./data.json";

export default function Page() {
  const data = {
    breadcrumb: [
      {
        title: "Dashboard",
        url: "/",
      },
    ],
  };

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
        <SiteHeader breadcrumb={data.breadcrumb} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col content-center gap-4 px-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={dbContent} /> */}
              <Card>
                <Image
                  className="m-auto "
                  src="/tuah_sakato.png"
                  width={200}
                  height={200}
                  alt="logo provinsi"
                />
                <h1 className="scroll-m-20 text-center text-3xl font-bold tracking-tight text-balance">
                  Pemerintah Provinsi Sumatera Barat
                </h1>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
