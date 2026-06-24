import { IMAGES } from "@/lib/images"

/** Placeholder home content. Real menu/events/copy supplied by the owner later. */

export const SPECIALTIES = [
  {
    id: "tartufo",
    name: "Tagliolini al Tartufo",
    desc: "Hand-cut tagliolini, winter black truffle, aged parmigiano, a whisper of butter.",
    price: 145,
    img: IMAGES.specialties[0].img,
  },
  {
    id: "gamberi",
    name: "Gamberi all'Amalfitana",
    desc: "Wild Mediterranean prawns, slow San Marzano, basil, grilled sourdough.",
    price: 140,
    img: IMAGES.specialties[1].img,
  },
  {
    id: "pizza",
    name: "Pizza Diavola",
    desc: "48-hour dough, spicy salame, fior di latte, Calabrian chilli honey.",
    price: 92,
    img: IMAGES.specialties[2].img,
  },
  {
    id: "tiramisu",
    name: "Tiramisù della Casa",
    desc: "Mascarpone cream, Marsala-soaked savoiardi, bitter Valrhona cocoa.",
    price: 65,
    img: IMAGES.specialties[3].img,
  },
] as const

export const MENU_CATEGORIES = [
  { id: "antipasti", name: "Antipasti", count: 9, note: "To begin, shared and slow.", img: "/images/starters/3D1A4694.jpg" },
  { id: "primi", name: "Primi & Pasta", count: 12, note: "Rolled and cut each morning.", img: "/images/mains/3D1A4736.jpg" },
  { id: "grill", name: "From the Grill", count: 8, note: "Live fire, aged cuts.", img: "/images/mains/3D1A4712.jpg" },
  { id: "plateau", name: "Le Plateau", count: 7, note: "The coast, on ice.", img: "/images/mains/3D1A4730.jpg" },
  { id: "dolci", name: "Dolci", count: 10, note: "France meets Italy, sweetly.", img: "/images/desserts/3D1A4778.jpg" },
  { id: "cellar", name: "Cellar & Bar", count: 140, note: "Old world, low intervention.", img: "/images/drinks/3D1A4802.jpg" },
] as const

export const EVENTS = [
  {
    id: "harvest",
    date: "18 Oct",
    fullDate: "Saturday, 18 October 2026",
    time: "19:00 — late",
    venue: "The Courtyard",
    price: 145,
    seats: "One long table of 24",
    title: "The Harvest Table",
    desc: "A single long table, ten courses, one seasonal story told from garden to plate.",
    img: IMAGES.events[0].img,
    body: [
      "Once a season we clear the courtyard, lay a single oak table for twenty-four, and cook one continuous menu that follows the harvest from the first leaf to the final preserve.",
      "There is no à la carte and nothing to choose. You sit where you're seated, pass the plates that arrive, and meet the growers, foragers, and fishermen whose week is on the table in front of you.",
      "Ten courses, paired pours, and the kind of long, unhurried evening that only happens when strangers agree to share one table.",
    ],
    includes: ["Ten seasonal courses", "Wine & non-alcoholic pairings", "A conversation with the growers"],
  },
  {
    id: "cellar",
    date: "02 Nov",
    fullDate: "Sunday, 2 November 2026",
    time: "18:30 — 21:00",
    venue: "The Cellar",
    price: 95,
    seats: "16 places",
    title: "Cellar Sessions",
    desc: "Six low-intervention wines, six small plates, and the growers who made them.",
    img: IMAGES.events[1].img,
    body: [
      "Down a flight of stone steps, our cellar holds a hundred and forty labels and a single long counter. For one evening a month we open it to sixteen guests.",
      "Our sommelier pours six low-intervention wines — orange, skin-contact, ancestral — each set against a small plate built to meet it. Between pours, the growers tell you what the season did to the fruit.",
      "It is part tasting, part conversation, and entirely the most honest way we know to drink.",
    ],
    includes: ["Six wines by the glass", "Six paired small plates", "Notes to take home"],
  },
  {
    id: "counter",
    date: "Fridays",
    fullDate: "Every Friday",
    time: "Two seatings · 18:30 & 21:00",
    venue: "The Pass",
    price: 120,
    seats: "Seven seats at the rail",
    title: "Chef's Counter",
    desc: "Seven seats at the kitchen rail for a hands-on tasting with the brigade.",
    img: IMAGES.events[2].img,
    body: [
      "Seven stools, an arm's length from the fire. The Chef's Counter puts you inside the kitchen for the length of a tasting menu, plated and explained by the brigade as it leaves the pass.",
      "Expect off-menu courses, a running commentary, and the occasional spoon passed straight across the rail. It is the closest thing we have to cooking for you at home.",
      "Best booked for two; ideal for anyone who reads the menu and wishes they could watch.",
    ],
    includes: ["Seven-plus courses off the pass", "A front-row seat to the brigade", "Optional pairing flight"],
  },
] as const

export const JOURNAL = [
  {
    id: "negroni",
    category: "Bar",
    title: "The art of the Negroni, slowed down",
    excerpt: "Why we stir for ninety seconds and never a moment less.",
    img: IMAGES.journal[0].img,
    date: "12 June 2026",
    author: "Lucia Marchetti",
    role: "Head of Bar",
    readTime: "4 min read",
    pullquote: "A Negroni is not difficult. It is only impatient people that make it badly.",
    body: [
      "Equal parts gin, Campari, sweet vermouth. Three ingredients, no garnish to hide behind, no shaker to bury a mistake. The Negroni is the most honest drink on our list, which is precisely why we treat it with so much suspicion.",
      "The temptation is speed. Build, stir twice, strain, move on — there is always another ticket. But a Negroni stirred for ten seconds and a Negroni stirred for ninety are not the same drink. The first is cold and sharp; the second is cold and round, the bitterness folded into the sweetness rather than fighting it.",
      "We stir over a single large block of ice, never cubes, so the dilution arrives slowly and on our terms. Ninety seconds. The bartender counts them. By the end, the liquid has dropped a few degrees and picked up just enough water to soften Campari's edge without drowning it.",
      "Then it's poured over one more clear block, an orange peel expressed across the surface and dropped in. That's the whole ritual. No flourish, no foam — just time, applied deliberately to three things that were already good.",
    ],
  },
  {
    id: "olive-oil",
    category: "Sourcing",
    title: "Liquid gold: an olive-oil pilgrimage",
    excerpt: "Three groves, one press, and the first cold extraction of the year.",
    img: IMAGES.journal[1].img,
    date: "28 May 2026",
    author: "Tomas Rinaldi",
    role: "Chef-Patron",
    readTime: "6 min read",
    pullquote: "Good oil tastes of the place it grew. Great oil tastes of the week it was picked.",
    body: [
      "Every November one of us flies south to walk three groves we have bought from for the better part of a decade. It is not a romantic trip. It is cold, the nets are heavy, and the press runs until the early hours. But it is the single most important week in our sourcing calendar.",
      "Olive oil is a fruit juice, and like all fruit juice it is at its best the moment it is made. The bottles you buy in spring are tired by comparison. We taste the first cold extraction straight from the press — peppery enough to catch the back of the throat — and decide on the spot how much of the year's run is ours.",
      "We bring back only the early harvest: green olives picked before they fully ripen, lower in yield but higher in the polyphenols that make oil taste alive. It costs more and gives less. It is also the difference between an oil you cook with and an oil you finish a plate with.",
      "Back in Paris it lives in steel, away from light and heat, and we pour the last of it before the next harvest rather than let it fade. When a dish leaves the pass with a thread of green oil across it, that thread is a place and a week, bottled.",
    ],
  },
  {
    id: "risotto",
    category: "Kitchen",
    title: "Why risotto refuses to be rushed",
    excerpt: "Eighteen minutes of attention, and what the stirring is really for.",
    img: IMAGES.journal[2].img,
    date: "9 May 2026",
    author: "Sofia Bernard",
    role: "Sous Chef",
    readTime: "5 min read",
    pullquote: "You are not stirring to mix. You are stirring to listen.",
    body: [
      "Risotto is the one dish we will not start before you order it. There is no holding it, no reheating it, no shortcut that survives contact with the plate. From the first ladle to the last knob of butter, it is roughly eighteen minutes of undivided attention.",
      "The stirring is the part everyone misjudges. You are not stirring to combine — you are coaxing the starch off the surface of the rice, a little at a time, until the grains suspend themselves in a cream they made rather than one you added. Stir too little and it's soup with rice in it. Stir too much and it's paste.",
      "Each ladle of stock goes in only once the last has been absorbed, so the rice is always working, never flooded. We keep the stock at a low simmer beside the pan; cold stock would shock the rice and stall the whole thing.",
      "At the end comes the mantecatura — the pan off the heat, cold butter and parmigiano beaten in hard until the risotto turns glossy and loose enough to spread itself across the plate. Then it goes, immediately. A risotto that waits is a risotto that has already started to set.",
    ],
  },
  {
    id: "bread",
    category: "Bakery",
    title: "Morning bread, an hourly ritual",
    excerpt: "The pre-dawn bake that sets the rhythm for the whole kitchen.",
    img: IMAGES.journal[3].img,
    date: "21 April 2026",
    author: "Tomas Rinaldi",
    role: "Chef-Patron",
    readTime: "4 min read",
    pullquote: "The bread tells you what kind of day the kitchen is going to have.",
    body: [
      "The first person through the door arrives at half past four, long before the sun and longer before service. The starter — a jar of flour and water we have kept alive for years — has been fed the night before and is restless by morning, doming over the lip of its tub.",
      "Bread sets the rhythm of the whole kitchen. While it proves, the stocks go on; while it bakes, the mise en place comes together. By the time the rest of the brigade arrives, the room already smells of crust, and that smell is the first thing every cook here learned to trust.",
      "We bake in waves through the day rather than all at once, so what reaches your table has usually cooled for under an hour. A loaf that sat since dawn is a different, sadder thing.",
      "It is not on the menu and it is never charged for. Bread is how we say hello — proof, before the first course, that someone has been here since before light, paying attention.",
    ],
  },
] as const

export const STATS = [
  { value: "15", suffix: "yrs", label: "At the same table" },
  { value: "2", suffix: "coasts", label: "Italy & France, one kitchen" },
  { value: "140", suffix: "labels", label: "In the cellar" },
] as const

/** The four principles the kitchen is run by — used on /about. */
export const VALUES = [
  {
    id: "sourcing",
    title: "Sourcing first",
    desc: "We build the menu around what the growers, fishermen, and foragers send us, not the other way around. The best ingredient, simply handled, beats a clever idea every time.",
  },
  {
    id: "seasonality",
    title: "Of the season",
    desc: "The carte changes when the market does. If it isn't at its peak this week, it isn't on the plate this week — we'd rather wait than serve a shadow of the real thing.",
  },
  {
    id: "craft",
    title: "Made by hand",
    desc: "Pasta rolled each morning, bread proved overnight, stocks that take a day. The slow steps are the ones you can taste, so they are the ones we refuse to skip.",
  },
  {
    id: "hospitality",
    title: "A generous table",
    desc: "Italian warmth, French precision. We want the room to feel like a long lunch at a friend's house that happens to be run with the discipline of a restaurant.",
  },
] as const

/** Milestones on the /about timeline. */
export const TIMELINE = [
  {
    year: "2011",
    title: "A table for twelve",
    desc: "Tomas and Lucia open a twelve-seat room off Rue de Castiglione, cooking the food they grew up on in Bologna and Lyon.",
  },
  {
    year: "2015",
    title: "The cellar goes down",
    desc: "We dig out the basement and start collecting low-intervention wine in earnest. A hundred and forty labels later, it is still growing.",
  },
  {
    year: "2019",
    title: "The courtyard opens",
    desc: "A neighbouring yard becomes the summer dining room — and the home of the seasonal Harvest Table.",
  },
  {
    year: "2026",
    title: "The same belief",
    desc: "Bigger kitchen, longer list, same instinct: honest food, cooked with heart, for people who linger.",
  },
] as const

/** Practical reservation policies — used on /reservation. */
export const RESERVATION_NOTES = [
  {
    title: "Larger parties",
    desc: "For groups of seven or more, write to us directly and we'll arrange the room and a set menu to suit the occasion.",
  },
  {
    title: "Holding a table",
    desc: "Bookings of six or fewer are held without deposit. We ask only that you let us know if plans change.",
  },
  {
    title: "Dietary needs",
    desc: "Tell us in the notes and the kitchen will adapt. Most of the menu can be made vegetarian, and much of it gluten-free.",
  },
  {
    title: "Running late",
    desc: "We hold your table for fifteen minutes past the booking time. A quick call is always appreciated if the city is against you.",
  },
] as const

/** Press recognition + aggregate guest rating — used in the home credibility band. */
export const RECOGNITION = {
  rating: { score: "4.8", count: "2,300+" },
  press: ["Michelin Guide", "Le Fooding", "Le Figaro", "Condé Nast Traveler"],
} as const

/** Guest words — used in the home testimonials section. First entry is featured. */
export const TESTIMONIALS = [
  {
    id: "elodie",
    quote:
      "The kind of room you come to for one dinner and leave having booked the next. The tagliolini al tartufo alone is worth crossing Paris for.",
    name: "Élodie Vasseur",
    detail: "Regular since 2019, Paris",
  },
  {
    id: "marco",
    quote:
      "Italian warmth, French precision, and a wine list that genuinely surprises. We came for an anniversary and were looked after all night.",
    name: "Marco Bianchi",
    detail: "Visiting from Milan",
  },
  {
    id: "hannah",
    quote: "Easily the best meal we've had in the city this year.",
    name: "Hannah Whitlock",
    detail: "London",
  },
] as const

/** Quick answers used on the /contact page. */
export const CONTACT_TOPICS = [
  { id: "reservation", label: "A reservation", note: "The fastest route is the booking form, but we'll always answer by phone." },
  { id: "private", label: "Private dining", note: "The courtyard and cellar both host private parties — tell us your date." },
  { id: "press", label: "Press & partnerships", note: "Photography, features, and collaborations are warmly welcomed." },
  { id: "careers", label: "Joining the brigade", note: "We're always glad to hear from cooks and front-of-house who care about the craft." },
] as const
