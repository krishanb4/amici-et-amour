"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { SplitText } from "@/components/motion/split-text"
import { SITE } from "@/lib/site"

// WebGL hero — client only; static image below is the fallback.
const HeroCanvas = dynamic(() => import("@/components/three/hero-canvas"), {
  ssr: false,
})

export function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  // Only mount the WebGL layer when the browser can actually create a context —
  // otherwise the static <img> below carries the hero (no thrown errors).
  const [canWebGL, setCanWebGL] = useState(false)
  useEffect(() => {
    try {
      const c = document.createElement("canvas")
      setCanWebGL(
        !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl")),
      )
    } catch {
      setCanWebGL(false)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background"
    >
      {/* Media layer: static base (fallback) + WebGL overlay */}
      <motion.div style={{ scale: reduce ? 1 : mediaScale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="A table laid with Italian and French dishes at Amici et Amour"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* porcelain fade for text legibility (matches shader fade) */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--background) 0%, var(--background) 28%, transparent 62%), linear-gradient(180deg, var(--background) 0%, transparent 22%, transparent 84%, oklch(0.984 0.004 95 / 0.5) 100%)",
          }}
        />
        {!reduce && canWebGL ? <HeroCanvas src="/hero.jpg" /> : null}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className="container-edge relative z-10 w-full pt-24"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-green/50" />
            {t("brand.tagline")} · {t("hero.location")}
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[0.98] tracking-[-0.02em]">
            <SplitText as="span" text="Italian soul," className="block" />
            <SplitText
              as="span"
              text="French finesse."
              by="word"
              delay={0.2}
              className="block italic text-green"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.lede")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <Button asChild size="xl">
                <Link href="/reservation">{t("cta.reserve")}</Link>
              </Button>
            </Magnetic>
            <Button asChild size="xl" variant="outline" className="group">
              <Link href="/menu">
                {t("cta.explore_menu")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex items-center gap-8 text-sm text-muted-foreground"
          >
            <div>
              <p className="text-foreground">{SITE.address.line1}</p>
              <p>{SITE.address.line2}</p>
            </div>
            <span className="h-8 w-px bg-border" />
            <div>
              <p className="text-foreground">{t("hours.weekdays")}</p>
              <p>{t("hours.weekdays_time")}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
