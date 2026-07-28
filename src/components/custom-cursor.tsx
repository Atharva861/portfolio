"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (mq.matches) {
      document.documentElement.classList.add("custom-cursor-active");
    }
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const isInteractive = !!t?.closest("a,button,[data-cursor='hover'],input,textarea,select");
      setHovering(isInteractive);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 4 4"
      className="pointer-events-none fixed left-0 top-0 z-[80] text-navy dark:text-white drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        shapeRendering: "crispEdges",
      }}
      animate={{
        width: hovering ? 26 : 18,
        height: hovering ? 26 : 18,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Top bar */}
      <rect x="1" y="0" width="2" height="1" fill="currentColor" />
      {/* Bottom bar */}
      <rect x="1" y="3" width="2" height="1" fill="currentColor" />
      {/* Left bar */}
      <rect x="0" y="1" width="1" height="2" fill="currentColor" />
      {/* Right bar */}
      <rect x="3" y="1" width="1" height="2" fill="currentColor" />
    </motion.svg>
  );
}