import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/catalogue/SiteFooter";
import { shop } from "@/data/i18n";

const SITE = "https://festival-catalog.lovable.app";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Mathavan Traders" },
      { name: "description", content: "Terms for catalogue enquiries, advance payment, transportation and dispatch from Mathavan Traders, Sivakasi." },
      { property: "og:title", content: "Terms & Conditions | Mathavan Traders" },
      { property: "og:description", content: "Terms for Mathavan Traders catalogue enquiries, payment, transportation and dispatch." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/terms` },
      { name: "twitter:card", content: "summary" },
      { name: "author", content: "KliviQ Technologies" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="festive-hero border-b border-primary/60">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link to="/" className="text-xs font-medium text-hero-muted underline underline-offset-4">← {shop.nameEn}</Link>
          <h1 className="mt-3 text-2xl font-bold text-hero-foreground sm:text-3xl">Terms &amp; Conditions</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 text-sm leading-relaxed text-muted-foreground">
        <section><h2 className="text-base font-semibold text-foreground">Catalogue and enquiries</h2><p className="mt-2">This website is a product catalogue and enquiry service only. It does not provide online checkout or accept payment on the website. Prices and availability are subject to confirmation.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">Pricing and minimum order</h2><p className="mt-2">The minimum order is ₹2,500 based on the original catalogue total before discount. For now, an 80% discount is deducted from that original total to calculate the final amount payable.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">Payment</h2><p className="mt-2">Full payment must be made upfront and in advance after the order is confirmed. An enquiry does not become a completed order until confirmation and payment.</p></section>
        <section><h2 className="text-base font-semibold text-foreground">Transportation and dispatch</h2><p className="mt-2">Transportation charges are extra and depend on the delivery location. The charge will be informed after payment and order completion. Dispatch will take place within 24 business hours after order completion, subject to product availability and applicable transport rules.</p></section>
      </main>
      <SiteFooter />
    </div>
  );
}