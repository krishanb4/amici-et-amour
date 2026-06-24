import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Reserve } from "@/components/home/reserve"
import { RESERVATION_NOTES } from "@/lib/content"
import { JsonLd } from "@/components/structured-data"
import { faqSchema, breadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve a table at Amici et Amour, 24 Rue de Castiglione, Paris. We hold the room from 18:00, Monday to Saturday.",
  alternates: { canonical: "/reservation" },
}

/** Common booking questions — surfaced to AI answer engines via FAQ schema. */
const RESERVATION_FAQS = [
  {
    question: "Where is Amici et Amour located?",
    answer:
      "Amici et Amour is at 24 Rue de Castiglione, 75001 Paris, France, in the 1st arrondissement near the Tuileries and Place Vendôme.",
  },
  {
    question: "What are the opening hours?",
    answer: "We serve Monday to Saturday, 11:00–23:00. We are closed on Sundays.",
  },
  {
    question: "What kind of cuisine does Amici et Amour serve?",
    answer:
      "A modern menu where Italian soul meets French finesse — handmade pasta, wood-fired pizza, grill, seafood, dolci, and a low-intervention wine cellar.",
  },
  {
    question: "How do I make a reservation?",
    answer:
      "Book directly through the reservation form on this page, or call +33 1 42 60 38 30. We confirm by email, usually within the hour during service.",
  },
  ...RESERVATION_NOTES.map((n) => ({ question: n.title, answer: n.desc })),
]

export default function ReservationPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(RESERVATION_FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Reservations", path: "/reservation" },
          ]),
        ]}
      />
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
