"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import CreateProductForm from "./form";

const CreateProduct = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-20 opacity-90 hover:opacity-100 transition-all">
        <Link href="/products" className="flex items-center gap-2">
          <MoveLeft size={18} />
          Back
        </Link>
      </div>

      {/* Create Product form */}
      <CreateProductForm />
    </div>
  );
};

export default CreateProduct;
