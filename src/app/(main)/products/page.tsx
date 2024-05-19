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
      name: "Ultimate mindfulness bundle",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle 01",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle 02",
      updatedAt: "Today",
    },
    {
      name: "Viral marketing bundle 03",
      updatedAt: "Today",
    },
  ];

  const [products, setProducts] = useState<ProductData[]>(initialProducts);

  useEffect(() => {
    const loadProductsFromLocalStorage = () => {
      const productList = localStorage.getItem("productList");
      if (productList) {
        const parsedProductList = JSON.parse(productList);
        const newProductsList = parsedProductList.map(
          (product: { name: string; updatedAt: string }) => ({
            name: product.name,
            updatedAt: "Today",
          })
        );
        setProducts(newProductsList);
      } else {
        localStorage.setItem("productList", JSON.stringify(initialProducts));
        setProducts(initialProducts);
      }
    };
    loadProductsFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(products));
  }, [products]);

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
