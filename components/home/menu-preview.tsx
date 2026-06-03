"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { MENU_CATEGORIES } from "@/lib/content"
import { IMAGES } from "@/lib/images"
import { cn } from "@/lib/utils"

export function MenuPreview() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, wrap)
    return () => ctx.revert()
  }, [reduce])

  const panelBase =
    "relative flex h-[64vh] min-h-[420px] shrink-0 flex-col justify-between rounded-sm border border-border bg-card p-8"

  return (
    <section
      ref={wrap}
      className="overflow-hidden bg-background py-20 lg:py-0 lg:[height:100dvh]"
    >
      <div
        ref={track}
        className={cn(
          "flex items-center gap-6 px-5 sm:px-8 lg:h-[100dvh] lg:px-12",
          reduce && "snap-x snap-mandatory overflow-x-auto",
        )}
      >
        {/* Intro panel */}
        <div className="flex h-[64vh] min-h-[420px] w-[86vw] shrink-0 flex-col justify-center md:w-[40vw] lg:w-[34vw]">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/50" />
            The Menu
          </span>
          <h2 className="mt-6 font-display text-4xl font-normal leading-[1.02] tracking-tight sm:text-6xl">
            Our masterpiece, course by course.
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            Six chapters that move from the garden to the grill to the last sweet
            note. Scroll across, then come hungry.
          </p>
          <Button asChild size="lg" className="mt-8 w-fit">
            <Link href="/menu">
              {t("cta.explore_menu")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Category panels */}
        {MENU_CATEGORIES.map((c) => (
          <div
            key={c.id}
            className={cn(panelBase, "w-[78vw] snap-center md:w-[34vw] lg:w-[26vw]")}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {c.count} dishes
              </span>
              <span className="h-2 w-2 rounded-full bg-green" />
            </div>
            <div>
              <h3 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                {c.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
            </div>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm font-medium text-green"
            >
              View {c.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}

        {/* Closing image panel */}
        <div className="relative h-[64vh] min-h-[420px] w-[86vw] shrink-0 overflow-hidden rounded-sm md:w-[44vw] lg:w-[36vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.menuPreview}
            alt="A table set at Amici et Amour"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent p-8">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 font-display text-2xl text-background"
            >
              See the full menu
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
