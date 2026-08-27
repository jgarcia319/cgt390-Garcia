import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NOVA STREET | Original Streetwear Demo",
  description:
    "Original streetwear-inspired storefront demo built with Next.js and TypeScript."
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="site-shell">
            <Navbar />
            {children}
            <footer className="site-footer">
              <small>© {new Date().getFullYear()} NOVA STREET. Fictional demo experience.</small>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
