"use client";
import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { editOrmasData, updateOrmasData } from "@/lib/queries/ormas";

type OrmasRecord = {
  id: number;
  namaOrmas: string;
  singkatanOrmas: string;
  alamatOrmas: string | null;
  noTelpOrmas: string | null;
  skBadanHukum: string | null;
  skBadanKeperguruan: string | null;
  adArt: string | null;
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
  {
    title: "Ubah Data Ormas",
    url: "/ormas/edit/[id]",
  },
];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const numericId = Number(id);

  const { data } = useQuery<OrmasData>({
    queryKey: ["ormasRecords", numericId],
    queryFn: async () => {
      const records = await editOrmasData(numericId);
      return { records };
    },
    enabled: !!numericId,
  });

  const router = useRouter();

  const [namaOrmas, setNamaOrmas] = useState<string>(
    data?.records[0].namaOrmas || ""
  );
  const [singkatanOrmas, setSingkatanOrmas] = useState<string>(
    data?.records[0].singkatanOrmas || ""
  );
  const [alamatOrmas, setAlamatOrmas] = useState<string>(
    data?.records[0].alamatOrmas || ""
  );
  const [noTelpOrmas, setNoTelpOrmas] = useState<string>(
    data?.records[0].noTelpOrmas || ""
  );
  const [skBadanHukum, setSkBadanHukum] = useState<string>(
    data?.records[0].skBadanHukum || ""
  );
  const [skBadanKeperguruan, setSkBadanKeperguruan] = useState<string>(
    data?.records[0].skBadanKeperguruan || ""
  );
  const [adArt, setAdArt] = useState<string>(data?.records[0].adArt || "");

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const fields = {
      //user data
      //ormas data
      namaOrmas: namaOrmas,
      singkatanOrmas: singkatanOrmas,
      alamatOrmas: alamatOrmas,
      noTelpOrmas: noTelpOrmas,
      skBadanHukum: skBadanHukum,
      skBadanKeperguruan: skBadanKeperguruan,
      adArt: adArt,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await updateOrmasData(numericId, formData);

    try {
      setNamaOrmas("");
      setSingkatanOrmas("");
      setAlamatOrmas("");
      setNoTelpOrmas("");
      setSkBadanHukum("");
      setSkBadanKeperguruan("");
      setAdArt("");
      console.log("update success");
      router.push("/ormas"); // 🔀 redirect
    } catch (error) {
      console.error("Error inserting data:", error);
    }
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
        {/* <CardDescription /> */}
        <SiteHeader breadcrumb={breadcrumb} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <form onSubmit={handleUpdate}>
                  <Card className="@container/card">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Ubah Data Organisasi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h1>INFORMASI ORGANISASI MASYARAKAT</h1>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                          <div>
                            <Label className="mb-2" htmlFor="namaOrmas">
                              Nama Ormas<span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="namaOrmas"
                              type="text"
                              placeholder="Nama Ormas"
                              value={namaOrmas}
                              onChange={(e) => setNamaOrmas(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2" htmlFor="singkatanOrmas">
                              Singkatan Ormas
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="singkatanOrmas"
                              type="text"
                              placeholder="Singkatan Ormas"
                              value={singkatanOrmas}
                              onChange={(e) =>
                                setSingkatanOrmas(e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                          <div>
                            <Label className="mb-2" htmlFor="alamatOrmas">
                              Alamat Ormas
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="alamatOrmas"
                              type="text"
                              placeholder="Alamat Ormas"
                              value={alamatOrmas}
                              onChange={(e) => setAlamatOrmas(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2" htmlFor="noTelpOrmas">
                              Nomor Telepon Ormas
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="noTelpOrmas"
                              type="text"
                              placeholder="Nomor Telepon Ormas"
                              value={noTelpOrmas}
                              onChange={(e) => setNoTelpOrmas(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                          <div>
                            <Label className="mb-2" htmlFor="skBadanHukum">
                              SK Badan Hukum
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="skBadanHukum"
                              type="text"
                              placeholder="SK Badan Hukum"
                              value={skBadanHukum}
                              onChange={(e) => setSkBadanHukum(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label
                              className="mb-2"
                              htmlFor="skBadanKeperguruan"
                            >
                              SK Badan Keperguruan
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="skBadanKeperguruan"
                              type="text"
                              placeholder="SK Badan Keperguruan"
                              value={skBadanKeperguruan}
                              onChange={(e) =>
                                setSkBadanKeperguruan(e.target.value)
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2" htmlFor="adArtadArt">
                              AD/ART
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="adArt"
                              type="text"
                              placeholder="AD/ART"
                              value={adArt}
                              onChange={(e) => setAdArt(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="p-6 gap-3 mb-3 ">
                          <Button variant="outline">Ubah</Button>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                      <p>
                        <span className="text-red-500">*</span> : Wajib Diisi
                      </p>
                    </CardFooter>
                  </Card>
                </form>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
