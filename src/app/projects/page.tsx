"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  image: string;
  imageMobile: string;
};

const projects: Project[] = [
  {
    title: "AZ Partners",
    tag: "Next.js",
    description:
      "A modern corporate website for a New Zealand sourcing and procurement specialist, built for performance and global reach.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://azpartners.co.nz/",
    image: "/projects/azp.webp",
    imageMobile: "/projects/azp_pt.webp",
  },
  {
    title: "Starmed Facility Services",
    tag: "Frontend",
    description:
      "A professional online presence for a facility services company, focusing on clean design and clear service offerings.",
    tech: ["React", "Tailwind CSS", "Vite"],
    live: "https://starmedfacilityservices.com/",
    image: "/projects/starmed.webp",
    imageMobile: "/projects/starmed_pt.webp",
  },
];

// ─── Pixel-art window frame ──────────────────────────────────────────────────
// window.png is 1344×840. Transparent content area (pixel-exact scan):
//   top: 72px → 8.571%  |  left: 24px → 1.786%
//   right: 24px → 1.786% |  bottom: 24px → 2.857%
const SCREEN_INSET = { top: "8.571%", left: "1.786%", right: "1.786%", bottom: "2.857%" } as const;

function PixelWindow({ screenshot, alt }: { screenshot: string; alt: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        // Maintain window.png aspect ratio (1344 : 840 = 16 : 10)
        aspectRatio: "1344 / 840",
        // Pixel-art rendering
        imageRendering: "pixelated",
      }}
    >
      {/* Screenshot clipped to the inner screen area */}
      <div
        style={{
          position: "absolute",
          top: SCREEN_INSET.top,
          left: SCREEN_INSET.left,
          right: SCREEN_INSET.right,
          bottom: SCREEN_INSET.bottom,
          overflow: "hidden",
          // Slight inward rounding to soften the pixel edge
          borderRadius: "2px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshot}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>

      {/* window.png overlay — sits on top, non-interactive */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/window.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

// ─── Portrait mobile window frame ────────────────────────────────────────────
// MobWindow.png is 756×1344. Transparent content area (pixel-exact scan):
//   top: 72px → 5.357%  |  left: 24px → 3.175%
//   right: 24px → 3.175% |  bottom: 24px → 1.786%
const MOB_SCREEN_INSET = { top: "5.357%", left: "3.175%", right: "3.175%", bottom: "1.786%" } as const;

function MobPixelWindow({ screenshot, alt }: { screenshot: string; alt: string }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        // Maintain MobWindow.png aspect ratio (756 : 1344 = 9 : 16)
        aspectRatio: "756 / 1344",
        imageRendering: "pixelated",
      }}
    >
      {/* Screenshot clipped to inner content area */}
      <div
        style={{
          position: "absolute",
          top: MOB_SCREEN_INSET.top,
          left: MOB_SCREEN_INSET.left,
          right: MOB_SCREEN_INSET.right,
          bottom: MOB_SCREEN_INSET.bottom,
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshot}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
        />
      </div>

      {/* MobWindow.png overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/MobWindow.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({ p, index, total }: { p: Project; index: number; total: number }) {
  return (
    <>
      {/* ── Desktop layout: image left, info right ── */}
      <div className="hidden md:flex items-center gap-10 lg:gap-16 w-full h-full">
        {/* Pixel window mockup */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <div style={{ width: "100%" }}>
            <PixelWindow screenshot={p.image} alt={p.title} />
          </div>
        </div>

        {/* Info panel */}
        <div className="w-[260px] xl:w-[300px] shrink-0 flex flex-col gap-5">
          {/* Counter + tag row */}
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted-foreground)",
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              style={{
                padding: "0.2rem 0.65rem",
                borderRadius: "9999px",
                background: "var(--color-secondary)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-secondary-foreground)",
              }}
            >
              {p.tag}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-pixelify-sans)",
              fontSize: "clamp(1.6rem, 2.2vw, 2.25rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--color-foreground)",
              margin: 0,
            }}
          >
            {p.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.7,
              color: "var(--navy)",
              fontFamily: "var(--font-pixelify-sans)",
              opacity: 0.85,
              margin: 0,
            }}
          >
            {p.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {p.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: "0.35rem",
                  background: "var(--color-secondary)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.05em",
                  color: "var(--color-secondary-foreground)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-glow transition-shadow"
              >
                Live <ArrowUpRight size={14} />
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground/80 hover:border-sapphire hover:text-sapphire transition-colors"
              >
                <FaGithub size={14} /> Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile layout: card with portrait image, info below ── */}
      <div className="flex md:hidden flex-col w-full h-full gap-5">
        {/* Pixel window — mobile uses portrait screenshot */}
        <div className="flex-shrink-0 w-full">
          <MobPixelWindow screenshot={p.imageMobile} alt={p.title} />
        </div>

        {/* Mobile info */}
        <div className="flex flex-col gap-3 pb-4">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted-foreground)",
              }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span
              style={{
                padding: "0.15rem 0.55rem",
                borderRadius: "9999px",
                background: "var(--color-secondary)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-secondary-foreground)",
              }}
            >
              {p.tag}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-pixelify-sans)",
              fontSize: "1.5rem",
              fontWeight: 400,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {p.title}
          </h2>
          <p
            style={{
              fontSize: "0.8rem",
              lineHeight: 1.65,
              color: "var(--navy)",
              fontFamily: "var(--font-pixelify-sans)",
              opacity: 0.85,
              margin: 0,
            }}
          >
            {p.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {p.tech.map((t) => (
              <span
                key={t}
                style={{
                  padding: "0.15rem 0.5rem",
                  borderRadius: "0.3rem",
                  background: "var(--color-secondary)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.575rem",
                  color: "var(--color-secondary-foreground)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-soft"
              >
                Live <ArrowUpRight size={12} />
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3.5 py-1.5 text-xs font-medium text-foreground/80"
              >
                <FaGithub size={12} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position within the tall wrapper to drive the carousel
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = height - vh;
      if (totalScroll <= 0) return;
      const scrolled = Math.max(0, -top);
      const progress = Math.min(scrolled / totalScroll, 1);
      // Each project occupies an equal band of the scroll range
      const idx = Math.min(
        Math.floor(progress * projects.length),
        projects.length - 1
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-12 sm:pt-48 sm:pb-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl text-5xl font-light leading-[1] tracking-tight sm:text-7xl">
              A record of things I&apos;ve{" "}
              <span className="gradient-text">built</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy font-pixel">
              Full stack products, AI experiments, and digital experiences.
              Scroll to browse.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Scroll-driven carousel ────────────────────────────── */}
      {/* Tall wrapper — gives us N×100vh of scroll real-estate */}
      <div ref={sectionRef} style={{ height: `${projects.length * 100}vh` }}>
        {/* Sticky viewport-height container */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100dvh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Content area — padded for nav clearance */}
          <div
            className="mx-auto w-full max-w-[1440px] px-2 md:px-3"
            style={{
              flex: 1,
              paddingTop: "5rem",
              paddingBottom: "2rem",
              position: "relative",
            }}
          >
            {/* Cards — stacked, absolutely positioned, animated in/out */}
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              {projects.map((p, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={p.title}
                    aria-hidden={!isActive}
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : i < activeIndex ? -24 : 24,
                      scale: isActive ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectCard p={p} index={i} total={projects.length} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Sidebar dot navigator ── */}
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              zIndex: 20,
            }}
          >
            {projects.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "0.3rem",
                  height: activeIndex === i ? "1.5rem" : "0.3rem",
                  borderRadius: "9999px",
                  background:
                    activeIndex === i
                      ? "var(--sapphire)"
                      : "var(--color-border)",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ))}
          </div>

          {/* ── Scroll hint (bottom center) — only show on first project ── */}
          <motion.div
            animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.375rem",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-muted-foreground)",
              }}
            >
              scroll
            </span>
            {/* Animated line */}
            <motion.div
              animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{
                width: "1px",
                height: "2rem",
                background:
                  "linear-gradient(to bottom, var(--color-muted-foreground), transparent)",
                transformOrigin: "top",
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
