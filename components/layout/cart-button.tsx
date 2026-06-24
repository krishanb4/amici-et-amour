"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCart } from "@/lib/store/cart"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

/** Cart link with an animated item-count badge. SSR-safe (count after mount). */
export function CartButton({ className }: { className?: string }) {
  const { t } = useLanguage()
  const items = useCart((s) => s.items)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const count = mounted ? items.reduce((n, i) => n + i.qty, 0) : 0

  return (
    <Link
      href="/cart"
      aria-label={t("nav.cart")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/80 transition-colors hover:text-green",
        className,
      )}
    >
      <ShoppingBag className="size-[1.1rem]" strokeWidth={1.5} />
      <AnimatePresence>
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </Link>
  )
}
