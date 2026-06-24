"use client"

import Link from "next/link"
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react"
import { NAV_LINKS, SITE } from "@/lib/site"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/motion/reveal"
import { NewsletterForm } from "@/components/layout/newsletter-form"

export function Footer() {
  const { t } = useLanguage()
  const year = 2026

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-edge py-20">
        {/* Newsletter band */}
        <Reveal className="flex flex-col gap-8 border-b border-border pb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl">
              Join our table.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {t("footer.newsletter_blurb")}
            </p>
          </div>
          <NewsletterForm className="w-full max-w-sm" />
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <Reveal className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="font-display text-3xl font-medium">
              Amici <span className="italic text-green">et</span> Amour
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.blurb")}
            </p>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t("footer.quick_links")}
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-green"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservation"
                  className="text-muted-foreground transition-colors hover:text-green"
                >
                  {t("nav.reserve")}
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t("footer.hours")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex flex-col">
                <span className="text-foreground">{t("hours.weekdays")}</span>
                <span>{t("hours.weekdays_time")}</span>
              </li>
              <li className="flex flex-col">
                <span className="text-foreground">{t("hours.sunday")}</span>
                <span>{t("hours.sunday_time")}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              {t("footer.contact")}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 transition-colors hover:text-green"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-green" strokeWidth={1.5} />
                  <span>
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-green"
                >
                  <Phone className="size-4 shrink-0 text-green" strokeWidth={1.5} />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-green"
                >
                  <Mail className="size-4 shrink-0 text-green" strokeWidth={1.5} />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <div className="mt-1 flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-green hover:text-green"
              >
                <Instagram className="size-4" strokeWidth={1.5} />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-green hover:text-green"
              >
                <Facebook className="size-4" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-green">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-green">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
