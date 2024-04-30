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
import { SidebarProvider } from "@/providers/sidebar-provider";
import { Toaster } from "@/components/ui/toaster";

/*
Provider Documentation:
ClerkProvider:- For Clerk Auth
ThemeProvider:- By ShadCn for dark mode
ModalProver:- For modal functionality
SidebarProvider:- For closing, opeing and toggling sidebar from anywhere in app.
*/

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const showSidebarAndNavbar = shouldShowSidebarAndNavbar();

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
            <SidebarProvider>
              <ModalProvider>
                <div
                  className={`${
                    showSidebarAndNavbar ? "w-full pl-[80px] pt-4" : ""
                  }`}
                >
                  {children}
                </div>
                <Toaster />
              </ModalProvider>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
