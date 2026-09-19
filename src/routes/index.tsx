import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ChevronLeft, ChevronRight, ClipboardList, Moon, Sun, Phone, MessageCircle, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShopProvider, useShop } from "@/lib/shop-state";
import { categories, products } from "@/data/products";
import { shop } from "@/data/i18n";
import { ProductCard } from "@/components/catalogue/ProductCard";
import { EnquiryDialog } from "@/components/catalogue/EnquiryDialog";
import { FloatingEnquiryButton } from "@/components/catalogue/FloatingEnquiryButton";
import heroBannerLight from "@/assets/mathavan-hero-light.jpg";
import heroBannerDark from "@/assets/mathavan-hero-dark.jpg";

const SITE = "https://festival-catalog.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deepavali Crackers Sivakasi — Fireworks Price List 2026 | Mathavan Traders" },
      {
        name: "description",
        content:
          "Mathavan Traders, Sivakasi: 2026 Deepavali crackers price list with up to 80% off and 159 items — flower pots, chakkars, fountains, shots, sparklers and gift boxes. Enquire on WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "deepavali crackers, diwali fireworks, sivakasi crackers price list 2026, tamil nadu fireworks discount sale, flower pots, sparklers, gift box crackers",
      },
      {
        property: "og:title",
        content: "Deepavali Crackers Sivakasi — Fireworks Price List 2026 | Mathavan Traders",
      },
      {
        property: "og:description",
        content:
          "Up to 80% off. Browse the 2026 Sivakasi Deepavali fireworks catalogue in Tamil and English and enquire directly on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: `${SITE}/mathavan-og-1200x630.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}/mathavan-og-1200x630.jpg` },
      { name: "author", content: "KliviQ Technologies" },
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
            "Deepavali fireworks catalogue from Sivakasi, Tamil Nadu, with discounts up to 80% off. Enquiry and price list only.",
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

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ShopProvider>
      <Catalogue />
    </ShopProvider>
  );
}

function Catalogue() {
  const { t, lang, setLang, dark, toggleDark, count } = useShop();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const categoryStripRef = useRef<HTMLDivElement>(null);
  const [categoryScroll, setCategoryScroll] = useState({ left: false, right: true });
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

  const updateCategoryScroll = () => {
    const strip = categoryStripRef.current;
    if (!strip) return;
    setCategoryScroll({
      left: strip.scrollLeft > 2,
      right: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 2,
    });
  };

  useEffect(() => {
    updateCategoryScroll();
    window.addEventListener("resize", updateCategoryScroll);
    return () => window.removeEventListener("resize", updateCategoryScroll);
  }, [visibleCategories.length]);

  const scrollCategories = (direction: -1 | 1) => {
    categoryStripRef.current?.scrollBy({
      left: direction * Math.max(180, categoryStripRef.current.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  return (
    <div id="page-top" className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-primary/70 bg-primary/95 text-primary-foreground backdrop-blur">
        <div className="border-b border-primary-foreground/15">
          <p className="mx-auto max-w-6xl px-4 py-1 text-center text-[10px] leading-tight font-medium tracking-wide text-primary-foreground/85 sm:text-[11px]">
            {t.notice}
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-4 py-2">
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

      <section className="relative overflow-x-clip border-b border-primary/60 bg-secondary">
        <div className="relative mx-auto aspect-[1280/533] w-full max-w-[1280px]">
          <img
            src={heroBannerLight}
            alt="Mathavan Traders Deepavali crackers direct from Sivakasi"
            width={1280}
            height={533}
            className="absolute inset-0 h-full w-full object-contain dark:hidden"
          />
          <img
            src={heroBannerDark}
            alt="Mathavan Traders Deepavali crackers direct from Sivakasi"
            width={1280}
            height={533}
            className="absolute inset-0 hidden h-full w-full object-contain dark:block"
          />
          <span className="absolute top-[14%] left-[75%] z-10 -translate-x-1/2 -translate-y-1/2">
            <span className="offer-splash px-3 py-2 sm:px-5 sm:py-3">
              <span aria-hidden="true" className="offer-splash-burst" />
              <span className="offer-splash-text block text-sm font-black tracking-wide whitespace-nowrap uppercase sm:text-xl lg:text-3xl">
                {t.offer}
              </span>
            </span>
          </span>
          <Button
            asChild
            variant="ghost"
            className="absolute top-[84%] left-[2.4%] z-10 h-[12%] w-[24%] rounded-full bg-transparent p-0 hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <a
              href="#catalogue-search"
              onClick={() => window.setTimeout(() => searchRef.current?.focus(), 450)}
              aria-label="Browse crackers and search the catalogue"
            >
              <span className="sr-only">Browse Crackers</span>
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="absolute top-[84%] left-[28%] z-10 h-[12%] w-[21%] rounded-full bg-transparent p-0 hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <a
              href="/Mathavan_Crackers_Pricelist_-_2026.pdf"
              download
              aria-label="Download the 2026 price list PDF"
            >
              <span className="sr-only">View 2026 Price List PDF</span>
            </a>
          </Button>
        </div>
      </section>

      <nav className="sticky top-[76px] z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div id="catalogue-search" className="relative mb-2 scroll-mt-28 sm:mx-auto sm:max-w-md">
            <Search aria-hidden="true" className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              ref={searchRef}
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
          <div className="relative flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 rounded-full text-muted-foreground"
              onClick={() => scrollCategories(-1)}
              disabled={!categoryScroll.left}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              ref={categoryStripRef}
              onScroll={updateCategoryScroll}
              className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
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
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0 rounded-full text-muted-foreground"
              onClick={() => scrollCategories(1)}
              disabled={!categoryScroll.right}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
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
              <div className="mt-8 flex items-center gap-3" aria-hidden="false">
                <span className="h-px flex-1 bg-border" />
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full text-muted-foreground"
                >
                  <a href="#page-top" aria-label="Back to top">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </a>
                </Button>
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
          <p className="mx-auto max-w-xl pb-2 text-center leading-relaxed">
            Website by{" "}
            <a
              href="https://instagram.com/zerodot.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
            >
              ZeroDot
            </a>{" "}
            and{" "}
            <a
              href="https://kliviq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
            >
              KliviQ Technologies
            </a>.
          </p>
        </div>
      </footer>


      <FloatingEnquiryButton onClick={() => setOpen(true)} />

      <EnquiryDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
