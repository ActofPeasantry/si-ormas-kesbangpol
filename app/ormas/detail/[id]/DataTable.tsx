import { z } from "zod";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
} from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  deleteDokumenOrmasData,
  editDokumenOrmasData,
  updateDokumenOrmasData,
} from "@/lib/queries/dokumenOrmas";
import { supabase } from "@/lib/supabase/client";

export const DokumenSchema = z.object({
  id: z.number(),
  judulDokumen: z.string(),
  linkDokumen: z.string(),
  statusDokumen: z.string(),
});
type DokumenRecord = z.infer<typeof DokumenSchema>;

export const DataTable = ({
  data,
  loading,
  onDeleteData,
  onUpdateData,
}: {
  data: DokumenRecord[];
  loading: boolean;
  onDeleteData: () => void;
  onUpdateData: () => void;
}) => {
  // Upload file state
  const [editDialog, setEditDialog] = useState(false);
  const [judulDokumen, setJudulDokumen] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [rowId, setRowId] = useState<number>(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleDownload = async (url: string) => {
    const { data } = supabase.storage.from("dokumen-ormas").getPublicUrl(url);
    window.open(data.publicUrl, "_blank");
  };

  const handleEdit = async (id: number) => {
    const result = await editDokumenOrmasData(id);
    if (result) {
      setJudulDokumen(result.judulDokumen);
      // setEditLinkDokumen(result.linkDokumen);
      // console.log(result.linkDokumen);
      setEditDialog(true);
    }
  };

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();
    if (!file) return alert("tidak ada file yang diupload");
    setUploading(true);

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
      const formData = new FormData();
      formData.append("judulDokumen", judulDokumen ?? "");
      formData.append("linkDokumen", linkDokumen ?? "");

      try {
        await updateDokumenOrmasData(formData, id);
        setJudulDokumen("");
        onUpdateData();
        alert("Upload successful!");
        setEditDialog(false);
      } catch (error) {
        console.error("Error inserting data:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  // const handleUpdate = async (event: React.FormEvent, id: number) => {
  //   event?.preventDefault();

  //   if (!file) return alert("tidak ada file yang diupload");
  //   setUploading(true);

  //   const linkDokumen = `${Date.now()}-${file.name}`;
  //   const { error } = await supabase.storage
  //     .from("dokumen-ormas")
  //     .upload(linkDokumen, file, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     });

  //   if (error) {
  //     console.error("Upload error:", error);
  //     alert("Upload failed");
  //   } else {
  //     const formData = new FormData();
  //     formData.append("judulDokumen", judulDokumen ?? "");
  //     formData.append("linkDokumen", linkDokumen ?? "");
  //     try {
  //       await updateDokumenOrmasData(formData, id);
  //       setJudulDokumen("");
  //       // setEditLinkDokumen("");
  //       onUpdateData();
  //       setEditDialog(false);
  //       console.log("update success");
  //     } catch (error) {
  //       console.error("Error inserting data:", error);
  //     } finally {
  //       setEditDialog(false);
  //     }
  //   }
  // };

  const handleDelete = async (id: number) => {
    try {
      await deleteDokumenOrmasData(id);
      onDeleteData();
      console.log("delete success");
    } catch (error) {
      console.log("Error deleting data:", error);
    }
    setDeleteDialog(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pengajuan":
        return (
          <MdOutlineError className="fill-yellow-500 dark:fill-yellow-400" />
        );
      case "diterima":
        return <FaCheckCircle className="fill-green-500 dark:fill-green-400" />;
      case "ditolak":
        return <MdOutlineError className="fill-red-500 dark:fill-red-400" />;
      case "tidak_aktif":
        return (
          <MdOutlineError className="fill-yellow-500 dark:fill-yellow-400" />
        );
      default:
        return null;
    }
  };

  const columnHelper = createColumnHelper<DokumenRecord>();
  const columns = [
    columnHelper.accessor("judulDokumen", {
      header: "Judul Dokumen",
    }),
    columnHelper.accessor("linkDokumen", {
      header: "Link Dokumen",
      cell: ({ row }) => (
        <Button
          onClick={() => handleDownload(row.original.linkDokumen)}
          variant="ghost"
          size="sm"
        >
          <IoDocumentTextSharp />
          <span>Lihat Dokumen</span>
        </Button>
      ),
    }),

    columnHelper.accessor("statusDokumen", {
      header: "Status Dokumen",
      cell: ({ row }) => (
        <Badge variant="outline" className=" px-1.5">
          {getStatusIcon(row.original.statusDokumen)}

          {row.original.statusDokumen}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-32">
              {/* EDIT BUTTON */}
              <DropdownMenuItem
                onClick={() => {
                  handleEdit(info.row.original.id);
                  setRowId(info.row.original.id);
                }}
              >
                Ubah
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* DELETE BUTTON */}
              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialog(true);
                  setRowId(info.row.original.id);
                }}
                className="text-red-600 focus:bg-red-600 focus:text-white"
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <>
      <Table>
        {loading ? (
          <TableCaption>Mohon Tunggu...</TableCaption>
        ) : data.length === 0 ? (
          <TableCaption>Tidak ada data</TableCaption>
        ) : (
          <TableCaption>Daftar data ormas</TableCaption>
        )}
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {!loading &&
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <form onSubmit={(e) => handleUpdate(e, rowId)}>
            <DialogHeader>
              <DialogTitle>Edit Dokumen</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 my-4">
              <Label>Judul Dokumen</Label>
              <Input
                value={judulDokumen}
                onChange={(e) => setJudulDokumen(e.target.value)}
                required
              />
              <Label>Link Dokumen</Label>
              <Input
                name="linkDokumen"
                type="file"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) setFile(selected);
                }}
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Batal</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="submit"
                  disabled={uploading || !file}
                >
                  Ubah
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE DIALOG */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
              onClick={() => {
                handleDelete(rowId);
              }}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
