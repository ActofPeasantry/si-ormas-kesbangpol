import React from "react";
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

export default function addOrmas() {
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
      title: "Tambah Ormas",
      url: "/ormas/add",
    },
  ];

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
                      Registrasi Organisasi Masyarakat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h1>INFORMASI AKUN USER ORGANISASI</h1>
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                        <div>
                          <Label className="mb-2" htmlFor="username">
                            Username<span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                          />
                        </div>
                        <div>
                          <Label className="mb-2" htmlFor="email">
                            Email<span className="text-red-500">*</span>
                          </Label>
                          <Input id="email" type="email" placeholder="Email" />
                        </div>
                      </div>
                    </div>
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
                          />
                        </div>
                        <div>
                          <Label className="mb-2" htmlFor="skBadanKeperguruan">
                            SK Badan Keperguruan
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="skBadanKeperguruan"
                            type="text"
                            placeholder="SK Badan Keperguruan"
                          />
                        </div>
                        <div>
                          <Label className="mb-2" htmlFor="adArtadArt">
                            AD/ART
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input id="adArt" type="text" placeholder="AD/ART" />
                        </div>
                      </div>
                      <div className="p-6 gap-3 mb-3 ">
                        <Button variant="outline">Submit</Button>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <p>
                      <span className="text-red-500">*</span> : Wajib Diisi
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
