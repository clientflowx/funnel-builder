"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import SideBar from "@/components/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { dark } from "@clerk/themes";
import shouldShowSidebarAndNavbar from "@/lib/helper"; // function to show navbar and sidebar conditionally

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const showSidebarAndNavbar = shouldShowSidebarAndNavbar();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          {showSidebarAndNavbar && (
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <div className="pt-14">
                <SideBar isOpen={isSidebarOpen} />
              </div>
            </>
          )}
          <div className={`${showSidebarAndNavbar ? "w-full pl-56 pt-4" : ""}`}>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
