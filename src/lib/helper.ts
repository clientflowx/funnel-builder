"use client";
import { usePathname } from "next/navigation";

const useShouldShowSidebarAndNavbar = () => {
  const excludedPaths = [
    /^\/funnels\/[^\/]+\/builder\/[^\/]+$/,
    /^\/auth(?:\/.*)?(?:\?.*)?$/,
  ];

  const pathname = usePathname();
  return excludedPaths.every((path) => {
    return !path.test(pathname);
  });
};

export default useShouldShowSidebarAndNavbar;
