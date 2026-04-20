import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Leaf, HeartHandshake, Truck, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mom-baby.jpg";
import flatlay from "@/assets/about-flatlay.jpg";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weaning Hub Kenya — Safe, Loving Weaning Essentials" },
      {
        name: "description",
        content:
          "Discover food-grade silicone bowls, spoons, bibs, cups and teethers for happy mealtimes. Trusted by Kenyan parents.",
      },
      { property: "og:title", content: "Weaning Hub Kenya" },
      { property: "og:description", content: "Trusted weaning essentials for Kenyan families." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: ShieldCheck, title: "BPA-free & food-grade", text: "Every product is tested-safe silicone, gentle on tiny gums and tummies." },
  { icon: Leaf, title: "Thoughtfully sourced", text: "We curate only the essentials babies actually need — nothing wasteful." },
  { icon: HeartHandshake, title: "Loved by Kenyan moms", text: "Hundreds of happy families trust Weaning Hub from first foods to toddlerhood." },
  { icon: Truck, title: "Countrywide delivery", text: "Fast, reliable delivery across Kenya — pay on delivery in Nairobi." },
];

function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-2 md:pt-20 lg:px-8">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              All about weaning, made simple
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              Safe little spoons. <br />
              <span className="text-primary">Big happy meals.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground text-pretty">
              Lovingly curated weaning essentials — silicone bowls, soft spoons, snack
              cups and teethers — designed to make every first bite a happy one.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Our story
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background"
                    style={{ background: `oklch(0.82 0.07 ${180 + i * 8})` }}
                  />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-foreground">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                  <span className="ml-1 font-semibold">4.9</span>
                </div>
                Trusted by 1,200+ Kenyan parents
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blush blur-2xl opacity-70" aria-hidden="true" />
            <div className="absolute -bottom-10 -right-6 h-40 w-40 rounded-full bg-mint blur-3xl opacity-60" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-card shadow-glow">
              <img
                src={heroImage}
                alt="Mother joyfully feeding her baby with a silicone weaning spoon"
                width={1600}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="animate-float absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-card sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-mint/40">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold">100% Food-grade</div>
                  <div className="text-xs text-muted-foreground">Silicone & BPA-free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint/40 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Shop by category</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Everything for the weaning journey
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to="/shop"
              search={{ category: cat }}
              className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-mint/30 text-primary transition-colors group-hover:bg-mint">
                <CategoryIcon name={cat} />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Parent-loved favourites
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-card shadow-card">
          <div className="grid items-center gap-0 md:grid-cols-2">
            <div className="order-2 p-8 md:order-1 md:p-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our promise</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Made for Kenyan mums, with love.
              </h2>
              <p className="mt-4 text-muted-foreground text-pretty">
                Weaning is a milestone — and a mess. We hand-pick safe, food-grade essentials so
                you can focus on the giggles, not the worry. From baby's first spoon to toddler's
                last sippy cup, we're with you every bite of the way.
              </p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02]"
              >
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={flatlay}
                alt="Flatlay of pastel weaning accessories"
                width={1400}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Happy parents</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Words from our community
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { quote: "The silicone set saved my sanity. Baby loves the bowl and it actually stays on the table!", name: "Wanjiru", city: "Nairobi" },
            { quote: "Delivery was so fast. The teethers are beautifully made and our little one adores them.", name: "Aisha", city: "Mombasa" },
            { quote: "Finally a Kenyan brand for weaning that I trust. Quality is amazing.", name: "Cynthia", city: "Kisumu" },
          ].map((t) => (
            <figure key={t.name} className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="mb-3 flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-foreground text-pretty">"{t.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                — {t.name}, {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const map: Record<string, string> = {
    Feeding: "🥄",
    "Cups & Bowls": "🥣",
    Bibs: "👶",
    Storage: "📦",
    Cleaning: "🧽",
    "Teethers & Soothers": "🧸",
  };
  return <span className="text-xl">{map[name] ?? "✨"}</span>;
}
