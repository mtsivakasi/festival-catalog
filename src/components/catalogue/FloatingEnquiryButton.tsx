import { ClipboardList } from "lucide-react";
import { useShop } from "@/lib/shop-state";

export function FloatingEnquiryButton({ onClick }: { onClick: () => void }) {
  const { t, count } = useShop();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.enquiry}
      className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
    >
      <ClipboardList className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[11px] font-bold text-background">
          {count}
        </span>
      )}
    </button>
  );
}
