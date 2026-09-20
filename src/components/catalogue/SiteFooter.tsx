import { Link } from "@tanstack/react-router";
import type { Lang } from "@/data/i18n";
import { shop } from "@/data/i18n";

const copy = {
  en: {
    catalogue: "Seasonal fireworks price list. Prices and availability are subject to confirmation.",
    minimum: "Minimum order ₹2,500 (before discount).",
    payment: "Full payment must be made in advance after order confirmation.",
    transport: "Transportation charges are extra and will be informed after payment and order completion.",
    dispatch: "Dispatch within 24 business hours after order completion.",
    legal: "Help & legal",
  },
  ta: {
    catalogue: "தீபாவளி பட்டாசு விலைப்பட்டியல். விலை மற்றும் இருப்பு உறுதிப்படுத்தலுக்கு உட்பட்டது.",
    minimum: "குறைந்தபட்ச ஆர்டர் ₹2,500 (தள்ளுபடிக்கு முன்).",
    payment: "ஆர்டர் உறுதிப்படுத்தப்பட்ட பிறகு முழுத் தொகையையும் முன்பணமாக செலுத்த வேண்டும்.",
    transport: "போக்குவரத்து கட்டணம் கூடுதல். பணம் செலுத்தி ஆர்டர் முடிந்த பிறகு தெரிவிக்கப்படும்.",
    dispatch: "ஆர்டர் முடிந்த 24 வேலை நேரத்திற்குள் அனுப்பப்படும்.",
    legal: "உதவி & சட்டம்",
  },
} as const;

export function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const text = copy[lang];
  const cell = "min-w-0 px-4 py-5 text-left";

  return (
    <footer className="border-t border-border px-4 pb-24 text-xs text-muted-foreground sm:pb-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        <section className={`${cell} border-r border-border`}>
          <p className="font-semibold text-foreground">{shop.nameTa}</p>
          <p className="font-semibold text-foreground">{shop.nameEn}</p>
          <address className="mt-2 not-italic leading-relaxed">
            {shop.address}<br />
            {shop.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block hover:text-foreground">
                {phone}
              </a>
            ))}
          </address>
        </section>

        <section className={cell}>
          <p className="font-semibold text-foreground">Catalogue</p>
          <p className="mt-2 leading-relaxed">{text.catalogue}</p>
          <p className="mt-2 leading-relaxed">This is not an e-commerce or online-sales website.</p>
        </section>

        <section className={`${cell} border-t border-r border-border sm:border-t-0`}>
          <p className="font-semibold text-foreground">Order information</p>
          <div className="mt-2 space-y-1.5 leading-relaxed">
            <p>{text.minimum}</p>
            <p>{text.payment}</p>
            <p>{text.transport}</p>
            <p>{text.dispatch}</p>
          </div>
        </section>

        <section className={`${cell} border-t border-border sm:border-t-0`}>
          <p className="font-semibold text-foreground">{text.legal}</p>
          <nav className="mt-2 flex flex-col items-start gap-1.5">
            <Link to="/faq" className="underline underline-offset-2">FAQ</Link>
            <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>
            <Link to="/terms" className="underline underline-offset-2">Terms &amp; Conditions</Link>
          </nav>
          <p className="mt-4">© 2026 {shop.nameEn}</p>
          <p className="mt-2 leading-relaxed">
            Website by <a href="https://instagram.com/zerodot.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">ZeroDot</a>{" "}
            and <a href="https://kliviq.com" target="_blank" rel="noopener noreferrer" className="font-bold text-foreground underline underline-offset-2">KliviQ Technologies</a>.
          </p>
        </section>
      </div>
    </footer>
  );
}