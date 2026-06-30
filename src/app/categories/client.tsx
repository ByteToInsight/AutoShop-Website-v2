"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";

export function CategoriesPageClient() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const categories = useDataStore((s) => s.categories);
  const products = useDataStore((s) => s.products);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Categories" }]} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111]">
            Car Accessories Categories
          </h1>
          <p className="mt-2 text-[#666666]">
            Find the perfect accessories for every part of your car
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const catProducts = products.filter(
              (p) => p.category.toLowerCase() === cat.name.toLowerCase()
            );
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="group block bg-white rounded-2xl border border-[#ECECEC] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square bg-[#F8F8F8] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#111111]">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-[#666666]">
                        {catProducts.length} products
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center group-hover:bg-[#E53935] group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
