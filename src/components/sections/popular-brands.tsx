"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";

export function PopularBrands() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const brands = useDataStore((s) => s.brands);

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="container-custom">
        <SectionHeader
          title="Shop by Brand"
          subtitle="Premium accessories for every car brand in India"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/brand/${brand.slug}`}
                className="group block bg-white rounded-2xl border border-[#EEEEEE] p-6 md:p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#E53935] transition-colors duration-300">
                  <span className="text-xl font-bold text-[#111111] group-hover:text-white transition-colors duration-300">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#111111]">{brand.name}</h3>
                <p className="text-xs text-[#666666] mt-1">Browse Accessories</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
