"use client"

import { useContext, useRef } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"

/**
 * Freezes the App Router layout context for the lifetime of this subtree.
 *
 * With `AnimatePresence mode="wait"` the outgoing page stays mounted while it
 * animates out, but Next would otherwise stream the *next* route's content into
 * the same layout slot — mutating DOM that Motion has detached for the exit
 * animation. That race throws `Failed to execute 'removeChild' on 'Node'`.
 * Snapshotting the context at mount keeps the exiting page rendering its own
 * content until Motion unmounts it.
 */
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

/**
 * Subtle cinematic page transition keyed on pathname. A soft fade + lift,
 * paired with a thin green sweep curtain on exit. Reduced-motion safe via CSS.
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
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
