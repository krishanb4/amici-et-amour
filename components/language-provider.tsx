"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import {
  DEFAULT_LOCALE,
  type DictKey,
  type Locale,
  dictionaries,
} from "@/lib/i18n/dictionaries"

type LanguageContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
  t: (key: DictKey | (string & {}), fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "aea.locale"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // hydrate from storage / browser preference
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored === "en" || stored === "fr") {
      setLocaleState(stored)
      return
    }
    if (navigator.language?.toLowerCase().startsWith("fr")) {
      setLocaleState("fr")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    window.localStorage.setItem(STORAGE_KEY, l)
  }, [])

  const toggle = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "fr" : "en"
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const t = useCallback(
    (key: string, fallback?: string) => {
      const table = dictionaries[locale] as Record<string, string>
      return table[key] ?? fallback ?? key
    },
    [locale],
  )

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
