"use client";
import React, { useEffect, useState } from "react";
import ProductsTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import BlurPage from "@/components/global/blur-page";

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
      updatedAt: "Today",
    },
  ];

  const [products, setProducts] = useState<ProductData[]>(initialProducts);

  useEffect(() => {
    const loadProductsFromLocalStorage = () => {
      const productList = localStorage.getItem("productList");
      if (productList) {
        const parsedProductList = JSON.parse(productList);
        const NewProductsList = parsedProductList.map(
          (product: { name: string }) => ({
            name: product.name,
            updatedAt: "today",
          })
        );
        setProducts((prevProducts) => [...prevProducts, ...NewProductsList]);
      }
    };
    loadProductsFromLocalStorage();
  }, []);

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
