import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import { getOrmasDetail } from "@/lib/queries/ormas";

type Props = {
  params: { id: number };
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

export default async function Page({ params }: Props) {
  const { id } = params;

  // fetch or query the Ormas data from DB here
  const ormas = await getOrmasDetail(id);

  if (!ormas) {
    notFound();
  }

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
                      {ormas[0].namaOrmas}
                    </CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
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
