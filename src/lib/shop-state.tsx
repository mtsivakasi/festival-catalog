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
const LIST_TIMEOUT_MS = 15 * 60 * 1000;

type SavedList = {
  lines: Lines;
  updatedAt: number;
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [lines, setLines] = useState<Lines>({});
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<SavedList>;
        const isCurrent =
          saved.lines &&
          typeof saved.updatedAt === "number" &&
          Date.now() - saved.updatedAt < LIST_TIMEOUT_MS;
        if (isCurrent) {
          setLines(saved.lines ?? {});
          setUpdatedAt(saved.updatedAt ?? null);
        } else {
          localStorage.removeItem(KEY);
        }
      }
    } catch {
      localStorage.removeItem(KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      if (Object.keys(lines).length === 0 || updatedAt === null) {
        localStorage.removeItem(KEY);
      } else {
        localStorage.setItem(KEY, JSON.stringify({ lines, updatedAt } satisfies SavedList));
      }
    } catch {
      /* ignore */
    }
  }, [lines, loaded, updatedAt]);

  useEffect(() => {
    if (!loaded || updatedAt === null || Object.keys(lines).length === 0) return;
    const remaining = LIST_TIMEOUT_MS - (Date.now() - updatedAt);
    if (remaining <= 0) {
      setLines({});
      setUpdatedAt(null);
      return;
    }
    const timeout = window.setTimeout(() => {
      setLines({});
      setUpdatedAt(null);
    }, remaining);
    return () => window.clearTimeout(timeout);
  }, [lines, loaded, updatedAt]);

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
      add: (id) => {
        setLines((l) => ({ ...l, [id]: (l[id] ?? 0) + 1 }));
        setUpdatedAt(Date.now());
      },
      setQty: (id, qty) => {
        setLines((l) => {
          const next = { ...l };
          if (qty <= 0) delete next[id];
          else next[id] = qty;
          return next;
        });
        setUpdatedAt(qty > 0 || Object.keys(lines).length > 1 ? Date.now() : null);
      },
      clear: () => {
        setLines({});
        setUpdatedAt(null);
      },
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
