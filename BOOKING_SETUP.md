# Booking system — setup

The reservation form, transactional emails, and the `/admin` panel are all wired
up. To go live you need a Supabase database, a Brevo account, and an admin user.

## 1. Environment

Copy `.env.example` → `.env` and fill in the values.

```bash
cp .env.example .env
```

| Variable | Where to get it |
| --- | --- |
| `DATABASE_URL` / `DIRECT_URL` | Supabase → Project Settings → Database → Connection string (pooler `6543` for `DATABASE_URL`, direct `5432` for `DIRECT_URL`). |
| `AUTH_SECRET` | Run `openssl rand -base64 48`. |
| `BREVO_API_KEY` | Brevo → SMTP & API → API Keys. (Your existing `BRAVO_API_KEY` also works.) |
| `BREVO_SENDER_EMAIL` | A **verified** sender in Brevo. |
| `ADMIN_EMAIL` | Inbox that receives new-booking alerts. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used in the owner email link). |
| `EMAIL_BANNER_URL` *(optional)* | Hosted signature photo for the email hero banner. Falls back to `/hero.jpg`. |
| `EMAIL_LOGO_URL` *(optional)* | Hosted gold-crest logo shown over the banner. Falls back to the committed crest. |

> **Preview the emails:** with the dev server running, open
> [`/api/email-preview`](http://localhost:3000/api/email-preview) for an index, or
> `/api/email-preview?type=confirmed` (`received` · `owner` · `confirmed` · `declined`).
> This route is disabled in production.

## 2. Database (Supabase + Prisma)

Push the Prisma schema to your Supabase Postgres:

```bash
pnpm db:push        # creates the `bookings` and `admin_users` tables
pnpm db:generate    # regenerate the client (also runs on install/build)
```

Then **enable Row Level Security** so Supabase's auto REST API can't read the
tables (the app uses Prisma over a direct connection, so this won't affect it).
Run this once in the Supabase SQL editor:

```sql
alter table public.bookings    enable row level security;
alter table public.admin_users enable row level security;
-- no policies = no anon/public access. The app connects as the Postgres role,
-- which bypasses RLS.
```

## 3. Create an admin

```bash
pnpm create-admin --email you@amicietamour.fr --name "Owner"
# prompts for a hidden password
```

Re-running with the same email updates that admin's password. Add as many
admins as you like.

## 4. Run it

```bash
pnpm dev
```

- Public form: **/reservation** (and the home page reserve section)
- Admin panel: **/admin** → redirects to **/admin/login**

## How it works

```
Guest submits /reservation
   └─ POST /api/bookings ─ saves booking (status: pending) ─┬─ email guest: "request received"
                                                            └─ email owner: "new reservation"

Owner opens /admin (calendar + list)
   ├─ Confirm ─ status: confirmed ─ email guest: "table confirmed"
   └─ Decline ─ status: declined  ─ email guest: "couldn't hold this table"
```

- **Auth**: `admin_users` rows (bcrypt-hashed passwords). Login sets a signed
  JWT cookie (`jose`); `middleware.ts` gates everything under `/admin`.
- **Emails**: Brevo transactional API (`lib/email.ts`). If `BREVO_API_KEY` is
  unset, sends are skipped (logged) so bookings still save in dev.
- **Calendar**: `react-day-picker` in the dashboard marks days with bookings
  (green) and pending requests (amber); click a day to filter.

## Key files

| Path | Purpose |
| --- | --- |
| `prisma/schema.prisma` | `Booking` + `AdminUser` models |
| `lib/bookings.ts` | Booking queries + Zod validation |
| `lib/email.ts` | Brevo templates & senders |
| `lib/auth.ts` / `lib/session.ts` | Admin auth (server / edge-safe) |
| `app/api/bookings/route.ts` | Public booking endpoint |
| `app/admin/*` | Login, dashboard, server actions |
| `middleware.ts` | `/admin` route protection |
| `scripts/create-admin.mjs` | Seed an admin user |
