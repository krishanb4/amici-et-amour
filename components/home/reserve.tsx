"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/components/language-provider"
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SITE } from "@/lib/site"
import { IMAGES } from "@/lib/images"
import { cn } from "@/lib/utils"

const SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

/**
 * Reserve — the booking form + visit panel. Used as a home section (with its
 * own heading) and on the dedicated /reservation page (heading hidden, since
 * the PageHeader supplies it). Pass `className` to override section spacing.
 */
export function Reserve({
  showHeading = true,
  className,
}: {
  showHeading?: boolean
  className?: string
}) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      guests: Number(data.get("guests") ?? 2),
      date: String(data.get("date") ?? ""),
      time: String(data.get("slot") ?? ""),
      occasion: String(data.get("occasion") ?? "").trim(),
    }

    if (!payload.name || !payload.email) {
      toast.error("Please add your name and email.")
      return
    }
    if (!payload.date) {
      toast.error("Please choose a date.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        toast.error(result.error ?? "Something went wrong. Please try again or call us.")
        return
      }
      toast.success("Request received. We'll confirm your table by email shortly.")
      form.reset()
    } catch {
      toast.error("Network error. Please try again or call us.")
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <section className={cn("container-edge py-28 lg:py-40", className)}>
      <div className="grid grid-cols-1 overflow-hidden rounded-sm border border-border lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <div className="bg-card p-8 sm:p-12">
          {showHeading ? (
            <>
              <span className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-green" />
                Reservations
              </span>
              <SplitText
                as="h2"
                text="Reserve your table."
                className="mt-5 font-display text-4xl font-normal leading-tight tracking-tight sm:text-5xl"
              />
              <p className="mt-4 max-w-md text-sm text-muted-foreground">
                Tell us when, and for how many. We hold the room from 18:00, Monday to
                Saturday.
              </p>
            </>
          ) : (
            <h2 className="font-display text-2xl font-medium sm:text-3xl">
              Request a table
            </h2>
          )}

          <form
            onSubmit={onSubmit}
            className={cn(
              "grid grid-cols-1 gap-5 sm:grid-cols-2",
              showHeading ? "mt-8" : "mt-6",
            )}
          >
            <Field label="Full name" htmlFor="name">
              <Input id="name" name="name" placeholder="Marco Vitale" required />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" placeholder="+33 6 00 00 00 00" />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" placeholder="you@email.com" required />
            </Field>
            <Field label="Guests" htmlFor="guests">
              <Input id="guests" name="guests" type="number" min={1} max={20} defaultValue={2} />
            </Field>
            <Field label="Date" htmlFor="date">
              <Input id="date" name="date" type="date" min={today} required />
            </Field>
            <Field label="Time" htmlFor="slot">
              <select
                id="slot"
                name="slot"
                className="h-10 w-full rounded-sm border border-input bg-card px-3 text-sm outline-none transition-colors focus:border-green"
                defaultValue="19:30"
              >
                {SLOTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Occasion / notes" htmlFor="occasion">
                <Input id="occasion" name="occasion" placeholder="Anniversary, allergies, a quiet corner…" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? "Sending…" : t("cta.reserve")}
                {!loading ? <ArrowRight className="size-4" /> : null}
              </Button>
            </div>
          </form>
        </div>

        {/* Visit panel */}
        <div className="relative min-h-[420px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.interior}
            alt="The dining room at Amici et Amour"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" />
          <div className="relative flex h-full flex-col justify-end gap-6 p-8 text-background sm:p-12">
            <span className="font-display text-3xl">
              Amici <span className="italic text-green-bright">et</span> Amour
            </span>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 opacity-80" strokeWidth={1.5} />
                <a href={SITE.address.mapsUrl} target="_blank" rel="noreferrer" className="hover:underline">
                  {SITE.address.line1}, {SITE.address.line2}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 opacity-80" strokeWidth={1.5} />
                <a href={SITE.phoneHref} className="hover:underline">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 opacity-80" strokeWidth={1.5} />
                <span>
                  {t("hours.weekdays")}, {t("hours.weekdays_time")} · {t("hours.sunday")} {t("hours.sunday_time")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
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
      <Label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
        {label}
      </Label>
      {children}
    </div>
  )
}
