"use client"

import { Star } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { RECOGNITION } from "@/lib/content"

export function Recognition() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-edge flex flex-col items-center gap-6 py-9 text-center md:flex-row md:justify-between md:gap-10 md:text-left lg:py-8">
        {/* Guest rating */}
        <Reveal className="flex items-center gap-3">
          <span className="flex items-center gap-0.5 text-green" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-[15px] fill-current" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{RECOGNITION.rating.score}</span> from{" "}
            {RECOGNITION.rating.count} guest reviews
          </span>
        </Reveal>

        {/* Press recognition */}
        <Reveal delay={0.08} className="flex flex-col items-center gap-x-6 gap-y-2 md:flex-row">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/55">
            As featured in
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5">
            {RECOGNITION.press.map((name) => (
              <li
                key={name}
                className="font-display text-base italic leading-none text-foreground/75"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
