import { SidebarOption } from "./types";
import {
  LayoutDashboard,
  PanelsTopLeft,
  Filter,
  Settings,
  Package,
} from "lucide-react";
export const sideBarOptions: SidebarOption[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    titleVisible: true,
  },
  {
    key: "sites",
    title: "Sites",
    icon: PanelsTopLeft,
    titleVisible: true,
  },
  {
    key: "products",
    title: "Products",
    icon: Package,
    titleVisible: true,
  },
  {
    key: "funnels",
    title: "Funnels",
    icon: Filter,
    titleVisible: true,
  },
  {
    key: "settings",
    title: "Settings",
    icon: Settings,
    titleVisible: true,
  },
];
