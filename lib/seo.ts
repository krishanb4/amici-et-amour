import { SITE } from "@/lib/site"

/**
 * Central SEO + AEO (Answer Engine Optimization) config.
 *
 * - SITE_URL: canonical production origin (override with NEXT_PUBLIC_SITE_URL).
 * - OG_IMAGE: the 1200×630 social-share card. Defaults to the committed
 *   /og-image.png; point NEXT_PUBLIC_OG_IMAGE_URL at the Cloudflare R2 URL
 *   once uploaded and it is used everywhere automatically.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://amicietamour.fr"
).replace(/\/$/, "")

/** Social share image — R2 URL when set, else the repo fallback. */
export const OG_IMAGE =
  process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim() || `${SITE_URL}/og-image.png`

export const OG_IMAGE_ALT =
  "Amici et Amour — Italian & French fine dining in Paris"

/** Absolute URL helper. */
export const abs = (path = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`

export const seoConfig = {
  name: SITE.name,
  shortName: "Amici",
  legalName: "Amici et Amour",
  description:
    "A modern table where Italian soul meets French finesse, in the heart of Paris. Reserve a table, explore the menu, and taste craft, tradition, and passion.",
  tagline: "Italian soul, French finesse.",
  locale: "en_US",
  altLocales: ["fr_FR"],
  cuisines: ["Italian", "French", "Mediterranean"],
  priceRange: "€€€€",
  geo: { latitude: 48.86653, longitude: 2.32702 },
  // Mon–Sat 11:00–23:00, Sun closed (mirrors /contact).
  hours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "11:00", closes: "23:00" }],
  rating: { value: "4.8", count: "2300" },
  keywords: [
    "Amici et Amour",
    "Italian restaurant Paris",
    "French restaurant Paris",
    "fine dining Paris",
    "restaurant Rue de Castiglione",
    "Paris 1er restaurant",
    "Italian French cuisine Paris",
    "pasta Paris",
    "wine bar Paris",
    "private dining Paris",
  ],
} as const

const sameAs = [SITE.social.instagram, SITE.social.facebook, SITE.social.tiktok]

/** schema.org Restaurant (LocalBusiness) — the primary AEO entity. */
export function restaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: seoConfig.name,
    description: seoConfig.description,
    url: SITE_URL,
    telephone: SITE.phone,
    email: SITE.email,
    image: [OG_IMAGE, abs("/hero.jpg")],
    logo: abs("/icon-512.png"),
    servesCuisine: [...seoConfig.cuisines],
    priceRange: seoConfig.priceRange,
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    acceptsReservations: abs("/reservation"),
    hasMenu: abs("/menu"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Paris",
      postalCode: "75001",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoConfig.geo.latitude,
      longitude: seoConfig.geo.longitude,
    },
    hasMap: SITE.address.mapsUrl,
    openingHoursSpecification: seoConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: seoConfig.rating.value,
      reviewCount: seoConfig.rating.count,
      bestRating: "5",
    },
    sameAs,
  }
}

/** schema.org Organization. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: seoConfig.legalName,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs("/icon-512.png"), width: 512, height: 512 },
    image: OG_IMAGE,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs,
  }
}

/** schema.org WebSite. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: seoConfig.name,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

/** BreadcrumbList from [{name, path}] crumbs. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

type MenuSection = { id: string; name: string; note: string }
type MenuItem = { name: string; desc: string; price: number }

/** schema.org Menu with sections and a few featured items (priced). */
export function menuSchema(sections: MenuSection[], featured: MenuItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: "Amici et Amour — La Carte",
    url: abs("/menu"),
    inLanguage: "en",
    provider: { "@id": `${SITE_URL}/#restaurant` },
    hasMenuSection: sections.map((s) => ({
      "@type": "MenuSection",
      name: s.name,
      description: s.note,
    })),
    hasMenuItem: featured.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.desc,
      offers: {
        "@type": "Offer",
        price: item.price,
        priceCurrency: "EUR",
      },
    })),
  }
}

type EventInput = {
  id: string
  title: string
  desc: string
  fullDate: string
  venue: string
  price: number
  img: string
}

/** schema.org Event (a hosted dining event). `startDate` is best-effort ISO. */
export function eventSchema(e: EventInput, startDate?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.desc,
    url: abs(`/event/${e.id}`),
    image: abs(e.img),
    ...(startDate ? { startDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${seoConfig.name} · ${e.venue}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.line1,
        addressLocality: "Paris",
        postalCode: "75001",
        addressCountry: "FR",
      },
    },
    organizer: { "@type": "Organization", name: seoConfig.name, url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: e.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: abs("/reservation"),
    },
  }
}

type ArticleInput = {
  id: string
  title: string
  excerpt: string
  img: string
  author: string
  date: string
  category: string
}

/** schema.org BlogPosting for a journal article. */
export function articleSchema(a: ArticleInput, isoDate?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    image: abs(a.img),
    articleSection: a.category,
    url: abs(`/blog/${a.id}`),
    ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
    author: { "@type": "Person", name: a.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/blog/${a.id}`) },
    inLanguage: "en",
  }
}
