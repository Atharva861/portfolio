"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const socials = [
  { href: "https://github.com/Atharva861", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/atharva--salunke", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "mailto:atharvasalunke861@gmail.com", label: "Email", Icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} <Link href="/" className="transition-colors hover:text-foreground">Atharva Salunke</Link>. Crafted with care.
        </div>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              data-cursor="hover"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:border-sapphire hover:text-sapphire hover:shadow-soft"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}