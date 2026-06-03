/**
 * EN / FR dictionary for Amici et Amour.
 * Flat dot-namespaced keys, looked up via the `t()` helper from the
 * language context. Missing keys fall back to the key itself in dev.
 */

export type Locale = "en" | "fr"

export const LOCALES: Locale[] = ["en", "fr"]
export const DEFAULT_LOCALE: Locale = "en"

export const dictionaries = {
  en: {
    "brand.name": "Amici et Amour",
    "brand.tagline": "Italian & French Fine Dining",

    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.events": "Events",
    "nav.journal": "Journal",
    "nav.contact": "Contact",
    "nav.reserve": "Reserve a Table",
    "nav.cart": "Cart",

    "cta.explore_menu": "Explore Menu",
    "cta.read_story": "Read Our Story",
    "cta.view_all": "View All",
    "cta.reserve": "Reserve a Table",
    "cta.order_now": "Order Now",
    "cta.subscribe": "Subscribe",
    "cta.send": "Send",
    "cta.learn_more": "Learn More",

    "footer.blurb":
      "A cinematic journey through Italian and French cuisine in the heart of Abu Dhabi — where craft, tradition, and passion meet at the table.",
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
    "brand.tagline": "Haute Cuisine Italienne & Française",

    "nav.home": "Accueil",
    "nav.menu": "Carte",
    "nav.about": "À Propos",
    "nav.events": "Événements",
    "nav.journal": "Journal",
    "nav.contact": "Contact",
    "nav.reserve": "Réserver une Table",
    "nav.cart": "Panier",

    "cta.explore_menu": "Découvrir la Carte",
    "cta.read_story": "Notre Histoire",
    "cta.view_all": "Voir Tout",
    "cta.reserve": "Réserver une Table",
    "cta.order_now": "Commander",
    "cta.subscribe": "S'abonner",
    "cta.send": "Envoyer",
    "cta.learn_more": "En Savoir Plus",

    "footer.blurb":
      "Un voyage cinématographique à travers la cuisine italienne et française au cœur d'Abou Dabi — où l'art, la tradition et la passion se rencontrent à table.",
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
