import Link from "next/link"
import { FooterLinks } from "./footer-links"
import { FooterNewsletter } from "./footer-newsletter"
import { FooterSocial } from "./footer-social"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-forest-600/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Logo & Brand description */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="text-2xl font-extrabold font-display text-primary-foreground flex items-center gap-1.5"
            >
              <span>⚡ VoltTrail</span>
            </Link>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed font-medium max-w-sm">
              We design alpine-grade electric bicycles and gear engineered for wilderness trails and sleek city streets. Ride Further. Live Wilder.
            </p>
            <FooterSocial />
          </div>

          {/* Nav Directory Links */}
          <div className="lg:col-span-5">
            <FooterLinks />
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3">
            <FooterNewsletter />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-forest-600/40 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground/50 font-medium">
          <div>
            &copy; {new Date().getFullYear()} VoltTrail Inc. All rights reserved. Made for adventure.
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/shipping" className="hover:text-primary-foreground transition-colors">
              Shipping & Returns
            </Link>
            <Link href="/warranty" className="hover:text-primary-foreground transition-colors">
              Warranty Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
