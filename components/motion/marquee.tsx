"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Marquee — seamless infinite horizontal scroller. Duplicates its children
 * once and translates -50% on loop. Used for the "ticker" accent strips.
 */
export function Marquee({
  children,
  className,
  speed = 28,
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode
  className?: string
  speed?: number
  reverse?: boolean
  pauseOnHover?: boolean
}) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <motion.div
        className="flex min-w-full shrink-0 items-center"
        style={{ willChange: "transform" }}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        {...(pauseOnHover
          ? { whileHover: { transition: { duration: 0 } } }
          : {})}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  )
}
