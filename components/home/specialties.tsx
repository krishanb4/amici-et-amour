"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { SplitText } from "@/components/motion/split-text"
import { SPECIALTIES } from "@/lib/content"

export function Specialties() {
  const { t } = useLanguage()

  return (
    <section className="bg-surface py-28 lg:py-40">
      <div className="container-edge">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green" />
              Signature Plates
            </span>
            <SplitText
              as="h2"
              text="A short list, cooked with conviction."
              className="mt-6 max-w-xl font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
            />
          </div>
          <Reveal>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-green"
            >
              {t("cta.explore_menu")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.1}
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 sm:[&>*:nth-child(even)]:sm:mt-20"
        >
          {SPECIALTIES.map((dish) => (
            <RevealItem key={dish.id}>
              <article className="group">
                <TiltCard max={6} className="overflow-hidden rounded-sm">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bone">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.img}
                      alt={dish.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </TiltCard>

                <h3 className="mt-5 font-display text-2xl font-medium">{dish.name}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {dish.desc}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
