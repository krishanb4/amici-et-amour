"use client"

import { Reveal } from "@/components/motion/reveal"
import { TESTIMONIALS } from "@/lib/content"

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS

  return (
    <section className="bg-background py-28 lg:py-40">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Featured guest quote */}
          <Reveal className="lg:col-span-7">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green" />
              From Our Guests
            </span>
            <figure className="mt-8">
              <blockquote className="font-display text-3xl font-normal italic leading-[1.18] tracking-tight text-foreground sm:text-4xl lg:text-[2.85rem]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-px w-10 bg-green" aria-hidden />
                <span className="text-sm leading-snug">
                  <span className="font-medium text-foreground">{featured.name}</span>
                  <span className="block text-muted-foreground">{featured.detail}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting quotes */}
          <div className="flex flex-col justify-center gap-9 lg:col-span-5">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={0.1 + i * 0.08}>
                <figure className="border-l-2 border-green/30 pl-5">
                  <blockquote className="text-lg leading-relaxed text-foreground/85">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{item.name}</span>, {item.detail}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
