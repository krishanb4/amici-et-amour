import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { LegalProse, type LegalSection } from "@/components/legal/legal-prose"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Amici et Amour collects, uses, and protects your personal information.",
}

const SECTIONS: LegalSection[] = [
  {
    heading: "What we collect",
    body: [
      "When you book a table, send us a message, or subscribe to our newsletter, we collect the details you give us — typically your name, email address, phone number, and any notes you choose to add about your visit.",
      "When you browse the site, we collect basic, anonymised analytics (such as pages viewed and approximate region) to understand how the site is used. We do not build advertising profiles.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use your information to manage reservations, respond to enquiries, and — only if you've opted in — to send occasional news about menus and events. You can unsubscribe from any email with a single click.",
      "We never sell your data. We share it only with the trusted services that help us run the restaurant, such as our reservation and email providers, and only to the extent needed to provide those services.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use a small number of cookies to keep the site working smoothly and to measure traffic anonymously. You can clear or block cookies in your browser settings at any time; the site will still work.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Under French and EU law (GDPR), you may ask us to access, correct, or delete the personal data we hold about you, or to stop using it for marketing. We'll respond within one month.",
      `To make a request, write to us at ${SITE.email} or by post at ${SITE.address.line1}, ${SITE.address.line2}.`,
    ],
  },
  {
    heading: "Keeping data safe",
    body: [
      "We keep your information only as long as we need it, and protect it with reasonable technical and organisational measures. If anything ever goes wrong, we'll act quickly and tell you where the law requires.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="italic text-green">policy.</span>
          </>
        }
        lede="Plainly: we collect only what we need to look after you, and we never sell it."
      />
      <LegalProse
        updated="June 2026"
        intro="This policy explains what personal information Amici et Amour collects, why we collect it, and the choices you have. It applies to this website and to bookings and enquiries made through it."
        sections={SECTIONS}
      />
    </>
  )
}
