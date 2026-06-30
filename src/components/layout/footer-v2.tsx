"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "Interior Accessories", href: "/category/interior" },
      { label: "Exterior Accessories", href: "/category/exterior" },
      { label: "Lighting", href: "/category/lighting" },
      { label: "Electronics", href: "/category/electronics" },
      { label: "Car Care", href: "/category/car-care" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Brands", href: "/brands" },
      { label: "Store Locator", href: "/stores" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "FAQs", href: "/faq" },
      { label: "Track Order", href: "/track-order" },
      { label: "Warranty Policy", href: "/warranty" },
    ],
  },
};

const brandLogos = [
  "https://placehold.co/100x30/ECECEC/111111?text=Hyundai",
  "https://placehold.co/100x30/F8F8F8/111111?text=Toyota",
  "https://placehold.co/100x30/ECECEC/111111?text=Maruti",
  "https://placehold.co/100x30/F8F8F8/111111?text=Mahindra",
  "https://placehold.co/100x30/ECECEC/111111?text=Tata",
  "https://placehold.co/100x30/F8F8F8/111111?text=Honda",
  "https://placehold.co/100x30/ECECEC/111111?text=Kia",
  "https://placehold.co/100x30/F8F8F8/111111?text=MG",
];

export function FooterV2() {
  return (
    <footer className="bg-white border-t border-[#EEEEEE]">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#E53935] flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-[#111111]">
                Auto<span className="text-[#E53935]">Prestige</span>
              </span>
            </Link>
            <p className="text-sm text-[#666666] leading-relaxed mb-6 max-w-xs">
              India&apos;s premier destination for premium car accessories. Quality products, exceptional service, and fast delivery across the country.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+9118001234567" className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#111111] transition-colors">
                <Phone className="w-4 h-4 text-[#E53935]" />
                <span>1800-123-4567</span>
              </a>
              <a href="mailto:hello@autoprestige.in" className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#111111] transition-colors">
                <Mail className="w-4 h-4 text-[#E53935]" />
                <span>hello@autoprestige.in</span>
              </a>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">
              Top Brands
            </p>
            <div className="flex flex-wrap gap-2">
              {brandLogos.map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt={`Brand ${i + 1}`}
                  className="h-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-[#111111] mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[#666666] hover:text-[#111111] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#EEEEEE]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-xs text-[#666666]">
              <span>Google</span>
              <span className="text-[#E53935] font-semibold">★★★★★</span>
              <span>4.9 &middot; 2,500+ reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://placehold.co/44x28/ECECEC/666666?text=Visa" alt="Visa" className="h-7 rounded" />
              <img src="https://placehold.co/44x28/F8F8F8/666666?text=MC" alt="Mastercard" className="h-7 rounded" />
              <img src="https://placehold.co/44x28/ECECEC/666666?text=UPI" alt="UPI" className="h-7 rounded" />
              <img src="https://placehold.co/44x28/F8F8F8/666666?text=COD" alt="COD" className="h-7 rounded" />
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666666]">
            <p>&copy; {new Date().getFullYear()} AutoPrestige. All rights reserved. Made with ❤️ in India</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-[#111111] transition-colors">Shipping Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[#F8F8F8] p-6 border border-[#EEEEEE]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#111111]">Subscribe to our newsletter</p>
              <p className="text-xs text-[#666666]">Get 10% off your first order</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 h-10 px-4 rounded-xl border border-[#EEEEEE] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]"
              />
              <button className="bg-[#E53935] hover:bg-[#C62828] text-white px-5 rounded-xl text-sm font-semibold h-10 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
