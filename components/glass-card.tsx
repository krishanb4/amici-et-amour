"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Panel — the standard Galleria surface: white card, warm hairline border,
 * optional hover lift. Sharp-cornered to match the gallery radius system.
 */
export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-border bg-card",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_30px_60px_-40px_oklch(0.2_0.008_90/0.25)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
