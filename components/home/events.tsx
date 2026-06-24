"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { EVENTS } from "@/lib/content"

export function Events() {
  const { t } = useLanguage()

  return (
    <section className="container-edge py-28 lg:py-40">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SplitText
          as="h2"
          text="Gatherings worth the table."
          className="max-w-xl font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
        />
        <Reveal>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-green"
          >
            {t("cta.view_all")}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-border">
        {EVENTS.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.06}>
            <Link
              href={`/event/${e.id}`}
              className="group grid grid-cols-1 items-center gap-5 border-b border-border py-8 transition-colors hover:bg-surface/60 sm:grid-cols-[5rem_8rem_1fr_auto] sm:gap-8 sm:px-3"
            >
              <span className="font-display text-2xl text-green">{e.date}</span>

              <div className="relative h-28 w-full overflow-hidden rounded-sm sm:h-20 sm:w-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-2xl font-medium sm:text-3xl">{e.title}</h3>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {e.venue}
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {e.desc}
                </p>
              </div>

              <ArrowUpRight className="hidden size-6 text-muted-foreground transition-all duration-300 group-hover:text-green sm:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
