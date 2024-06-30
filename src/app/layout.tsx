import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import AppMenu from "@/components/app-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

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
      <body className={cn(inter.className, "h-screen")}>
        <div className="flex flex-row justify-end p-4">
          <AppMenu />
        </div>
        <div className="w-full h-24 flex flex-row items-center justify-center my-10">
          <Image
            src={"/banner-transparent.png"}
            alt="Fase da Sorte"
            layout="intrinsic"
            width={300}
            height={100}
          />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
