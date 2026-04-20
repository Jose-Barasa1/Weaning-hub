import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Weaning Hub Kenya" },
      { name: "description", content: "Talk to Weaning Hub Kenya — call, WhatsApp, email or send a message. We love hearing from parents." },
      { property: "og:title", content: "Contact Weaning Hub Kenya" },
      { property: "og:description", content: "Talk to us. We love hearing from parents." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="gradient-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            We'd love to hear from you.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Questions about weaning? Need a recommendation? Bulk order for a baby shower?
            We're here for it. Reach out via WhatsApp for the fastest reply.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-5 lg:px-8">
        <aside className="md:col-span-2 space-y-4">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp (fastest)"
            value="+254 768 360 690"
            href="https://wa.me/254768360690"
            cta="Open chat"
          />
          <ContactCard icon={Phone} title="Call us" value="+254 703 751 668" href="tel:+254703751668" cta="Call now" />
          <ContactCard icon={Mail} title="Email" value="hello@weaninghub.co.ke" href="mailto:hello@weaninghub.co.ke" cta="Send email" />
          <ContactCard icon={Instagram} title="Instagram" value="@weaninghub.ke" href="https://instagram.com" cta="Follow us" />
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display font-semibold">Nairobi, Kenya</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mon–Sat · 9:00 AM – 6:00 PM EAT
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="md:col-span-3">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-9">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint/50 text-primary">
                  <Check className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Message received!</h2>
                <p className="mt-2 text-muted-foreground">
                  Thanks for reaching out. We'll reply within one business day.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">We reply within one business day.</p>
                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name" name="name" required placeholder="Wanjiru" />
                    <Field label="Phone" name="phone" type="tel" placeholder="+254 7…" />
                  </div>
                  <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">How can we help?</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us a little about what you're looking for…"
                      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-[1.02] hover:shadow-glow"
                  >
                    <Send className="h-4 w-4" /> Send message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-full border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
      className="group flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-mint/40 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="font-display text-base font-semibold text-foreground">{value}</p>
        </div>
      </div>
      <span className="text-xs font-medium text-primary opacity-70 group-hover:opacity-100">{cta} →</span>
    </a>
  );
}
