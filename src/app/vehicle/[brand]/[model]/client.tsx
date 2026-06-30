"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Car, ChevronDown } from "lucide-react";
import { ProductCardV2 } from "@/components/product/product-card-v2";
import { Breadcrumb } from "@/components/common/breadcrumb";

import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const pillVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.04 },
  tap: { scale: 0.95 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  brandName: string;
  modelName: string;
  products: Product[];
  variants: string[];
}

export function VehicleProductsClient({ brandName, modelName, products, variants }: Props) {
  const [sortBy, setSortBy] = useState("popular");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Most Popular";

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedVariant) {
      filtered = filtered.filter((p) =>
        p.vehicleCompatibility.some((v) =>
          v.toLowerCase().includes(selectedVariant.toLowerCase())
        )
      );
    }
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.salePrice - b.salePrice);
      case "price-high":
        return filtered.sort((a, b) => b.salePrice - a.salePrice);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, sortBy, selectedVariant]);

  const displayName = `${brandName} ${modelName}`;

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb
          items={[
            { label: brandName, href: `/brand/${brandName.toLowerCase().replace(/\s+/g, "-")}` },
            { label: modelName },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-[#111111] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF5F5] to-[#F8F8F8] flex items-center justify-center border border-[#EEEEEE]"
            >
              <Car className="w-7 h-7 text-[#E53935]" />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] font-heading">
                {displayName}{" "}
                <span className="text-[#E53935]">Accessories</span>
              </h1>
              <p className="text-[#666666]">
                {products.length} compatible products found for {displayName}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 p-5 rounded-2xl bg-gradient-to-br from-[#F8F8F8] to-white border border-[#EEEEEE]"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-semibold uppercase tracking-wider text-[#666666]"
            >
              Filter by Variant:
            </motion.span>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2"
            >
              <motion.button
                variants={pillVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSelectedVariant(null)}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
                  !selectedVariant
                    ? "bg-[#E53935] text-white border-[#E53935] shadow-sm shadow-red-200"
                    : "bg-white text-[#666666] border-[#EEEEEE] hover:border-[#999999] hover:text-[#111111]"
                )}
              >
                All
              </motion.button>
              {variants.map((v) => (
                <motion.button
                  key={v}
                  variants={pillVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedVariant(selectedVariant === v ? null : v)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
                    selectedVariant === v
                      ? "bg-[#E53935] text-white border-[#E53935] shadow-sm shadow-red-200"
                      : "bg-white text-[#666666] border-[#EEEEEE] hover:border-[#999999] hover:text-[#111111]"
                  )}
                >
                  {v}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <motion.button
              onClick={() => setSortOpen(!sortOpen)}
              whileTap={{ scale: 0.97 }}
              className="appearance-none flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl border border-[#EEEEEE] text-sm text-[#111111] bg-white hover:border-[#999999] hover:shadow-sm transition-all min-w-[170px]"
            >
              <span className="flex-1 text-left">{currentSortLabel}</span>
              <motion.div
                animate={{ rotate: sortOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-4 h-4 text-[#666666]" />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-1 w-full min-w-[180px] bg-white rounded-xl border border-[#EEEEEE] shadow-lg z-20 overflow-hidden"
                >
                  {sortOptions.map((opt) => (
                    <motion.button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      whileHover={{ backgroundColor: "#F8F8F8" }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors",
                        sortBy === opt.value
                          ? "text-[#E53935] font-semibold bg-[#FFF5F5]"
                          : "text-[#666666] hover:text-[#111111]"
                      )}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
            >
              <Car className="w-16 h-16 text-[#DDDDDD] mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-[#111111] mb-2">No products found</h3>
            <p className="text-[#666666]">
              We couldn&apos;t find any products compatible with {selectedVariant ? `${displayName} ${selectedVariant}` : displayName}.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, i) => (
              <motion.div key={product.id} variants={cardVariants}>
                <ProductCardV2 product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
