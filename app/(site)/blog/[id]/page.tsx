import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { JOURNAL } from "@/lib/content"

export function generateStaticParams() {
  return JOURNAL.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = JOURNAL.find((p) => p.id === id)
  if (!post) return { title: "Journal" }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = JOURNAL.find((p) => p.id === id)
  if (!post) notFound()

  const more = JOURNAL.filter((p) => p.id !== post.id).slice(0, 3)
  // Split the body so the pull-quote can sit roughly mid-article.
  const breakAt = Math.ceil(post.body.length / 2)
  const opening = post.body.slice(0, breakAt)
  const closing = post.body.slice(breakAt)

  return (
    <>
      <article className="container-edge pt-32 lg:pt-40">
        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-green"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              The Journal
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <span className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-green">
              {post.category}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.02] tracking-[-0.01em]">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="text-foreground">{post.author}</span>
              <span className="text-green">·</span>
              <span>{post.role}</span>
              <span className="text-green">·</span>
              <span>{post.date}</span>
              <span className="text-green">·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>

        {/* Hero image */}
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.img}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Body */}
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            {opening.map((para, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p className="first:first-letter:float-left first:first-letter:mr-3 first:first-letter:font-display first:first-letter:text-6xl first:first-letter:leading-[0.8] first:first-letter:text-green">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <blockquote className="my-12 border-l-2 border-green pl-6">
              <p className="font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
                “{post.pullquote}”
              </p>
            </blockquote>
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            {closing.map((para, i) => (
              <Reveal key={i} delay={0.04 * i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
            Written by <span className="text-foreground">{post.author}</span>, {post.role}.
          </div>
        </div>
      </article>

      {/* More reading */}
      <section className="mt-20 border-t border-border bg-surface py-20 lg:mt-28 lg:py-24">
        <div className="container-edge">
          <h2 className="font-display text-2xl font-normal sm:text-3xl">More from the journal</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-green">
                  {p.category}
                </span>
                <h3 className="mt-1 flex items-start gap-1 font-display text-xl font-medium leading-snug transition-colors group-hover:text-green">
                  {p.title}
                  <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
