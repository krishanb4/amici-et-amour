"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"

/**
 * SectionHeading — the consistent section intro: a gold eyebrow, a split-text
 * display title, and an optional lead paragraph. Center or left aligned.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
  titleClassName?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="up">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/40" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <SplitText
        as="h2"
        text={title}
        className={cn(
          "font-display text-4xl font-light leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
      />

      {description ? (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  )
}
