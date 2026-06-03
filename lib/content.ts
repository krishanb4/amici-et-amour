import { IMAGES } from "@/lib/images"

/** Placeholder home content. Real menu/events/copy supplied by the owner later. */

export const SPECIALTIES = [
  {
    id: "tartufo",
    name: "Tartufo Nero",
    desc: "Hand-cut tagliolini, winter black truffle, aged parmigiano.",
    price: 145,
    img: IMAGES.specialties[0].img,
  },
  {
    id: "ribeye",
    name: "Côte de Bœuf",
    desc: "45-day dry-aged ribeye, bordelaise, roasted marrow.",
    price: 320,
    img: IMAGES.specialties[1].img,
  },
  {
    id: "branzino",
    name: "Branzino al Sale",
    desc: "Salt-baked sea bass, braised fennel, Amalfi lemon.",
    price: 190,
    img: IMAGES.specialties[2].img,
  },
  {
    id: "tarte",
    name: "Tarte Amour",
    desc: "Valrhona chocolate, crème fraîche, Camargue sea salt.",
    price: 75,
    img: IMAGES.specialties[3].img,
  },
] as const

export const MENU_CATEGORIES = [
  { id: "antipasti", name: "Antipasti", count: 9, note: "To begin, shared and slow." },
  { id: "primi", name: "Primi & Pasta", count: 12, note: "Rolled and cut each morning." },
  { id: "grill", name: "From the Grill", count: 8, note: "Live fire, aged cuts." },
  { id: "plateau", name: "Le Plateau", count: 7, note: "The coast, on ice." },
  { id: "dolci", name: "Dolci", count: 10, note: "France meets Italy, sweetly." },
  { id: "cellar", name: "Cellar & Bar", count: 140, note: "Old world, low intervention." },
] as const

export const EVENTS = [
  {
    id: "harvest",
    date: "18 Oct",
    title: "The Harvest Table",
    venue: "The Courtyard",
    desc: "A single long table, ten courses, one seasonal story told from garden to plate.",
    img: IMAGES.events[0].img,
  },
  {
    id: "cellar",
    date: "02 Nov",
    title: "Cellar Sessions",
    venue: "The Cellar",
    desc: "Six low-intervention wines, six small plates, and the growers who made them.",
    img: IMAGES.events[1].img,
  },
  {
    id: "counter",
    date: "Fridays",
    title: "Chef's Counter",
    venue: "The Pass",
    desc: "Seven seats at the kitchen rail for a hands-on tasting with the brigade.",
    img: IMAGES.events[2].img,
  },
] as const

export const TEAM = [
  {
    id: "marco",
    name: "Marco Vitale",
    role: "Executive Chef",
    quote: "I cook the Italy I grew up in, with the discipline France taught me.",
    img: IMAGES.team[0].img,
  },
  {
    id: "celine",
    name: "Céline Dubois",
    role: "Pastry Chef",
    quote: "Dessert is the last sentence of the meal. It should linger.",
    img: IMAGES.team[1].img,
  },
  {
    id: "rafa",
    name: "Rafael Moreno",
    role: "Head Barista",
    quote: "A great espresso is the shortest, most honest course we serve.",
    img: IMAGES.team[2].img,
  },
] as const

export const JOURNAL = [
  {
    id: "negroni",
    category: "Bar",
    title: "The art of the Negroni, slowed down",
    excerpt: "Why we stir for ninety seconds and never a moment less.",
    img: IMAGES.journal[0].img,
  },
  {
    id: "olive-oil",
    category: "Sourcing",
    title: "Liquid gold: an olive-oil pilgrimage",
    excerpt: "Three groves, one press, and the first cold extraction of the year.",
    img: IMAGES.journal[1].img,
  },
  {
    id: "risotto",
    category: "Kitchen",
    title: "Why risotto refuses to be rushed",
    excerpt: "Eighteen minutes of attention, and what the stirring is really for.",
    img: IMAGES.journal[2].img,
  },
  {
    id: "bread",
    category: "Bakery",
    title: "Morning bread, an hourly ritual",
    excerpt: "The pre-dawn bake that sets the rhythm for the whole kitchen.",
    img: IMAGES.journal[3].img,
  },
] as const

export const STATS = [
  { value: "15", suffix: "yrs", label: "At the same table" },
  { value: "2", suffix: "coasts", label: "Italy & France, one kitchen" },
  { value: "140", suffix: "labels", label: "In the cellar" },
] as const
