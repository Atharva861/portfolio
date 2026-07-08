"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = HTMLMotionProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

export function AnimatedButton({ variant = "primary", className, children, ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-shadow",
        variant === "primary"
          ? "bg-gradient-primary text-primary-foreground shadow-soft hover:shadow-glow"
          : "glass text-foreground hover:shadow-soft",
        className,
      )}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 bg-white/25 blur-md opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100"
      />
    </motion.button>
  );
}