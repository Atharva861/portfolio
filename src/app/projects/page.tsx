"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Section } from "@/components/section";
import { Reveal, RevealStagger, revealItem } from "@/components/reveal";

type Project = {
  title: string;
  tag: "Full Stack" | "AI / ML" | "Computer Vision";
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
};

// TODO: replace these placeholders with your real project entries.
const projects: Project[] = [
  {
    title: "Project One",
    tag: "Full Stack",
    description:
      "Placeholder — describe the product, your role, and the outcome. Keep it to two crisp sentences.",
    tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    live: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    tag: "AI / ML",
    description:
      "Placeholder — dataset, model, headline metric. Link the demo/repo when ready.",
    tech: ["Python", "PyTorch", "FastAPI"],
    repo: "#",
  },
  {
    title: "Project Three",
    tag: "Computer Vision",
    description:
      "Placeholder — problem, approach, and where it runs (edge, browser, server).",
    tech: ["OpenCV", "PyTorch", "ONNX"],
    live: "#",
  },
  {
    title: "Project Four",
    tag: "Full Stack",
    description: "Placeholder — client project, scope, and impact.",
    tech: ["React", "Node", "MySQL"],
    live: "#",
    repo: "#",
  },
];

export default function Projects() {
  return (
    <>
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-[1360px] px-6 lg:px-8">
          <Reveal>
            <h1 className="max-w-4xl text-5xl font-light leading-[1] tracking-tight sm:text-7xl">
              A record of things I've <span className="gradient-text">built</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy font-pixel">
              Full stack products, AI research, and computer vision experiments. Placeholder cards
              below — paste your details and I'll finish these.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <RevealStagger className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={revealItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft"
              data-cursor="hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-primary">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_55%)]" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ice/90">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ice backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy font-pixel">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[11px] text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-4 py-2 font-medium text-primary-foreground shadow-soft transition-shadow hover:shadow-glow"
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
                      className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-4 py-2 font-medium text-foreground/80 transition-colors hover:border-sapphire hover:text-sapphire"
                    >
                      <FaGithub size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </RevealStagger>
      </Section>
    </>
  );
}
