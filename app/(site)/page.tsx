import { Hero } from "@/components/home/hero"
import { Story } from "@/components/home/story"
import { Specialties } from "@/components/home/specialties"
import { MenuPreview } from "@/components/home/menu-preview"
import { Events } from "@/components/home/events"
import { Team } from "@/components/home/team"
import { Journal } from "@/components/home/journal"
import { Reserve } from "@/components/home/reserve"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Specialties />
      <MenuPreview />
      <Events />
      <Team />
      <Journal />
      <Reserve />
    </>
  )
}
