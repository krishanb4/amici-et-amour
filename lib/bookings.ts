import "server-only"
import { z } from "zod"
import type { Booking as PrismaBooking, BookingStatus as PrismaStatus } from "@prisma/client"
import { prisma } from "@/lib/prisma"

/** Lifecycle of a reservation request. */
export type BookingStatus = PrismaStatus // "pending" | "confirmed" | "declined" | "cancelled"

/** A reservation row, exactly as Prisma returns it (camelCase fields). */
export type Booking = PrismaBooking

/**
 * Validation for the public reservation form. Kept deliberately forgiving on
 * optional fields so a guest is never blocked by an empty phone or note.
 */
export const bookingInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1, "At least one guest.").max(50),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
    .refine((d) => !Number.isNaN(Date.parse(d)), "Please choose a valid date."),
  time: z.string().trim().min(1, "Please choose a time.").max(20),
  occasion: z.string().trim().max(1000).optional().or(z.literal("")),
})

export type BookingInput = z.infer<typeof bookingInputSchema>

/** Insert a new reservation request. Always starts life as `pending`. */
export async function createBooking(input: BookingInput): Promise<Booking> {
  return prisma.booking.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      guests: input.guests,
      date: input.date,
      time: input.time,
      occasion: input.occasion || null,
      // status defaults to "pending" in the schema
    },
  })
}

/** All bookings, soonest sitting first. Used by the admin dashboard. */
export async function listBookings(): Promise<Booking[]> {
  return prisma.booking.findMany({
    orderBy: [{ date: "asc" }, { time: "asc" }],
  })
}

export async function getBooking(id: string): Promise<Booking | null> {
  return prisma.booking.findUnique({ where: { id } })
}

/** Move a booking to a new status (confirm / decline / cancel / reset). */
export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  return prisma.booking.update({ where: { id }, data: { status } })
}
