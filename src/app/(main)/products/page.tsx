"use client";
import React, { useState } from "react";
import ProductsTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import BlurPage from "@/components/global/blur-page";
// import CreateProduct from "@/components/forms/products/create-product";

export type ProductData = {
  name: string;
  updatedAt: string;
};

const Products = () => {
  const initialProducts: ProductData[] = [
    {
      name: "Ultimate mindfullness bundle",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle",
      updatedAt: "Todaxxy",
    },
  ];

  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  return (
    <BlurPage>
      <ProductsTable
        filterValue="name"
        columns={columns}
        data={products}
        setProducts={setProducts}
      />
    </BlurPage>
  );
};

export default Products;
