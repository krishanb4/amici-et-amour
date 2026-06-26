"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion/magnetic"
import { SplitText } from "@/components/motion/split-text"
import { SITE } from "@/lib/site"

// Full-bleed combined hero shot — pizza, cocktails & small plates in the bright
// foreground with the Eiffel-lit bar behind.
const HERO_IMAGE = "https://pub-d1a6578f4c844ef1a5b8769c356fec0f.r2.dev/hero-image-new.jpg"

export function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  // "Out of the dark room, into the light." As the hero scrolls away, the dark
  // veil lifts and porcelain light floods up from below — so the dim dining
  // room dissolves seamlessly into the bright page beneath it.
  const darkLift = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const lightGrow = useTransform(scrollYProgress, [0.12, 0.95], [0, 1])
  const mediaBrighten = useTransform(scrollYProgress, [0, 0.9], [0.62, 1])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-foreground"
    >
      {/* Media layer — the full image, edge to edge. Sits over the dark ink
          background and is dimmed (opacity) so the cream copy reads clearly.
          A slow Ken-Burns drift keeps it alive without distracting. */}
      <motion.div style={{ scale: reduce ? 1 : mediaScale }} className="absolute inset-0 bg-foreground">
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { scale: [1, 1.12], x: ["0%", "-2.5%"], y: ["0%", "-1.5%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            style={{ opacity: reduce ? 0.62 : mediaBrighten }}
            src={HERO_IMAGE}
            alt="A table of pizza, cocktails and small plates before the Eiffel-lit bar at Amici et Amour"
            className="h-full w-full object-cover object-[50%_70%] sm:object-center"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>

      {/* Legibility scrim — soft and warm, weighted to the bottom/left where the
          copy sits. It LIFTS as you scroll (the dark recedes). Cream text rides
          on top of it (plus a text-shadow), so the hero reads bright, not murky. */}
      <motion.div
        aria-hidden
        style={{ opacity: reduce ? 1 : darkLift }}
        className="pointer-events-none absolute inset-0 sm:hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.16 0.01 80 / 0.45) 0%, oklch(0.16 0.01 80 / 0.1) 50%, oklch(0.16 0.01 80 / 0.28) 100%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: reduce ? 1 : darkLift }}
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.16 0.01 80 / 0.5) 0%, oklch(0.16 0.01 80 / 0.22) 40%, transparent 70%)," +
              "linear-gradient(to top, oklch(0.16 0.01 80 / 0.38) 0%, transparent 30%)",
          }}
        />
      </motion.div>

      {/* Porcelain light veil — invisible at the top, floods in from below as you
          scroll so the dark room melts into the bright page underneath. */}
      <motion.div
        aria-hidden
        style={{ opacity: reduce ? 0 : lightGrow }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, var(--background) 38%, oklch(0.986 0.004 95 / 0.82) 70%, oklch(0.986 0.004 95 / 0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className="container-edge relative z-10 w-full pt-24"
      >
        <div className="max-w-2xl text-background [text-shadow:0_1px_28px_oklch(0.16_0.01_80/0.6)]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amici-et-amour-logo.png"
              alt={t("brand.name")}
              className="mb-8 h-24 w-auto sm:h-28"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow flex items-center gap-3 text-green-bright"
          >
            <span className="h-px w-8 bg-green-bright" />
            {t("brand.tagline")} · {t("hero.location")}
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[0.98] tracking-[-0.02em]">
            <SplitText as="span" text="Italian soul," className="block" />
            <SplitText
              as="span"
              text="French finesse."
              by="word"
              delay={0.2}
              className="block italic text-green-bright"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-7 max-w-md text-base leading-relaxed text-background/85 sm:text-lg"
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
            <Button
              asChild
              size="xl"
              variant="outline"
              className="group border-background/45 text-background hover:border-background hover:bg-background hover:text-foreground"
            >
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
            className="mt-16 flex items-center gap-8 text-sm text-background/70"
          >
            <div>
              <p className="text-background">{SITE.address.line1}</p>
              <p>{SITE.address.line2}</p>
            </div>
            <span className="h-8 w-px bg-background/30" />
            <div>
              <p className="text-background">{t("hours.weekdays")}</p>
              <p>{t("hours.weekdays_time")}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
