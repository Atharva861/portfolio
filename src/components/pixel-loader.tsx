"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });


const CELL_DESKTOP = 28;
const CELL_MOBILE = 22;

export function PixelLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0, cell: CELL_DESKTOP });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const measure = () => {
      const cell = window.innerWidth < 640 ? CELL_MOBILE : CELL_DESKTOP;
      setDims({ w: window.innerWidth, h: window.innerHeight, cell });
    };
    measure();
    window.addEventListener("resize", measure);
    
    // Ensure canvas redraws when custom fonts are fully loaded
    document.fonts.ready.then(() => setFontLoaded(true));

    const done = () => setReady(true);
    if (document.readyState === "complete") {
      window.setTimeout(done, 900);
    } else {
      const min = window.setTimeout(done, 1400);
      window.addEventListener("load", () => {
        window.clearTimeout(min);
        window.setTimeout(done, 400);
      });
    }
    // safety net
    const safety = window.setTimeout(done, 4500);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(safety);
    };
  }, []);

  const { cols, rows, pixels } = useMemo(() => {
    if (!dims.w || !dims.h || typeof window === "undefined") {
      return { cols: 0, rows: 0, pixels: [] as Array<{ i: number; row: number; delay: number; isLast?: boolean }> };
    }
    const cols = Math.ceil(dims.w / dims.cell);
    const rows = Math.ceil(dims.h / dims.cell);
    const total = cols * rows;

    const base = reduce ? 0 : 1.5; // total wave duration
    let maxDelay = -1;
    let maxDelayIndex = -1;
    const rawPixels = Array.from({ length: total }, (_, i) => {
      const row = Math.floor(i / cols);
      const rowFromBottom = rows - 1 - row;
      const t = rowFromBottom / Math.max(1, rows - 1);
      const jitter = reduce ? 0 : Math.random() * 0.18;
      const delay = t * base + jitter;
      if (delay > maxDelay) {
        maxDelay = delay;
        maxDelayIndex = i;
      }
      return { i, row, delay };
    });
    const pixels = rawPixels.map(p => ({ ...p, isLast: p.i === maxDelayIndex }));
    return { cols, rows, pixels };
  }, [dims, reduce, fontLoaded]);

  useEffect(() => {
    if (!visible) return;
    document.documentElement.classList.add('loading-scrollbar');
    return () => {
      document.documentElement.classList.remove('loading-scrollbar');
    };
  }, [visible]);

  const handleComplete = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {visible && (
        <motion.div
          key="loader"
          className={`fixed inset-0 z-[100] pointer-events-none ${cols === 0 ? "bg-navy" : ""}`}
          style={cols === 0 ? { backgroundColor: "oklch(0.15 0.08 265)" } : undefined}
          aria-label="Loading"
          role="status"
        >
          {/* Pixel grid */}
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${dims.cell}px)`,
              gridAutoRows: `${dims.cell}px`,
            }}
          >
            {ready
              ? pixels.map((p) => (
                  <motion.span
                    key={p.i}
                    className="bg-navy block"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.6 }}
                    transition={{
                      duration: reduce ? 0.001 : 0.55,
                      delay: p.delay,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    onAnimationComplete={p.isLast ? handleComplete : undefined}
                  />
                ))
              : pixels.map((p) => (
                  <span key={p.i} className="bg-navy block" />
                ))}
          </div>
          {/* Centered wordmark using standard DOM text */}
          <motion.div 
            className="absolute inset-0 grid place-items-center"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={ready ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: reduce ? 0.001 : 1.5, delay: reduce ? 0 : 0.3, ease: "linear" }}
          >
            <div className="text-center select-none">
              <div className={`${pixelify.className} text-ice text-[100px] sm:text-[140px] md:text-[180px] lg:text-[210px] tracking-normal leading-[0.9]`}>
                ATHARVA<br />SALUNKE
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}