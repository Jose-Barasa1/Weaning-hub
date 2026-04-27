import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/data/products";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, removeItem, subtotal, count } = useCart();

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Your cart</h2>
            <span className="rounded-full bg-mint/40 px-2 py-0.5 text-xs font-semibold text-foreground">
              {count}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-mint/30">
              <ShoppingBag className="h-9 w-9 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a few essentials to get started.
              </p>
            </div>
            <Link
              to="/shop"
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:scale-[1.02] hover:shadow-glow"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4 py-4">
                  <Link
                    to="/shop/$slug"
                    params={{ slug: line.slug }}
                    onClick={closeCart}
                    className="block h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-mint/20"
                  >
                    <img src={line.product.image} alt={line.product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/shop/$slug"
                        params={{ slug: line.slug }}
                        onClick={closeCart}
                        className="font-display text-sm font-semibold text-foreground hover:text-primary"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(line.slug)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${line.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">{line.product.category}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper qty={line.qty} onChange={(q) => setQty(line.slug, q)} />
                      <span className="font-display text-sm font-semibold text-foreground">
                        {formatKsh(line.product.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border bg-card px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold text-foreground">
                  {formatKsh(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Delivery is calculated at checkout.
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.01] hover:shadow-glow"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 block w-full rounded-full px-4 py-2 text-center text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function QtyStepper({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-foreground">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
