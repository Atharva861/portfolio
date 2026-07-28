import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Atharva Salunke — Full Stack Developer & AI/ML Engineer",
  description: "Portfolio of Atharva Salunke — final-year Computer Engineering student building production web apps, AI research, and computer vision projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelGrid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PixelLoader />
        <CustomCursor />
        <SmoothScroll />
        <SiteHeader />
        <main className="min-h-screen flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
