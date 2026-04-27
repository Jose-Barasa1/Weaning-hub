import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            All about weaning. Trusted, food-grade baby feeding essentials and teething
            soothers — thoughtfully sourced for Kenyan families.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Shop</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground uppercase">Get in touch</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+254 768 360 690</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+254 703 751 668</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>hello@weaninghub.co.ke</span></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><span>Nairobi, Kenya</span></li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 hover:text-foreground">
                <Instagram className="h-4 w-4 text-primary" /><span>@weaninghub.ke</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Weaning Hub Kenya. All rights reserved.</p>
          <p>Made with care for growing little ones 🌿</p>
        </div>
      </div>
    </footer>
  );
}
