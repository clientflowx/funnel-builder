"use client";
import Navbar from "@/components/navbar-custom";
import React, { useEffect, useState } from "react";
import { navbarOptions } from "./navbarOptions";
import { Info, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("");
  useEffect(() => {
    router.push(`${selectedOption}`);
  }, [selectedOption, router]);

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-4 p-10">
        {/* Funnel Name and Header Icons */}
        <div className="w-full flex items-center justify-between">
          <h5 className="font-semibold">Funnel Name</h5>
          <div className="flex items-center justify-between gap-5">
            <button>
              <Share2 size={16} />
            </button>
            <button>
              <SquareArrowOutUpRight size={16} />
            </button>
            <button>
              <Info size={16} />
            </button>
          </div>
        </div>
        {/* Navbar Component */}
        <Navbar options={navbarOptions} setSelectedOption={setSelectedOption} />
        {/* Selected Component */}
        {children}
      </div>
    </div>
  );
}
