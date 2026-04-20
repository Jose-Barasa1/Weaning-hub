import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

type ThankYouSearch = {
  order?: string;
};

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>): ThankYouSearch => {
    return typeof search.order === "string" ? { order: search.order } : {};
  },
  head: () => ({
    meta: [
      { title: "Thank you — Weaning Hub Kenya" },
      { name: "description", content: "Your order has been sent. We'll be in touch on WhatsApp shortly." },
      { property: "og:title", content: "Thank you — Weaning Hub Kenya" },
      { property: "og:description", content: "Your order has been sent. We'll be in touch on WhatsApp shortly." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { order } = Route.useSearch();

  return (
    <section className="relative overflow-hidden">
      <div className="gradient-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-mint/50 blur-2xl" aria-hidden="true" />
          <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Order received
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Thank you for your order!
        </h1>
        <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
          We've opened WhatsApp with your order details — please hit send so our team can confirm
          the delivery and total. We typically reply within a few hours.
        </p>

        {order && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <span className="text-muted-foreground">Order ref</span>
            <span className="font-display font-semibold text-foreground">{order}</span>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/254768360690"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            <MessageCircle className="h-4 w-4" /> Reopen WhatsApp
          </a>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Keep shopping
          </Link>
        </div>

        <div className="mt-14 grid w-full gap-4 rounded-3xl border border-border bg-card p-6 text-left shadow-card sm:grid-cols-3">
          <Step n={1} title="Confirm on WhatsApp" desc="Send the pre-filled message so we receive your order." />
          <Step n={2} title="We pack with care" desc="Your essentials are checked, packed and dispatched." />
          <Step n={3} title="Delivered to you" desc="Pay on delivery or via M-Pesa when it arrives." />
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div>
      <div className="grid h-8 w-8 place-items-center rounded-full bg-mint/40 font-display text-sm font-bold text-primary">
        {n}
      </div>
      <p className="mt-3 font-display text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
