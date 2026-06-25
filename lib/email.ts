import "server-only"
import { parseISO, format } from "date-fns"
import type { Booking } from "@/lib/bookings"
import { SITE } from "@/lib/site"
import { SITE_URL, abs } from "@/lib/seo"

/**
 * Transactional email via Brevo's REST API (POST /v3/smtp/email).
 *
 * We call the HTTP endpoint directly with fetch rather than the SDK — it's
 * stable across SDK rewrites and keeps the dependency surface small.
 *
 * Senders & recipients:
 *  - `from`  → BREVO_SENDER_EMAIL (must be a VERIFIED sender in Brevo).
 *  - owner   → ADMIN_EMAIL (falls back to the site contact address).
 *
 * Everything degrades gracefully: if the API key is missing we log and skip
 * rather than throw, so the booking is still saved in dev without email keys.
 *
 * Design — "Galleria" emails:
 *  - A photo-banner hero with the gold crest overlaid on a darkened band, then
 *    a porcelain body. Bottle-green accent to match the live site.
 *  - Banner + logo are env-driven (EMAIL_BANNER_URL / EMAIL_LOGO_URL) and fall
 *    back to committed assets, so a CDN URL drops in with no code change.
 *  - Hardened for Outlook (VML background fill), Gmail and Apple Mail.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email"
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || SITE.email
const SENDER_NAME = process.env.BREVO_SENDER_NAME || SITE.name
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || SITE.email
const ADMIN_URL = `${SITE_URL}/admin`

/**
 * Banner + logo artwork. Point these at hosted CDN URLs in production; they
 * fall back to the committed `/hero.jpg` and the gold crest in `/public`.
 */
const BANNER_URL = process.env.EMAIL_BANNER_URL?.trim() || abs("/hero.jpg")
const LOGO_URL = process.env.EMAIL_LOGO_URL?.trim() || abs("/amici-et-amour-logo.png")

async function send(opts: {
  to: { email: string; name?: string }
  subject: string
  html: string
  replyTo?: { email: string; name?: string }
}): Promise<boolean> {
  // Accept BREVO_API_KEY (canonical) or BRAVO_API_KEY (existing spelling in .env).
  const apiKey = process.env.BREVO_API_KEY || process.env.BRAVO_API_KEY
  if (!apiKey) {
    console.warn("[email] BREVO_API_KEY is not set — skipping email send.")
    return false
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: SENDER_EMAIL, name: SENDER_NAME },
        to: [{ email: opts.to.email, name: opts.to.name }],
        subject: opts.subject,
        htmlContent: opts.html,
        ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => "")
      console.error(`[email] Brevo send failed (${res.status}): ${detail}`)
      return false
    }
    return true
  } catch (err) {
    console.error("[email] Brevo request error:", err)
    return false
  }
}

// ───────────────────────────── palette ───────────────────────────────────
const INK = "#14140F"
const PAPER = "#FBFAF7"
const WHITE = "#FFFFFF"
const GREEN = "#1F3A2E"
const GREEN_BRIGHT = "#5C8A6F" // legible green on the dark band
const MUTED = "#6B6B63"
const HAIR = "#E4E1D8"
const CREAM = "#EDE7D9" // warm text over the photo / on ink
const CLAY = "#9A3B2E" // restrained accent for the decline note

const FONT_SERIF = `Georgia,'Times New Roman',serif`
const FONT_SANS = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`
const WIDTH = 600
const BANNER_H = 220

// ───────────────────────── formatting helpers ────────────────────────────
function prettyDate(iso: string): string {
  try {
    return format(parseISO(iso), "EEEE d MMMM yyyy")
  } catch {
    return iso
  }
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function firstName(name: string): string {
  return esc(name.trim().split(/\s+/)[0] || name)
}

/** Hidden inbox preview text (+ joiner padding so clients don't pull body copy). */
function preheader(text: string): string {
  return `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;opacity:0;color:transparent;height:0;width:0;font-size:1px;line-height:1px;">${esc(
    text,
  )}${"&nbsp;&zwnj;".repeat(40)}</div>`
}

/**
 * The hero banner. `photo` overlays the gold crest on a darkened signature
 * image (bulletproof for Outlook via VML); `dark` uses a solid ink band with a
 * small accent rule — used for the restrained decline note.
 */
function banner(style: "photo" | "dark", eyebrow: string): string {
  const logo = `<img src="${LOGO_URL}" width="120" alt="${esc(
    SITE.name,
  )}" style="display:block;border:0;outline:none;text-decoration:none;margin:0 auto;width:120px;max-width:120px;height:auto;" />`

  const eyebrowHtml = `<p style="margin:16px 0 0 0;font-family:${FONT_SERIF};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${CREAM};">${esc(
    eyebrow,
  )}</p>`

  if (style === "dark") {
    return `<tr>
      <td bgcolor="${INK}" align="center" style="background-color:${INK};padding:46px 40px;">
        ${logo}
        <div style="height:2px;width:36px;background:${GREEN_BRIGHT};margin:18px auto 0 auto;line-height:2px;font-size:0;">&nbsp;</div>
        ${eyebrowHtml}
      </td>
    </tr>`
  }

  // Photo banner — bulletproof background image with a dark scrim for legibility.
  return `<tr>
    <td background="${BANNER_URL}" bgcolor="${INK}" valign="middle" height="${BANNER_H}" style="background-color:${INK};background-image:url('${BANNER_URL}');background-position:center;background-repeat:no-repeat;background-size:cover;height:${BANNER_H}px;">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" fill="true" stroke="false" style="width:${WIDTH}px;height:${BANNER_H}px;">
        <v:fill type="frame" src="${BANNER_URL}" color="${INK}" />
        <v:textbox inset="0,0,0,0">
      <![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" valign="middle" height="${BANNER_H}" style="height:${BANNER_H}px;padding:0 40px;background-color:rgba(15,15,12,0.46);">
            ${logo}
            ${eyebrowHtml}
          </td>
        </tr>
      </table>
      <!--[if gte mso 9]>
        </v:textbox>
      </v:rect>
      <![endif]-->
    </td>
  </tr>`
}

/** Shared branded shell. `accent` tints the rule + CTA; `bannerStyle` picks the hero. */
function layout(opts: {
  preview: string
  heading: string
  intro: string
  body: string
  accent?: string
  bannerStyle?: "photo" | "dark"
  eyebrow?: string
}): string {
  const accent = opts.accent ?? GREEN
  const eyebrow = opts.eyebrow ?? "Italian soul · French finesse"
  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <title>${esc(SITE.name)}</title>
  </head>
  <body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    ${preheader(opts.preview)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${WIDTH}px;max-width:100%;background:${WHITE};border:1px solid ${HAIR};border-radius:6px;overflow:hidden;">
            ${banner(opts.bannerStyle ?? "photo", eyebrow)}
            <tr>
              <td style="padding:38px 44px 6px 44px;">
                <div style="height:3px;width:44px;background:${accent};margin-bottom:22px;line-height:3px;font-size:0;">&nbsp;</div>
                <h1 style="margin:0;font-family:${FONT_SERIF};font-size:29px;line-height:1.18;font-weight:normal;color:${INK};">${opts.heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 44px 8px 44px;">
                <p style="margin:0;font-family:${FONT_SANS};font-size:15px;line-height:1.7;color:${INK};">${opts.intro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 44px 38px 44px;">
                ${opts.body}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 44px 30px 44px;border-top:1px solid ${HAIR};background:${PAPER};">
                <p style="margin:0;font-family:${FONT_SERIF};font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">${esc(
                  SITE.name,
                )}</p>
                <p style="margin:10px 0 0 0;font-family:${FONT_SANS};font-size:13px;line-height:1.7;color:${MUTED};">
                  <a href="${SITE.address.mapsUrl}" style="color:${MUTED};text-decoration:none;">${esc(
                    SITE.address.line1,
                  )}, ${esc(SITE.address.line2)}</a><br/>
                  <a href="${SITE.phoneHref}" style="color:${accent};text-decoration:none;">${esc(
                    SITE.phone,
                  )}</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="mailto:${SITE.email}" style="color:${accent};text-decoration:none;">${esc(
                    SITE.email,
                  )}</a>
                </p>
                <p style="margin:14px 0 0 0;font-family:${FONT_SANS};font-size:12px;line-height:1.6;color:${MUTED};">
                  <a href="${SITE.social.instagram}" style="color:${MUTED};text-decoration:underline;">Instagram</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="${
                    SITE.social.facebook
                  }" style="color:${MUTED};text-decoration:underline;">Facebook</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="${SITE_URL}" style="color:${MUTED};text-decoration:underline;">amicietamour.fr</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

/** A clean key/value detail card for the booking, with an accent spine. */
function detailsCard(booking: Booking, accent: string = GREEN): string {
  const rows: [string, string][] = [
    ["Name", esc(booking.name)],
    ["Date", prettyDate(booking.date)],
    ["Time", esc(booking.time)],
    ["Guests", String(booking.guests)],
  ]
  if (booking.phone) rows.push(["Phone", esc(booking.phone)])
  if (booking.email) rows.push(["Email", esc(booking.email)])
  if (booking.occasion) rows.push(["Notes", esc(booking.occasion)])

  const body = rows
    .map(
      ([k, v], i) =>
        `<tr>
          <td style="padding:9px 0;${
            i === 0 ? "" : `border-top:1px solid ${HAIR};`
          }font-family:${FONT_SANS};font-size:11px;letter-spacing:.8px;text-transform:uppercase;color:${MUTED};width:32%;vertical-align:top;white-space:nowrap;">${k}</td>
          <td style="padding:9px 0;${
            i === 0 ? "" : `border-top:1px solid ${HAIR};`
          }font-family:${FONT_SANS};font-size:15px;line-height:1.5;color:${INK};vertical-align:top;">${v}</td>
        </tr>`,
    )
    .join("")

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};border:1px solid ${HAIR};border-left:3px solid ${accent};border-radius:4px;">
    <tr><td style="padding:6px 22px 10px 22px;">
      <p style="margin:14px 0 8px 0;font-family:${FONT_SERIF};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${accent};">Reservation</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}</table>
    </td></tr>
  </table>`
}

/** A primary, bulletproof button (VML for Outlook). */
function button(href: string, label: string, fill: string = GREEN): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto 0 auto;">
    <tr><td align="center" bgcolor="${fill}" style="border-radius:4px;">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:44px;v-text-anchor:middle;width:220px;" arcsize="9%" strokecolor="${fill}" fillcolor="${fill}"><w:anchorlock/><center style="color:#ffffff;font-family:${FONT_SANS};font-size:14px;"><![endif]-->
      <a href="${href}" style="display:inline-block;background:${fill};color:#ffffff;font-family:${FONT_SANS};font-size:14px;letter-spacing:.3px;text-decoration:none;padding:13px 30px;border-radius:4px;">${esc(
        label,
      )}</a>
      <!--[if mso]></center></v:roundrect><![endif]-->
    </td></tr>
  </table>`
}

/** A quiet secondary link row under the details (e.g. directions / call). */
function linkRow(links: { href: string; label: string }[]): string {
  const inner = links
    .map(
      (l) =>
        `<a href="${l.href}" style="font-family:${FONT_SANS};font-size:13px;color:${GREEN};text-decoration:none;border-bottom:1px solid ${HAIR};padding-bottom:1px;">${esc(
          l.label,
        )}</a>`,
    )
    .join('<span style="color:#cfccc2;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>')
  return `<p style="margin:20px 0 0 0;text-align:center;">${inner}</p>`
}

// ───────────────────────── template builder ──────────────────────────────

/** Which transactional email to build. */
export type BookingEmailKind = "received" | "owner" | "confirmed" | "declined"

/**
 * Pure renderer — returns the subject + HTML for a given email, with no I/O.
 * Single source of truth shared by the senders below and the dev preview route
 * (`/api/email-preview`), so what you preview is exactly what ships.
 */
export function buildBookingEmail(
  kind: BookingEmailKind,
  booking: Booking,
): { subject: string; html: string } {
  const name = firstName(booking.name)
  switch (kind) {
    case "received":
      return {
        subject: `We've received your reservation request — ${SITE.name}`,
        html: layout({
          preview: `Thank you, ${name} — we'll confirm your table for ${prettyDate(
            booking.date,
          )} at ${esc(booking.time)} shortly.`,
          eyebrow: "Reservation received",
          heading: "Your request is in.",
          intro: `Thank you, ${name}. We've received your reservation request and will confirm it by email shortly — usually within the hour during service.`,
          body: detailsCard(booking),
        }),
      }
    case "owner":
      return {
        subject: `New reservation — ${booking.name}, ${booking.guests} · ${prettyDate(
          booking.date,
        )} ${booking.time}`,
        html: layout({
          preview: `${esc(booking.name)} · ${booking.guests} guests · ${prettyDate(
            booking.date,
          )} ${esc(booking.time)} — review and confirm in the admin panel.`,
          eyebrow: "New request",
          heading: "New reservation request",
          intro: "A guest has just requested a table. Review and confirm it from the admin panel.",
          body: `${detailsCard(booking)}${button(ADMIN_URL, "Open admin panel")}`,
        }),
      }
    case "confirmed":
      return {
        subject: `Your table is confirmed — ${SITE.name}`,
        html: layout({
          preview: `It's confirmed, ${name} — we look forward to welcoming you on ${prettyDate(
            booking.date,
          )} at ${esc(booking.time)}.`,
          eyebrow: "Table confirmed",
          heading: "Your table is confirmed.",
          intro: `Wonderful — we look forward to welcoming you, ${name}. Here are your details. If anything changes, just reply to this email or call us.`,
          body: `${detailsCard(booking)}${linkRow([
            { href: SITE.address.mapsUrl, label: "Get directions" },
            { href: SITE.phoneHref, label: "Call the restaurant" },
          ])}`,
        }),
      }
    case "declined":
      return {
        subject: `About your reservation request — ${SITE.name}`,
        html: layout({
          accent: CLAY,
          bannerStyle: "dark",
          eyebrow: "About your request",
          preview: `We're sorry, ${name} — we couldn't hold this particular table, but we'd love to find you another time.`,
          heading: "We couldn't hold this table.",
          intro: `We're so sorry, ${name} — we're unable to accommodate this particular request. We'd love to find you another time; just reply to this email or call us and we'll do our best.`,
          body: `${detailsCard(booking, CLAY)}${linkRow([
            { href: SITE.phoneHref, label: "Call us to rebook" },
          ])}`,
        }),
      }
  }
}

// ───────────────────────── public senders ────────────────────────────────

/** Sent to the guest the moment they submit — "we've got your request." */
export function sendBookingReceivedToCustomer(booking: Booking) {
  const { subject, html } = buildBookingEmail("received", booking)
  return send({
    to: { email: booking.email, name: booking.name },
    subject,
    html,
    replyTo: { email: SITE.email, name: SITE.name },
  })
}

/** Sent to the owner/staff inbox on every new request. */
export function sendNewBookingToOwner(booking: Booking) {
  const { subject, html } = buildBookingEmail("owner", booking)
  return send({
    to: { email: ADMIN_EMAIL, name: SITE.name },
    subject,
    html,
    replyTo: { email: booking.email, name: booking.name },
  })
}

/** Sent to the guest when the owner confirms. */
export function sendBookingConfirmedToCustomer(booking: Booking) {
  const { subject, html } = buildBookingEmail("confirmed", booking)
  return send({
    to: { email: booking.email, name: booking.name },
    subject,
    html,
    replyTo: { email: SITE.email, name: SITE.name },
  })
}

/** Sent to the guest when the owner declines. */
export function sendBookingDeclinedToCustomer(booking: Booking) {
  const { subject, html } = buildBookingEmail("declined", booking)
  return send({
    to: { email: booking.email, name: booking.name },
    subject,
    html,
    replyTo: { email: SITE.email, name: SITE.name },
  })
}
