import "server-only"
import { PrismaClient } from "@prisma/client"

/**
 * Single shared PrismaClient. In dev, Next.js hot-reload would otherwise spawn
 * a new client (and a new connection pool) on every reload, so we cache it on
 * globalThis. Server-only — Prisma must never be bundled for the browser.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
