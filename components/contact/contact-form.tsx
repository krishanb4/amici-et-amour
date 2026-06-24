"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_TOPICS } from "@/lib/content"

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get("name") || !data.get("email") || !data.get("message")) {
      toast.error("Please add your name, email, and a message.")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700)) // Brevo wiring lands in Phase 3
    setLoading(false)
    toast.success("Message sent. We'll be in touch within a day.")
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Full name" htmlFor="name">
        <Input id="name" name="name" placeholder="Marco Vitale" required />
      </Field>
      <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" placeholder="you@email.com" required />
      </Field>
      <div className="sm:col-span-2">
        <Field label="What's this about?" htmlFor="topic">
          <select
            id="topic"
            name="topic"
            defaultValue={CONTACT_TOPICS[0].id}
            className="h-10 w-full rounded-sm border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-green"
          >
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Message" htmlFor="message">
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us a little about the occasion, the date, and how many of you…"
            className="rounded-sm border-input bg-card focus-visible:border-green focus-visible:ring-0"
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Sending…" : "Send message"}
          {!loading ? <ArrowRight className="size-4" /> : null}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70"
      >
        {label}
      </Label>
      {children}
    </div>
  )
}
