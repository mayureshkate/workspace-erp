import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERP System",
  description: "Modern ERP System with CRM, Documents, and Inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden bg-[#0f172a] text-slate-50 selection:bg-primary/30">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-900 to-slate-950">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
