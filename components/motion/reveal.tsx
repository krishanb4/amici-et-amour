"use client"

import { type ReactNode } from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right" | "none"

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
}

/**
 * Reveal — fades + slides children into view on scroll. The workhorse
 * reveal used across every section. Stagger children by passing `delay`.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
  as = "div",
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  as?: "div" | "section" | "li" | "span"
}) {
  const MotionTag = motion[as] as typeof motion.div

  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggered container — children using <Reveal> or the `staggerItem` variants
 * animate in sequence. Use with `RevealItem`.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  once?: boolean
  amount?: number
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...offset[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
