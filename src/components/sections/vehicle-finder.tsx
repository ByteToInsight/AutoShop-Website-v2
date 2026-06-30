"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";

export function VehicleFinder() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const vehicleData = useDataStore((s) => s.vehicleData);
  const products = useDataStore((s) => s.products);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [searched, setSearched] = useState(false);

  const brand = vehicleData.brands.find((b) => b.name === selectedBrand);
  const model = brand?.models.find((m) => m.name === selectedModel);

  const compatibleCount = searched
    ? products.filter((p) =>
        p.vehicleCompatibility.some(
          (v) =>
            v.toLowerCase().includes(selectedBrand.toLowerCase()) &&
            v.toLowerCase().includes(selectedModel.toLowerCase())
        )
      ).length
    : 0;

  const handleSearch = () => {
    if (selectedBrand && selectedModel) {
      setSearched(true);
    }
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedVariant("");
    setSearched(false);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="container-custom">
        <SectionHeader
          title="Find Accessories for Your Car"
          subtitle="Select your vehicle to see compatible products"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-[#ECECEC] p-6 md:p-8 shadow-sm">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
                  Select Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel("");
                    setSelectedVariant("");
                    setSearched(false);
                  }}
                  className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer"
                  aria-label="Select car brand"
                >
                  <option value="">Choose Brand</option>
                  {vehicleData.brands.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
                  Select Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setSelectedVariant("");
                    setSearched(false);
                  }}
                  disabled={!selectedBrand}
                  className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Select car model"
                >
                  <option value="">Choose Model</option>
                  {brand?.models.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-2">
                  Select Variant
                </label>
                <select
                  value={selectedVariant}
                  onChange={(e) => {
                    setSelectedVariant(e.target.value);
                    setSearched(false);
                  }}
                  disabled={!selectedModel}
                  className="w-full h-12 px-4 rounded-xl border border-[#ECECEC] bg-white text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Select car variant"
                >
                  <option value="">Choose Variant</option>
                  {model?.variants.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={handleSearch}
                disabled={!selectedBrand || !selectedModel}
                className="flex-1 bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-12 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Compatible Products
              </Button>
              {searched && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-full h-12 border-[#ECECEC]"
                >
                  Reset
                </Button>
              )}
            </div>

            <AnimatePresence>
              {searched && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-[#ECECEC]"
                >
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Car className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#111111]">
                        {compatibleCount} compatible product{compatibleCount !== 1 ? "s" : ""} found
                      </p>
                      <p className="text-sm text-[#666666]">
                        for {selectedBrand} {selectedModel}
                        {selectedVariant && ` (${selectedVariant})`}
                      </p>
                    </div>
                    <Link href={`/vehicle/${selectedBrand.toLowerCase()}/${selectedModel.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button className="bg-[#111111] hover:bg-[#111111]/90 text-white rounded-full shrink-0">
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
