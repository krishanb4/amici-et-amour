"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { JOURNAL } from "@/lib/content"

export function Journal() {
  const [featured, ...rest] = JOURNAL

  return (
    <section className="container-edge py-28 lg:py-40">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-green" />
            The Journal
          </span>
          <SplitText
            as="h2"
            text="Notes from the kitchen."
            className="mt-6 font-display text-4xl font-normal leading-[1.04] tracking-tight sm:text-5xl"
          />
        </div>
        <Reveal>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-green"
          >
            Full journal
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Featured */}
        <Reveal direction="right">
          <Link href={`/blog/${featured.id}`} className="group block">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.img}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <span className="mt-5 inline-block text-xs uppercase tracking-[0.18em] text-green">
              {featured.category}
            </span>
            <h3 className="mt-2 font-display text-3xl font-medium leading-snug sm:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-2 max-w-md text-muted-foreground">{featured.excerpt}</p>
          </Link>
        </Reveal>

        {/* List */}
        <div className="flex flex-col">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link
                href={`/blog/${post.id}`}
                className="group flex items-center gap-5 border-b border-border py-6 first:border-t"
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-green">
                    {post.category}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-medium leading-snug transition-colors group-hover:text-green sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
