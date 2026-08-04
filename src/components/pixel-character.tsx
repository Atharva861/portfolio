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
const SUNNY_WAVE_SEQUENCE = [3, 4, 5, 4, 5, 4, 5, 3];

export function PixelCharacter({ className, fps = 2, waveFps = 8, animation = "idle" }: PixelCharacterProps) {
  const spriteRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);

  const stateRef = useRef<"idle" | "wave" | "thunder">("idle");
  const idleIndexRef = useRef(0);
  const waveIndexRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const nextWaveTimeRef = useRef(0);

  // Helper to calculate exact CSS percentage background positions
  const getBackgroundPosition = useCallback((frameIndex: number) => {
    if (animation === "cloudy" || animation === "windy" || animation === "umbrella") {
      const col = frameIndex % 2;
      const xPercent = (col / 1) * 100;
      return `${xPercent}% 0%`;
    }
    if (animation === "sunny") {
      const col = frameIndex % 3;
      const row = Math.floor(frameIndex / 3);
      const xPercent = (col / 2) * 100;
      const yPercent = (row / 1) * 100;
      return `${xPercent}% ${yPercent}%`;
    }
    
    const col = frameIndex % 4;
    const row = Math.floor(frameIndex / 4);
    // In CSS background-position, percentage aligns the point of the image with the container
    // For 4 cols (0 to 3), col / 3 gives 0%, 33.33%, 66.67%, 100%
    // For 3 rows (0 to 2), row / 2 gives 0%, 50%, 100%
    const xPercent = (col / 3) * 100;
    const yPercent = (row / 2) * 100;
    return `${xPercent}% ${yPercent}%`;
  }, [animation]);

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
    if ((animation === "idle" || animation === "sunny") && stateRef.current !== "wave") {
      stateRef.current = "wave";
      waveIndexRef.current = 0;
      const now = performance.now();
      lastFrameTimeRef.current = now;
      nextWaveTimeRef.current = now + getNextWaveDelay();
      updateDOM(animation === "sunny" ? SUNNY_WAVE_SEQUENCE[0] : WAVE_SEQUENCE[0]);
    } else if (animation === "cloudy" && stateRef.current !== "thunder") {
      stateRef.current = "thunder";
      waveIndexRef.current = 0;
      const now = performance.now();
      lastFrameTimeRef.current = now;
      updateDOM(1); // Frame 1 is thunder
    }
  }, [getNextWaveDelay, updateDOM, animation]);

  useEffect(() => {
    const idleDuration = 1000 / fps;
    const waveDuration = 1000 / waveFps;
    const now = performance.now();
    lastFrameTimeRef.current = now;
    nextWaveTimeRef.current = now + (animation === "cloudy" ? 3000 : getNextWaveDelay());

    // Set initial idle frame
    updateDOM(0);

    const animate = (time: number) => {
      if (!isVisibleRef.current) {
        return;
      }

      const currentDuration = stateRef.current !== "idle" ? waveDuration : idleDuration;

      if (time - lastFrameTimeRef.current >= currentDuration) {
        lastFrameTimeRef.current = time;

        if (stateRef.current === "idle") {
          if ((animation === "idle" || animation === "sunny") && time >= nextWaveTimeRef.current) {
            stateRef.current = "wave";
            waveIndexRef.current = 0;
            updateDOM(animation === "sunny" ? SUNNY_WAVE_SEQUENCE[0] : WAVE_SEQUENCE[0]);
          } else if (animation === "cloudy" && time >= nextWaveTimeRef.current) {
            stateRef.current = "thunder";
            waveIndexRef.current = 0;
            updateDOM(1);
          } else {
            // Idle loops between frames 0 and 8 (Frames 1-9)
            // For other animations (sunny), we loop through all 12 frames
            // For cloudy, we just stay on frame 0
            // For windy and umbrella, we loop through 2 frames
            let frameCount = 12;
            if (animation === "idle") frameCount = 9;
            if (animation === "cloudy") frameCount = 1;
            if (animation === "windy" || animation === "umbrella") frameCount = 2;
            if (animation === "sunny") frameCount = 3;
            
            idleIndexRef.current = (idleIndexRef.current + 1) % frameCount;
            updateDOM(idleIndexRef.current);
          }
        } else if (stateRef.current === "wave") {
          waveIndexRef.current++;
          const seq = animation === "sunny" ? SUNNY_WAVE_SEQUENCE : WAVE_SEQUENCE;
          if (waveIndexRef.current >= seq.length) {
            stateRef.current = "idle";
            nextWaveTimeRef.current = time + getNextWaveDelay();
            updateDOM(idleIndexRef.current);
          } else {
            updateDOM(seq[waveIndexRef.current]);
          }
        } else if (stateRef.current === "thunder") {
          waveIndexRef.current++;
          // Double blink logic: tick 0 (on), tick 1 (off), tick 2 (on), tick 3 (off/end)
          if (waveIndexRef.current === 1) {
            updateDOM(0);
          } else if (waveIndexRef.current === 2) {
            updateDOM(1);
          } else if (waveIndexRef.current >= 3) {
            stateRef.current = "idle";
            nextWaveTimeRef.current = time + 3000;
            updateDOM(0);
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
            nextWaveTimeRef.current = currentTime + (animation === "cloudy" ? 3000 : getNextWaveDelay());
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
      <div className="relative z-10 w-full aspect-[3/4] transition-transform duration-300">
        <div
          ref={spriteRef}
          className="pixelated absolute inset-0 w-full h-full bg-no-repeat"
          style={{
            backgroundImage: `url(${SpriteRegistry[animation]})`,
            backgroundSize: (animation === "cloudy" || animation === "windy" || animation === "umbrella") 
              ? "200% 100%" 
              : animation === "sunny" 
                ? "300% 200%" 
                : "400% 300%",
            backgroundPosition: "0% 0%",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Soft shadow beneath character that scales with float animation, moved closer to feet */}
      {animation !== "umbrella" && (
        <div 
          className={cn(
            "relative z-0 -mt-[23%] h-1.5 w-[38%] rounded-full bg-navy/12 blur-[3px] transition-all duration-300 dark:bg-sapphire/20 sm:h-2 sm:w-2/5 group-hover:bg-navy/16 dark:group-hover:bg-sapphire/25",
            animation === "windy" && "translate-x-[6%]",
            animation === "sunny" && "-mt-[16%] -translate-x-[8%]"
          )}
        />
      )}
    </div>
  );
}
