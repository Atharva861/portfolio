"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, FileText, Sparkles } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";
import { Section } from "@/components/section";
import { Reveal, RevealStagger, revealItem } from "@/components/reveal";
import { SocialRow } from "@/components/socials";

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
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh] bg-gradient-soft"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-sapphire/20 blur-[120px]"
        />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
          >
            <Sparkles size={12} className="text-sapphire" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-5xl text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-[92px]"
          >
            Atharva <span className="gradient-text italic">Salunke</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-6 font-mono text-sm uppercase tracking-[0.28em] text-muted-foreground sm:text-base"
          >
            Full Stack Developer <span className="text-sapphire">•</span> AI/ML Engineer{" "}
            <span className="text-sapphire">•</span> Computer Vision Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.55 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl"
          >
            Final-year Computer Engineering student shipping production-grade web applications,
            exploring AI research, and building for real clients. Software is a craft I care about
            deeply — from the last query to the first pixel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/projects">
              <AnimatedButton>
                View my work <ArrowRight size={16} />
              </AnimatedButton>
            </Link>
            <Link href="/contact">
              <AnimatedButton variant="ghost">Get in touch</AnimatedButton>
            </Link>
            <div className="ml-1 hidden sm:block">
              <SocialRow />
            </div>
          </motion.div>

          <div className="mt-8 sm:hidden">
            <SocialRow />
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
                I'm Atharva — a final-year Computer Engineering student who found programming and
                never really stopped. What began as tinkering with small scripts grew into an
                obsession with well-crafted software: fast, reliable, and quietly elegant.
              </p>
              <p>
                My work sits at the intersection of Software Engineering, AI, Computer Vision, and
                Problem Solving. I like shipping systems that behave — clean APIs on the backend,
                honest interfaces on the front, and models that actually move a metric.
              </p>
              <p>
                Whether it's a client project, a research prototype, or a weekend experiment, I try
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

      {/* RESUME */}
      <Section
        id="resume"
        eyebrow="Resume"
        title={<>Interactive résumé.</>}
        subtitle="Preview it inline or grab the PDF."
      >
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 bg-card/60 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">Atharva_Salunke_Resume.pdf</div>
                  <div className="text-xs text-muted-foreground">Updated recently</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  <AnimatedButton variant="ghost">
                    Open in new tab <ArrowUpRight size={16} />
                  </AnimatedButton>
                </a>
                <a href="/resume.pdf" download>
                  <AnimatedButton>
                    Download <Download size={16} />
                  </AnimatedButton>
                </a>
              </div>
            </div>
            <div className="aspect-[4/5] w-full bg-secondary sm:aspect-[16/10]">
              <object data="/resume.pdf" type="application/pdf" className="h-full w-full">
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
                  Your browser can't preview PDFs inline —{" "}
                  <a className="ml-1 text-sapphire underline" href="/resume.pdf">
                    download it here
                  </a>
                  .
                </div>
              </object>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
