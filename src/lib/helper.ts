"use client";
import { usePathname } from "next/navigation";

const useShouldShowSidebarAndNavbar = () => {
  const excludedPaths = [/^\/funnels(?![/]\d+\/builder\/[a-f0-9\-]{36}$)/];

  const pathname = usePathname();
  return excludedPaths.some((path) => {
    return path.test(pathname);
  });
};

export default useShouldShowSidebarAndNavbar;
