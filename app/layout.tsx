import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "NOVA STREET | Streetwear for the next move",
    template: "%s | NOVA STREET"
  },
  description:
    "Shop NOVA STREET streetwear, including new drops, men's hoodies, women's leggings, graphic tees, outerwear, accessories, limited collabs, and restocked essentials.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "NOVA STREET | Streetwear for the next move",
    description:
      "Shop new drops, everyday layers, limited collabs, and movement-ready streetwear from NOVA STREET.",
    type: "website",
    siteName: "NOVA STREET"
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA STREET | Streetwear for the next move",
    description:
      "Shop new drops, everyday layers, limited collabs, and movement-ready streetwear from NOVA STREET."
  }
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOVA STREET",
    url: siteUrl,
    description: "Streetwear for the next move."
  };

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R1BPKQWBT3"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R1BPKQWBT3');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
