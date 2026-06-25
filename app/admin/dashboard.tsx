"use client"

import "react-day-picker/style.css"
import { useMemo, useState, useTransition } from "react"
import { DayPicker } from "react-day-picker"
import { parseISO, format, formatDistanceToNow } from "date-fns"
import {
  Check,
  X,
  Clock,
  Users,
  Phone,
  Mail,
  CalendarDays,
  RotateCcw,
  LogOut,
} from "lucide-react"
import { toast } from "sonner"
import type { Booking, BookingStatus } from "@/lib/bookings"
import {
  confirmBookingAction,
  declineBookingAction,
  resetBookingAction,
  logoutAction,
} from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Filter = "all" | "pending" | "confirmed" | "declined"

const STATUS_META: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "Confirmed", className: "bg-green/10 text-green-deep border-green/25" },
  declined: { label: "Declined", className: "bg-destructive/10 text-destructive border-destructive/25" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground border-border" },
}

const isoLocal = (d: Date) => format(d, "yyyy-MM-dd")

export function Dashboard({ bookings, adminName }: { bookings: Booking[]; adminName: string }) {
  const [filter, setFilter] = useState<Filter>("all")
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const todayISO = isoLocal(new Date())

  // Days that carry bookings — used to dot the calendar.
  const { bookedDays, pendingDays } = useMemo(() => {
    const booked = new Set<string>()
    const pending = new Set<string>()
    for (const b of bookings) {
      booked.add(b.date)
      if (b.status === "pending") pending.add(b.date)
    }
    const toDates = (s: Set<string>) => [...s].map((d) => parseISO(d))
    return { bookedDays: toDates(booked), pendingDays: toDates(pending) }
  }, [bookings])

  const stats = useMemo(() => {
    let pending = 0
    let confirmedUpcoming = 0
    let today = 0
    for (const b of bookings) {
      if (b.status === "pending") pending++
      if (b.status === "confirmed" && b.date >= todayISO) confirmedUpcoming++
      if (b.date === todayISO && b.status !== "declined" && b.status !== "cancelled") today++
    }
    return { pending, confirmedUpcoming, today }
  }, [bookings, todayISO])

  const visible = useMemo(() => {
    return bookings.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false
      if (selectedDay && b.date !== isoLocal(selectedDay)) return false
      return true
    })
  }, [bookings, filter, selectedDay])

  function runAction(id: string, fn: (id: string) => Promise<void>, successMsg: string) {
    setBusyId(id)
    startTransition(async () => {
      try {
        await fn(id)
        toast.success(successMsg)
      } catch {
        toast.error("Something went wrong. Please try again.")
      } finally {
        setBusyId(null)
      }
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="eyebrow text-muted-foreground">Amici et Amour · Bookings</p>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-tight sm:text-4xl">
            Reservations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back, {adminName}.</p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="size-4" /> Sign out
          </Button>
        </form>
      </header>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        <Stat label="Awaiting review" value={stats.pending} accent />
        <Stat label="Today" value={stats.today} />
        <Stat label="Upcoming confirmed" value={stats.confirmedUpcoming} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[18rem_1fr]">
        {/* Calendar + filters sidebar */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="admin-calendar rounded-sm border border-border bg-card p-4">
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={(d) => setSelectedDay(d)}
              showOutsideDays
              weekStartsOn={1}
              modifiers={{ booked: bookedDays, hasPending: pendingDays }}
              modifiersClassNames={{ booked: "day-booked", hasPending: "day-pending" }}
            />
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-4 rounded-full bg-green" /> booked
                <span className="ml-2 inline-block h-1.5 w-4 rounded-full bg-amber-500" /> pending
              </span>
              {selectedDay ? (
                <button
                  onClick={() => setSelectedDay(undefined)}
                  className="font-medium text-green-deep hover:underline"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {/* Status filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["all", "pending", "confirmed", "declined"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                  filter === f
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </aside>

        {/* Booking list */}
        <section>
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            {selectedDay ? (
              <span>
                {format(selectedDay, "EEEE d MMMM yyyy")} —{" "}
                <span className="font-medium text-foreground">{visible.length}</span>{" "}
                {visible.length === 1 ? "booking" : "bookings"}
              </span>
            ) : (
              <span>
                <span className="font-medium text-foreground">{visible.length}</span>{" "}
                {visible.length === 1 ? "booking" : "bookings"}
                {filter !== "all" ? ` · ${filter}` : ""}
              </span>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-sm border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground">No bookings to show here.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {visible.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  busy={busyId === b.id}
                  onConfirm={() =>
                    runAction(b.id, confirmBookingAction, "Confirmed — guest emailed.")
                  }
                  onDecline={() =>
                    runAction(b.id, declineBookingAction, "Declined — guest emailed.")
                  }
                  onReset={() => runAction(b.id, resetBookingAction, "Moved back to pending.")}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-sm border bg-card p-4 sm:p-5",
        accent && value > 0 ? "border-amber-300 bg-amber-50/60" : "border-border",
      )}
    >
      <div className="font-display text-3xl font-normal tabular-nums sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</div>
    </div>
  )
}

function BookingCard({
  booking,
  busy,
  onConfirm,
  onDecline,
  onReset,
}: {
  booking: Booking
  busy: boolean
  onConfirm: () => void
  onDecline: () => void
  onReset: () => void
}) {
  const meta = STATUS_META[booking.status]
  const dateLabel = (() => {
    try {
      return format(parseISO(booking.date), "EEE d MMM")
    } catch {
      return booking.date
    }
  })()

  return (
    <li className="rounded-sm border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-xl font-medium">{booking.name}</span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                meta.className,
              )}
            >
              {meta.label}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" /> {dateLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {booking.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" /> {booking.guests}{" "}
              {booking.guests === 1 ? "guest" : "guests"}
            </span>
          </div>
        </div>

        <span className="shrink-0 text-xs text-muted-foreground">
          {(() => {
            try {
              return `${formatDistanceToNow(booking.createdAt)} ago`
            } catch {
              return ""
            }
          })()}
        </span>
      </div>

      {/* Contact + notes */}
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
        <a
          href={`mailto:${booking.email}`}
          className="flex items-center gap-1.5 text-foreground/80 hover:text-green-deep hover:underline"
        >
          <Mail className="size-3.5" /> {booking.email}
        </a>
        {booking.phone ? (
          <a
            href={`tel:${booking.phone}`}
            className="flex items-center gap-1.5 text-foreground/80 hover:text-green-deep hover:underline"
          >
            <Phone className="size-3.5" /> {booking.phone}
          </a>
        ) : null}
      </div>

      {booking.occasion ? (
        <p className="mt-3 rounded-sm bg-surface px-3 py-2 text-sm text-foreground/80">
          {booking.occasion}
        </p>
      ) : null}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {booking.status !== "confirmed" ? (
          <Button size="sm" disabled={busy} onClick={onConfirm}>
            <Check className="size-4" /> Confirm
          </Button>
        ) : null}
        {booking.status !== "declined" ? (
          <Button size="sm" variant="outline" disabled={busy} onClick={onDecline}>
            <X className="size-4" /> Decline
          </Button>
        ) : null}
        {booking.status !== "pending" ? (
          <Button size="sm" variant="ghost" disabled={busy} onClick={onReset}>
            <RotateCcw className="size-4" /> Reset
          </Button>
        ) : null}
      </div>
    </li>
  )
}
