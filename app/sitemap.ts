import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { JOURNAL, EVENTS } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/menu", priority: 0.9, freq: "monthly" },
    { path: "/reservation", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "yearly" },
    { path: "/events", priority: 0.8, freq: "weekly" },
    { path: "/blogs", priority: 0.7, freq: "weekly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = JOURNAL.map((p) => ({
    url: `${SITE_URL}/blog/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const eventEntries: MetadataRoute.Sitemap = EVENTS.map((e) => ({
    url: `${SITE_URL}/event/${e.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...eventEntries]
}
