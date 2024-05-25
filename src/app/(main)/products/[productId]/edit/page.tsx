"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import EditProductForm from "./form";

const EditProduct = ({ params }: { params: { productId: number } }) => {
  const currentIndex = params?.productId;

  return (
    <div className="flex flex-col gap-10">
      <div className="w-20 opacity-90 hover:opacity-100 transition-all">
        <Link href="/products" className="flex items-center gap-2">
          <MoveLeft size={18} />
          Back
        </Link>
      </div>

      {/* Edit Product form */}
      <EditProductForm productIndex={currentIndex} />
    </div>
  );
};

export default EditProduct;
