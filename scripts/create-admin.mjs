/**
 * Seed (or update) an admin user for the booking panel.
 *
 *   pnpm create-admin
 *   pnpm create-admin --email owner@amicietamour.fr --name "Owner"
 *   pnpm create-admin --email owner@amicietamour.fr --password "s3cret" --name "Owner"
 *
 * Missing values are prompted for (password input is hidden). Re-running with an
 * existing email updates that admin's password/name (idempotent upsert).
 *
 * Requires DATABASE_URL in .env and a generated Prisma client (`pnpm db:generate`).
 */
import "dotenv/config"
import readline from "node:readline"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--email") out.email = argv[++i]
    else if (a === "--password") out.password = argv[++i]
    else if (a === "--name") out.name = argv[++i]
  }
  return out
}

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    if (hidden) {
      // Suppress echo so the typed password is invisible.
      rl._writeToOutput = (str) => {
        if (str.includes(question)) process.stdout.write(str)
      }
    }
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) process.stdout.write("\n")
      resolve(answer.trim())
    })
  })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const email = (args.email || (await ask("Admin email: "))).trim().toLowerCase()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error(`Invalid email: "${email}"`)
  }

  const name = args.name ?? (await ask("Display name (optional): "))

  let password = args.password
  if (!password) {
    password = await ask("Password (min 8 chars): ", { hidden: true })
    const confirm = await ask("Confirm password: ", { hidden: true })
    if (password !== confirm) throw new Error("Passwords do not match.")
  }
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters.")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: name || null },
    create: { email, passwordHash, name: name || null },
  })

  console.log(`\n✓ Admin ready: ${admin.email}${admin.name ? ` (${admin.name})` : ""}`)
  console.log("  Sign in at /admin/login")
}

main()
  .catch((err) => {
    console.error("\n✗ Failed:", err.message || err)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
