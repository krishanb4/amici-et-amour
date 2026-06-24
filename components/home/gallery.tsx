"use client"

import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { Marquee } from "@/components/motion/marquee"
import { IMAGES } from "@/lib/images"

function Shot({ src }: { src: string }) {
  return (
    <div className="group relative mx-2 h-52 w-72 shrink-0 overflow-hidden rounded-sm bg-bone sm:mx-3 sm:h-72 sm:w-[26rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
    </div>
  )
}

export function Gallery() {
  const half = Math.ceil(IMAGES.gallery.length / 2)
  const rowA = IMAGES.gallery.slice(0, half)
  const rowB = IMAGES.gallery.slice(half)

  return (
    <section className="overflow-hidden bg-background py-28 lg:py-40">
      <div className="container-edge">
        <div className="max-w-2xl">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/50" />
            The Gallery
          </span>
          <SplitText
            as="h2"
            text="A feast for the eyes, first."
            className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted-foreground">
              From the first pour to the last spoonful — a glimpse of what lands on
              the table at Amici et Amour.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14 flex flex-col gap-3 sm:mt-16 sm:gap-5">
        <Marquee speed={58}>
          {rowA.map((src, i) => (
            <Shot key={`a-${i}`} src={src} />
          ))}
        </Marquee>
        <Marquee speed={66} reverse>
          {rowB.map((src, i) => (
            <Shot key={`b-${i}`} src={src} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  )
}
