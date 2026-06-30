"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";

export function FeaturedCategories() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const categories = useDataStore((s) => s.categories);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Shop by Category"
          subtitle="Find exactly what you need for your vehicle"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block relative rounded-2xl overflow-hidden bg-[#F8F8F8] border border-[#ECECEC]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-base md:text-lg">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm">
                        {category.count} Products
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 transition-colors">
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
