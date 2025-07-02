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
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
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
                    <CardDescription>{ormas[0].singkatanOrmas}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-3 lg:mb-0">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">Status</span>
                        <span>
                          <Badge variant="outline" className=" px-1.5">
                            {ormas[0].statusOrmas === "Aktif" ? (
                              <FaCheckCircle className="fill-green-500 dark:fill-green-400" />
                            ) : (
                              <MdOutlineError className="fill-yellow-500 dark:fill-yellow-400" />
                            )}
                            {ormas[0].statusOrmas}
                          </Badge>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">Alamat Ormas</span>
                        <span>{ormas[0].alamatOrmas}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">No. telepon Ormas</span>
                        <span>{ormas[0].noTelpOrmas}</span>
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-3 lg:mb-0">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">SK Badan Hukum</span>
                        <span>{ormas[0].skBadanHukum}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          SK Badan Keperguruan
                        </span>
                        <span>{ormas[0].skBadanKeperguruan}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">AD/ART</span>
                        <span>{ormas[0].adArt}</span>
                      </div>
                    </div>
                    <h1>Dokumen Ormas</h1>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-3 lg:mb-0">
                      <p>here be table</p>
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
