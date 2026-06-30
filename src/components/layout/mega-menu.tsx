"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const megaMenuItems = {
  Brands: {
    featured: ["Hyundai", "Toyota", "Maruti Suzuki", "Mahindra", "Tata", "Honda", "Kia", "MG"],
    columns: [
      {
        title: "Popular Brands",
        items: [
          { label: "Hyundai Accessories", href: "/brand/hyundai" },
          { label: "Toyota Accessories", href: "/brand/toyota" },
          { label: "Maruti Suzuki Accessories", href: "/brand/maruti-suzuki" },
          { label: "Mahindra Accessories", href: "/brand/mahindra" },
          { label: "Tata Accessories", href: "/brand/tata" },
        ],
      },
      {
        title: "More Brands",
        items: [
          { label: "Honda Accessories", href: "/brand/honda" },
          { label: "Kia Accessories", href: "/brand/kia" },
          { label: "MG Accessories", href: "/brand/mg" },
          { label: "Skoda Accessories", href: "/brand/skoda" },
          { label: "Volkswagen Accessories", href: "/brand/volkswagen" },
        ],
      },
    ],
  },
  "Car Accessories": {
    featured: ["Best Sellers", "New Arrivals", "Sale Items", "Gift Cards"],
    columns: [
      {
        title: "By Category",
        items: [
          { label: "Interior Accessories", href: "/category/interior" },
          { label: "Exterior Accessories", href: "/category/exterior" },
          { label: "Lighting", href: "/category/lighting" },
          { label: "Electronics", href: "/category/electronics" },
        ],
      },
      {
        title: "By Type",
        items: [
          { label: "Seat Covers", href: "/category/seat-covers" },
          { label: "Floor Mats", href: "/category/floor-mats" },
          { label: "Car Care", href: "/category/car-care" },
          { label: "Cleaning", href: "/category/cleaning" },
        ],
      },
    ],
  },
};

export function MegaMenu() {
  const data = megaMenuItems["Car Accessories"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 bg-white border border-[#ECECEC] rounded-2xl shadow-lg p-8 mt-2"
    >
      <div className="flex gap-12">
        <div className="space-y-2 min-w-[180px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-4">
            Featured
          </h3>
          {data.featured.map((item) => (
            <Link
              key={item}
              href="#"
              className="block text-sm text-[#666666] hover:text-[#111111] transition-colors py-1"
            >
              {item}
            </Link>
          ))}
        </div>
        {data.columns.map((column) => (
          <div key={column.title} className="space-y-2 min-w-[180px]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-4">
              {column.title}
            </h3>
            {column.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-sm text-[#666666] hover:text-[#111111] transition-colors py-1"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
