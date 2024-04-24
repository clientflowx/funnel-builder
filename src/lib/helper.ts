import { usePathname } from "next/navigation";

const shouldShowSidebarAndNavbar = () => {
  const allowedPaths = [
    "/",
    "/sites",
    "/products",
    "/funnels",
    "/dashboard",
    "/settings",
    "/profile",
  ];
  const pathname = usePathname();
  return allowedPaths.includes(pathname);
};

export default shouldShowSidebarAndNavbar;
