"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { NAV_LINKS } from "@/lib/site"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Magnetic } from "@/components/motion/magnetic"
import { LanguageToggle } from "@/components/layout/language-toggle"

export function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32))
  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-foreground/60 via-foreground/20 to-transparent",
      )}
    >
      <nav className="container-edge flex h-[72px] items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex shrink-0 items-baseline gap-2"
          aria-label={t("brand.name")}
        >
          <span
            className={cn(
              "font-display text-[1.6rem] leading-none font-medium tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-background",
            )}
          >
            Amici{" "}
            <span className={cn("font-display italic", scrolled ? "text-green" : "text-green-bright")}>
              et
            </span>{" "}
            Amour
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "group relative text-[0.82rem] uppercase tracking-[0.14em] transition-colors",
                  isActive(link.href)
                    ? scrolled
                      ? "text-green"
                      : "text-green-bright"
                    : scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-background/80 hover:text-background",
                )}
              >
                {t(link.key)}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px transition-all duration-300",
                    scrolled ? "bg-green" : "bg-green-bright",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Magnetic className="hidden md:inline-flex" strength={0.25}>
            <Button asChild size="pill">
              <Link href="/reservation">{t("nav.reserve")}</Link>
            </Button>
          </Magnetic>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden transition-colors",
                  scrolled ? "text-foreground" : "text-background hover:text-background",
                )}
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-border bg-background">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col px-6 pb-8 pt-10">
                <span className="font-display text-xl">
                  Amici <span className="italic text-green">et</span> Amour
                </span>
                <ul className="mt-10 flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.08 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block border-b border-border py-3.5 font-display text-2xl transition-colors",
                          isActive(link.href) ? "text-green" : "text-foreground hover:text-green",
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-5">
                  <LanguageToggle />
                  <Button asChild size="lg" className="w-full">
                    <Link href="/reservation">{t("nav.reserve")}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
