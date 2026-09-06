import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeoplePay360 | HR & Payroll",
  description: "Integrated HR and Payroll Operations Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Application Area */}
          <div className="ml-64 flex min-h-screen flex-1 flex-col">
            
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 p-6">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}