"use client";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

export const OrmasSchema = z.object({
  id: z.number(),
  namaOrmas: z.string().nullable(),
  singkatanOrmas: z.string().nullable(),
  namaKetuaOrmas: z.string().nullable(),
  namaSekretarisOrmas: z.string().nullable(),
  alamatOrmas: z.string().nullable(),
  noTelpOrmas: z.string().nullable(),
  skBadanHukum: z.string().nullable(),
  skKeperguruan: z.string().nullable(),
  adArt: z.string().nullable(),
});
export const OrmasDataSchema = z.object({
  records: z.array(OrmasSchema),
});
type OrmasData = z.infer<typeof OrmasDataSchema>;

export const FormCard = ({ numericId }: { numericId: number }) => {
  const router = useRouter();

  const { data, isLoading, error } = useQuery<OrmasData>({
    queryKey: ["ormasRecords", numericId],
    queryFn: async () => {
      const records = await editOrmasData(numericId);
      return { records };
    },
    enabled: !!numericId,
  });

  const [formState, setFormState] = useState<OrmasData["records"][0] | null>(
    null
  );
  useEffect(() => {
    if (data?.records?.[0]) {
      setFormState(data.records[0]);
    }
  }, [data]);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState) return;

    const formData = new FormData();

    const fields = {
      namaOrmas: formState.namaOrmas ?? "",
      singkatanOrmas: formState.singkatanOrmas ?? "",
      namaKetuaOrmas: formState.namaKetuaOrmas ?? "",
      namaSekretarisOrmas: formState.namaSekretarisOrmas ?? "",
      alamatOrmas: formState.alamatOrmas ?? "",
      noTelpOrmas: formState.noTelpOrmas ?? "",
      skBadanHukum: formState.skBadanHukum ?? "",
      skKeperguruan: formState.skKeperguruan ?? "",
      adArt: formState.adArt ?? "",
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await updateOrmasData(numericId, formData);

      // Optional: reset state after successful update
      setFormState(null);
      console.log("Update success");
      router.push("/ormas");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !formState) return <div>Error loading data.</div>;

  return (
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
                          value={formState.namaOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              namaOrmas: e.target.value,
                            })
                          }
                          className="border p-2 w-full"
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
                          value={formState.singkatanOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              singkatanOrmas: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-3 lg:mb-0">
                      <div>
                        <Label className="mb-2" htmlFor="namaKetuaOrmas">
                          Nama Ketua Ormas
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="namaKetuaOrmas"
                          type="text"
                          placeholder="Nama Ketua Ormas"
                          value={formState.namaKetuaOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              namaKetuaOrmas: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="namaSekretarisOrmas">
                          Nama Sekretaris Ormas
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="namaSekretarisOrmas"
                          type="text"
                          placeholder="Nama Sekretaris Ormas"
                          value={formState.namaSekretarisOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              namaSekretarisOrmas: e.target.value,
                            })
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
                          value={formState.alamatOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              alamatOrmas: e.target.value,
                            })
                          }
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
                          value={formState.noTelpOrmas || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              noTelpOrmas: e.target.value,
                            })
                          }
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
                          value={formState.skBadanHukum || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              skBadanHukum: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2" htmlFor="skKeperguruan">
                          SK Badan Keperguruan
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="skKeperguruan"
                          type="text"
                          placeholder="SK Badan Keperguruan"
                          value={formState.skKeperguruan || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              skKeperguruan: e.target.value,
                            })
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
                          value={formState.adArt || ""}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              adArt: e.target.value,
                            })
                          }
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
  );
};
