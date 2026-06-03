"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

/** Minimal EN / FR segmented toggle. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage()
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border border-border p-0.5 text-xs font-medium",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-[2px] px-2.5 py-1 uppercase tracking-widest transition-colors",
            locale === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
