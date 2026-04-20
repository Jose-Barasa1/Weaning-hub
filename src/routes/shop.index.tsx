import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

type ShopSearch = {
  category?: Category;
};

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const cat = search.category;
    if (typeof cat === "string" && (categories as string[]).includes(cat)) {
      return { category: cat as Category };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Shop — Weaning Hub Kenya" },
      { name: "description", content: "Browse food-grade silicone bowls, spoons, cups, bibs, teethers and more." },
      { property: "og:title", content: "Shop — Weaning Hub Kenya" },
      { property: "og:description", content: "Safe, beautiful weaning essentials for Kenyan families." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | "All">(search.category ?? "All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = active === "All" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchesQ = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [active, query]);

  return (
    <>
      {/* HEADER */}
      <section className="border-b border-border gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Shop</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All weaning essentials
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse our full collection of food-grade silicone feeding tools, cups, bibs,
            storage and teethers — chosen with care for your little one.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0">
            <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground lg:inline-flex">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
            </span>
            <Chip active={active === "All"} onClick={() => setActive("All")}>All</Chip>
            {categories.map((c) => (
              <Chip key={c} active={active === c} onClick={() => setActive(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {products.length} products
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-display text-lg font-semibold">No products match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-card p-8 text-center shadow-card sm:p-12">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Not sure what to start with?
          </h2>
          <p className="mt-2 text-muted-foreground">Chat with us on WhatsApp — we love helping new parents.</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
