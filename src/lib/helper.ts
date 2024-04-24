import { usePathname } from "next/navigation";

const shouldShowSidebarAndNavbar = () => {
  const pathname = usePathname();
  return (
    pathname === "/" ||
    pathname === "/sites" ||
    pathname === "/products" ||
    pathname === "/funnels" ||
    pathname === "/dashboard" ||
    pathname === "/settings"
  );
};

export default shouldShowSidebarAndNavbar;
