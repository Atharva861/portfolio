"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const nav = [
  { to: "/", label: "Home" },
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
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2"
    >
      <nav className="glass flex items-center gap-1 rounded-full px-2 py-2 sm:px-3">
        <Link
          href="/"
          className="mr-1 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
          data-cursor="hover"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-sapphire shadow-glow" />
          <span className="hidden sm:inline">Atharva</span>
        </Link>
        {nav.map((n) => {
          const isActive = pathname === n.to;
          return (
            <Link
              key={n.to}
              href={n.to}
              data-cursor="hover"
              className="relative rounded-full px-4 py-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={isActive ? "text-primary-foreground" : ""}>{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}