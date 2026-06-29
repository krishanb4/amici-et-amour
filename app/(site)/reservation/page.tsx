import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { Reserve } from "@/components/home/reserve"
import { RESERVATION_NOTES } from "@/lib/content"
import { SITE } from "@/lib/site"
import { JsonLd } from "@/components/structured-data"
import { faqSchema, breadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Réserver une table",
  description:
    "Réservez votre table chez Amici et Amour, 1 Grande Rue, 92310 Sèvres. Pizzeria et restaurant italien, du lundi au samedi de 11h00 à 23h00.",
  alternates: { canonical: "/reservation" },
}

/** Questions fréquentes — exposées aux moteurs de réponse (IA) via le schema FAQ. */
const RESERVATION_FAQS = [
  {
    question: "Où se trouve Amici et Amour ?",
    answer:
      "Amici et Amour se trouve au 1 Grande Rue, 92310 Sèvres, dans les Hauts-de-Seine, juste au sud-ouest de Paris — à quelques minutes de Boulogne-Billancourt, Ville-d'Avray et Saint-Cloud, près du parc de Saint-Cloud et de la manufacture de Sèvres.",
  },
  {
    question: "Quel type de restaurant est Amici et Amour ?",
    answer:
      "Une pizzeria et un restaurant italien à Sèvres, doublé d'un bar : pizzas au feu de bois à pâte maturée, pâtes fraîches, antipasti, grillades et dolci maison.",
  },
  {
    question: "Faites-vous des pizzas ?",
    answer:
      "Oui — la pizza est notre spécialité. Pizzas au feu de bois sur une pâte longuement maturée, avec des produits italiens. À déguster sur place au restaurant ou au bar.",
  },
  {
    question: "Diffusez-vous les matchs de foot et de rugby ?",
    answer:
      "Oui, notre bar retransmet les grands matchs en direct sur écran (football, rugby et grands événements sportifs), avec une carte de pizzas, planches, cocktails et bières.",
  },
  {
    question: "Quels sont les horaires d'ouverture ?",
    answer: "Nous sommes ouverts du lundi au samedi, de 11h00 à 23h00. Fermé le dimanche.",
  },
  {
    question: "Comment réserver une table ?",
    answer:
      `Réservez directement via le formulaire sur cette page, ou appelez-nous / écrivez-nous sur WhatsApp au ${SITE.phone}. Nous confirmons par e-mail, généralement dans l'heure pendant le service.`,
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
              <span className="h-px w-8 bg-green" />
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
