import { LoginForm } from "./login-form"

/**
 * Admin sign-in. Middleware already redirects authenticated users away, so this
 * page only ever renders for signed-out visitors. `from` carries the originally
 * requested admin path so we can return there after login.
 */
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 h-px w-10 bg-green" />
          <p className="eyebrow text-muted-foreground">Amici et Amour</p>
          <h1 className="mt-3 font-display text-3xl font-normal tracking-tight">Admin sign-in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage reservations for the house.
          </p>
        </div>
        <div className="rounded-sm border border-border bg-card p-7 shadow-sm">
          <LoginForm from={from ?? "/admin"} />
        </div>
      </div>
    </div>
  )
}
