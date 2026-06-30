"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/search";
import { useDataStore } from "@/store/data-store";
import { formatPrice } from "@/lib/format";

export function SearchOverlay() {
  const { isOpen, query, setQuery, closeSearch, recentSearches, addRecentSearch, clearRecentSearches } =
    useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const products = useDataStore((s) => s.products);
  const categories = useDataStore((s) => s.categories);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const suggestions = query ? filteredProducts.slice(0, 6) : [];
  const showSuggestions = query.length > 0;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    setSelectedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = showSuggestions ? suggestions : recentSearches;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      } else if (e.key === "Enter" && selectedIndex >= 0 && items[selectedIndex]) {
        e.preventDefault();
        if (showSuggestions) {
          const product = items[selectedIndex] as (typeof products)[0];
          addRecentSearch(product.title);
          closeSearch();
        } else {
          addRecentSearch(items[selectedIndex] as string);
          closeSearch();
        }
      } else if (e.key === "Escape") {
        closeSearch();
      }
    },
    [showSuggestions, suggestions, recentSearches, selectedIndex, addRecentSearch, closeSearch]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/30"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b border-[#ECECEC]"
          >
            <div className="container-custom py-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by product, brand, category, or vehicle..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-12 pr-12 h-14 text-lg border-2 border-[#ECECEC] focus-visible:border-[#E53935] rounded-xl"
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-[#666666]" />
                </button>
              </div>

              <div className="mt-6 max-w-2xl mx-auto">
                {showSuggestions ? (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3">
                      Products
                    </p>
                    {suggestions.length === 0 ? (
                      <p className="text-sm text-[#666666] py-4 text-center">
                        No products found for &ldquo;{query}&rdquo;
                      </p>
                    ) : (
                      suggestions.map((product, i) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            addRecentSearch(product.title);
                            closeSearch();
                          }}
                          className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            i === selectedIndex ? "bg-[#F8F8F8]" : "hover:bg-[#F8F8F8]"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#111111] truncate">
                              {product.title}
                            </p>
                            <p className="text-xs text-[#666666]">
                              {product.brand} &middot; {product.category}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-[#E53935] whitespace-nowrap">
                            {formatPrice(product.salePrice)}
                          </p>
                        </Link>
                      ))
                    )}
                    {filteredCategories.length > 0 && (
                      <>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mt-4 mb-3">
                          Categories
                        </p>
                        {filteredCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                          >
                            <div className="text-sm text-[#111111]">{cat.name}</div>
                            <span className="text-xs text-[#666666]">
                              ({cat.count})
                            </span>
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            Recent Searches
                          </p>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-[#E53935] hover:underline"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((search, i) => (
                            <button
                              key={search}
                              onClick={() => setQuery(search)}
                              className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                i === selectedIndex ? "bg-[#F8F8F8]" : "hover:bg-[#F8F8F8]"
                              }`}
                            >
                              <Clock className="w-4 h-4 text-[#666666]" />
                              <span className="text-sm text-[#666666]">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Popular Products
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {products.slice(0, 4).map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0">
                              <img
                                src={product.images[0]}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#111111] truncate">
                                {product.title}
                              </p>
                              <p className="text-xs text-[#E53935] font-semibold">
                                {formatPrice(product.salePrice)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
