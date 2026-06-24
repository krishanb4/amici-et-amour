import type { DictKey } from "@/lib/i18n/dictionaries"

/** Central site metadata, navigation, and contact constants. */

export const NAV_LINKS: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/menu", key: "nav.menu" },
  { href: "/about", key: "nav.about" },
  { href: "/events", key: "nav.events" },
  { href: "/blogs", key: "nav.journal" },
  { href: "/contact", key: "nav.contact" },
]

export const SITE = {
  name: "Amici et Amour",
  email: "contact@amicietamour.fr",
  phone: "+33 1 42 60 38 30",
  phoneHref: "tel:+33142603830",
  address: {
    line1: "24 Rue de Castiglione",
    line2: "75001 Paris, France",
    mapsUrl: "https://maps.google.com/?q=24+Rue+de+Castiglione+75001+Paris",
  },
  city: "Paris",
  currency: "€",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const
