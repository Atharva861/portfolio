"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";
import { Section } from "@/components/section";
import { Reveal, RevealStagger, revealItem } from "@/components/reveal";
import { PixelCharacter } from "@/components/pixel-character";
import { GeistPixelGrid } from "geist/font/pixel";

const skills = [
  { title: "Programming", items: ["JavaScript", "TypeScript", "Python", "SQL", "C++"] },
  { title: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "shadcn/ui"] },
  { title: "Backend", items: ["Next.js API Routes", "FastAPI", "REST APIs"] },
  { title: "Databases", items: ["MySQL", "MongoDB"] },
  { title: "AI / ML", items: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "Pandas", "NumPy"] },
  { title: "Tools", items: ["Git", "Cloudflare", "GitHub", "VS Code"] },
  { title: "Deployment", items: ["Cloudflare Pages", "Vercel"] },
];

const interests = [
  "Building production software",
  "Machine Learning",
  "Backend Engineering",
  "Performance Optimization",
  "Open Source",
];

const featured = [
  {
    title: "Project One",
    tag: "Full Stack",
    description:
      "Placeholder — paste your project details and I'll swap this card. Highlight the problem, your role, and the impact.",
  },
  {
    title: "Project Two",
    tag: "AI / ML",
    description:
      "Placeholder — describe the dataset, architecture, and metric wins. A short outcome line lands harder than a long list.",
  },
  {
    title: "Project Three",
    tag: "Computer Vision",
    description:
      "Placeholder — mention model, real-time constraints, and where it runs. Link the demo or repo when ready.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-[1360px] px-6 lg:px-8">
          <div className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:items-center md:gap-8 lg:gap-12">
            <div className="flex-1 max-w-full md:max-w-[58%] lg:max-w-[65%]">
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className={`${GeistPixelGrid.className} font-pixel header-gradient-text text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-normal leading-[1.08] tracking-normal`}
              >
                Building software<br />
                with intention.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-navy/85 dark:text-ice/85 font-mono"
              >
                Modern web applications,<br />
                AI experiments,<br />
                and digital experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="flex w-full justify-center md:w-auto md:justify-end md:shrink-0 lg:-mr-6 xl:-mr-12"
            >
              <PixelCharacter className="w-64 sm:w-72 md:w-60 lg:w-80 xl:w-96" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        eyebrow="About"
        title={
          <>
            Engineer at heart, <span className="gradient-text italic">builder</span> by practice.
          </>
        }
      >
        <div className="grid gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
              <p>
                I&apos;m Atharva — a final-year Computer Engineering student who found programming and
                never really stopped. What began as tinkering with small scripts grew into an
                obsession with well-crafted software: fast, reliable, and quietly elegant.
              </p>
              <p>
                My work sits at the intersection of Software Engineering, AI, Computer Vision, and
                Problem Solving. I like shipping systems that behave — clean APIs on the backend,
                honest interfaces on the front, and models that actually move a metric.
              </p>
              <p>
                Whether it&apos;s a client project, a research prototype, or a weekend experiment, I try
                to leave the code better than I found it.
              </p>
            </div>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.1}>
            <div className="glass rounded-3xl p-6">
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Currently into
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-sm text-foreground/80"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        id="skills"
        eyebrow="Skills"
        title={<>The toolkit.</>}
        subtitle="Languages, frameworks, and tools I reach for — split by where they live in a project."
      >
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((cat) => (
            <motion.div
              key={cat.title}
              variants={revealItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-glow"
              data-cursor="hover"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">{cat.title}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(cat.items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section
        id="featured"
        eyebrow="Featured Work"
        title={
          <>
            Selected <span className="gradient-text italic">projects</span>.
          </>
        }
        subtitle="A short preview — the full case studies live on the projects page."
      >
        <RevealStagger className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <motion.article
              key={p.title}
              variants={revealItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft"
              data-cursor="hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-primary">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ice/90">
                  0{i + 1} / {featured.length}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-medium">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-sapphire">
                  Case study
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </RevealStagger>

        <div className="mt-12">
          <Link href="/projects">
            <AnimatedButton variant="ghost">
              See all projects <ArrowRight size={16} />
            </AnimatedButton>
          </Link>
        </div>
      </Section>
    </>
  );
}
