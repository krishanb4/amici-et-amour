"use client"

import { useActionState } from "react"
import { ArrowRight } from "lucide-react"
import { loginAction, type LoginState } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<LoginState | undefined, FormData>(
    loginAction,
    undefined,
  )

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="from" value={from} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="you@amicietamour.fr"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/70">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {state?.error ? (
        <p className="rounded-sm border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="mt-1 w-full">
        {pending ? "Signing in…" : "Sign in"}
        {!pending ? <ArrowRight className="size-4" /> : null}
      </Button>
    </form>
  )
}
