import type { Metadata } from "next"
import { MapPin, Phone, MessageCircle, Mail, Clock, Instagram, Facebook } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/motion/reveal"
import { ContactForm } from "@/components/contact/contact-form"
import { SITE } from "@/lib/site"
import { JsonLd } from "@/components/structured-data"
import { breadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact & Accès",
  description:
    "Amici et Amour, pizzeria et restaurant italien au 1 Grande Rue, 92310 Sèvres. Appelez-nous, écrivez sur WhatsApp ou laissez un message — réservations, privatisations et presse.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Contact · Nous Trouver"
        title={
          <>
            Come say <span className="italic text-green">hello.</span>
          </>
        }
        lede="A reservation, a private evening, a question for the kitchen — whatever it is, there's a person at the other end."
      />

      <section className="container-edge grid grid-cols-1 gap-12 pb-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:pb-36">
        {/* Details */}
        <Reveal direction="right">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                The address
              </h2>
              <a
                href={SITE.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 flex items-start gap-3"
              >
                <MapPin className="mt-1 size-5 shrink-0 text-green" strokeWidth={1.5} />
                <span className="font-display text-2xl leading-snug transition-colors group-hover:text-green sm:text-3xl">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  Speak to us
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm">
                  <li>
                    <a
                      href={SITE.phoneHref}
                      className="flex items-center gap-2.5 text-foreground transition-colors hover:text-green"
                    >
                      <Phone className="size-4 shrink-0 text-green" strokeWidth={1.5} />
                      {SITE.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 text-foreground transition-colors hover:text-green"
                    >
                      <MessageCircle className="size-4 shrink-0 text-green" strokeWidth={1.5} />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="flex items-center gap-2.5 text-foreground transition-colors hover:text-green"
                    >
                      <Mail className="size-4 shrink-0 text-green" strokeWidth={1.5} />
                      {SITE.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                  Opening hours
                </h2>
                <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={1.5} />
                    <span>
                      <span className="text-foreground">Monday — Saturday</span>
                      <br />
                      11:00 — 23:00
                    </span>
                  </li>
                  <li className="pl-[26px]">
                    <span className="text-foreground">Sunday</span> · Closed
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
                Follow along
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-green hover:text-green"
                >
                  <Instagram className="size-4" strokeWidth={1.5} />
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-green hover:text-green"
                >
                  <Facebook className="size-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal direction="left">
          <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
            <h2 className="font-display text-2xl font-medium sm:text-3xl">Send a note</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We read every message and reply within a day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
