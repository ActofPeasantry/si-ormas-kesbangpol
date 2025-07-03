import { useState } from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { Button } from "@/components/ui/button";
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
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { deleteOrmasData } from "@/lib/queries/ormas";

type OrmasRecord = {
  id: number;
  namaOrmas: string;
  singkatanOrmas: string;
  alamatOrmas: string | null;
  noTelpOrmas: string | null;
  statusOrmas: string;
};

export default function DataTable({
  data,
  loading,
  onDeleteData,
}: {
  data: OrmasRecord[];
  loading: boolean;
  onDeleteData: () => void;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteOrmasData(id);

    onDeleteData();
    setDeleteDialog(false);
  };

  const columnHelper = createColumnHelper<OrmasRecord>();
  const columns = [
    columnHelper.accessor("namaOrmas", {
      header: "Nama Ormas",
    }),
    columnHelper.accessor("singkatanOrmas", {
      header: "Nama Singkatan Ormas",
    }),
    columnHelper.accessor("noTelpOrmas", {
      header: "Nomor Telepon Ormas",
    }),
    columnHelper.accessor("alamatOrmas", {
      header: "Alamat Ormas",
    }),
    columnHelper.accessor("statusOrmas", {
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className=" px-1.5">
          {row.original.statusOrmas === "Aktif" ? (
            <FaCheckCircle className="fill-green-500 dark:fill-green-400" />
          ) : (
            <MdOutlineError className="fill-yellow-500 dark:fill-yellow-400" />
          )}
          {row.original.statusOrmas}
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
              <Link href={`/ormas/detail/${info.row.original.id}`}>
                <DropdownMenuItem>Detail</DropdownMenuItem>
              </Link>
              <Link href={`/ormas/edit/${info.row.original.id}`}>
                <DropdownMenuItem>Ubah</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <a onClick={() => setDeleteDialog(true)}>
                <DropdownMenuItem className="text-red-600 focus:bg-red-600 focus:text-white">
                  Hapus
                </DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* DELETE DIALOG */}
          <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                  onClick={() => {
                    handleDelete(info.row.original.id);
                  }}
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      {loading ? (
        <TableCaption>Mohon Tunggu...</TableCaption>
      ) : data.length === 0 ? (
        <TableCaption>Tidak ada data</TableCaption>
      ) : (
        <TableCaption>Daftar data ormas</TableCaption>
      )}
      <TableHeader>
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
  );
}
