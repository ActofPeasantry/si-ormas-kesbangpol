import React from "react";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
}: {
  data: OrmasRecord[];
  loading: boolean;
}) {
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
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
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
            <Link href={`/ormas/detail/${info.row.original.singkatanOrmas}`}>
              <DropdownMenuItem>Detail</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Ubah</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:bg-red-600 focus:text-white">
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
