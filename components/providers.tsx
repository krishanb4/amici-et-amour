"use client"

import { Toaster } from "sonner"
import { LanguageProvider } from "@/components/language-provider"
import { SmoothScroll } from "@/components/smooth-scroll"

/**
 * Global client boundary: i18n, Lenis smooth scroll, and toasts.
 * (No custom cursor / grain — the Galleria system stays clean and gallery-light.)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "!rounded-none !border !border-border !bg-card !text-foreground !font-sans",
          },
        }}
      />
    </LanguageProvider>
  )
}
