"use client"

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { TEAM } from "@/lib/content"

export function Team() {
  return (
    <section className="bg-surface py-28 lg:py-40">
      <div className="container-edge">
        <div className="max-w-2xl">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/50" />
            The Artisans
          </span>
          <SplitText
            as="h2"
            text="The hands behind the room."
            className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted-foreground">
              A small brigade, each one quietly obsessive about a single part of the meal.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.12}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM.map((m) => (
            <RevealItem key={m.id}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium">{m.name}</h3>
                    <span className="text-xs uppercase tracking-[0.16em] text-green">
                      {m.role}
                    </span>
                  </div>
                  <blockquote className="mt-2 text-sm italic leading-relaxed text-muted-foreground">
                    {m.quote}
                  </blockquote>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
