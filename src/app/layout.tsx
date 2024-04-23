"use client"
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import SideBar from "@/components/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { dark } from "@clerk/themes";
import { usePathname } from "next/navigation";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const showSidebarAndNavbar = (pathname === "/" || pathname === '/sites' || pathname === '/products' || pathname === '/funnel' || pathname === '/dashboard' || pathname === '/settings');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          {showSidebarAndNavbar && <>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className='pt-14'>
              <SideBar isOpen={isSidebarOpen} />
            </div>
          </>}
          <div className={`${showSidebarAndNavbar ? "w-full pl-56 pt-4" : ""}`}>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}