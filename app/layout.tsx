import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.orderpages.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OrderPages | Swiss Modernist Editorial Folios & Digital Books",
    template: "%s | OrderPages",
  },
  description: "OrderPages is a minimalist Swiss editorial platform offering structured digital folios, high-contrast book collections, and EPUB downloads.",
  keywords: ["OrderPages", "Swiss Modernist Books", "Editorial Journal", "Digital Folios"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "OrderPages | Swiss Modernist Editorial Folios",
    description: "Swiss minimalist editorial folios and digital reading at OrderPages.",
    url: siteUrl,
    siteName: "OrderPages",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "OrderPages" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-inter bg-white text-black"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
