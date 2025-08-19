"use client";
import { z } from "zod";
import { useActionState, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "./DataTable";
import { SubmittedDataTable } from "./SubmittedDataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconCheckbox } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  acceptDokumenOrmas,
  getAcceptedDokumenOrmasData,
  getRejectedDokumenOrmasData,
  getSubmittedDokumenOrmasData,
  refuseDokumenOrmas,
} from "@/lib/queries/dokumenOrmas";
import { addDokumenOrmasData } from "@/lib/queries/dokumenOrmas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { STATUS_DOKUMEN } from "@/lib/enums/StatusDokumen";
import { useFormStatus } from "react-dom";

export const OrmasSchema = z.object({
  id: z.number(),
  judulDokumen: z.string(),
  linkDokumen: z.string(),
  statusDokumen: z.enum([
    STATUS_DOKUMEN.PENGAJUAN,
    STATUS_DOKUMEN.DITOLAK,
    STATUS_DOKUMEN.DITERIMA,
    STATUS_DOKUMEN.TIDAK_AKTIF,
  ]),
});
type OrmasData = z.infer<typeof OrmasSchema>;

type DokumenData = {
  submittedRecords: OrmasData[];
  acceptedRecords: OrmasData[];
  rejectedRecords: OrmasData[];
  allRecords: OrmasData[];
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const acceptedMimeTypes = ["application/pdf"];

export const FileSchema = z.object({
  file: z
    .instanceof(File, { message: "Pilih file terlebih dahulu" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Besar file melebihi 1 MB.")
    .refine(
      (file) => acceptedMimeTypes.includes(file.type),
      "File harus dalam format PDF"
    ),
});
type FileState = { error?: string | string[] } | undefined;

export const TableCard = ({ numericId }: { numericId: number }) => {
  // Table Checkbox state
  const [storedId, setStoredId] = useState<number[]>([]);
  const [disableButton, setDisableButton] = useState(true);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  // Tambah Dokumen Dialog state
  const [open, setOpen] = useState<boolean>(false);

  // Upload file state
  const [state, uploadAction] = useActionState(uploadDokumen, undefined);
  const [judulDokumen, setJudulDokumen] = useState<string>("");

  async function uploadDokumen(
    prevState: FileState,
    formData: FormData
  ): Promise<FileState> {
    const result = FileSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        error: result.error.flatten().fieldErrors.file,
      };
    }
    const { file } = result.data;

    const linkDokumen = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("dokumen-ormas")
      .upload(linkDokumen, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } else {
      formData.append("judulDokumen", judulDokumen ?? "");
      formData.append("linkDokumen", linkDokumen ?? "");

      try {
        await addDokumenOrmasData(formData, numericId);
        setJudulDokumen("");
        refreshData.mutate();
        alert("Upload successful!");
        setOpen(false);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  }

  const handleAcceptedDocuments = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Promise.all(
        storedId.map((numericId) => acceptDokumenOrmas(numericId))
      );
      refreshData.mutate();
      setStoredId([]); //make storedId empty to disable button
      setRowSelection({}); //so all checked row on table immediately unchecked
      console.log("Documents accepted and selections cleared");
    } catch (error) {
      console.error("Error accepting documents:", error);
    }
  };
  const handleRefusedDocuments = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await Promise.all(
        storedId.map((numericId) => refuseDokumenOrmas(numericId))
      );
      refreshData.mutate();
      setStoredId([]); //make storedId empty to disable button
      setRowSelection({}); //so all checked row on table immediately unchecked
      console.log("Documents refused and selections cleared");
    } catch (error) {
      console.error("Error refusing documents:", error);
    }
  };

  useEffect(() => {
    if (storedId.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [storedId]);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<DokumenData>({
    queryKey: ["dokumenRecords"],
    queryFn: async () => {
      const submittedRecords = await getSubmittedDokumenOrmasData(numericId);
      const acceptedRecords = await getAcceptedDokumenOrmasData(numericId);
      const rejectedRecords = await getRejectedDokumenOrmasData(numericId);
      const allRecords = [
        ...submittedRecords,
        ...acceptedRecords,
        ...rejectedRecords,
      ];
      return { submittedRecords, acceptedRecords, rejectedRecords, allRecords };
    },
  });

  const refreshData = useMutation({
    mutationFn: async () => {
      const submittedRecords = await getSubmittedDokumenOrmasData(numericId);
      const acceptedRecords = await getAcceptedDokumenOrmasData(numericId);
      const rejectedRecords = await getRejectedDokumenOrmasData(numericId);
      const allRecords = [
        ...submittedRecords,
        ...acceptedRecords,
        ...rejectedRecords,
      ];
      return { submittedRecords, acceptedRecords, rejectedRecords, allRecords };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["dokumenRecords"], data);
    },
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          Kelola Dokumen Organisasi Masyarakat
        </CardTitle>
        {/* Dialog Tambah Dokumen */}
        <div className="my-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Tambah Dokumen</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <form action={uploadAction}>
                <div className="mb-4">
                  <DialogHeader>
                    <DialogTitle>Tambah Dokumen</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Judul Dokumen</Label>
                    <Input
                      name="judulDokumen"
                      value={judulDokumen}
                      onChange={(e) => setJudulDokumen(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Link Dokumen</Label>
                    <Input name="file" type="file" required />
                    {state?.error && (
                      <p className="text-red-500">{state.error}</p>
                    )}
                  </div>
                </div>
                <DialogFooter className="mt-3">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <SubmitButton label="Tambah" />
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pengajuan">
          <TabsList>
            <TabsTrigger value="pengajuan">
              Pengajuan{" "}
              <Badge variant="secondary">{data?.submittedRecords.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="diterima">
              Diterima{" "}
              <Badge variant="secondary">{data?.acceptedRecords.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="ditolak">
              Ditolak{" "}
              <Badge variant="secondary">{data?.rejectedRecords.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="seluruhDokumen">
              Seluruh Dokumen{" "}
              <Badge variant="secondary">{data?.allRecords.length}</Badge>
            </TabsTrigger>
          </TabsList>
          {/* pengajuan table */}
          <TabsContent value="pengajuan">
            <div className="flex w-full items-center my-2 gap-1  ">
              {/* accept/refuse button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600"
                    disabled={disableButton}
                    size="sm"
                  >
                    <IconCheckbox /> Terima Dokumen
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={(e) => handleAcceptedDocuments(e)}>
                    <div className="mb-4">
                      <DialogHeader>
                        <DialogTitle>Terima Dokumen</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    </div>
                    <div className="grid gap-4">
                      <DialogDescription>
                        Apakah anda yakin ingin menerima dokumen?
                      </DialogDescription>
                    </div>
                    <DialogFooter className="mt-3">
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Batal
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline" type="submit">
                          Terima
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
                    disabled={disableButton}
                    size="sm"
                  >
                    <IconX />
                    Tolak Dokumen
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={(e) => handleRefusedDocuments(e)}>
                    <div className="mb-4">
                      <DialogHeader>
                        <DialogTitle>Terima Dokumen</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    </div>
                    <div className="grid gap-4">
                      <DialogDescription>
                        Apakah anda yakin ingin menolak dokumen?
                      </DialogDescription>
                    </div>
                    <DialogFooter className="mt-3">
                      <DialogClose asChild>
                        <Button variant="outline" type="button">
                          Batal
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="outline" type="submit">
                          Tolak
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <SubmittedDataTable
              data={data?.submittedRecords || []}
              loading={isLoading || refreshData.isPending}
              isSubmittedTable={true}
              setStoredId={setStoredId}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </TabsContent>
          {/* diterima table */}
          <TabsContent value="diterima">
            <DataTable
              data={data?.acceptedRecords || []}
              loading={isLoading || refreshData.isPending}
              onDeleteData={refreshData.mutate}
              onUpdateData={refreshData.mutate}
            />
          </TabsContent>
          <TabsContent value="ditolak">
            <DataTable
              data={data?.rejectedRecords || []}
              loading={isLoading || refreshData.isPending}
              onDeleteData={refreshData.mutate}
              onUpdateData={refreshData.mutate}
            />
          </TabsContent>
          <TabsContent value="seluruhDokumen">
            <DataTable
              data={data?.allRecords || []}
              loading={isLoading || refreshData.isPending}
              onDeleteData={refreshData.mutate}
              onUpdateData={refreshData.mutate}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
    </Card>
  );
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {label}
    </Button>
  );
}
