"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { authenticateAdmin, startSession, endSession, currentAdmin } from "@/lib/auth"
import { updateBookingStatus } from "@/lib/bookings"
import { sendBookingConfirmedToCustomer, sendBookingDeclinedToCustomer } from "@/lib/email"

export type LoginState = { error?: string }

/** Login form action (used with useActionState). Redirects on success. */
export async function loginAction(
  _prev: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const from = String(formData.get("from") ?? "/admin")

  if (!email || !password) return { error: "Enter your email and password." }

  let session
  try {
    session = await authenticateAdmin(email, password)
  } catch (err) {
    console.error("[admin] login error:", err)
    return { error: "Sign-in is unavailable. Check the server configuration." }
  }
  if (!session) return { error: "Invalid email or password." }

  await startSession(session)
  redirect(from.startsWith("/admin") && from !== "/admin/login" ? from : "/admin")
}

export async function logoutAction(): Promise<void> {
  await endSession()
  redirect("/admin/login")
}

async function requireAdmin(): Promise<void> {
  const admin = await currentAdmin()
  if (!admin) redirect("/admin/login")
}

/** Confirm a booking and email the guest the good news. */
export async function confirmBookingAction(id: string): Promise<void> {
  await requireAdmin()
  const booking = await updateBookingStatus(id, "confirmed")
  await sendBookingConfirmedToCustomer(booking)
  revalidatePath("/admin")
}

/** Decline a booking and email the guest. */
export async function declineBookingAction(id: string): Promise<void> {
  await requireAdmin()
  const booking = await updateBookingStatus(id, "declined")
  await sendBookingDeclinedToCustomer(booking)
  revalidatePath("/admin")
}

/** Reset a booking back to pending (no email). */
export async function resetBookingAction(id: string): Promise<void> {
  await requireAdmin()
  await updateBookingStatus(id, "pending")
  revalidatePath("/admin")
}
