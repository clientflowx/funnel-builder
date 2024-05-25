"use client";
import React, { useEffect, useState } from "react";
import ProductsTable from "./data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import BlurPage from "@/components/global/blur-page";

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
  amount: string;
  compareAtPrice: string;
  priceAdditionOptions: PriceAdditionOption;
}
const Products = () => {

  const initialProducts: ProductData[] = [
    {
      name: "Ultimate mindfulness bundle",
      description: "A comprehensive bundle for achieving ultimate mindfulness.",
      media: null,
      chargeTax: true,
      prices: [
        {
          amount: "49.99",
          compareAtPrice: "59.99",
          priceAdditionOptions: {
            description: "Includes a special offer for new members.",
            membershipOffer: true,
          },
        },
        {
          amount: "39.99",
          compareAtPrice: "49.99",
          priceAdditionOptions: {
            description: "Special holiday discount.",
            membershipOffer: false,
          },
        },
      ],
    },
    {
      name: "Viral marketing bundle 01",
      description: "First installment of the viral marketing bundle series.",
      media: null,
      chargeTax: false,
      prices: [
        {
          amount: "99.99",
          compareAtPrice: "129.99",
          priceAdditionOptions: {
            description: "Early bird discount for first 100 buyers.",
            membershipOffer: false,
          },
        },
        {
          amount: "89.99",
          compareAtPrice: "119.99",
          priceAdditionOptions: {
            description: "Discount for loyalty program members.",
            membershipOffer: true,
          },
        },
      ],
    },
    {
      name: "Viral marketing bundle 02",
      description: "Second installment of the viral marketing bundle series.",
      media: null,
      chargeTax: true,
      prices: [
        {
          amount: "79.99",
          compareAtPrice: "89.99",
          priceAdditionOptions: {
            description: "Special membership offer included.",
            membershipOffer: true,
          },
        },
        {
          amount: "69.99",
          compareAtPrice: "79.99",
          priceAdditionOptions: {
            description: "Limited time offer for all buyers.",
            membershipOffer: false,
          },
        },
      ],
    },
    {
      name: "Viral marketing bundle 03",
      description: "Final installment of the viral marketing bundle series.",
      media: null,
      chargeTax: false,
      prices: [
        {
          amount: "59.99",
          compareAtPrice: "69.99",
          priceAdditionOptions: {
            description: "Limited time offer for all buyers.",
            membershipOffer: false,
          },
        },
        {
          amount: "49.99",
          compareAtPrice: "59.99",
          priceAdditionOptions: {
            description: "Exclusive discount for early adopters.",
            membershipOffer: true,
          },
        },
      ],
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
