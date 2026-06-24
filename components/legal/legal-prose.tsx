import { Reveal } from "@/components/motion/reveal"

export type LegalSection = {
  heading: string
  body: string[]
}

/**
 * LegalProse — consistent, readable typography for the privacy / terms pages.
 * A constrained measure, display sub-headings, and roomy paragraphs.
 */
export function LegalProse({
  updated,
  intro,
  sections,
}: {
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <div className="container-edge pb-28 lg:pb-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-green">
            Last updated · {updated}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 border-b border-border pb-10 text-lg leading-relaxed text-foreground/90">
            {intro}
          </p>
        </Reveal>

        {sections.map((section, i) => (
          <Reveal key={section.heading} delay={Math.min(i, 4) * 0.04}>
            <section className="mt-10">
              <h2 className="font-display text-2xl font-medium sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {section.body.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
