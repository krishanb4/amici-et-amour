import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Parallax } from "@/components/motion/parallax"
import { EVENTS } from "@/lib/content"
import { SITE } from "@/lib/site"
import { JsonLd } from "@/components/structured-data"
import { eventSchema, breadcrumbSchema } from "@/lib/seo"

/** Best-effort ISO start/end times for datable events (Paris time). */
const EVENT_DATES: Record<string, { start: string; end: string }> = {
  // 19:00 — late → ~23:30
  harvest: { start: "2026-10-18T19:00:00+02:00", end: "2026-10-18T23:30:00+02:00" },
  // 18:30 — 21:00
  cellar: { start: "2026-11-02T18:30:00+01:00", end: "2026-11-02T21:00:00+01:00" },
}

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === id)
  if (!event) return { title: "Event" }
  return {
    title: event.title,
    description: event.desc,
    alternates: { canonical: `/event/${event.id}` },
    openGraph: {
      type: "article",
      title: event.title,
      description: event.desc,
      url: `/event/${event.id}`,
      images: [{ url: event.img, alt: event.title }],
    },
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === id)
  if (!event) notFound()

  const meta = [
    { icon: CalendarDays, label: event.fullDate },
    { icon: Clock, label: event.time },
    { icon: MapPin, label: event.venue },
    { icon: Users, label: event.seats },
  ]

  return (
    <>
      <JsonLd
        data={[
          eventSchema(event, EVENT_DATES[event.id]),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/event/${event.id}` },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <Parallax speed={0.25} className="h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.img}
            alt={event.title}
            className="h-[120%] w-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-edge pb-12 lg:pb-16">
            <Reveal>
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                All events
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-background/75">
                {event.venue}
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1] tracking-tight text-background">
                {event.title}
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-edge grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-20 lg:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed text-foreground sm:text-3xl">
              {event.desc}
            </p>
          </Reveal>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {event.body.map((para, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Details card */}
        <Reveal direction="left">
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-sm border border-border bg-card p-7 sm:p-8">
              <p className="font-mono text-sm text-green">
                {event.price} {SITE.currency}{" "}
                <span className="text-muted-foreground">per guest</span>
              </p>
              <dl className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-start gap-3 text-sm">
                    <m.icon className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={1.5} />
                    <dd className="text-foreground">{m.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-border pt-6">
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  What's included
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  {event.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={2} />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <Button asChild size="lg" className="mt-7 w-full">
                <Link href="/reservation">
                  Reserve your place
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Or call us on{" "}
                <a href={SITE.phoneHref} className="text-green hover:underline">
                  {SITE.phone}
                </a>
              </p>
            </div>
          </aside>
        </Reveal>
      </section>

      {/* Other events */}
      <section className="border-t border-border bg-surface py-20 lg:py-24">
        <div className="container-edge">
          <h2 className="font-display text-2xl font-normal sm:text-3xl">
            More gatherings
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.filter((e) => e.id !== event.id).map((e) => (
              <Link
                key={e.id}
                href={`/event/${e.id}`}
                className="group flex items-center gap-4 rounded-sm border border-border bg-card p-4 transition-colors hover:border-green/40"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="font-display text-base text-green">{e.date}</span>
                  <h3 className="font-display text-lg font-medium leading-snug transition-colors group-hover:text-green">
                    {e.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
