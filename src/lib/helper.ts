"use client";
import { usePathname } from "next/navigation";

const useShouldShowSidebarAndNavbar = () => {
  const excludedPaths = [/^\/funnels\/[^\/]+\/builder\/[^\/]+$/];

  const pathname = usePathname();
  return excludedPaths.some((path) => {
    return !path.test(pathname);
  });
};

export default useShouldShowSidebarAndNavbar;
