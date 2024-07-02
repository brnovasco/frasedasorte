import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";
import { AnimatedTitle } from "@/components/animated-title";
import AppMenu from "@/components/app-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400" });

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
      <body className={cn(patrickHand.className, "h-screen")}>
        <div className="flex flex-row justify-end p-4">
          <AppMenu />
        </div>
        <div className="w-full h-24 flex flex-row items-center justify-center my-10">
          <AnimatedTitle />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
