/**
 * Placeholder photography for the Galleria build.
 * Food/restaurant-tagged images via loremflickr (deterministic with `lock`).
 * Swap these for the owner's real photos by editing this single file.
 */

function img(tags: string, w: number, h: number, lock: number) {
  return `https://loremflickr.com/${w}/${h}/${tags}?lock=${lock}`
}

export const IMAGES = {
  hero: img("fine-dining,pasta,plating", 1600, 2000, 31),
  heroWide: img("restaurant,gourmet,plating", 2000, 1200, 32),

  story: img("chef,plating,kitchen", 1200, 1500, 7),
  storyDetail: img("herbs,ingredients", 900, 900, 8),

  specialties: [
    { id: "tartufo", img: img("truffle,pasta,gourmet", 1000, 1250, 11) },
    { id: "ribeye", img: img("steak,beef,gourmet", 1000, 1250, 12) },
    { id: "branzino", img: img("seafood,fish,plated", 1000, 1250, 13) },
    { id: "dessert", img: img("dessert,plated,patisserie", 1000, 1250, 14) },
  ],

  menuPreview: img("restaurant,table,food", 1600, 1100, 21),

  events: [
    { id: "harvest", img: img("banquet,dinner,table", 1200, 900, 41) },
    { id: "cellar", img: img("wine,cellar,tasting", 1200, 900, 42) },
    { id: "chefs-table", img: img("private,dining,chef", 1200, 900, 43) },
  ],

  team: [
    { id: "marco", img: img("chef,portrait,man", 900, 1100, 51) },
    { id: "celine", img: img("pastry,chef,woman", 900, 1100, 52) },
    { id: "rafa", img: img("barista,coffee,portrait", 900, 1100, 53) },
  ],

  journal: [
    { id: "negroni", img: img("cocktail,negroni,bar", 1000, 750, 61) },
    { id: "olive-oil", img: img("olive,oil,ingredients", 1000, 750, 62) },
    { id: "risotto", img: img("risotto,rice,gourmet", 1000, 750, 63) },
    { id: "bakery", img: img("bread,bakery,pastry", 1000, 750, 64) },
  ],

  interior: img("restaurant,interior,elegant", 1400, 1000, 71),
} as const
