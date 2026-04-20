import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  slug: string;
  qty: number;
};

export type CartLine = CartItem & { product: Product };

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "weaning-hub-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage on mount only (avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((i) => i && typeof i.slug === "string" && typeof i.qty === "number" && i.qty > 0));
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((i) => {
        const product = products.find((p) => p.slug === i.slug);
        return product ? { ...i, product } : null;
      })
      .filter((x): x is CartLine => x !== null);
  }, [items]);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0), [lines]);

  const value: CartContextValue = {
    items,
    lines,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
    addItem: (slug, qty = 1) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.slug === slug);
        if (existing) {
          return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
        }
        return [...prev, { slug, qty }];
      }),
    removeItem: (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)),
    setQty: (slug, qty) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((i) => i.slug !== slug)
          : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
      ),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
