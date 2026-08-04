"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SpriteRegistry, type AnimationType } from "@/lib/spriteManager";

interface PixelCharacterProps {
  className?: string;
  fps?: number;
  waveFps?: number;
  animation?: AnimationType;
}

// 0-indexed frame sequence for waving (frames 10, 11, 12 in 1-indexed terms)
// Frame 9: raise arm / transition
// Frame 10: wave left
// Frame 11: wave right
// Sequence creates a natural, responsive waving gesture back and forth
const WAVE_SEQUENCE = [9, 10, 11, 10, 11, 10, 11, 9];

export function PixelCharacter({ className, fps = 2, waveFps = 8, animation = "idle" }: PixelCharacterProps) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);

  const stateRef = useRef<"idle" | "wave">("idle");
  const idleIndexRef = useRef(0);
  const waveIndexRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const nextWaveTimeRef = useRef(0);

  // Helper to calculate exact CSS percentage background positions for a 4x3 sprite grid
  const getBackgroundPosition = useCallback((frameIndex: number) => {
    const col = frameIndex % 4;
    const row = Math.floor(frameIndex / 4);
    // In CSS background-position, percentage aligns the point of the image with the container
    // For 4 cols (0 to 3), col / 3 gives 0%, 33.33%, 66.67%, 100%
    // For 3 rows (0 to 2), row / 2 gives 0%, 50%, 100%
    const xPercent = (col / 3) * 100;
    const yPercent = (row / 2) * 100;
    return `${xPercent}% ${yPercent}%`;
  }, []);

  const updateDOM = useCallback(
    (frameIndex: number) => {
      if (!spriteRef.current) return;
      spriteRef.current.style.backgroundPosition = getBackgroundPosition(frameIndex);
    },
    [getBackgroundPosition]
  );

  const getNextWaveDelay = useCallback(() => {
    // Randomized between 8 and 15 seconds
    return Math.random() * (15000 - 8000) + 8000;
  }, []);

  const triggerWave = useCallback(() => {
    if (animation === "idle" && stateRef.current !== "wave") {
      stateRef.current = "wave";
      waveIndexRef.current = 0;
      const now = performance.now();
      lastFrameTimeRef.current = now;
      nextWaveTimeRef.current = now + getNextWaveDelay();
      updateDOM(WAVE_SEQUENCE[0]);
    }
  }, [getNextWaveDelay, updateDOM, animation]);

  useEffect(() => {
    const idleDuration = 1000 / fps;
    const waveDuration = 1000 / waveFps;
    const now = performance.now();
    lastFrameTimeRef.current = now;
    nextWaveTimeRef.current = now + getNextWaveDelay();

    // Set initial idle frame
    updateDOM(0);

    const animate = (time: number) => {
      if (!isVisibleRef.current) {
        return;
      }

      const currentDuration = stateRef.current === "wave" ? waveDuration : idleDuration;

      if (time - lastFrameTimeRef.current >= currentDuration) {
        lastFrameTimeRef.current = time;

        if (stateRef.current === "idle") {
          if (animation === "idle" && time >= nextWaveTimeRef.current) {
            stateRef.current = "wave";
            waveIndexRef.current = 0;
            updateDOM(WAVE_SEQUENCE[0]);
          } else {
            // Idle loops between frames 0 and 8 (Frames 1-9)
            // For umbrella, we loop through all 12 frames of the sprite sheet
            const frameCount = animation === "umbrella" ? 12 : 9;
            idleIndexRef.current = (idleIndexRef.current + 1) % frameCount;
            updateDOM(idleIndexRef.current);
          }
        } else if (stateRef.current === "wave") {
          waveIndexRef.current++;
          if (waveIndexRef.current >= WAVE_SEQUENCE.length) {
            stateRef.current = "idle";
            nextWaveTimeRef.current = time + getNextWaveDelay();
            updateDOM(idleIndexRef.current);
          } else {
            updateDOM(WAVE_SEQUENCE[waveIndexRef.current]);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    // Pause animation when outside viewport to optimize CPU & performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;

        if (!wasVisible && entry.isIntersecting) {
          const currentTime = performance.now();
          lastFrameTimeRef.current = currentTime;
          if (nextWaveTimeRef.current < currentTime) {
            nextWaveTimeRef.current = currentTime + getNextWaveDelay();
          }
          if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(animate);
          }
        } else if (wasVisible && !entry.isIntersecting) {
          if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [fps, waveFps, getNextWaveDelay, updateDOM]);

  return (
    <div
      ref={containerRef}
      onClick={triggerWave}
      title="Click to wave!"
      data-cursor="hover"
      className={cn(
        "relative flex flex-col items-center select-none cursor-pointer group",
        className
      )}
    >
      {/* Floating character wrapper (aspect 3/4 matches actual 576x768 frame resolution) */}
      <div className="relative z-10 w-full aspect-[3/4] transition-transform duration-300 group-hover:scale-[1.03]">
        <div
          ref={spriteRef}
          className="pixelated absolute inset-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: `url(${SpriteRegistry[animation]})`,
            backgroundSize: "400% 300%",
            backgroundPosition: "0% 0%",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Soft shadow beneath character that scales with float animation, moved closer to feet */}
      {animation !== "umbrella" && (
        <div className="relative z-0 -mt-[23%] h-1.5 w-[38%] rounded-full bg-navy/12 blur-[3px] transition-all duration-300 dark:bg-sapphire/20 sm:h-2 sm:w-2/5 group-hover:bg-navy/16 dark:group-hover:bg-sapphire/25" />
      )}
    </div>
  );
}
