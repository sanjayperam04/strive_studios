import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summit Studio — Branding, Web Design & Development Agency",
  description:
    "Summit Studio is a digital agency specialising in brand identity, website design, and Next.js development. We build bold digital experiences for ambitious brands.",
  keywords: [
    "digital agency",
    "branding agency",
    "web design",
    "website development",
    "Next.js agency",
    "brand identity",
    "UI design",
    "Summit Studio",
  ],
  openGraph: {
    title: "Summit Studio — Branding, Web Design & Development",
    description:
      "Bold digital experiences for ambitious brands. Branding, website design, and development — built to convert.",
    url: "https://summitstudios.vercel.app",
    siteName: "Summit Studio",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "https://summitstudios.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Summit Studio — Branding, Web Design & Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Summit Studio — Branding, Web Design & Development",
    description:
      "Bold digital experiences for ambitious brands. Branding, website design, and development — built to convert.",
    images: ["https://summitstudios.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
