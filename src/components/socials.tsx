"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { ComponentType } from "react";

type IconType = ComponentType<{ size?: number; className?: string }>;
export const SOCIALS: { href: string; label: string; Icon: IconType }[] = [
  { href: "https://github.com/Atharva861", label: "GitHub", Icon: FaGithub as IconType },
  { href: "https://www.linkedin.com/in/atharva--salunke", label: "LinkedIn", Icon: FaLinkedinIn as IconType },
  { href: "mailto:atharvasalunke861@gmail.com", label: "Email", Icon: Mail as IconType },
];

export function SocialRow({ size = 18 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          data-cursor="hover"
          className="group relative grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:border-sapphire hover:text-sapphire hover:shadow-soft"
        >
          <Icon size={size} />
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md bg-navy px-2 py-0.5 text-[10px] font-medium text-ice opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}