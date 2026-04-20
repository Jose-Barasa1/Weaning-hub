import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKsh } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Weaning Hub Kenya" },
      { name: "description", content: "Review your order and complete checkout via WhatsApp." },
      { property: "og:title", content: "Checkout — Weaning Hub Kenya" },
      { property: "og:description", content: "Quick, friendly checkout — pay on delivery in Nairobi." },
    ],
  }),
  component: CheckoutPage,
});

const WHATSAPP_NUMBER = "254768360690";

const DELIVERY_OPTIONS = [
  { id: "nairobi-cbd", label: "Nairobi CBD pickup", fee: 0 },
  { id: "nairobi", label: "Nairobi delivery", fee: 300 },
  { id: "countrywide", label: "Countrywide courier", fee: 600 },
] as const;

type DeliveryId = (typeof DELIVERY_OPTIONS)[number]["id"];

function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState<DeliveryId>("nairobi");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.fee ?? 0;
  const total = subtotal + deliveryFee;

  if (count === 0) {
    return (
      <section className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some essentials before checking out.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Browse the shop
        </Link>
      </section>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9+\s-]{7,}$/.test(phone.trim())) e.phone = "Enter a valid phone number";
    if (!town.trim()) e.town = "Please enter your town/city";
    if (delivery !== "nairobi-cbd" && !address.trim()) e.address = "Please enter a delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const deliveryLabel = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.label ?? "";
    const orderId = `WH-${Date.now().toString(36).toUpperCase()}`;
    const itemsText = lines
      .map(
        (l) =>
          `• ${l.product.name} × ${l.qty} — ${formatKsh(l.product.price * l.qty)}`,
      )
      .join("\n");

    const message =
      `*New order from Weaning Hub website*\n` +
      `Order ID: ${orderId}\n\n` +
      `*Items*\n${itemsText}\n\n` +
      `Subtotal: ${formatKsh(subtotal)}\n` +
      `Delivery (${deliveryLabel}): ${formatKsh(deliveryFee)}\n` +
      `*Total: ${formatKsh(total)}*\n\n` +
      `*Customer*\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Town/City: ${town}\n` +
      (address ? `Address: ${address}\n` : "") +
      (notes ? `Notes: ${notes}\n` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    clear();
    navigate({ to: "/thank-you", search: { order: orderId } });
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Checkout</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Almost there
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Confirm your details below — your order will be sent to us on WhatsApp so we can finalise
          delivery and payment together.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-base font-semibold">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Wanjiku"
                  className="input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone (WhatsApp)" error={errors.phone}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                  className="input"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <legend className="px-2 font-display text-base font-semibold">Delivery</legend>
            <div className="grid gap-3">
              {DELIVERY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                    delivery === opt.id
                      ? "border-primary bg-mint/30"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.id}
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                      className="h-4 w-4 accent-[oklch(var(--primary))]"
                    />
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </span>
                  <span className="font-display text-sm font-semibold text-primary">
                    {opt.fee === 0 ? "Free" : formatKsh(opt.fee)}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Town / City" error={errors.town}>
                <input
                  type="text"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  placeholder="Nairobi"
                  className="input"
                  autoComplete="address-level2"
                />
              </Field>
              <Field
                label={delivery === "nairobi-cbd" ? "Pickup notes (optional)" : "Delivery address"}
                error={errors.address}
              >
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={delivery === "nairobi-cbd" ? "e.g. preferred pickup time" : "Estate, building, house no."}
                  className="input"
                  autoComplete="street-address"
                />
              </Field>
            </div>

            <Field label="Order notes (optional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anything we should know?"
                className="input resize-none"
              />
            </Field>
          </fieldset>

          <div className="grid gap-3 rounded-2xl bg-blush/40 p-5 sm:grid-cols-2">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-sm font-semibold">Pay on delivery</p>
                <p className="text-xs text-muted-foreground">M-Pesa or cash inside Nairobi.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-sm font-semibold">No spam, ever</p>
                <p className="text-xs text-muted-foreground">We only message about your order.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.01] hover:shadow-glow"
          >
            <MessageCircle className="h-4 w-4" /> Place order via WhatsApp
          </button>
          <p className="text-center text-xs text-muted-foreground">
            We'll open WhatsApp with your order pre-filled. Send the message to confirm.
          </p>
        </form>

        {/* SUMMARY */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>
            <ul className="mt-4 divide-y divide-border">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-mint/20">
                    <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      {l.qty}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-medium text-foreground">{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">{formatKsh(l.product.price)} each</p>
                  </div>
                  <span className="font-display text-sm font-semibold text-foreground">
                    {formatKsh(l.product.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium text-foreground">{formatKsh(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium text-foreground">
                  {deliveryFee === 0 ? "Free" : formatKsh(deliveryFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-display text-base font-semibold">Total</dt>
                <dd className="font-display text-xl font-bold text-primary">{formatKsh(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
