import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-[1440px] px-4 pt-40 pb-24 sm:pt-48 sm:pb-32", className)}>
      {(eyebrow || title || subtitle) && (
        <div className="mb-14 max-w-3xl">
          {eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-sapphire" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-3xl font-light leading-[1.1] tracking-tight sm:text-5xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-navy font-pixel sm:text-lg">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}