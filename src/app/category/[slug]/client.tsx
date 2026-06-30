"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, List, ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { ProductGrid } from "@/components/product/product-grid";
import { Filters, type FilterState } from "@/components/product/filters";
import { useDataStore } from "@/store/data-store";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface Props {
  category: { id: string; name: string; slug: string; count: number };
  products: Product[];
}

export function CategoryClient({ category, products: initialProducts }: Props) {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const storeProducts = useDataStore((s) => s.products);

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const products = initialized && storeProducts.length > 0
    ? storeProducts.filter((p) => p.category.toLowerCase() === category.name.toLowerCase())
    : initialProducts;

  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 50000],
    ratings: [],
  });

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
  ];

  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Most Popular";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      result = result.filter((p) => p.rating >= minRating);
    }
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) {
      result = result.filter(
        (p) => p.salePrice >= filters.priceRange[0] && p.salePrice <= filters.priceRange[1]
      );
    }

    switch (sortBy) {
      case "price-low":
        return result.sort((a, b) => a.salePrice - b.salePrice);
      case "price-high":
        return result.sort((a, b) => b.salePrice - a.salePrice);
      case "newest":
        return result.sort((a, _b) => (a.isNew ? -1 : 1));
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);
      default:
        return result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, sortBy, filters]);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: category.name }]} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111]">
            {category.name} Car Accessories
          </h1>
          <p className="mt-2 text-[#666666]">
            {filteredProducts.length} products found
          </p>
        </motion.div>

        <div className="flex gap-4 lg:gap-8">
          <Filters onFilterChange={setFilters} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setViewMode("grid")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-lg border transition-all duration-200",
                    viewMode === "grid"
                      ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                      : "border-[#ECECEC] text-[#666666] hover:text-[#111111] hover:border-[#999999]"
                  )}
                  aria-label="Grid view"
                >
                  <motion.div
                    animate={{ rotate: viewMode === "grid" ? 0 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </motion.div>
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-lg border transition-all duration-200",
                    viewMode === "list"
                      ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                      : "border-[#ECECEC] text-[#666666] hover:text-[#111111] hover:border-[#999999]"
                  )}
                  aria-label="List view"
                >
                  <motion.div
                    animate={{ rotate: viewMode === "list" ? 0 : 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <List className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>

              <div className="relative">
                <motion.button
                  onClick={() => setSortOpen(!sortOpen)}
                  whileTap={{ scale: 0.97 }}
                  className="appearance-none flex items-center gap-2 pl-3 pr-2.5 py-2.5 rounded-xl border border-[#ECECEC] text-sm text-[#111111] bg-white hover:border-[#999999] hover:shadow-sm transition-all min-w-0 sm:min-w-[170px]"
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
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <p className="text-lg text-[#666666]">No products found in this category.</p>
                <p className="text-sm text-[#666666] mt-2">Try adjusting your filters.</p>
              </motion.div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
