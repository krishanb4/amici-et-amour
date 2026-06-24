# Amici et Amour — Site Structure (Build Blueprint)

> Structure reverse-engineered from the existing netlify reference build.
> Content + images are PLACEHOLDERS — real content/media supplied by owner later.
> Design direction: **Luxury-futuristic** (cinematic dark + gold, glass, smooth-scroll, parallax, next-level motion).
> Notes: site is **bilingual EN / FR**, location **Abu Dhabi, UAE**, has **online ordering (cart/checkout)**, **reservations**, **events**, **journal/blog**, and a full **admin panel**.

## Global
- **Header / Nav:** Logo · Home · Menu · About · Events · Journal · Contact · [Reserve A Table CTA] · [Cart] · Language toggle (EN/FR)
- **Footer:** Brand blurb · Quick Links · Opening Hours · Location (Najda St, Abu Dhabi) · Phone/Email · Social · Newsletter signup · Privacy / Terms · © line

---

## PUBLIC PAGES

### 1. Home `/`
1. Hero — full-screen, headline + tagline ("Book your journey through flavors and tradition"), Reserve + Explore Menu CTAs
2. Intro / "Our Culinary Story" teaser → Read Story
3. Featured / "Royal Specialties" — signature dish cards
4. "Our Masterpiece Menu" preview → Explore Menu
5. Experience strip — "Crafted for Perfection" value props (Artistry / Tradition / Passion)
6. Featured Event banner → Events
7. Testimonials / reviews
8. Location + Opening Hours + map teaser
9. Newsletter signup CTA

### 2. Menu `/menu`
- Category nav (Royal Specialties, BBQ, Beverages, Desserts, Breakfast Specials, etc.)
- Dish cards (image, name, description, price AED, dietary tags) — add-to-cart
- Filter by category

### 3. About `/about`
- "Our Culinary Legacy" story
- Philosophy ("Authentic cooking techniques passed down through generations")
- Team: Head Chef · Pastry Chef · Barista Master
- Stats / heritage strip

### 4. Events `/events` + detail `/event/:slug`
- Premier / Featured Event hero
- Occasion grid: Anniversary, Birthday, Corporate, Charity, Bridal/Baby Showers, New Year's Eve, Themed Dinner Nights
- Detail page: gallery, description, inquiry/booking CTA

### 5. Journal / Blog `/blogs` + post `/blog/:slug`
- Article grid (Full Journal)
- Post page: cover, body, share, back-to-journal

### 6. Reservation `/reservation`
- Booking form: Guest Name, Phone, Email, Number of Guests, Date, Select Available Slot, Occasion/Notes
- Confirm Reservation → confirmation
- "Find your existing reservations" (lookup by email/phone) + Cancel Booking
- **Emails (Brevo):** guest confirmation + restaurant-owner notification

### 7. Contact `/contact`
- Contact form (name, email, phone, message)
- Our Location + Find Us On Google Maps
- Opening Hours · Phone · Email · Social

### 8. Ordering flow
- **Cart `/cart`** — line items, qty, subtotal, Order More / Checkout
- **Checkout `/checkout`** — Delivery Details / Dine-in, Payment Method (COD), Confirm Order
- **Order Success `/order-success/:id`** — confirmation + order summary

### 9. Login `/login`
- Admin login (email + password) → /admin

---

## ADMIN PANEL `/admin` (auth-protected)
- **Dashboard Overview** — Total Sales, Total Orders, Total Products, Total Active reservations, recent activity
- **Order Management** — list/search orders, status, details, delete
- **Reservations / Bookings** — Recent Reservations, search, create/edit/cancel, Reservation History
- **Reservation Slots** — Active Slots, Add/Edit Slot (title, booking window, availability)
- **Menu Management** — Categories CRUD + Menu Items CRUD (Add Menu Item)
- **Content Manager** — Events + Journal/Blog editor
- **Email / Notification Settings** — sender + notification config (**wired to Brevo** instead of raw SMTP)
- **Notifications / Action Center** — real-time alerts (new booking/order)
- **Settings** — theme toggle (Gold / Blue), general config

---

## Integrations
- **Database:** MongoDB Atlas (reservations, orders, menu, categories, events, blogs, settings, admin users)
- **Email:** Brevo — guest confirmation, owner notification, newsletter contacts
- **i18n:** EN / FR
