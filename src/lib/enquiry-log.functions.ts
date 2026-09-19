import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { products } from "@/data/products";

const input = z.object({
  name: z.string().trim().min(1).max(80),
  mobile: z.string().trim().regex(/^\d{10}$/),
  address: z.string().trim().min(1).max(300),
  city: z.string().trim().min(1).max(60),
  pin: z.string().trim().regex(/^\d{6}$/),
  email: z.union([z.string().trim().email().max(120), z.literal("")]),
  lang: z.enum(["en", "ta"]),
  lines: z.record(z.string().max(40), z.number().int().min(1).max(999)).refine(
    (l) => Object.keys(l).length > 0 && Object.keys(l).length <= 200,
  ),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

function istParts() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]));
  return {
    date: `${p['day']}-${p['month']}-${p['year']}`,
    time: `${p['hour']}:${p['minute']}`,
  };
}

export const logEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => input.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env['LOVABLE_API_KEY'];
    const sheetsKey = process.env['GOOGLE_SHEETS_API_KEY'];
    const sheetId = process.env['ENQUIRY_SHEET_ID'];
    if (!lovableKey || !sheetsKey || !sheetId) {
      console.error("Enquiry log skipped: missing Google Sheets configuration");
      return { ok: false as const };
    }

    // Recompute names, packs and totals from the local catalogue — never trust the client.
    const items = Object.entries(data.lines)
      .map(([id, qty]) => ({ product: products.find((p) => p.id === id), qty }))
      .filter((i): i is { product: (typeof products)[number]; qty: number } => Boolean(i.product));
    if (items.length === 0) return { ok: false as const };

    const itemText = items
      .map((i) => `${i.product.nameEn} (${i.product.pack}) x ${i.qty}`)
      .join("; ");
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + (i.product.price ?? 0) * i.qty, 0);
    const { date, time } = istParts();

    const row = [
      date,
      time,
      data.name,
      data.mobile,
      data.address,
      data.city,
      data.pin,
      data.email,
      itemText,
      count,
      total,
      data.lang === "ta" ? "Tamil" : "English",
    ];

    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${sheetId}/values/Enquiries!A:L:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`Enquiry log append failed [${res.status}]: ${body}`);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
