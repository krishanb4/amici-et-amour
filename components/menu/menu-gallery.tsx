"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { MENU_GROUPS, MENU_PHOTOS, type MenuCategoryId } from "@/lib/menu-images"
import { cn } from "@/lib/utils"

const FILTERS: { id: MenuCategoryId; label: string }[] = [
  { id: "all", label: "Everything" },
  ...MENU_GROUPS.map((g) => ({ id: g.id, label: g.label })),
]

export function MenuGallery() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<MenuCategoryId>("all")
  const [lightbox, setLightbox] = useState<number | null>(null)

  const photos = useMemo(
    () => (active === "all" ? MENU_PHOTOS : MENU_PHOTOS.filter((p) => p.category === active)),
    [active],
  )

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: number) =>
      setLightbox((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  )

  // keyboard control + scroll lock while the lightbox is open
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [lightbox, close, step])

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {FILTERS.map((f) => {
          const on = active === f.id
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors duration-300",
                on
                  ? "border-green bg-green text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-green/50 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          )
        })}
        <span className="ml-auto hidden font-mono text-xs text-muted-foreground sm:inline">
          {photos.length} photographs
        </span>
      </div>

      {/* Masonry grid */}
      <div
        key={active}
        className="mt-8 gap-3 [column-fill:_balance] [columns:2] sm:gap-4 sm:[columns:3] lg:[columns:4]"
      >
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => setLightbox(i)}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.02, ease: [0.22, 1, 0.36, 1] }}
            className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm bg-bone sm:mb-4"
            aria-label="Open photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full select-none object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-background/80 transition-colors hover:bg-background/10 hover:text-background"
            >
              <X className="size-6" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous"
              className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full text-background/80 transition-colors hover:bg-background/10 hover:text-background sm:left-6"
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next"
              className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full text-background/80 transition-colors hover:bg-background/10 hover:text-background sm:right-6"
            >
              <ChevronRight className="size-7" />
            </button>

            <motion.img
              key={photos[lightbox].src}
              src={photos[lightbox].src}
              alt=""
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain shadow-2xl"
            />

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-background/70">
              {lightbox + 1} / {photos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
