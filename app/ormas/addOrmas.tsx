import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";

export const addOrmas = () => {
  const data = {
    breadcrumb: [
      {
        title: "Dashboard",
        url: "/",
      },
      {
        title: "Tambah Ormas",
        url: "/add-ormas",
      },
    ],
  };

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
      <SiteHeader breadcrumb={data.breadcrumb} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <Card className="@container/card">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    Tambah Organisasi Masyarakat
                  </CardTitle>
                </CardHeader>

                <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>;
};
