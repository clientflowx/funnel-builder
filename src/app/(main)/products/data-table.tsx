"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download, EllipsisVertical, Plus, Search } from "lucide-react";
import { ProductsListingColumn } from "./columns";
import { ProductData } from "./page";
import Link from "next/link";
import { useCSVReader } from "react-papaparse";

interface Props {
  columns: ProductsListingColumn[];
  data: ProductData[];
  filterValue: string;
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
}

const ProductsTable: React.FC<Props> = ({
  columns,
  data,
  filterValue,
  setProducts,
}) => {
  const { CSVReader } = useCSVReader();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleCSVFileUpload = (results: any) => {
    // Convert the uploaded array of arrays data into an array of objects
    const parsedData = results.data.map((row: string[]) => ({
      name: row[0],
      updatedAt: row[1],
    }));
    setProducts(parsedData);
  };

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex flex-col mb-4">
          <p className="text-[36px]">Products</p>
          <p className="text-sm">
            Create and manage products for your business
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          {/* Import as CSV button */}
          <div>
            <CSVReader onUploadAccepted={handleCSVFileUpload}>
              {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
                <div className="flex">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      type="button"
                      {...getRootProps()}
                    >
                      <Download size={18} />
                      <span> Import as CSV</span>
                    </Button>
                    <div className="text-xs font-semibold">
                      {acceptedFile && acceptedFile.name}
                    </div>
                    {acceptedFile && (
                      <button
                        {...getRemoveFileProps()}
                        className={` font-semibold text-xs text-red-400`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
            </CSVReader>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={18} />
            <span> Import from Stripe</span>
          </Button>
          <Link href="/products/create">
            <Button className="flex items-center gap-1">
              <Plus size={15} />
              Create Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2"></div>
        <div className="flex items-center justify-end py-4 gap-2">
          <Search />
          <Input
            placeholder="Search for products"
            value={
              (table.getColumn(filterValue)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }
            className="h-12"
          />
        </div>
      </div>
      <div className="border bg-background rounded-lg">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical />
                      </PopoverTrigger>
                      <PopoverContent className="bg-black w-32 text-white border border-gray-800 flex">
                        <Link
                          className="w-full"
                          href={`products/${row.id}/edit`}
                        >
                          Edit
                        </Link>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductsTable;
