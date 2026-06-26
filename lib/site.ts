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
  phone: "+33 6 16 14 48 48",
  phoneHref: "tel:+33616144848",
  whatsapp: "+33 6 16 14 48 48",
  whatsappHref: "https://wa.me/33616144848",
  address: {
    line1: "1 Grande Rue",
    line2: "92310 Sèvres, France",
    mapsUrl: "https://maps.google.com/?q=1+Grande+Rue+92310+S%C3%A8vres",
  },
  city: "Sèvres",
  currency: "€",
  social: {
    instagram: "https://www.instagram.com/amicietamour",
    facebook: "https://www.facebook.com/share/182zkpFWAM/",
    tiktok: "https://tiktok.com",
  },
} as const
