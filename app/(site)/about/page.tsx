import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { SplitText } from "@/components/motion/split-text"
import { VALUES, TIMELINE, STATS } from "@/lib/content"
import { IMAGES } from "@/lib/images"
import { JsonLd } from "@/components/structured-data"
import { breadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About",
  description:
    "Amici et Amour — Italian soul, French finesse. Fifteen years of honest food cooked with heart, in the heart of Paris.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        eyebrow="About · Notre Maison"
        title={
          <>
            Italian soul, <span className="italic text-green">French finesse.</span>
          </>
        }
        lede="Fifteen years at the same table off Rue de Castiglione, cooking the food we grew up on — recipes carried from Bologna and Lyon, plated with a little romance."
      />

      {/* Philosophy — image + copy */}
      <section className="container-edge grid grid-cols-1 items-center gap-12 pb-28 lg:grid-cols-2 lg:gap-20 lg:pb-40">
        <Reveal direction="right" className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Parallax speed={0.4} className="h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.story}
                alt="A signature plate at Amici et Amour"
                loading="lazy"
                className="h-[112%] w-full object-cover"
              />
            </Parallax>
          </div>
          <div className="absolute -bottom-8 -right-4 hidden h-40 w-40 overflow-hidden rounded-sm border-4 border-background sm:block lg:-right-8 lg:h-52 lg:w-52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.storyDetail}
              alt="A detail from the pass"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/50" />
            Our Belief
          </span>
          <SplitText
            as="h2"
            text="The best food is honest food."
            className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
          />
          <div className="mt-7 max-w-md space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <Reveal delay={0.08}>
              <p>
                Amici et Amour began with a simple conviction: that an ingredient at
                its peak, handled with respect, needs very little help. We build the
                menu around what the growers and fishermen send us, then get out of
                its way.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Two coasts, one kitchen — the warmth of an Italian home and the
                precision of a French one. It is the food we cook for the people we
                love, served to anyone who pulls up a chair.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-28 lg:py-40">
        <div className="container-edge">
          <div className="max-w-2xl">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green/50" />
              How We Cook
            </span>
            <SplitText
              as="h2"
              text="Four things we never compromise."
              className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
            />
          </div>

          <RevealGroup
            stagger={0.08}
            className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2"
          >
            {VALUES.map((v, i) => (
              <RevealItem key={v.id}>
                <div className="flex h-full flex-col bg-card p-8 sm:p-10">
                  <span className="font-mono text-xs text-green">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium sm:text-3xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {v.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Stats */}
      <section className="container-edge py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-10 border-y border-border py-12 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <p className="font-display text-5xl font-medium leading-none sm:text-6xl">
                  {s.value}
                  <span className="ml-1 align-top text-base text-green">{s.suffix}</span>
                </p>
                <p className="mt-3 text-sm leading-snug text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-edge pb-28 lg:pb-40">
        <div className="max-w-2xl">
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green/50" />
            The Long Way Here
          </span>
          <SplitText
            as="h2"
            text="A few tables ago."
            className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
          />
        </div>

        <div className="mt-14 border-t border-border">
          {TIMELINE.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-4 border-b border-border py-8 sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-10">
                <span className="font-display text-3xl text-green sm:text-4xl">{m.year}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium sm:text-3xl">{m.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {m.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Image break */}
      <section className="overflow-hidden">
        <Reveal>
          <div className="relative h-[52vh] min-h-[360px] w-full overflow-hidden">
            <Parallax speed={0.3} className="h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.interior}
                alt="The dining room at Amici et Amour"
                loading="lazy"
                className="h-[120%] w-full object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <p className="container-edge pb-10 font-display text-2xl text-background sm:text-3xl">
                24 Rue de Castiglione · <span className="italic">come hungry.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-edge flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Pull up a chair. <span className="italic text-green">Stay a while.</span>
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              We hold the room from 18:00, Monday to Saturday.
            </p>
          </div>
          <Button asChild size="xl">
            <Link href="/reservation">
              Reserve a Table
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
