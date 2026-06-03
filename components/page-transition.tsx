"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

/**
 * Subtle cinematic page transition keyed on pathname. A soft fade + lift,
 * paired with a thin gold sweep curtain on exit. Reduced-motion safe via CSS.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
