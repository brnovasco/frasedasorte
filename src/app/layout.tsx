import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AppMenu from "@/components/app-menu";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FraseDaSorte",
  description:
    "Gerador de sequência de números aleatóris à partir de uma frase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-0 right-0 p-4 z-10">
          <AppMenu />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
