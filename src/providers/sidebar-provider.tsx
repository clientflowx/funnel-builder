"use client";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import useShouldShowSidebarAndNavbar from "@/lib/helper";

import React, { createContext, useContext, useState } from "react";

interface SidebarProviderProps {
  children: React.ReactNode;
}
export type SidebarContextType = {
  setOpen: () => void;
  setClose: () => void;
  toggleSidebar: () => void;
  isOpen: boolean;
};

const SidebarContext = createContext<SidebarContextType>({
  setOpen: () => {},
  setClose: () => {},
  toggleSidebar: () => {},
  isOpen: false,
});

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const showSidebarAndNavbar = useShouldShowSidebarAndNavbar();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const setOpen = () => {
    setIsSidebarOpen(true);
  };
  const setClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ setOpen, setClose, toggleSidebar, isOpen: isSidebarOpen }}
    >
      {showSidebarAndNavbar && (
        <>
          <Navbar />
          <div className="pt-14">
            <SideBar isOpen={isSidebarOpen} />
          </div>
        </>
      )}
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar can only be used inside <SidebarProvider>");
  return context;
};
