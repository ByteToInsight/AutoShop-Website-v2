"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";

const categoriesV2 = [
  { name: "Exterior", slug: "exterior", image: "https://placehold.co/600x800/ECECEC/111111?text=Exterior", count: 36 },
  { name: "Interior", slug: "interior", image: "https://placehold.co/600x800/F8F8F8/111111?text=Interior", count: 48 },
  { name: "Lighting", slug: "lighting", image: "https://placehold.co/600x800/ECECEC/111111?text=Lighting", count: 24 },
  { name: "Electronics", slug: "electronics", image: "https://placehold.co/600x800/F8F8F8/111111?text=Electronics", count: 30 },
  { name: "Protection", slug: "protection", image: "https://placehold.co/600x800/ECECEC/111111?text=Protection", count: 22 },
  { name: "Cleaning", slug: "cleaning", image: "https://placehold.co/600x800/F8F8F8/111111?text=Cleaning", count: 20 },
  { name: "Performance", slug: "performance", image: "https://placehold.co/600x800/ECECEC/111111?text=Performance", count: 18 },
  { name: "Styling", slug: "styling", image: "https://placehold.co/600x800/F8F8F8/111111?text=Styling", count: 15 },
];

export function CategoriesV2() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Shop by Category"
          subtitle="Find exactly what you need for your vehicle"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categoriesV2.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group block relative rounded-2xl overflow-hidden bg-[#F8F8F8] border border-[#EEEEEE] aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg md:text-xl">
                        {cat.name}
                      </h3>
                      <p className="text-white/70 text-sm">{cat.count} Products</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E53935] group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
