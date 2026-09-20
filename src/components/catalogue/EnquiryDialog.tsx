import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useShop } from "@/lib/shop-state";
import { logEnquiry } from "@/lib/enquiry-log.functions";
import { products } from "@/data/products";
import { shop } from "@/data/i18n";
import { calculatePricing, formatCurrency, MINIMUM_ORDER } from "@/lib/pricing";

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  mobile: z.string().trim().regex(/^\d{10}$/),
  address: z.string().trim().min(1).max(300),
  city: z.string().trim().min(1).max(60),
  pin: z.string().trim().regex(/^\d{6}$/),
  email: z.union([z.string().trim().email().max(120), z.literal("")]),
});

const empty = { name: "", mobile: "", address: "", city: "", pin: "", email: "" };

export function EnquiryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t, lang, lines, setQty, clear } = useShop();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const items = Object.entries(lines)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty }))
    .filter((i): i is { product: (typeof products)[number]; qty: number } => Boolean(i.product));

  const originalTotal = items.reduce((sum, i) => sum + (i.product.price ?? 0) * i.qty, 0);
  const pricing = calculatePricing(originalTotal);
  const meetsMinimum = originalTotal >= MINIMUM_ORDER;
  const valid = schema.safeParse(form).success && items.length > 0 && meetsMinimum;

  const set = (k: keyof typeof empty, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const send = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success || items.length === 0 || !meetsMinimum || submitting) return;
    const d = parsed.data;
    const lineText = items
      .map(
        (i, n) =>
          `${n + 1}. ${i.product.nameEn} / ${i.product.nameTa} — ${i.product.pack} × ${i.qty}` +
          (i.product.price === null
            ? ` — ${t.priceOnRequest}`
            : ` — ₹${(i.product.price * i.qty).toLocaleString("en-IN")}`),
      )
      .join("\n");
    const msg =
      `*${shop.nameEn} — ${t.orderMsgTitle}*\n\n${lineText}\n\n` +
      `*${t.originalTotal}: ${formatCurrency(pricing.originalTotal)}*\n` +
      `${t.discount}: −${formatCurrency(pricing.discount)}\n` +
      `*${t.finalTotal}: ${formatCurrency(pricing.finalTotal)}*\n\n` +
      `${t.transportNotice}\n\n` +
      `${t.name}: ${d.name}\n${t.mobile}: ${d.mobile}\n${t.address}: ${d.address}\n` +
      `${t.city}: ${d.city}\n${t.pin}: ${d.pin}` +
      (d.email ? `\nEmail: ${d.email}` : "");
    const whatsappUrl = `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(msg)}`;
    setSubmitting(true);
    setSaveError(false);
    try {
      const result = await logEnquiry({ data: { ...d, lang, lines } });
      if (!result.ok) {
        setSaveError(true);
        return;
      }
      window.location.assign(whatsappUrl);
    } catch (error: unknown) {
      console.error("Enquiry spreadsheet save failed", error);
      setSaveError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="shrink-0 border-b border-border px-4 py-3">
          <DialogTitle className="text-base">{t.enquiry}</DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-5 px-4 py-4">
            {items.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                {t.enquiryEmpty}
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.nameEn}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {product.nameTa}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.pack} ·{" "}
                        {product.price === null
                          ? t.priceOnRequest
                          : `₹${(product.price * qty).toLocaleString("en-IN")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label="-"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label="+"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => setQty(product.id, 0)}
                        aria-label={t.remove}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <div className="space-y-3 border-t border-border pt-3">
                <div className="flex items-start justify-between gap-3">
                  <Button type="button" variant="outline" size="sm" onClick={clear}>
                    <Trash2 className="h-3.5 w-3.5" />
                    {t.clearList}
                  </Button>
                  <dl className="min-w-[12rem] space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt>{t.originalTotal}</dt>
                      <dd>{formatCurrency(pricing.originalTotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 text-muted-foreground">
                      <dt>{t.discount}</dt>
                      <dd>−{formatCurrency(pricing.discount)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-border pt-1 font-bold">
                      <dt>{t.finalTotal}</dt>
                      <dd>{formatCurrency(pricing.finalTotal)}</dd>
                    </div>
                  </dl>
                </div>
                {!meetsMinimum && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive" role="alert">
                    <p>Minimum order is ₹2,500. Please add more items.</p>
                    <p lang="ta">குறைந்தபட்ச ஆர்டர் ₹2,500. மேலும் பொருட்களைச் சேர்க்கவும்.</p>
                  </div>
                )}
                <p className="text-xs leading-relaxed text-muted-foreground">{t.transportNotice}</p>
                <p lang={lang === "ta" ? "en" : "ta"} className="text-xs leading-relaxed text-muted-foreground">
                  {lang === "ta"
                    ? "Transportation charges are extra and will be informed after payment and order completion."
                    : "போக்குவரத்து கட்டணம் கூடுதல். பணம் செலுத்தி ஆர்டர் முடிந்த பிறகு தெரிவிக்கப்படும்."}
                </p>
              </div>
            )}

            <div className="space-y-3 border-t border-border pt-4">
              <p className="text-sm font-semibold">{t.yourDetails}</p>
              <Field label={t.name} value={form.name} onChange={(v) => set("name", v)} />
              <Field
                label={t.mobile}
                value={form.mobile}
                inputMode="numeric"
                maxLength={10}
                onChange={(v) => set("mobile", v.replace(/\D/g, ""))}
              />
              <div className="space-y-1.5">
                <Label htmlFor="address">{t.address}</Label>
                <Textarea
                  id="address"
                  rows={3}
                  maxLength={300}
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t.city} value={form.city} onChange={(v) => set("city", v)} />
                <Field
                  label={t.pin}
                  value={form.pin}
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(v) => set("pin", v.replace(/\D/g, ""))}
                />
              </div>
              <Field
                label={t.email}
                value={form.email}
                type="email"
                onChange={(v) => set("email", v)}
              />
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-border px-4 py-3">
          {saveError && (
            <p role="alert" className="mb-2 text-center text-xs font-medium text-destructive">
              Could not save the enquiry. Please try again. / விசாரணையைச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.
            </p>
          )}
          <Button className="w-full" disabled={!valid || submitting} onClick={send}>
            {t.placeOrder}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.ComponentProps<typeof Input>, "onChange" | "value">) {
  const id = label.replace(/\s/g, "-");
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </div>
  );
}
