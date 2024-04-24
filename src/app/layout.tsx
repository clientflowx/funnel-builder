"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import SideBar from "@/components/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
const inter = Inter({ subsets: ["latin"] });
import { dark } from "@clerk/themes";
import shouldShowSidebarAndNavbar from "@/lib/helper"; // function to show navbar and sidebar conditionally

/*
Provider Documentation:
ClerkProvider:- For Clerk Auth
ThemeProvider:- By ShadCn for dark mode
ModalProver:- For modal functionality
*/

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>
              {showSidebarAndNavbar && (
                <>
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="pt-14">
                    <SideBar isOpen={isSidebarOpen} />
                  </div>
                </>
              )}
              <div
                className={`${showSidebarAndNavbar ? "w-full pl-56 pt-4" : ""}`}
              >
                {children}
              </div>
            </ModalProvider>
          </ThemeProvider>
        </body>
        <body className={inter.className}></body>
      </html>
    </ClerkProvider>
  );
}
