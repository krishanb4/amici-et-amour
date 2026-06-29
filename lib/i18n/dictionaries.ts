/**
 * EN / FR dictionary for Amici et Amour.
 * Flat dot-namespaced keys, looked up via the `t()` helper from the
 * language context. Missing keys fall back to the key itself in dev.
 */

export type Locale = "en" | "fr"

export const LOCALES: Locale[] = ["en", "fr"]
// French-first: the audience is local (Sèvres / Hauts-de-Seine) and searches in French.
export const DEFAULT_LOCALE: Locale = "fr"

export const dictionaries = {
  en: {
    "brand.name": "Amici et Amour",
    "brand.tagline": "Pizzeria & Italian Restaurant",

    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.events": "Events",
    "nav.journal": "Journal",
    "nav.contact": "Contact",
    "nav.reserve": "Reserve a Table",

    "hero.location": "Sèvres",
    "hero.lede":
      "A wood-fired pizzeria, Italian kitchen and bar in Sèvres — pizzas, fresh pasta, and the big matches on screen, minutes from Paris.",

    "cta.explore_menu": "Explore Menu",
    "cta.read_story": "Read Our Story",
    "cta.view_all": "View All",
    "cta.reserve": "Reserve a Table",
    "cta.order_now": "Order Now",
    "cta.subscribe": "Subscribe",
    "cta.send": "Send",
    "cta.learn_more": "Learn More",

    "footer.blurb":
      "A wood-fired pizzeria and Italian table in Sèvres, with a bar that screens the big matches — pizza, pasta, and good company, minutes from Paris.",
    "footer.quick_links": "Quick Links",
    "footer.hours": "Opening Hours",
    "footer.location": "Location",
    "footer.contact": "Contact",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_blurb": "Join our table. Seasonal menus, events, and quiet luxuries — to your inbox.",
    "footer.email_placeholder": "Your email address",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    "hours.weekdays": "Monday – Saturday",
    "hours.weekdays_time": "11:00 — 23:00",
    "hours.sunday": "Sunday",
    "hours.sunday_time": "Closed",

    "common.loading": "Loading…",
  },
  fr: {
    "brand.name": "Amici et Amour",
    "brand.tagline": "Pizzeria & Restaurant Italien",

    "nav.home": "Accueil",
    "nav.menu": "Carte",
    "nav.about": "À Propos",
    "nav.events": "Événements",
    "nav.journal": "Journal",
    "nav.contact": "Contact",
    "nav.reserve": "Réserver une Table",

    "hero.location": "Sèvres",
    "hero.lede":
      "Pizzeria au feu de bois, cuisine italienne et bar à Sèvres — pizzas, pâtes fraîches et les grands matchs sur écran, à deux pas de Paris.",

    "cta.explore_menu": "Découvrir la Carte",
    "cta.read_story": "Notre Histoire",
    "cta.view_all": "Voir Tout",
    "cta.reserve": "Réserver une Table",
    "cta.order_now": "Commander",
    "cta.subscribe": "S'abonner",
    "cta.send": "Envoyer",
    "cta.learn_more": "En Savoir Plus",

    "footer.blurb":
      "Pizzeria au feu de bois et table italienne à Sèvres, avec un bar qui diffuse les grands matchs — pizzas, pâtes et bonne compagnie, à deux pas de Paris.",
    "footer.quick_links": "Liens Rapides",
    "footer.hours": "Heures d'Ouverture",
    "footer.location": "Adresse",
    "footer.contact": "Contact",
    "footer.newsletter": "Newsletter",
    "footer.newsletter_blurb":
      "Rejoignez notre table. Menus de saison, événements et plaisirs discrets — dans votre boîte mail.",
    "footer.email_placeholder": "Votre adresse e-mail",
    "footer.rights": "Tous droits réservés.",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",

    "hours.weekdays": "Lundi – Samedi",
    "hours.weekdays_time": "11h00 — 23h00",
    "hours.sunday": "Dimanche",
    "hours.sunday_time": "Fermé",

    "common.loading": "Chargement…",
  },
} satisfies Record<Locale, Record<string, string>>

export type DictKey = keyof (typeof dictionaries)["en"]
