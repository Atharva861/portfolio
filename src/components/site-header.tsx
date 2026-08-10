"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="absolute inset-x-0 top-0 z-40 w-full pt-4 sm:pt-6">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="hidden sm:block"
        >
          <Link href="/" data-cursor="hover" aria-label="Home">
            <Image
              src="/images/logo.png"
              alt="Atharva Salunke"
              width={44}
              height={44}
              className="pixelated hover:scale-110 transition-transform duration-200"
              priority
            />
          </Link>
        </motion.div>

        {/* Nav links — centered */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 mx-auto"
        >
          <div className="flex items-center gap-8 sm:gap-12">
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
          </div>
        </motion.nav>

        {/* Weather */}
        {weatherInfo && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="hidden md:flex items-center"
          >
            <div className={`${pixelify.className} text-sm sm:text-base text-foreground/60 tracking-wider flex items-center gap-1.5`}>
              <span>{Math.round(weatherInfo.temperature)}°C</span>
              <span className="capitalize">{weatherInfo.weather},</span>
              <span>Pune</span>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}