import { NextResponse } from "next/server"
import { bookingInputSchema, createBooking } from "@/lib/bookings"
import { sendBookingReceivedToCustomer, sendNewBookingToOwner } from "@/lib/email"

export const runtime = "nodejs"

/**
 * POST /api/bookings — public reservation endpoint.
 *
 * Validates the form, stores the request as `pending`, then fires the guest
 * acknowledgement + owner notification emails. Email failures are logged but do
 * not fail the request: the booking is already safely recorded for the admin.
 */
export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = bookingInputSchema.safeParse(payload)
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check your details."
    return NextResponse.json({ error: first }, { status: 422 })
  }

  let booking
  try {
    booking = await createBooking(parsed.data)
  } catch (err) {
    console.error("[api/bookings] create failed:", err)
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again or call us." },
      { status: 500 },
    )
  }

  // Fire both emails in parallel; never block the guest on email delivery.
  await Promise.allSettled([
    sendBookingReceivedToCustomer(booking),
    sendNewBookingToOwner(booking),
  ])

  return NextResponse.json({ ok: true, id: booking.id }, { status: 201 })
}
