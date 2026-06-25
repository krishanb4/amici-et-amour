import "server-only"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type AdminSession,
} from "@/lib/session"

/**
 * Look up an admin by email and verify the password against the stored bcrypt
 * hash. Returns the session payload on success, or null on any failure (we keep
 * the failure reason vague to avoid leaking which emails exist).
 */
export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminSession | null> {
  const normalized = email.trim().toLowerCase()
  if (!normalized || !password) return null

  const admin = await prisma.adminUser.findUnique({ where: { email: normalized } })
  if (!admin) return null

  const ok = await bcrypt.compare(password, admin.passwordHash)
  if (!ok) return null

  return { sub: admin.id, email: admin.email, name: admin.name ?? undefined }
}

/** Sign a JWT for the admin and write it as an httpOnly session cookie. */
export async function startSession(session: AdminSession): Promise<void> {
  const token = await signSession(session)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
}

/** Clear the session cookie (logout). */
export async function endSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

/** Current logged-in admin, or null. For use in server components/actions. */
export async function currentAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  return verifySession(token)
}
