/**
 * Renders one or more JSON-LD blocks for SEO / Answer Engine Optimization.
 * Server component — emits a <script type="application/ld+json"> per object.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is built from trusted local data, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}
