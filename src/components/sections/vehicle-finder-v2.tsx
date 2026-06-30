"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";
import { ProductGrid } from "@/components/product/product-grid";

export function VehicleFinderV2() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const vehicleData = useDataStore((s) => s.vehicleData);
  const products = useDataStore((s) => s.products);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searched, setSearched] = useState(false);

  const brand = vehicleData.brands.find((b) => b.name === selectedBrand);
  const model = brand?.models.find((m) => m.name === selectedModel);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const compatibleProducts = selectedBrand
    ? products.filter((p) =>
        p.vehicleCompatibility.some(
          (v) =>
            v.toLowerCase().includes(selectedBrand.toLowerCase()) &&
            (selectedModel
              ? v.toLowerCase().includes(selectedModel.toLowerCase())
              : true)
        )
      )
    : [];

  const handleSearch = () => {
    if (selectedBrand) setSearched(true);
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setSearched(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Find Parts For Your Car"
          subtitle="Select your vehicle to see exactly what fits"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-[#ECECEC] p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  1. Choose Brand
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel("");
                      setSearched(false);
                    }}
                    className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer"
                    aria-label="Select car brand"
                  >
                    <option value="">Select Brand</option>
                    {vehicleData.brands.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  2. Choose Model
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setSearched(false);
                    }}
                    disabled={!selectedBrand}
                    className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Select car model"
                  >
                    <option value="">Select Model</option>
                    {brand?.models.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
                  3. Choose Year
                </label>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    disabled={!selectedModel}
                    className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Select car year"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666] pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] opacity-0 select-none">
                  Search
                </label>
                <Button
                  onClick={handleSearch}
                  disabled={!selectedBrand || !selectedModel}
                  className="w-full h-12 bg-[#E53935] hover:bg-[#C62828] text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Show Products
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {searched && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-[#ECECEC]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center border border-[#ECECEC]">
                      <Car className="w-6 h-6 text-[#E53935]" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#111111]">
                        {compatibleProducts.length} compatible products found
                      </p>
                      <p className="text-sm text-[#666666]">
                        for {selectedBrand} {selectedModel}
                        {selectedYear && ` (${selectedYear})`}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="ml-auto rounded-full border-[#ECECEC] shrink-0"
                    >
                      Reset
                    </Button>
                  </div>
                  {compatibleProducts.length > 0 && (
                    <ProductGrid products={compatibleProducts.slice(0, 8)} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!searched && (
              <div className="mt-6 flex items-center gap-2 text-sm text-[#666666] justify-center">
                <Search className="w-4 h-4" />
                <span>Search by brand, model, or year to find compatible products</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
