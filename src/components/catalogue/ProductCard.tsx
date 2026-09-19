import { Sparkles, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/lib/shop-state";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { t, add, setQty, lines } = useShop();
  const qty = lines[product.id] ?? 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-accent/60 to-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.nameEn}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Sparkles className="h-8 w-8 text-muted-foreground/50" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-sm leading-snug font-semibold text-foreground">
          {product.nameEn}
        </p>
        <p className="text-sm leading-snug text-muted-foreground">{product.nameTa}</p>
        <p className="mt-1 text-xs text-muted-foreground">{product.pack}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-base font-bold text-foreground">
            {product.price === null ? (
              <span className="text-xs font-medium text-muted-foreground">
                {t.priceOnRequest}
              </span>
            ) : (
              `₹${product.price.toLocaleString("en-IN")}`
            )}
          </span>
          {qty > 0 ? (
            <div className="flex items-center gap-1 rounded-md border border-border">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setQty(product.id, qty - 1)}
                aria-label={`${t.remove} ${product.nameEn}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="min-w-5 text-center text-sm font-semibold">{qty}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => add(product.id)}
                aria-label={`${t.add} ${product.nameEn}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => add(product.id)}
              aria-label={`${t.add} ${product.nameEn}`}
            >
              <Plus className="h-4 w-4" /> {t.add}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
