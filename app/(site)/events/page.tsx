import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { EVENTS } from "@/lib/content"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Events",
  description:
    "Gatherings worth the table — the Harvest Table, Cellar Sessions, and the Chef's Counter at Amici et Amour, Paris.",
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events · Le Programme"
        title={
          <>
            Gatherings worth <span className="italic text-green">the table.</span>
          </>
        }
        lede="A handful of evenings each season when the room becomes something else — a single long table, an open cellar, seven seats at the fire."
      />

      <section className="container-edge pb-28 lg:pb-36">
        <RevealGroup stagger={0.1} className="grid grid-cols-1 gap-10 lg:gap-14">
          {EVENTS.map((e) => (
            <RevealItem key={e.id}>
              <Link
                href={`/event/${e.id}`}
                className="group grid grid-cols-1 overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-green/40 lg:grid-cols-[1.1fr_1fr]"
              >
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-sm bg-background/90 px-3 py-1.5 font-display text-lg text-green backdrop-blur">
                    {e.date}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
                  <div>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {e.venue}
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
                      {e.title}
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {e.desc}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-green" strokeWidth={1.5} />
                        {e.time}
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="size-4 text-green" strokeWidth={1.5} />
                        {e.seats}
                      </li>
                    </ul>
                    <div className="flex items-center justify-between border-t border-border pt-5">
                      <span className="font-mono text-sm text-green">
                        {e.price} {SITE.currency} <span className="text-muted-foreground">per guest</span>
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-green">
                        Discover
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Private dining CTA */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-edge flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green/50" />
              Private Dining
            </span>
            <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Something of your own.
            </h2>
            <p className="mt-3 flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-1 size-4 shrink-0 text-green" strokeWidth={1.5} />
              The courtyard and the cellar both host private parties. Tell us the date
              and the occasion, and we'll build the evening around it.
            </p>
          </div>
          <Button asChild size="xl" variant="line">
            <Link href="/contact">Enquire</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
