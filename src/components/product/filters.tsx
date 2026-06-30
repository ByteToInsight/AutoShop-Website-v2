"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";
import { cn } from "@/lib/utils";

const sectionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.04, duration: 0.2 },
  }),
};

const chevronVariants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
};

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  ratings: number[];
}

interface FiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

export function Filters({ className, onFilterChange }: FiltersProps) {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const categories = useDataStore((s) => s.categories);
  const brands = useDataStore((s) => s.brands);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "category",
    "price",
    "brand",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  const emitFilters = useCallback(
    (cats: string[], brs: string[], pr: [number, number], rats: number[]) => {
      onFilterChange?.({ categories: cats, brands: brs, priceRange: pr, ratings: rats });
    },
    [onFilterChange]
  );

  const toggleCategory = (catName: string) => {
    const next = selectedCategories.includes(catName)
      ? selectedCategories.filter((c) => c !== catName)
      : [...selectedCategories, catName];
    setSelectedCategories(next);
    emitFilters(next, selectedBrands, priceRange, selectedRatings);
  };

  const toggleBrand = (brandName: string) => {
    const next = selectedBrands.includes(brandName)
      ? selectedBrands.filter((b) => b !== brandName)
      : [...selectedBrands, brandName];
    setSelectedBrands(next);
    emitFilters(selectedCategories, next, priceRange, selectedRatings);
  };

  const toggleRating = (rating: number) => {
    const next = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(next);
    emitFilters(selectedCategories, selectedBrands, priceRange, next);
  };

  const handlePriceChange = (idx: 0 | 1, val: number) => {
    const next: [number, number] = [...priceRange] as [number, number];
    next[idx] = val;
    setPriceRange(next);
    emitFilters(selectedCategories, selectedBrands, next, selectedRatings);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setPriceRange([0, 50000]);
    onFilterChange?.({ categories: [], brands: [], priceRange: [0, 50000], ratings: [] });
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedRatings.length +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <>
      <motion.button
        onClick={() => setMobileOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#ECECEC] text-sm font-medium bg-white hover:shadow-md hover:border-[#E53935]/30 transition-shadow"
        aria-label="Open filters"
      >
        <motion.div
          animate={{ rotate: mobileOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </motion.div>
        Filters
        {activeFilterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E53935] text-white text-[10px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260, mass: 0.8 }}
              className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#ECECEC]">
                <span className="font-semibold text-[#111111]">Filters</span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-4">
                <FilterContent
                  priceRange={priceRange}
                  handlePriceChange={handlePriceChange}
                  toggleSection={toggleSection}
                  isExpanded={isExpanded}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  selectedBrands={selectedBrands}
                  toggleBrand={toggleBrand}
                  selectedRatings={selectedRatings}
                  toggleRating={toggleRating}
                  clearAll={() => { clearAll(); setMobileOpen(false); }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("hidden lg:block w-64 shrink-0", className)}>
        <div className="sticky top-28 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#111111]">Filters</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
              className="text-xs text-[#E53935] hover:underline font-medium inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </motion.button>
          </div>
          <FilterContent
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            toggleSection={toggleSection}
            isExpanded={isExpanded}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            selectedRatings={selectedRatings}
            toggleRating={toggleRating}
            clearAll={clearAll}
          />
        </div>
      </div>
    </>
  );
}

function FilterContent({
  priceRange,
  handlePriceChange,
  toggleSection,
  isExpanded,
  selectedCategories,
  toggleCategory,
  selectedBrands,
  toggleBrand,
  selectedRatings,
  toggleRating,
  clearAll,
}: {
  priceRange: [number, number];
  handlePriceChange: (idx: 0 | 1, val: number) => void;
  toggleSection: (s: string) => void;
  isExpanded: (s: string) => boolean;
  selectedCategories: string[];
  toggleCategory: (name: string) => void;
  selectedBrands: string[];
  toggleBrand: (name: string) => void;
  selectedRatings: number[];
  toggleRating: (rating: number) => void;
  clearAll: () => void;
}) {
  const categories = useDataStore((s) => s.categories);
  const brands = useDataStore((s) => s.brands);

  return (
    <div className="space-y-5">
      <FilterSection
        title="Category"
        sectionKey="category"
        isExpanded={isExpanded}
        toggleSection={toggleSection}
      >
        <div className="pt-3 space-y-2">
          {categories.map((cat, i) => (
            <motion.label
              key={cat.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 py-1 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
                className="border-[#ECECEC] data-[state=checked]:bg-[#E53935] data-[state=checked]:border-[#E53935]"
              />
              <span className="text-sm text-[#666666] group-hover:text-[#111111] transition-colors">
                {cat.name}
              </span>
              <span className="text-xs text-[#666666] ml-auto">({cat.count})</span>
            </motion.label>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-[#ECECEC]" />

      <FilterSection
        title="Price Range"
        sectionKey="price"
        isExpanded={isExpanded}
        toggleSection={toggleSection}
      >
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
              placeholder="Min"
              min={0}
              max={priceRange[1]}
            />
            <span className="text-[#666666] text-sm">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
              placeholder="Max"
              min={priceRange[0]}
              max={50000}
            />
          </div>
          <div className="flex justify-between text-xs text-[#666666]">
            <span>₹0</span>
            <span>₹50,000+</span>
          </div>
        </div>
      </FilterSection>

      <Separator className="bg-[#ECECEC]" />

      <FilterSection
        title="Brand"
        sectionKey="brand"
        isExpanded={isExpanded}
        toggleSection={toggleSection}
      >
        <div className="pt-3 space-y-2">
          {brands.map((brand, i) => (
            <motion.label
              key={brand.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 py-1 cursor-pointer group"
            >
              <Checkbox
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() => toggleBrand(brand.name)}
                className="border-[#ECECEC] data-[state=checked]:bg-[#E53935] data-[state=checked]:border-[#E53935]"
              />
              <span className="text-sm text-[#666666] group-hover:text-[#111111] transition-colors">
                {brand.name}
              </span>
            </motion.label>
          ))}
        </div>
      </FilterSection>

      <Separator className="bg-[#ECECEC]" />

      <FilterSection
        title="Rating"
        sectionKey="rating"
        isExpanded={isExpanded}
        toggleSection={toggleSection}
      >
        <div className="pt-3 space-y-2">
          {[5, 4, 3, 2, 1].map((rating, i) => (
            <motion.label
              key={rating}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 py-1 cursor-pointer group"
            >
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => toggleRating(rating)}
                className="border-[#ECECEC] data-[state=checked]:bg-[#E53935] data-[state=checked]:border-[#E53935]"
              />
              <span className="text-sm text-[#666666] group-hover:text-[#111111] transition-colors">
                {rating} ★ & Above
              </span>
            </motion.label>
          ))}
        </div>
      </FilterSection>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={clearAll}
          className="w-full bg-[#E53935] hover:bg-[#C62828] text-white rounded-full font-semibold shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 transition-shadow"
        >
          Apply Filters
        </Button>
      </motion.div>
    </div>
  );
}

function FilterSection({
  title,
  sectionKey,
  isExpanded,
  toggleSection,
  children,
}: {
  title: string;
  sectionKey: string;
  isExpanded: (s: string) => boolean;
  toggleSection: (s: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <motion.button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-sm font-semibold text-[#111111] group"
        whileTap={{ scale: 0.98 }}
      >
        <span>{title}</span>
        <motion.div
          variants={chevronVariants}
          animate={isExpanded(sectionKey) ? "expanded" : "collapsed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#666666] group-hover:text-[#111111] transition-colors" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isExpanded(sectionKey) && (
          <motion.div
            variants={sectionVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
