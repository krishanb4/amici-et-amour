"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { SplitText } from "@/components/motion/split-text"
import { STATS } from "@/lib/content"
import { IMAGES } from "@/lib/images"

export function Story() {
  const { t } = useLanguage()

  return (
    <section className="container-edge grid grid-cols-1 items-center gap-12 py-28 lg:grid-cols-2 lg:gap-20 lg:py-40">
      {/* Image — left, parallax, with a small detail crop overlap */}
      <Reveal direction="right" className="relative order-2 lg:order-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Parallax speed={0.4} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.story}
              alt="Chef plating in the Amici et Amour kitchen"
              loading="lazy"
              className="h-[112%] w-full object-cover"
            />
          </Parallax>
        </div>
        <div className="absolute -bottom-8 -right-4 hidden h-40 w-40 overflow-hidden rounded-sm border-4 border-background sm:block lg:-right-8 lg:h-52 lg:w-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.storyDetail}
            alt="Fresh herbs and ingredients"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Copy — right */}
      <div className="order-1 lg:order-2">
        <Reveal>
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green" />
            Our Culinary Story
          </span>
        </Reveal>

        <SplitText
          as="h2"
          text="We cook with heart and instinct."
          className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Amici et Amour began with a simple belief: that the best food is honest
            food. Recipes carried from Bologna and Lyon, cooked with local hands and
            ingredients pulled at their peak.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-green"
          >
            {t("cta.read_story")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <div>
                <p className="font-display text-4xl font-medium leading-none sm:text-5xl">
                  {s.value}
                  <span className="ml-1 align-top text-base text-green">{s.suffix}</span>
                </p>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
