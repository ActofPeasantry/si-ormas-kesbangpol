import { z } from "zod";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { activateOrmas, deleteOrmasData } from "@/lib/queries/ormas";

export const OrmasSchema = z.object({
  id: z.number(),
  namaOrmas: z.string(),
  singkatanOrmas: z.string(),
  alamatOrmas: z.string().nullable(),
  noTelpOrmas: z.string().nullable(),
  statusOrmas: z.string(),
});
type OrmasData = z.infer<typeof OrmasSchema>;

interface DataTableProps {
  data: OrmasData[];
  loading: boolean;
  onDeleteData: () => void;
  onUpdateData: () => void;
}

export const DataTable = ({
  data,
  loading,
  onDeleteData,
  onUpdateData,
}: DataTableProps) => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: string }[]
  >([{ id: "namaOrmas", value: "" }]);

  const handleActivation = async (id: number) => {
    try {
      await activateOrmas(id);
      onUpdateData();
      console.log("Activated ormas");
    } catch (error) {
      console.error("Error activating ormas:", error);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteOrmasData(id);

    onDeleteData();
    setDeleteDialog(false);
  };

  const columnHelper = createColumnHelper<OrmasData>();
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
              {info.row.original.statusOrmas === "Non Aktif" && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleActivation(info.row.original.id)}
                  >
                    Aktifkan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <Link href={`/ormas/detail/${info.row.original.id}`}>
                <DropdownMenuItem>Detail</DropdownMenuItem>
              </Link>
              <Link href={`/ormas/edit/${info.row.original.id}`}>
                <DropdownMenuItem>Ubah</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {/* DELETE BUTTON */}
              <a
                onClick={() => {
                  setDeleteDialog(true);
                  setDeleteId(info.row.original.id);
                }}
              >
                <DropdownMenuItem className="text-red-600 focus:bg-red-600 focus:text-white">
                  Hapus
                </DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="px-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:mb-0">
        <div>
          <Input
            className="h-7"
            type="text"
            placeholder="Cari Nama Ormas"
            value={columnFilters[0].value}
            onChange={(e) =>
              setColumnFilters([{ id: "namaOrmas", value: e.target.value }])
            }
          />
        </div>
      </div>

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
                handleDelete(deleteId);
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
