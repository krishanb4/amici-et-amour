import { SignJWT, jwtVerify, type JWTPayload } from "jose"

/**
 * Edge-safe session helpers (jose only — no Node APIs), so this module can be
 * imported from middleware as well as server actions. The heavier server-only
 * auth logic (bcrypt, Supabase, cookie store) lives in lib/auth.ts.
 */

export const SESSION_COOKIE = "aea_admin_session"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export type AdminSession = {
  sub: string // admin user id
  email: string
  name?: string
}

function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Set a long random string (32+ chars) in your environment.",
    )
  }
  return new TextEncoder().encode(value)
}

export async function signSession(session: AdminSession): Promise<string> {
  return new SignJWT({ email: session.email, name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret())
}

export async function verifySession(token: string | undefined): Promise<AdminSession | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify<JWTPayload & { email: string; name?: string }>(
      token,
      secret(),
    )
    if (!payload.sub || !payload.email) return null
    return { sub: payload.sub, email: payload.email, name: payload.name }
  } catch {
    return null
  }
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS
