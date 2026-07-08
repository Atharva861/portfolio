"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Reveal, RevealStagger, revealItem } from "@/components/reveal";
import type { ComponentType } from "react";

type IconType = ComponentType<{ size?: number; className?: string }>;

const cards: {
  label: string;
  handle: string;
  href: string;
  Icon: IconType;
  hint: string;
}[] = [
  {
    label: "Email",
    handle: "atharvasalunke861@gmail.com",
    href: "mailto:atharvasalunke861@gmail.com",
    Icon: Mail as IconType,
    hint: "Fastest way to reach me",
  },
  {
    label: "LinkedIn",
    handle: "in/atharva--salunke",
    href: "https://www.linkedin.com/in/atharva--salunke",
    Icon: FaLinkedinIn as IconType,
    hint: "Let's connect professionally",
  },
  {
    label: "GitHub",
    handle: "@Atharva861",
    href: "https://github.com/Atharva861",
    Icon: FaGithub as IconType,
    hint: "See what I'm building",
  },
];

export default function Contact() {
  return (
    <>
      <section className="relative pt-40 pb-8 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-gradient-soft"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sapphire/20 blur-[120px]"
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-sapphire" />
              Contact
            </div>
            <h1 className="text-5xl font-light leading-[1] tracking-tight sm:text-7xl">
              Let's build something <span className="gradient-text italic">together</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/70">
              I read every message. Whether it's a role, a collaboration, or a curious question —
              the fastest path is email.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <RevealStagger className="grid gap-5 sm:grid-cols-1">
          {cards.map(({ label, handle, href, Icon, hint }) => (
            <motion.a
              key={label}
              variants={revealItem}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-shadow hover:shadow-glow sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-5">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <Icon size={18} />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-1 text-lg font-medium sm:text-xl">{handle}</div>
                  <div className="text-sm text-muted-foreground">{hint}</div>
                </div>
              </div>
              <ArrowUpRight
                size={22}
                className="text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sapphire"
              />
            </motion.a>
          ))}
        </RevealStagger>
      </section>
    </>
  );
}
