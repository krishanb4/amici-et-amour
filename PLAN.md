# Amici et Amour — Implementation Plan

**Goal:** Full clone of the netlify reference as a luxury-futuristic, heavily-animated restaurant platform.
**Stack kept:** Next.js 16 (App Router) · React 19 · Tailwind 4 · shadcn/ui (already installed).
**Design:** Luxury-futuristic — cinematic dark + gold, glassmorphism, smooth inertia scroll, parallax, scroll-choreographed reveals, magnetic CTAs, film grain. Michelin-elegant, not neon.

---

## Architecture decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router | Already set up; supports server actions + API routes for DB/email/admin |
| Animation | Framer Motion (`motion`) + Lenis (smooth scroll) + GSAP ScrollTrigger (pinning/scrub) | Best-in-class, layered for "next-level" motion |
| Database | MongoDB Atlas (native `mongodb` driver, cached client) | Your choice |
| Email | Brevo (`@getbrevo/brevo`) — transactional + contacts | Your choice |
| Admin auth | Cookie session (JWT via `jose`) + `bcryptjs` hashed admin user, `middleware.ts` guards `/admin` | Lightweight, no extra service |
| Cart state | Zustand + localStorage persistence | Simple, fast |
| Forms/validation | react-hook-form + zod (already installed) | — |
| i18n | Custom EN/FR dictionary + language context (localStorage) | No routing churn; matches reference |
| Payments | Cash on Delivery (COD) only | Matches reference |

### Environment variables (`.env.local`)
```
MONGODB_URI=...                 # MongoDB Atlas connection string
MONGODB_DB=amici
BREVO_API_KEY=...
BREVO_SENDER_EMAIL=...          # verified sender
BREVO_SENDER_NAME=Amici et Amour
OWNER_NOTIFY_EMAIL=...          # restaurant inbox for booking/order alerts
BREVO_NEWSLETTER_LIST_ID=...    # numeric Brevo list id
ADMIN_EMAIL=...                 # seeded admin login
ADMIN_PASSWORD=...              # seeded (hashed at seed time)
JWT_SECRET=...
```
> I'll build with safe fallbacks so the site runs even before keys are added (emails no-op + logged, DB falls back to local sample data). You paste real keys when ready.

### Data collections (MongoDB)
`menuItems` · `categories` · `events` · `blogs` · `reservations` · `slots` · `orders` · `subscribers` · `settings` · `adminUsers`

---

## Phases & deliverables

### Phase 0 — Foundation & design system
- Install deps (motion, lenis, gsap, mongodb, @getbrevo/brevo, jose, bcryptjs, zustand).
- Rewrite theme tokens → luxury-futuristic palette (deep charcoal, warm gold, glass), display + body type pairing.
- Global providers: Lenis smooth-scroll, page-transition wrapper, film-grain/noise overlay, custom cursor (desktop).
- Reusable motion primitives: `Reveal`, `Parallax`, `Magnetic`, `SplitText`, `Marquee`, `TiltCard`, `GlassCard`, `SectionHeading`.
- Sticky scroll-aware `Header` (nav + Reserve CTA + cart + EN/FR toggle) and rich `Footer` (links, hours, location, social, newsletter).

### Phase 1 — Public marketing pages (frontend, placeholder content)
- **Home** `/` — hero, story teaser, signature specialties, menu preview, experience strip, featured event, testimonials, location/hours, newsletter (full scroll choreography).
- **Menu** `/menu` — category tabs, animated dish cards, add-to-cart, filters.
- **About** `/about` — legacy story, philosophy, team, stats.
- **Events** `/events` + `/event/[slug]` — featured event, occasion grid, detail + inquiry.
- **Journal** `/blogs` + `/blog/[slug]` — article grid, post page.
- **Contact** `/contact` — form, map embed, hours/phone.

### Phase 2 — Data layer (MongoDB Atlas)
- `lib/db.ts` cached client; typed collection helpers.
- `scripts/seed.ts` — placeholder menu/categories/events/blogs/slots/settings/admin user.
- Server actions / route handlers (read) feeding the public pages.

### Phase 3 — Reservations + Brevo
- Reservation form (guests, date, slot select, occasion) → validate → store → **Brevo guest confirmation + owner notification**.
- Existing-reservation lookup + cancel.
- Newsletter signup → **Brevo contacts list**.

### Phase 4 — Ordering
- Cart page (zustand), Checkout (delivery/dine-in, COD), order create → Mongo + **order emails to guest + owner**, Order Success `/order-success/[id]`.

### Phase 5 — Admin panel `/admin`
- Login `/login` + JWT cookie + `middleware.ts` guard.
- Dashboard overview (sales/orders/products/active reservations + recents).
- Orders, Reservations, Slots, Menu/Category CRUD, Content (events+blog) CRUD, Email/notification settings, Notifications/action center, Gold/Blue theme toggle.

### Phase 6 — Polish & QA
- EN/FR wiring across pages, responsive passes, a11y, loading/empty/error states, performance (lazy media, reduced-motion), run dev server + smoke-test every flow.

---

## What I need from you (later, non-blocking)
- MongoDB Atlas URI · Brevo API key + verified sender + list id · owner notification email · admin credentials.
- Real content/images/menu/prices from the owner (I'll use tasteful placeholders until then).

## Delivery approach
Build phase-by-phase; you review after each phase. I'll keep the site runnable at every step.
