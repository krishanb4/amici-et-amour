import { redirect } from "next/navigation"
import { listBookings } from "@/lib/bookings"
import { currentAdmin } from "@/lib/auth"
import { Dashboard } from "./dashboard"

// Always render fresh — reservations change constantly.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  // Defense in depth: the proxy gates /admin, but never render data unauthed.
  const admin = await currentAdmin()
  if (!admin) redirect("/admin/login")

  const bookings = await listBookings()
  return <Dashboard bookings={bookings} adminName={admin.name || admin.email} />
}
