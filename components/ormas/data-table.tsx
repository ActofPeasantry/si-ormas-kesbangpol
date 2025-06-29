import React from "react";

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
  namaOrmas: string;
  singkatanOrmas: string;
  alamatOrmas: string | null;
  noTelpOrmas: string | null;
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
