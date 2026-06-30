import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/main-nav";
import { FooterV2 } from "@/components/layout/footer-v2";
import { JsonLd } from "@/components/common/json-ld";
import { FloatingButtons } from "@/components/common/floating-buttons";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Best Car Accessories Online in India | AutoPrestige",
    template: "%s | AutoPrestige",
  },
  description:
    "India's premier destination for premium car accessories. Shop at AutoPrestige for high-quality seat covers, floor mats, lighting, electronics, and more for all car brands.",
  keywords: [
    "car accessories",
    "auto accessories",
    "car parts",
    "seat covers",
    "floor mats",
    "car lighting",
    "car electronics",
    "Hyundai accessories",
    "Toyota accessories",
    "car care products",
    "Indian car accessories",
  ],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AutoPrestige",
    title: "Best Car Accessories Online in India | AutoPrestige",
    description:
      "Premium car accessories for every drive. Shop seat covers, floor mats, lighting, and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoPrestige - Premium Car Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoPrestige - Premium Car Accessories",
    description:
      "Premium car accessories for every drive. Shop seat covers, floor mats, lighting, and more.",
  },
  metadataBase: new URL("https://autoprestige.in"),
  alternates: {
    canonical: "/",
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
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <FooterV2 />
        <FloatingButtons />
      </body>
    </html>
  );
}
