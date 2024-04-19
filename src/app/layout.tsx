"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar toggleSidebar={toggleSidebar} />
          <div className='w-full pt-14'>
            <SideBar isOpen={isSidebarOpen} />
            <div className='pl-56 pt-4'>{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
