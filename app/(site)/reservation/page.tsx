import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Reserve } from "@/components/home/reserve"
import { RESERVATION_NOTES } from "@/lib/content"

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at Amici et Amour, 24 Rue de Castiglione, Paris. We hold the room from 18:00, Monday to Saturday.",
}

export default function ReservationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reservations · Réservations"
        title={
          <>
            Save your <span className="italic text-green">table.</span>
          </>
        }
        lede="Tell us when, and for how many. We'll confirm by email — usually within the hour during service."
        className="pb-6 lg:pb-8"
      />

      <Reserve showHeading={false} className="container-edge pb-24 pt-0 lg:pb-28 lg:pt-0" />

      {/* Good to know */}
      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <div className="container-edge">
          <div className="max-w-2xl">
            <span className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-green/50" />
              Good to know
            </span>
            <h2 className="mt-5 font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Before you book.
            </h2>
          </div>

          <RevealGroup
            stagger={0.08}
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2"
          >
            {RESERVATION_NOTES.map((note) => (
              <RevealItem key={note.title}>
                <div className="flex h-full flex-col bg-card p-7 sm:p-8">
                  <h3 className="font-display text-xl font-medium sm:text-2xl">{note.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {note.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-10 text-sm text-muted-foreground">
              Prefer to talk it through? We're happy to take your booking by phone during
              opening hours.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
