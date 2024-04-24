"use client";
import CustomModal from "@/components/global/custom-modal";
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
import { useModal } from "@/providers/modal-provider";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import React from "react";
import { FunnelListingColumn } from "./columns";
import { FunnelData } from "./page";

interface Props {
  actionButtonText: React.ReactNode;
  modalChildren: React.ReactNode;
  columns: FunnelListingColumn[];
  data: FunnelData[];
  filterValue: string;
}

const FunnelsTable: React.FC<Props> = ({
  actionButtonText,
  modalChildren,
  columns,
  data,
  filterValue,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const { setOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between ">
        <div className="flex flex-col mb-4">
          <p className="text-[36px]">Funnels</p>
          <p className="text-sm">
            Build funnels to generate leads, appointments and receive payments
          </p>
        </div>
        <Button
          onClick={() => {
            if (modalChildren) {
              setOpen(
                <CustomModal
                  title="Create A Funnel"
                  subheading="Start creating a funnel"
                >
                  {modalChildren}
                </CustomModal>
              );
            }
          }}
          className="flex- gap-2"
        >
          {actionButtonText}
        </Button>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2"></div>
        <div className="flex items-center justify-end py-4 gap-2">
          <Search />
          <Input
            placeholder="Search for funnels"
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

export default FunnelsTable;
