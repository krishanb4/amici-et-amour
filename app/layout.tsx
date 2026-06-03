import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
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
  title: {
    default: "Amici et Amour — Italian & French Fine Dining · Abu Dhabi",
    template: "%s · Amici et Amour",
  },
  description:
    "A modern table where Italian soul meets French finesse, in the heart of Abu Dhabi. Reserve a table, explore the menu, and taste craft, tradition, and passion.",
  generator: "Next.js",
  metadataBase: new URL("https://amicietamour.fr"),
  icons: {
    icon: "/icon-32.png",
    apple: "/icon-180.png",
  },
  openGraph: {
    title: "Amici et Amour — Italian & French Fine Dining",
    description: "Craft, tradition, and passion. Abu Dhabi.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
