import { createFileRoute, Link } from "@tanstack/react-router";
import { shop } from "@/data/i18n";

const SITE = "https://festival-catalog.lovable.app";

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Where is Mathavan Traders located?",
    a: `We are at ${shop.address}. Sivakasi in Virudhunagar district, Tamil Nadu, is the town where most of India's fireworks are made, and our crackers come from that cluster.`,
  },
  {
    q: "Why is Sivakasi called the fireworks capital of India?",
    a: "Sivakasi has a dry climate that suits safe handling of fireworks chemicals, and generations of skilled workers. The town supplies the large majority of the crackers sold across India, especially during Deepavali.",
  },
  {
    q: "Do you offer discounted Deepavali fireworks in Tamil Nadu?",
    a: "Our 2026 price list is a direct-from-Sivakasi seasonal rate list, so the rates you see on the catalogue pages are the ones we quote. Send us your enquiry list on WhatsApp and we will confirm the final rate for your quantity.",
  },
  {
    q: "Can I buy fireworks online on this website?",
    a: "No. This website is a product catalogue and enquiry service only. No payment or online sale happens here. You choose items, send the list on WhatsApp, and we complete the order directly with you.",
  },
  {
    q: "How do I place an enquiry?",
    a: "Browse the catalogue, tap Add on the crackers you want, adjust quantities in the enquiry list, fill in your name, mobile, address, city and PIN code, then send the list to us on WhatsApp.",
  },
  {
    q: "Is there a minimum order value?",
    a: "Please message us on WhatsApp with your list. We will tell you the current minimum for delivery to your area before you confirm anything.",
  },
  {
    q: "Which crackers are best for small children?",
    a: "Sparklers, flower pots, ground chakkars and colour matches are the gentlest options. Children should always be supervised by an adult, and aerial shots and one-sound crackers are best left to adults.",
  },
  {
    q: "How should fireworks be stored at home?",
    a: "Keep them in a closed cardboard box in a cool, dry place away from candles, lamps, stoves and electrical points. Never store crackers in a kitchen, near a diya, or in direct sunlight.",
  },
  {
    q: "What safety rules should we follow while bursting crackers?",
    a: "Burst fireworks outdoors in an open space, light one at a time with an agarbatti at arm's length, keep a bucket of water and sand nearby, wear cotton clothes and footwear, and never return to a cracker that has not lit.",
  },
  {
    q: "Are the crackers you sell legal and safe?",
    a: "We supply crackers made by licensed Sivakasi manufacturers. Please also follow the bursting hours and rules announced by your local authorities for Deepavali.",
  },
  {
    q: "Do you deliver across Tamil Nadu?",
    a: `We arrange dispatch for orders across Tamil Nadu subject to transport rules for fireworks. Call us on ${shop.phones[0]} or ${shop.phones[1]} to check delivery to your town.`,
  },
  {
    q: "When should I book my Deepavali crackers?",
    a: "Book early. Popular items sell out in the weeks before Deepavali and transport slots fill up quickly, so sending your enquiry a month ahead gives you the widest choice.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Deepavali Fireworks FAQ — Sivakasi Crackers | Mathavan Traders" },
      {
        name: "description",
        content:
          "Answers on buying Deepavali fireworks from Sivakasi: discounted Tamil Nadu cracker rates, safety, storage, delivery and how to send an enquiry to Mathavan Traders.",
      },
      {
        property: "og:title",
        content: "Deepavali Fireworks FAQ — Sivakasi Crackers | Mathavan Traders",
      },
      {
        property: "og:description",
        content:
          "Common questions about Sivakasi crackers, Deepavali fireworks rates in Tamil Nadu, safety and delivery.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE}/faq` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "author", content: "KliviQ Technologies" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/faq` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE}/faq` },
          ],
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="festive-hero border-b border-primary/60">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link
            to="/"
            className="text-xs font-medium text-hero-muted underline underline-offset-4"
          >
            ← {shop.nameEn}
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-hero-foreground sm:text-3xl">
            Deepavali Fireworks FAQ
          </h1>
          <p className="mt-2 text-sm text-hero-muted">
            Sivakasi crackers, Deepavali rates in Tamil Nadu, safety and enquiries.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <section
              key={item.q}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h2 className="text-sm font-semibold text-foreground sm:text-base">
                {item.q}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Still have a question? Message us on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${shop.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Chat on WhatsApp
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link to="/" className="underline underline-offset-2">
              Back to the crackers catalogue
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
