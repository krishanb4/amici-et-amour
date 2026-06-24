"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * Parallax — translates children on the Y axis relative to scroll progress
 * through the viewport. `speed` > 0 moves slower than scroll (recedes),
 * negative values move faster (advances). Great for layered hero media.
 */
export function Parallax({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const distance = 120 * speed
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  )
}
