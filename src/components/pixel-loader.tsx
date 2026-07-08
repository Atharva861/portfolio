"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CELL_DESKTOP = 28;
const CELL_MOBILE = 22;

export function PixelLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0, cell: CELL_DESKTOP });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("loader:shown") === "1") {
      setVisible(false);
      return;
    }
    const measure = () => {
      const cell = window.innerWidth < 640 ? CELL_MOBILE : CELL_DESKTOP;
      setDims({ w: window.innerWidth, h: window.innerHeight, cell });
    };
    measure();
    window.addEventListener("resize", measure);

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
    if (!dims.w || !dims.h) return { cols: 0, rows: 0, pixels: [] as Array<{ i: number; row: number; delay: number }> };
    const cols = Math.ceil(dims.w / dims.cell);
    const rows = Math.ceil(dims.h / dims.cell);
    const total = cols * rows;
    const base = reduce ? 0 : 0.9; // total wave duration
    const pixels = Array.from({ length: total }, (_, i) => {
      const row = Math.floor(i / cols);
      const rowFromBottom = rows - 1 - row;
      const t = rowFromBottom / Math.max(1, rows - 1);
      const jitter = reduce ? 0 : Math.random() * 0.18;
      return { i, row, delay: t * base + jitter };
    });
    return { cols, rows, pixels };
  }, [dims, reduce]);

  useEffect(() => {
    if (!visible || !ready) return;
    // Lock body scroll while loader visible
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, ready]);

  const handleComplete = () => {
    sessionStorage.setItem("loader:shown", "1");
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={handleComplete}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
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
                      duration: reduce ? 0.001 : 0.35,
                      delay: p.delay,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    onAnimationComplete={p.i === pixels.length - 1 ? handleComplete : undefined}
                  />
                ))
              : pixels.map((p) => (
                  <span key={p.i} className="bg-navy block" />
                ))}
          </div>
          {/* Centered wordmark (stays sharp) */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: ready ? 0 : 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center select-none"
            >
              <div className="font-mono text-[10px] tracking-[0.4em] text-ice/70 uppercase mb-3">
                Portfolio · 2026
              </div>
              <div className="text-ice text-3xl sm:text-5xl font-light tracking-tight">
                Atharva Salunke
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}