import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sprout, Sparkles, Users } from "lucide-react";
import flatlay from "@/assets/about-flatlay.jpg";
import hero from "@/assets/hero-mom-baby.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Weaning Hub Kenya" },
      { name: "description", content: "We're a Kenyan brand on a mission to make weaning safer, simpler, and more joyful for every family." },
      { property: "og:title", content: "About Weaning Hub Kenya" },
      { property: "og:description", content: "A Kenyan brand on a mission to make weaning joyful and safe." },
      { property: "og:image", content: hero },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Heart, title: "Care first", text: "Every item is selected as if for our own babies — gentle, safe, and made to love." },
  { icon: Sprout, title: "Thoughtful sourcing", text: "We partner with food-grade, BPA-free manufacturers and never cut corners." },
  { icon: Sparkles, title: "Joy in mealtime", text: "We believe weaning should be playful and exploratory, not stressful." },
  { icon: Users, title: "A village for parents", text: "We share tips, recipes and support — because parenting is better together." },
];

function AboutPage() {
  return (
    <>
      <section className="gradient-hero border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Born from one mum's first messy spoonful.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty">
              Weaning Hub Kenya started in a small Nairobi kitchen — surrounded by purées,
              suction bowls and a baby refusing every spoon in the house. We searched for
              safer, kinder weaning gear and couldn't easily find it locally. So we built it.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border-8 border-card shadow-card">
              <img src={hero} alt="Mother feeding baby" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <img src={flatlay} alt="Pastel weaning accessories flatlay" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Mission</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Make weaning safer, simpler, and more joyful.
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              We curate food-grade silicone bowls, soft spoons, spill-proof cups and gentle
              teethers — everything you need from baby's first taste to confident toddler meals.
              No fluff. No shelf-fillers. Just things that genuinely help.
            </p>
            <p className="mt-3 text-muted-foreground text-pretty">
              Every product is tested against the same question: would we feed our own little one
              with this? If the answer isn't a confident yes, it doesn't make it to our shop.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our values</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            What we stand for
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-mint/40 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-primary px-8 py-14 text-center text-primary-foreground sm:px-14">
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-balance">
            Ready to make mealtimes magical?
          </h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Browse our full collection — every item is hand-picked for safety, comfort, and
            those wonderful first messy bites.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition-all hover:scale-[1.02]"
          >
            Explore the shop
          </Link>
        </div>
      </section>
    </>
  );
}
