import type { MetadataRoute } from "next"
import { seoConfig } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amici et Amour — Pizzeria & Restaurant Italien à Sèvres",
    short_name: seoConfig.shortName,
    description: seoConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FBFAF7",
    theme_color: "#C49A48",
    lang: "fr",
    categories: ["food", "restaurant", "lifestyle"],
    icons: [
      { src: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
