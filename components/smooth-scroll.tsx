"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

/**
 * Global Lenis smooth-scroll, driven by the GSAP ticker so ScrollTrigger
 * (used for pinning / scrub across sections) stays perfectly in sync.
 * Skips smoothing entirely under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      ;(window as unknown as { lenis?: Lenis }).lenis = undefined
    }
  }, [])

  return null
}
