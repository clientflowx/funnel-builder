"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import PopOver from "./popover";

type Props = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="fixed h-14 px-4 z-50 w-full bg-black text-white flex items-center justify-between">
      <div className="flex gap-3">
        <button onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <Link href="/">ClientFlowX</Link>
      </div>
      {/* user popover component */}
      <PopOver />
    </div>
  );
};

export default Navbar;
