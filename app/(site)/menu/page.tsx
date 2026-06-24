import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MenuGallery } from "@/components/menu/menu-gallery"
import { MENU_GROUPS, MENU_PHOTOS } from "@/lib/menu-images"

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "A visual menu of Amici et Amour — antipasti, pasta and pizza, the grill, dolci, and the bar. Italian soul, French finesse, in Paris.",
}

export default function MenuPage() {
  return (
    <>
      {/* Header */}
      <section className="container-edge pt-32 pb-12 lg:pt-40 lg:pb-16">
        <span className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-green/50" />
          The Menu · La Carte
        </span>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.98] tracking-[-0.02em]">
          Everything we plate, <span className="italic text-green">in full.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A photographed walk through the kitchen — {MENU_PHOTOS.length} dishes and pours,
          from the first antipasto to the last spritz. Tap any plate to see it close.
        </p>

        {/* course legend */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {MENU_GROUPS.map((g) => (
            <div key={g.id} className="bg-card p-6">
              <h2 className="font-display text-2xl font-medium">{g.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-edge pb-28 lg:pb-36">
        <MenuGallery />
      </section>

      {/* CTA */}
      <section className="bg-surface py-24 lg:py-32">
        <div className="container-edge flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Hungry yet? <span className="italic text-green">Save your table.</span>
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              We hold the room from 18:00, Monday to Saturday.
            </p>
          </div>
          <Button asChild size="xl">
            <Link href="/reservation">
              Reserve a Table
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
