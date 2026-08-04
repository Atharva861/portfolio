"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google";
import { useEffect, useState } from "react";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const nav = [
  { to: "/", label: "Me" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [weatherInfo, setWeatherInfo] = useState<{ weather: string; temperature: number } | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => setWeatherInfo(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
      >
        <nav className="flex items-center gap-8 sm:gap-12">
          {nav.map((n) => {
            const isActive = pathname === n.to;
            return (
              <Link
                key={n.to}
                href={n.to}
                data-cursor="hover"
                className={`${pixelify.className} text-xl sm:text-2xl tracking-wider transition-colors hover:text-sapphire ${
                  isActive ? "text-sapphire font-medium" : "text-foreground/85"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </motion.header>

      {weatherInfo && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="fixed right-6 sm:right-8 top-7 z-40 hidden md:flex items-center"
        >
          <div className={`${pixelify.className} text-sm sm:text-base text-foreground/60 tracking-wider flex items-center gap-1.5`}>
            <span>{Math.round(weatherInfo.temperature)}°C</span>
            <span className="capitalize">{weatherInfo.weather},</span>
            <span>Pune</span>
          </div>
        </motion.div>
      )}
    </>
  );
}