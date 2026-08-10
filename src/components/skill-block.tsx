"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RevealStagger, revealItem } from "@/components/reveal";

// ── Spritesheet constants ─────────────────────────────────────────────────────
const FRAME_W = 1344;
const FRAME_H = 840;
const SPRITE_COLS = 4;          // spritesheet columns
const SPRITE_ROWS = 4;          // spritesheet rows (last row has only 1 frame)
const TOTAL_FRAMES = 13;
const FPS = 2;

// ── Exact pixel boundaries of the 6 card cutouts in the frame (1344 x 840) ────
// Row 0: Y=72..431 (top: 8.5714%, height: 42.8571%)
// Row 1: Y=456..815 (top: 54.2857%, height: 42.8571%)
// Col 0: X=24..455 (left: 1.7857%, width: 32.1429%)
// Col 1: X=480..899 (left: 35.7143%, width: 31.2500%)
// Col 2: X=924..1319 (left: 68.7500%, width: 29.4643%)
const CELL_BOUNDS = [
  // Row 0
  { top: "8.5714%",  left: "1.7857%",  width: "32.1429%", height: "42.8571%" },
  { top: "8.5714%",  left: "35.7143%", width: "31.2500%", height: "42.8571%" },
  { top: "8.5714%",  left: "68.7500%", width: "29.4643%", height: "42.8571%" },
  // Row 1
  { top: "54.2857%", left: "1.7857%",  width: "32.1429%", height: "42.8571%" },
  { top: "54.2857%", left: "35.7143%", width: "31.2500%", height: "42.8571%" },
  { top: "54.2857%", left: "68.7500%", width: "29.4643%", height: "42.8571%" },
];

// ── Individual skill cell (typewriter animation) ──────────────────────────────
interface SkillCellProps {
  title: string;
  items: string[];
  colorIndex: number;
  startTyping: boolean;
}

const PAUSE_TICKS = 4; // Pause ticks between completing one item and starting the next

function SkillCell({ title, items, startTyping }: SkillCellProps) {
  const [charIndex, setCharIndex] = useState(0);

  // Total ticks required to finish typing all items in this block
  const totalTicks = items.reduce((sum, item) => sum + item.length + PAUSE_TICKS, 0);

  useEffect(() => {
    if (!startTyping) return;

    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= totalTicks) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 75); // 75ms per character (slower, retro terminal feel)

    return () => clearInterval(interval);
  }, [startTyping, totalTicks]);

  return (
    <div className="relative h-full w-full flex flex-col items-start justify-start p-3 sm:p-4 md:p-5 pt-7 sm:pt-8 md:pt-9 gap-1 sm:gap-1.5 overflow-hidden">
      {/* Category label — top left inside cell */}
      <div
        className="absolute top-2.5 sm:top-3 left-3 sm:left-4 text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-[#1a2a6c] opacity-80"
        style={{ fontFamily: "var(--font-pixelify-sans)" }}
      >
        &gt;_ {title}
      </div>

      {/* Skills — typed out one by one for each line */}
      <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col gap-1 sm:gap-1.5 md:gap-2">
        {(() => {
          let currentAcc = 0;
          return items.map((item) => {
            const itemStart = currentAcc;
            const itemEnd = itemStart + item.length;
            currentAcc += item.length + PAUSE_TICKS;

            // Don't render until typing reaches this item
            if (charIndex < itemStart) {
              return null;
            }

            const visibleChars = Math.min(item.length, charIndex - itemStart);
            const visibleText = item.slice(0, visibleChars);

            return (
              <span
                key={item}
                className="flex items-center gap-1.5 sm:gap-2 font-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-tight text-[#0f1f5c] leading-snug"
                style={{ fontFamily: "var(--font-pixelify-sans)" }}
              >
                <span className="text-[#0f1f5c]/50 text-[10px] sm:text-xs md:text-sm leading-none">■</span>
                {visibleText}
              </span>
            );
          });
        })()}
      </div>
    </div>
  );
}


// ── Skills grid with one shared animated spritesheet ─────────────────────────
interface Skill {
  title: string;
  items: string[];
}

interface SkillsGridProps {
  skills: Skill[];
}

export function SkillsGrid({ skills }: SkillsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES);
    }, 1000 / FPS);
    return () => clearInterval(id);
  }, []);

  const col = frame % SPRITE_COLS;
  const row = Math.floor(frame / SPRITE_COLS);

  // Percentage-based background-position so it works at any rendered size
  const bgX = col === 0 ? 0 : (col / (SPRITE_COLS - 1)) * 100;
  const bgY = row === 0 ? 0 : (row / (SPRITE_ROWS - 1)) * 100;

  return (
    <RevealStagger>
      <motion.div
        ref={containerRef}
        variants={revealItem}
        // The whole frame: maintain the spritesheet frame's 8:5 aspect ratio
        className="relative w-full"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
      >
        {/* Single spritesheet background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/toolkitframe.png')",
            backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
            backgroundPosition: `${bgX}% ${bgY}%`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />

        {/* Overlay cells — precisely positioned inside each frame's cutout */}
        {skills.slice(0, 6).map((skill, i) => {
          const bounds = CELL_BOUNDS[i];
          return (
            <div
              key={skill.title}
              className="absolute"
              style={{
                top: bounds.top,
                left: bounds.left,
                width: bounds.width,
                height: bounds.height,
              }}
            >
              <SkillCell
                title={skill.title}
                items={skill.items}
                colorIndex={i}
                startTyping={isInView}
              />
            </div>
          );
        })}
      </motion.div>
    </RevealStagger>
  );
}
