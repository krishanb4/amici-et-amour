import { NextResponse } from "next/server"
import { buildBookingEmail, type BookingEmailKind } from "@/lib/email"
import type { Booking } from "@/lib/bookings"

/**
 * Dev-only preview of the transactional booking emails.
 *
 *   /api/email-preview            → index of all four
 *   /api/email-preview?type=confirmed   (received | owner | confirmed | declined)
 *
 * Disabled in production (returns 404) so it can never leak. It renders the
 * exact HTML the senders ship — handy for QA across Gmail / Apple Mail / Outlook.
 */

export const dynamic = "force-dynamic"

const KINDS: BookingEmailKind[] = ["received", "owner", "confirmed", "declined"]

const SAMPLE: Booking = {
  id: "preview-0001",
  name: "Camille Laurent",
  email: "camille.laurent@example.com",
  phone: "+33 6 12 34 56 78",
  guests: 4,
  date: "2026-07-18",
  time: "20:30",
  occasion: "Anniversary dinner — a quiet corner table if possible.",
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
} as Booking

export function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 })
  }

  const type = new URL(request.url).searchParams.get("type") as BookingEmailKind | null

  if (type && KINDS.includes(type)) {
    const { html } = buildBookingEmail(type, SAMPLE)
    return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8" } })
  }

  // Index: list each email with its subject + a link to view it.
  const cards = KINDS.map((k) => {
    const { subject } = buildBookingEmail(k, SAMPLE)
    return `<li style="margin:0 0 14px 0;">
      <a href="?type=${k}" style="color:#1F3A2E;font-size:18px;text-transform:capitalize;">${k}</a>
      <div style="color:#6B6B63;font-size:13px;margin-top:2px;">${subject}</div>
    </li>`
  }).join("")

  const index = `<!doctype html><html><head><meta charset="utf-8"/><title>Email previews</title></head>
    <body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#FBFAF7;color:#14140F;padding:48px;">
      <h1 style="font-family:Georgia,serif;font-weight:normal;">Amici et Amour — email previews</h1>
      <p style="color:#6B6B63;">Sample data · dev only. Append <code>&amp;type=…</code> to view each.</p>
      <ul style="list-style:none;padding:0;margin-top:24px;">${cards}</ul>
    </body></html>`

  return new NextResponse(index, { headers: { "content-type": "text/html; charset=utf-8" } })
}
