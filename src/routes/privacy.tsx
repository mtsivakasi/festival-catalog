import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/catalogue/SiteFooter";
import { shop } from "@/data/i18n";

const SITE = "https://festival-catalog.lovable.app";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Mathavan Traders" },
      { name: "description", content: "Privacy policy for customer enquiries submitted to Mathavan Traders through its Deepavali fireworks catalogue." },
      { property: "og:title", content: "Privacy Policy | Mathavan Traders" },
      { property: "og:description", content: "How Mathavan Traders collects and uses customer information for catalogue enquiries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/privacy` },
      { name: "twitter:card", content: "summary" },
      { name: "author", content: "KliviQ Technologies" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="festive-hero border-b border-primary/60">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link to="/" className="text-xs font-medium text-hero-muted underline underline-offset-4">← {shop.nameEn}</Link>
          <h1 className="mt-3 text-2xl font-bold text-hero-foreground sm:text-3xl">Privacy Policy</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 text-sm leading-relaxed text-muted-foreground">
        <section><h2 className="text-base font-semibold text-foreground">Information we collect</h2><p className="mt-2">When you send an enquiry, we collect the name, mobile number, address, city, PIN code, optional email address, selected products and language that you provide.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">How we use it</h2><p className="mt-2">We use this information only to receive, review, contact you about and fulfil your enquiry. Enquiry details are recorded in the owner’s private spreadsheet and included in the WhatsApp message you choose to send.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">Sharing and retention</h2><p className="mt-2">Your information is shared only with services needed to handle your enquiry, including Google Sheets and WhatsApp. We retain enquiry records for business, customer-service and legal purposes and do not sell your personal information.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">Your choices</h2><p className="mt-2">You may ask us to review or correct your enquiry information by contacting {shop.nameEn} at {shop.phones[0]}.</p></section>
      </main>
      <SiteFooter />
    </div>
  );
}