import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal"
import { JOURNAL } from "@/lib/content"
import { JsonLd } from "@/components/structured-data"
import { breadcrumbSchema, abs } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the kitchen at Amici et Amour — sourcing, craft, and the small obsessions behind the plate.",
  alternates: { canonical: "/blogs" },
}

export default function BlogsPage() {
  const [featured, ...rest] = JOURNAL

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blogs" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "The Amici et Amour Journal",
            url: abs("/blogs"),
            blogPost: JOURNAL.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: abs(`/blog/${p.id}`),
              author: { "@type": "Person", name: p.author },
            })),
          },
        ]}
      />
      <PageHeader
        eyebrow="The Journal · Le Carnet"
        title={
          <>
            Notes from <span className="italic text-green">the kitchen.</span>
          </>
        }
        lede="Small obsessions, longer than a menu allows — on sourcing, technique, and the slow steps you can taste."
      />

      <section className="container-edge pb-16 lg:pb-20">
        {/* Featured */}
        <Reveal>
          <Link href={`/blog/${featured.id}`} className="group block">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-green">
                  {featured.category}
                  <span className="h-px w-6 bg-green/40" />
                  <span className="text-muted-foreground">{featured.readTime}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-medium leading-snug sm:text-4xl lg:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-green">
                  Read the piece
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-edge pb-28 lg:pb-36">
        <div className="border-t border-border pt-12">
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((post) => (
              <RevealItem key={post.id}>
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.img}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-green">
                    {post.category}
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-medium leading-snug transition-colors group-hover:text-green">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
