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

  // Signature plates (paired with names in lib/content.ts).
  // Mix of the original shoot and the new batch — gamberi & pizza refreshed
  // with new shots that match their dish exactly (prawns in San Marzano, diavola).
  specialties: [
    { id: "tartufo", img: main("3D1A4736") },
    { id: "gamberi", img: main("IMG_8728") },
    { id: "pizza", img: main("IMG_8755") },
    { id: "tiramisu", img: dessert("3D1A4773") },
  ],

  // New overhead spread of several plates — a fuller look at the table.
  menuPreview: ambiance("IMG_8703"),

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

  // Visual-feast marquee on the home page — the table AND the room (two rows).
  // Original shoot and the new batch alternated so both read as one collection:
  // rooms & cocktails (only in the original set) carry the variety, new plates
  // and the hands-on "served" shots bring the food up to date.
  gallery: [
    starter("IMG_8636"),
    room("bar-front"),
    main("IMG_8755"),
    drink("3D1A4802"),
    starter("3D1A4694"),
    main("IMG_8728"),
    room("crest"),
    dessert("IMG_8793"),
    main("3D1A4731"),
    starter("IMG_8657"),
    room("booth"),
    main("IMG_8776"),
    drink("3D1A4816"),
    dessert("IMG_8810"),
    main("3D1A4751"),
    starter("IMG_8722"),
    room("lamp"),
    main("IMG_8758"),
    dessert("3D1A4778"),
    main("IMG_8712"),
    room("room-blue"),
    starter("IMG_8678"),
    drink("3D1A4790"),
    main("IMG_8651"),
    room("booth-2"),
    dessert("IMG_8821"),
    main("3D1A4736"),
    starter("IMG_8671"),
  ],

  // The visit panel (reserve + /about) — the bar in full
  interior: room("bar-angle"),
} as const
