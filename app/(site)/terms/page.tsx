import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalProse, type LegalSection } from "@/components/legal/legal-prose"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms under which Amici et Amour provides this website, reservations, and events.",
}

const SECTIONS: LegalSection[] = [
  {
    heading: "Using this site",
    body: [
      "This website is provided for personal, non-commercial use. By browsing it, you agree to use it lawfully and not to disrupt it or misuse its content.",
      "We keep the menu, pricing, and event details as accurate as we can, but they may change without notice. Nothing on this site is a binding offer until we confirm it with you directly.",
    ],
  },
  {
    heading: "Reservations",
    body: [
      "A reservation request is confirmed only once you receive an email or call from us. We hold your table for fifteen minutes past the booking time before it may be released.",
      "Tables for six or fewer are held without a deposit. For larger parties and private events, separate terms — including a deposit and a set menu — may apply and will be agreed with you in advance.",
    ],
  },
  {
    heading: "Events & tickets",
    body: [
      "Places at ticketed events are limited and confirmed in the order received. Unless stated otherwise, event fees are non-refundable within 48 hours of the event, though we'll always try to transfer your place to another date.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The photography, text, and design on this site belong to Amici et Amour and may not be reproduced without our written permission.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We take care to keep this site accurate and available, but we provide it 'as is' and can't guarantee it will always be error-free or uninterrupted. Nothing in these terms limits any rights you have under French consumer law.",
    ],
  },
  {
    heading: "Contact & governing law",
    body: [
      `These terms are governed by French law. Questions about them can be sent to ${SITE.email} or to ${SITE.address.line1}, ${SITE.address.line2}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            Terms of <span className="italic text-green">service.</span>
          </>
        }
        lede="The short version: book in good faith, treat the room kindly, and we'll do the same for you."
      />
      <LegalProse
        updated="June 2026"
        intro="These terms set out the basis on which Amici et Amour provides this website, reservations, and events. By using the site or booking with us, you agree to them."
        sections={SECTIONS}
      />
    </>
  )
}
