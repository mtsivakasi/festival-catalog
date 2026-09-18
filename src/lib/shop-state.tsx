import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/data/i18n";
import { ui } from "@/data/i18n";

type Lines = Record<string, number>;

type ShopCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof ui)["en"];
  dark: boolean;
  toggleDark: () => void;
  lines: Lines;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<ShopCtx | null>(null);

const KEY = "mv-enquiry";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [lines, setLines] = useState<Lines>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as Lines);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const value = useMemo<ShopCtx>(
    () => ({
      lang,
      setLang,
      t: ui[lang],
      dark,
      toggleDark: () => setDark((d) => !d),
      lines,
      add: (id) => setLines((l) => ({ ...l, [id]: (l[id] ?? 0) + 1 })),
      setQty: (id, qty) =>
        setLines((l) => {
          const next = { ...l };
          if (qty <= 0) delete next[id];
          else next[id] = qty;
          return next;
        }),
      clear: () => setLines({}),
      count: Object.values(lines).reduce((a, b) => a + b, 0),
    }),
    [lang, dark, lines],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
