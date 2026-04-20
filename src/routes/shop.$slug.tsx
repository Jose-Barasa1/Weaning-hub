import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { getProduct, products, formatKsh } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    return {
      meta: product
        ? [
            { title: `${product.name} — Weaning Hub Kenya` },
            { name: "description", content: product.description },
            { property: "og:title", content: `${product.name} — Weaning Hub Kenya` },
            { property: "og:description", content: product.description },
            { property: "og:image", content: product.image },
            { name: "twitter:image", content: product.image },
          ]
        : [{ title: "Product — Weaning Hub Kenya" }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">This product may have moved or been renamed.</p>
      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(product.slug, qty);
    openCart();
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-mint/30 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{product.category}</span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-display text-3xl font-bold text-primary">{formatKsh(product.price)}</p>
          <p className="mt-5 text-muted-foreground text-pretty">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.highlights.map((h: string) => (
              <li key={h} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm">
                <Check className="h-4 w-4 text-primary" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-base font-semibold text-foreground">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow sm:flex-none"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Ask a question
            </Link>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl bg-blush/40 p-5 sm:grid-cols-2">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-sm font-semibold">Fast countrywide delivery</p>
                <p className="text-xs text-muted-foreground">Pay on delivery in Nairobi.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-sm font-semibold">100% food-grade</p>
                <p className="text-xs text-muted-foreground">BPA-free silicone you can trust.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-bold text-foreground sm:text-3xl">You may also love</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
