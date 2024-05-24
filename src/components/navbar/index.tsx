"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import PopOver from "./popover";
import { useSidebar } from "@/providers/sidebar-provider";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="fixed h-14 px-4 z-50 w-full bg-black text-white flex items-center justify-between">
      <div className="flex gap-3">
        <button onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <Link href="/">Blumecart</Link>
      </div>
      {/* user popover component */}
      <PopOver />
    </div>
  );
};

export default Navbar;
