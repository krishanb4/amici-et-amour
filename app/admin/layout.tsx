import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
}

/**
 * Thin shell for the /admin area. Access is gated by middleware.ts; this layout
 * just provides a neutral, chrome-free canvas (no site header/footer, which
 * live in the (site) route group).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface text-foreground">{children}</div>
}
