"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

/**
 * PageHeader — the shared editorial header used at the top of every interior
 * page: a green eyebrow, an oversized display title (italic-green emphasis is
 * supported by passing a ReactNode), and an optional lede. Matches the menu
 * page header rhythm.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  className,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  className?: string
  children?: ReactNode
}) {
  return (
    <section className={cn("container-edge pt-32 pb-12 lg:pt-40 lg:pb-16", className)}>
      <Reveal>
        <span className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-green" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]">
          {title}
        </h1>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        </Reveal>
      ) : null}

      {children}
    </section>
  )
}
