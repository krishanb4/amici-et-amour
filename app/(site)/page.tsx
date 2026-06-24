import { Hero } from "@/components/home/hero"
import { Recognition } from "@/components/home/recognition"
import { Story } from "@/components/home/story"
import { Specialties } from "@/components/home/specialties"
import { MenuPreview } from "@/components/home/menu-preview"
import { Gallery } from "@/components/home/gallery"
import { Testimonials } from "@/components/home/testimonials"
import { Events } from "@/components/home/events"
import { Journal } from "@/components/home/journal"
import { Reserve } from "@/components/home/reserve"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Recognition />
      <Story />
      <Specialties />
      <MenuPreview />
      <Gallery />
      <Testimonials />
      <Events />
      <Journal />
      <Reserve />
    </>
  )
}
