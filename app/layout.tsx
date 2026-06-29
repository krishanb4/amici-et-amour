import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import { JsonLd } from "@/components/structured-data"
import {
  SITE_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  seoConfig,
  restaurantSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amici et Amour — Pizzeria & Restaurant Italien à Sèvres",
    template: "%s · Amici et Amour — Pizzeria à Sèvres",
  },
  description: seoConfig.description,
  applicationName: seoConfig.name,
  generator: "Next.js",
  keywords: [...seoConfig.keywords],
  authors: [{ name: seoConfig.legalName, url: SITE_URL }],
  creator: seoConfig.legalName,
  publisher: seoConfig.legalName,
  category: "restaurant",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: seoConfig.name,
    title: "Amici et Amour — Pizzeria & Restaurant Italien à Sèvres",
    description: seoConfig.description,
    url: SITE_URL,
    locale: seoConfig.locale,
    alternateLocale: [...seoConfig.altLocales],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amici et Amour — Pizzeria & Restaurant Italien à Sèvres",
    description:
      "Pizzas au feu de bois, cuisine italienne et bar à Sèvres. On diffuse les matchs. Réservez votre table.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#14140F" },
  ],
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <JsonLd data={[restaurantSchema(), organizationSchema(), websiteSchema()]} />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
