"use client"

import Link from "next/link"
import { Plus, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { SplitText } from "@/components/motion/split-text"
import { useCart } from "@/lib/store/cart"
import { SPECIALTIES } from "@/lib/content"
import { SITE } from "@/lib/site"

export function Specialties() {
  const { t } = useLanguage()
  const add = useCart((s) => s.add)

  return (
    <section className="bg-surface py-28 lg:py-40">
      <div className="container-edge">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green/50" />
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
                    <button
                      type="button"
                      onClick={() => {
                        add({ id: dish.id, name: dish.name, price: dish.price, image: dish.img })
                        toast.success(`${dish.name} added to your plate.`)
                      }}
                      aria-label={`Add ${dish.name} to cart`}
                      className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>
                </TiltCard>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-medium">{dish.name}</h3>
                  <span className="shrink-0 font-mono text-sm text-green">
                    {dish.price} {SITE.currency}
                  </span>
                </div>
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
