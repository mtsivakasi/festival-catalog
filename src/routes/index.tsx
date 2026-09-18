import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Moon, Sun, Phone, MessageCircle, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShopProvider, useShop } from "@/lib/shop-state";
import { categories, products } from "@/data/products";
import { shop } from "@/data/i18n";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { EnquiryDialog } from "@/components/catalogue/EnquiryDialog";
import { FloatingEnquiryButton } from "@/components/catalogue/FloatingEnquiryButton";
import heroArtwork from "@/assets/mathavan-traders-contour.png";

const SITE = "https://festival-catalog.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deepavali Crackers Sivakasi — Diwali Fireworks Price List 2026" },
      {
        name: "description",
        content:
          "Mathavan Traders, Sivakasi: 2026 Deepavali crackers price list with 159 items — flower pots, chakkars, fountains, shots, sparklers and gift boxes. Enquire on WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "deepavali crackers, diwali fireworks, sivakasi crackers price list 2026, tamil nadu fireworks discount sale, flower pots, sparklers, gift box crackers",
      },
      {
        property: "og:title",
        content: "Deepavali Crackers Sivakasi — Diwali Fireworks Price List 2026",
      },
      {
        property: "og:description",
        content:
          "Browse the 2026 Sivakasi Diwali fireworks catalogue in Tamil and English and enquire directly on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: shop.nameEn,
          alternateName: shop.nameTa,
          description:
            "Deepavali and Diwali fireworks catalogue from Sivakasi, Tamil Nadu. Enquiry and price list only.",
          url: SITE,
          telephone: shop.phones,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Naranapuram Road, Pethulupatti Branch",
            addressLocality: "Sivakasi",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          areaServed: "Tamil Nadu, India",
          makesOffer: categories.map((c) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Product", name: c.nameEn },
          })),
        }),
      },
    ],
  }),

  component: () => (
    <ShopProvider>
      <Catalogue />
    </ShopProvider>
  ),
});

function Catalogue() {
  const { t, lang, setLang, dark, toggleDark, count } = useShop();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredProducts = normalizedQuery
    ? products.filter((product) => {
        const category = categories.find((item) => item.id === product.category);
        return [
          product.nameEn,
          product.nameTa,
          product.pack,
          category?.nameEn,
          category?.nameTa,
        ]
          .filter(Boolean)
          .some((value) => value?.toLocaleLowerCase().includes(normalizedQuery));
      })
    : products;
  const visibleCategories = categories.filter((category) =>
    filteredProducts.some((product) => product.category === category.id),
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-primary/70 bg-primary/95 text-primary-foreground backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-4 py-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setLang(lang === "ta" ? "en" : "ta")}
          >
            {t.langLabel}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            onClick={toggleDark}
            aria-label="Theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="secondary" className="relative" onClick={() => setOpen(true)}>
            <ClipboardList className="h-4 w-4" />
            {count > 0 && (
              <span className="ml-1 text-xs font-semibold">{count}</span>
            )}
          </Button>
        </div>
      </header>

      <section className="festive-hero relative isolate overflow-visible border-b border-primary/60">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-festival-gold" />
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1.5 bg-festival-green" />
        <div className="relative mx-auto grid min-h-48 max-w-6xl grid-cols-[43%_57%] items-center px-4 py-5 sm:min-h-56 sm:grid-cols-[40%_60%] sm:py-7">
          <div className="relative self-stretch">
            <img
              src={heroArtwork}
              alt="Mathavan Traders fireworks brand mark"
              width={1926}
              height={1987}
              className="absolute -top-8 right-3 bottom-1 left-0 h-[calc(100%+1.75rem)] w-[calc(100%-0.75rem)] object-contain object-left drop-shadow-xl sm:-top-10 sm:right-10 sm:bottom-0 sm:left-4 sm:h-[calc(100%+2.5rem)] sm:w-[calc(100%-3.5rem)]"
            />
          </div>
          <div className="relative z-10 flex flex-col items-end py-2 text-right">
            <span aria-hidden="true" className="mb-3 h-1 w-12 rounded-full bg-festival-gold shadow-sm" />
            <h1 className="max-w-xl text-lg font-bold text-hero-foreground drop-shadow-sm sm:text-3xl">
              {t.heroTitle}
            </h1>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-hero-muted sm:text-sm">
              {t.heroSub}
            </p>
          </div>
        </div>
      </section>

      <nav className="sticky top-[57px] z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="relative mb-2 sm:mx-auto sm:max-w-md">
            <Search aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="h-9 bg-card pr-9 pl-9"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                aria-label={t.clearSearch}
                className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="overflow-x-auto">
            <div className="flex w-max gap-2">
            {visibleCategories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-border px-3 py-1 text-xs whitespace-nowrap text-foreground hover:bg-accent"
              >
                {lang === "ta" ? c.nameTa : c.nameEn}
              </a>
            ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {visibleCategories.map((c) => {
          const items = filteredProducts.filter((p) => p.category === c.id);
          if (items.length === 0) return null;
          return (
            <section key={c.id} id={c.id} className="scroll-mt-28 pt-8">
              <h2 className="text-base font-bold text-foreground sm:text-lg">
                {lang === "ta" ? c.nameTa : c.nameEn}
              </h2>
              <p className="mb-3 text-xs text-muted-foreground">
                {lang === "ta" ? c.nameEn : c.nameTa} · {items.length} {t.items}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            <Search className="mx-auto mb-3 h-7 w-7" aria-hidden="true" />
            <p>{t.noResults}</p>
          </div>
        )}

        <section className="mt-12 rounded-xl border border-border bg-card p-5 text-center">
          <h2 className="text-base font-bold text-foreground">{t.contactTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.contactSub}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <a
                href={`https://wa.me/${shop.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> {t.whatsapp}
              </a>
            </Button>
            {shop.phones.map((phone) => (
              <Button key={phone} asChild variant="outline">
                <a href={`tel:${phone.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4" /> {phone}
                </a>
              </Button>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 pt-6 pb-24 text-center text-xs text-muted-foreground sm:pb-8">
        <div className="mx-auto max-w-3xl space-y-2">
          <p className="font-semibold text-foreground">{shop.nameTa} · {shop.nameEn}</p>
          <address className="not-italic">
            {shop.address}<br />
            {shop.phones.map((phone, index) => (
              <span key={phone}>
                {index > 0 && " · "}
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {phone}
                </a>
              </span>
            ))}
          </address>
          <p>{t.footer}</p>
          <p>
            <Link to="/faq" className="font-medium text-foreground underline underline-offset-2">
              FAQ
            </Link>
          </p>
          <p>
            This is not an e-commerce or online-sales website. It is provided only as a
            product catalogue and enquiry service.
          </p>
          <p className="pt-2">© 2026 {shop.nameEn}</p>
          <p className="pb-2">
            Site designed &amp; maintained by{" "}
            <a
              href="https://kliviq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
            >
              KliviQ Technologies
            </a>
          </p>
        </div>
      </footer>


      <FloatingEnquiryButton onClick={() => setOpen(true)} />

      <EnquiryDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
