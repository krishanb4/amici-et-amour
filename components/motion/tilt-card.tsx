"use client"

import { type ReactNode, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * TiltCard — 3D perspective tilt that tracks the cursor, with a soft gold
 * sheen that follows the pointer. Snaps flat on leave. Hover-pointers only.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  })
  const glareX = useTransform(px, [0, 1], ["0%", "100%"])
  const glareY = useTransform(py, [0, 1], ["0%", "100%"])
  const glareBg = useTransform(
    [glareX, glareY] as const,
    ([gx, gy]: string[]) =>
      `radial-gradient(220px circle at ${gx} ${gy}, oklch(0.9 0.08 88 / 0.18), transparent 60%)`,
  )

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || !window.matchMedia("(hover: hover)").matches) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative [transform-style:preserve-3d]", className)}
      style={{ rotateX, rotateY, perspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
      {glare ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] hover:opacity-100"
          style={{ background: glareBg }}
        />
      ) : null}
    </motion.div>
  )
}
