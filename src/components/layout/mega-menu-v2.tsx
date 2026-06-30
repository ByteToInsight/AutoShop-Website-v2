"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const menuSections = [
  {
    title: "Exterior",
    links: [
      { label: "Bumper Guard", href: "/category/exterior" },
      { label: "Door Visor", href: "/category/exterior" },
      { label: "Roof Rail", href: "/category/exterior" },
      { label: "Side Molding", href: "/category/exterior" },
      { label: "Body Kit", href: "/category/exterior" },
    ],
    image: "https://placehold.co/200x280/ECECEC/111111?text=Exterior",
  },
  {
    title: "Interior",
    links: [
      { label: "Seat Covers", href: "/category/seat-covers" },
      { label: "Floor Mats", href: "/category/floor-mats" },
      { label: "Steering Cover", href: "/category/interior" },
      { label: "Neck Pillow", href: "/category/interior" },
      { label: "Dashboard Mat", href: "/category/interior" },
    ],
    image: "https://placehold.co/200x280/F8F8F8/111111?text=Interior",
  },
  {
    title: "Lighting",
    links: [
      { label: "LED Fog Lamps", href: "/category/lighting" },
      { label: "Tail Lights", href: "/category/lighting" },
      { label: "Interior Lighting", href: "/category/lighting" },
      { label: "Headlight Bulbs", href: "/category/lighting" },
      { label: "Ambient Lights", href: "/category/lighting" },
    ],
    image: "https://placehold.co/200x280/ECECEC/111111?text=Lighting",
  },
  {
    title: "Electronics",
    links: [
      { label: "Dashboard Camera", href: "/category/electronics" },
      { label: "Air Purifier", href: "/category/electronics" },
      { label: "Wireless Charger", href: "/category/electronics" },
      { label: "GPS Tracker", href: "/category/electronics" },
      { label: "Parking Sensor", href: "/category/electronics" },
    ],
    image: "https://placehold.co/200x280/F8F8F8/111111?text=Electronics",
  },
];

export function MegaMenuV2() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="bg-white border-b border-[#EEEEEE] shadow-lg p-8"
    >
      <div className="flex gap-6">
        {menuSections.map((section) => (
          <div key={section.title} className="flex-1">
            <div className="aspect-[5/7] rounded-xl overflow-hidden bg-[#F8F8F8] mb-4">
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-[#111111] mb-3">{section.title}</h3>
            <ul className="space-y-1.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666666] hover:text-[#111111] hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="w-56 shrink-0 bg-[#F8F8F8] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E53935] mb-2">
              Popular
            </p>
            <h4 className="text-lg font-semibold text-[#111111] leading-snug">
              Best Selling Accessories
            </h4>
            <p className="text-sm text-[#666666] mt-2">
              Discover what other car owners are buying right now.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E53935] hover:gap-2.5 transition-all mt-4"
          >
            Shop Best Sellers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
