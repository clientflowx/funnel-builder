import { Button } from "@/components/ui/button";
import { MoveLeft, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export type ProductsListingColumn = { accessorKey: string; header: string };
export type productData = {
  productName: string;
  internalProductid: number;
  amount: number;
  updatedAt: string;
};
export const columns: ProductsListingColumn[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "internalProductid",
    header: "Internal Product ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
  },
];

interface Props {
  currentPageProducts: productData[];
  onProductsChange: (product: productData[]) => void;
}
type ProductData = {
  name: string;
  description: string;
  media: File | null;
  chargeTax: boolean;
  prices: PriceField[];
};

interface PriceAdditionOption {
  description: string;
  membershipOffer: boolean;
}

interface PriceField {
  type: string;
  amount: string;
  compareAtPrice: string;
  priceAdditionOptions: PriceAdditionOption;
}

//Product Table Component
const ProductsTable: React.FC<Props> = ({
  currentPageProducts,
  onProductsChange,
}) => {
  const form = useForm();
  const [tableProducts, setTableProducts] = useState<productData[]>([]);
  const table = useReactTable({
    data: tableProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const [addProductModal, setAddProductModal] = useState(false);
  const [productsSaved, setProductsSaved] = useState<ProductData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedProductPrices, setSelectedProductPrices] =
    useState<string[]>();
  useEffect(() => {
    const productList = localStorage.getItem("productList");
    if (productList) {
      setProductsSaved(JSON.parse(productList));
    }
  }, []);

  useEffect(() => {
    setTableProducts(currentPageProducts);
  }, [currentPageProducts]);

  const handleAddProduct = (data: any) => {
    if (selectedProduct) {
      const newProduct: productData = {
        productName: selectedProduct,
        internalProductid: Math.floor(Math.random() * 1000),
        amount: parseFloat(data.amount) || 0,
        updatedAt: "Today",
      };
      const updatedProducts = [...tableProducts, newProduct];
      setTableProducts(updatedProducts);
      onProductsChange(updatedProducts);
      setAddProductModal(false);
    }
  };

  const changeSelectedProductPrices = (value: string) => {
    const product = productsSaved.find((product) => product.name === value);
    const pricesArray = product?.prices.map((price) => price.amount);
    setSelectedProductPrices(pricesArray);
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div
          className={`${
            addProductModal ? "hidden" : ""
          } flex w-full items-center justify-end`}
        >
          <Button onClick={() => setAddProductModal(true)}>
            <Plus size={15} />
            Add Product
          </Button>
        </div>

        <div>
          {/* add product modal */}
          {addProductModal ? (
            <div className=" flex flex-col gap-3 py-4">
              <Form {...form}>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={form.handleSubmit(handleAddProduct)}
                >
                  <Button
                    onClick={() => setAddProductModal(false)}
                    className="text-xs cursor-pointer flex items-center justify-start gap-1 w-1/5"
                  >
                    <MoveLeft size={30} />
                    Back to products
                  </Button>
                  <div>
                    <Label>Products*</Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedProduct(value);
                        changeSelectedProductPrices(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Products</SelectLabel>
                          {productsSaved.map((product, index) => (
                            <SelectItem key={index} value={product.name}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                      <div className="text-xs p-2">
                        Create a new product by clicking
                        <Link href="/products/create" className="text-blue-500">
                          {" "}
                          here
                        </Link>
                      </div>
                    </Select>
                  </div>
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col justify-between">
                        <FormLabel>Amount*</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="input p-2 border bg-black rounded-md outline-none"
                          >
                            <option value="" className="bg-black text-white">
                              Select Price
                            </option>
                            {selectedProductPrices?.map((price, index) => (
                              <option
                                key={index}
                                value={price}
                                className="bg-black text-white"
                              >
                                {price}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 w-1/3">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setAddProductModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="w-full" type="submit">
                      Add
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            // product table
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
                        No Products added.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
