/**
 * Real restaurant photography for Amici et Amour.
 *
 * Originals (full-res masters) live in /_originals (git-ignored, not deployed).
 * Web-optimised copies are organised under /public/images/<category>/:
 *   starters · mains · desserts · drinks · ambiance · restaurant (the room)
 *
 * To swap a photo anywhere on the site, change the path in this single file.
 */

const base = "/images"
const starter = (id: string) => `${base}/starters/${id}.jpg`
const main = (id: string) => `${base}/mains/${id}.jpg`
const dessert = (id: string) => `${base}/desserts/${id}.jpg`
const drink = (id: string) => `${base}/drinks/${id}.jpg`
const ambiance = (id: string) => `${base}/ambiance/${id}.jpg`
// The actual room: navy panelling, gold lamps, the lit crest & Eiffel bar.
const room = (id: string) => `${base}/restaurant/${id}.jpg`

export const IMAGES = {
  // Hero — the warm dining room (also written to /public/hero.jpg)
  hero: room("room-warm"),
  heroWide: room("room-bar"),

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

  // Events happen in the room itself — bar, cellar shelves, the rail.
  events: [
    { id: "harvest", img: room("room-bar") },
    { id: "cellar", img: room("eiffel") },
    { id: "counter", img: room("bar-front") },
  ],

  journal: [
    { id: "negroni", img: drink("3D1A4790") },
    { id: "olive-oil", img: starter("3D1A4694") },
    { id: "risotto", img: main("3D1A4726") },
    { id: "bread", img: main("3D1A4751") },
  ],

  // Visual-feast marquee on the home page — the table AND the room (two rows)
  gallery: [
    main("3D1A4707"),
    room("bar-front"),
    main("3D1A4731"),
    dessert("3D1A4773"),
    room("crest"),
    drink("3D1A4802"),
    starter("3D1A4694"),
    room("booth"),
    main("3D1A4751"),
    drink("3D1A4816"),
    room("lamp"),
    main("3D1A4726"),
    dessert("3D1A4778"),
    room("room-blue"),
    main("3D1A4730"),
    drink("3D1A4790"),
    room("booth-2"),
    starter("3D1A4700"),
    main("3D1A4736"),
    main("3D1A4724"),
  ],

  // The visit panel (reserve + /about) — the bar in full
  interior: room("bar-angle"),
} as const
