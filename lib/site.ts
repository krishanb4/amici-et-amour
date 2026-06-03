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
  phone: "+971 2 123 4567",
  phoneHref: "tel:+97121234567",
  address: {
    line1: "Najda Street",
    line2: "Abu Dhabi, United Arab Emirates",
    mapsUrl: "https://maps.google.com/?q=Najda+Street+Abu+Dhabi",
  },
  currency: "AED",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
} as const
