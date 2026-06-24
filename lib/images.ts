/**
 * Real restaurant photography for Amici et Amour.
 *
 * Originals (full-res masters) live in /_originals (git-ignored, not deployed).
 * Web-optimised copies are organised by course under /public/images/<category>/:
 *   starters · mains · desserts · drinks · ambiance
 *
 * To swap a photo anywhere on the site, change the path in this single file.
 */

const base = "/images"
const starter = (id: string) => `${base}/starters/${id}.jpg`
const main = (id: string) => `${base}/mains/${id}.jpg`
const dessert = (id: string) => `${base}/desserts/${id}.jpg`
const drink = (id: string) => `${base}/drinks/${id}.jpg`
const ambiance = (id: string) => `${base}/ambiance/${id}.jpg`

export const IMAGES = {
  // Hero — overhead feast on dark wood (also written to /public/hero.jpg)
  hero: ambiance("3D1A4709"),
  heroWide: ambiance("3D1A4709"),

  // Story — a plated signature + a close detail crop
  story: main("3D1A4730"),
  storyDetail: main("3D1A4748"),

  // Signature plates (paired with names in lib/content.ts)
  specialties: [
    { id: "tartufo", img: main("3D1A4736") },
    { id: "gamberi", img: main("3D1A4731") },
    { id: "pizza", img: main("3D1A4707") },
    { id: "tiramisu", img: dessert("3D1A4773") },
  ],

  menuPreview: ambiance("3D1A4708"),

  events: [
    { id: "harvest", img: ambiance("3D1A4711") },
    { id: "cellar", img: drink("3D1A4802") },
    { id: "counter", img: main("3D1A4730") },
  ],

  journal: [
    { id: "negroni", img: drink("3D1A4790") },
    { id: "olive-oil", img: starter("3D1A4694") },
    { id: "risotto", img: main("3D1A4726") },
    { id: "bread", img: main("3D1A4751") },
  ],

  // Visual-feast marquee on the home page (two rows)
  gallery: [
    main("3D1A4707"),
    main("3D1A4731"),
    dessert("3D1A4773"),
    drink("3D1A4802"),
    starter("3D1A4694"),
    main("3D1A4751"),
    drink("3D1A4816"),
    main("3D1A4726"),
    dessert("3D1A4778"),
    main("3D1A4730"),
    drink("3D1A4790"),
    starter("3D1A4700"),
    main("3D1A4736"),
    main("3D1A4724"),
  ],

  interior: ambiance("3D1A4710"),
} as const
