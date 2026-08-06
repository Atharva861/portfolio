import type { Metadata } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import { GeistPixelGrid } from "geist/font/pixel";
import "./globals.css";
import { PixelLoader } from "@/components/pixel-loader";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atharva Salunke",
  description:
    "Portfolio of Atharva Salunke — Computer Engineering graduate building production web apps, AI research, and computer vision projects.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
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
      className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} ${GeistPixelGrid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PixelLoader />
        <CustomCursor />
        <SmoothScroll />
        <SiteHeader />
        <main className="min-h-screen flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
