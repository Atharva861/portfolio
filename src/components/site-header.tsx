"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const nav = [
  { to: "/", label: "Me" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
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
  );
}