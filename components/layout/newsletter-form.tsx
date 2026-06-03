"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

/**
 * Newsletter capture. Phase 0: validates + optimistic success toast.
 * Phase 3 swaps the handler for the Brevo contacts server action.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    setDone(true)
    toast.success("Welcome to the table. Check your inbox soon.")
    setEmail("")
  }

  return (
    <form onSubmit={onSubmit} className={cn("group relative", className)}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("footer.email_placeholder")}
        aria-label={t("footer.email_placeholder")}
        className="h-12 w-full rounded-sm border border-input bg-card pl-4 pr-14 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-green"
      />
      <button
        type="submit"
        disabled={loading}
        aria-label={t("cta.subscribe")}
        className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-colors hover:bg-green-deep disabled:opacity-60"
      >
        {done ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
      </button>
    </form>
  )
}
