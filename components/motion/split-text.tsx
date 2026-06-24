"use client"

import { Fragment } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

/**
 * SplitText — reveals a heading word-by-word (default) or char-by-char with a
 * masked upward slide, on scroll into view. Built for display headlines.
 */
export function SplitText({
  text,
  className,
  by = "word",
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "span",
}: {
  text: string
  className?: string
  by?: "word" | "char"
  delay?: number
  stagger?: number
  once?: boolean
  as?: "h1" | "h2" | "h3" | "p" | "span"
}) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text)
  const MotionTag = motion[as] as typeof motion.span

  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom" aria-hidden>
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {token === " " ? " " : token}
            </motion.span>
          </span>
          {by === "word" && i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  )
}
