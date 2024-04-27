import { usePathname } from "next/navigation";

const shouldShowSidebarAndNavbar = () => {
  const allowedPaths = [
    "/",
    "/sites",
    "/products",
    "/funnels", // Include the base funnels path
    "/dashboard",
    "/settings",
    "/profile",
  ];

  const pathname = usePathname();

  const isAllowedPath = allowedPaths.some((path) => {
    return pathname.startsWith(path);
  });

  return isAllowedPath;
};

export default shouldShowSidebarAndNavbar;
