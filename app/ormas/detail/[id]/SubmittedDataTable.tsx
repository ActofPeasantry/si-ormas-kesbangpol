import { useState } from "react";
import { z } from "zod";
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { TableState } from "@tanstack/react-table"; //only importing the type definition TableState from TanStack Table — not any runtime JavaScript.
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
} from "@tabler/icons-react";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const DokumenSchema = z.object({
  id: z.number(),
  judulDokumen: z.string(),
  linkDokumen: z.string(),
  statusDokumen: z.string(),
});
type DokumenRecord = z.infer<typeof DokumenSchema>;
interface DataTableProps {
  data: DokumenRecord[];
  loading: boolean;
  isSubmittedTable: boolean;
  setStoredId?: React.Dispatch<React.SetStateAction<number[]>>;
  rowSelection?: TableState["rowSelection"];
  setRowSelection?: React.Dispatch<
    React.SetStateAction<TableState["rowSelection"]>
  >;
}

export const SubmittedDataTable = ({
  data,
  loading,
  isSubmittedTable,
  setStoredId,
  rowSelection,
  setRowSelection,
}: DataTableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
  const baseColumns = [
    columnHelper.accessor("judulDokumen", {
      header: "Judul Dokumen",
    }),
    columnHelper.accessor("linkDokumen", {
      header: "Link Dokumen",
      cell: ({ row }) => (
        <Button asChild variant="ghost" size="sm">
          <a
            href={row.original.linkDokumen}
            target="_blank"
            rel="external noopener noreferrer"
          >
            <IoDocumentTextSharp />
            <span>Lihat Dokumen</span>
          </a>
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
  ];

  const selectColumns = [
    columnHelper.accessor("id", {
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              const selectedIds = table
                .getRowModel()
                .rows.map((row) => row.original.id);
              if (setStoredId) {
                setStoredId(value ? selectedIds : []);
              }
            }}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);

              if (setStoredId) {
                const rowId = row.original.id;

                setStoredId((prev) => {
                  // Add if checked
                  if (value === true) {
                    return [...new Set([...prev, rowId])];
                  }
                  // Remove if unchecked
                  if (value === false) {
                    return prev.filter((id) => id !== rowId);
                  }

                  return prev;
                });
              }
            }}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ];

  const columns = isSubmittedTable
    ? [...selectColumns, ...baseColumns]
    : baseColumns;

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
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
    </>
  );
};
