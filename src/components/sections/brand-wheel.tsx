"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight, Car } from "lucide-react";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";

const modelImages: Record<string, string> = {
  i10: "https://placehold.co/400x250/F8F8F8/111111?text=i10",
  i20: "https://placehold.co/400x250/ECECEC/111111?text=i20",
  Verna: "https://placehold.co/400x250/F8F8F8/111111?text=Verna",
  Creta: "https://placehold.co/400x250/ECECEC/111111?text=Creta",
  Tucson: "https://placehold.co/400x250/F8F8F8/111111?text=Tucson",
  Fortuner: "https://placehold.co/400x250/ECECEC/111111?text=Fortuner",
  "Innova Crysta": "https://placehold.co/400x250/F8F8F8/111111?text=Innova",
  Camry: "https://placehold.co/400x250/ECECEC/111111?text=Camry",
  Corolla: "https://placehold.co/400x250/F8F8F8/111111?text=Corolla",
  Glanza: "https://placehold.co/400x250/ECECEC/111111?text=Glanza",
  Swift: "https://placehold.co/400x250/F8F8F8/111111?text=Swift",
  Baleno: "https://placehold.co/400x250/ECECEC/111111?text=Baleno",
  "Vitara Brezza": "https://placehold.co/400x250/F8F8F8/111111?text=Brezza",
  Dzire: "https://placehold.co/400x250/ECECEC/111111?text=Dzire",
  Ertiga: "https://placehold.co/400x250/F8F8F8/111111?text=Ertiga",
  "Scorpio N": "https://placehold.co/400x250/ECECEC/111111?text=Scorpio",
  XUV700: "https://placehold.co/400x250/F8F8F8/111111?text=XUV700",
  Thar: "https://placehold.co/400x250/ECECEC/111111?text=Thar",
  Bolero: "https://placehold.co/400x250/F8F8F8/111111?text=Bolero",
  XUV300: "https://placehold.co/400x250/ECECEC/111111?text=XUV300",
  Harrier: "https://placehold.co/400x250/F8F8F8/111111?text=Harrier",
  Safari: "https://placehold.co/400x250/ECECEC/111111?text=Safari",
  Nexon: "https://placehold.co/400x250/F8F8F8/111111?text=Nexon",
  Punch: "https://placehold.co/400x250/ECECEC/111111?text=Punch",
  Altroz: "https://placehold.co/400x250/F8F8F8/111111?text=Altroz",
  City: "https://placehold.co/400x250/ECECEC/111111?text=City",
  "CR-V": "https://placehold.co/400x250/F8F8F8/111111?text=CRV",
  Amaze: "https://placehold.co/400x250/ECECEC/111111?text=Amaze",
  Elevate: "https://placehold.co/400x250/F8F8F8/111111?text=Elevate",
  Civic: "https://placehold.co/400x250/ECECEC/111111?text=Civic",
  Seltos: "https://placehold.co/400x250/F8F8F8/111111?text=Seltos",
  Sonet: "https://placehold.co/400x250/ECECEC/111111?text=Sonet",
  Carnival: "https://placehold.co/400x250/F8F8F8/111111?text=Carnival",
  EV6: "https://placehold.co/400x250/ECECEC/111111?text=EV6",
  Carens: "https://placehold.co/400x250/F8F8F8/111111?text=Carens",
  Hector: "https://placehold.co/400x250/ECECEC/111111?text=Hector",
  "ZS EV": "https://placehold.co/400x250/F8F8F8/111111?text=ZS+EV",
  Astor: "https://placehold.co/400x250/ECECEC/111111?text=Astor",
  Gloster: "https://placehold.co/400x250/F8F8F8/111111?text=Gloster",
  Comet: "https://placehold.co/400x250/ECECEC/111111?text=Comet",
  Octavia: "https://placehold.co/400x250/F8F8F8/111111?text=Octavia",
  Superb: "https://placehold.co/400x250/ECECEC/111111?text=Superb",
  Kushaq: "https://placehold.co/400x250/F8F8F8/111111?text=Kushaq",
  Slavia: "https://placehold.co/400x250/ECECEC/111111?text=Slavia",
  Kodiaq: "https://placehold.co/400x250/F8F8F8/111111?text=Kodiaq",
  Virtus: "https://placehold.co/400x250/ECECEC/111111?text=Virtus",
  Taigun: "https://placehold.co/400x250/F8F8F8/111111?text=Taigun",
  Tiguan: "https://placehold.co/400x250/ECECEC/111111?text=Tiguan",
  Polo: "https://placehold.co/400x250/F8F8F8/111111?text=Polo",
  Passat: "https://placehold.co/400x250/ECECEC/111111?text=Passat",
};

export function BrandWheel() {
  const router = useRouter();
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const brands = useDataStore((s) => s.brands);
  const vehicleData = useDataStore((s) => s.vehicleData);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  }, []);

  const handleBrandClick = (brandName: string) => {
    if (selectedBrand === brandName) {
      setSelectedBrand(null);
      return;
    }
    setSelectedBrand(brandName);
    setTimeout(() => {
      modelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const brandData = vehicleData.brands.find((b) => b.name === selectedBrand);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F8F8] text-sm text-[#666666] rounded-full mb-4 border border-[#EEEEEE]">
            <Car className="w-4 h-4" />
            Find Parts For Your Car
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#111111] leading-tight font-heading">
            Select Your{" "}
            <span className="text-[#E53935]">Vehicle Brand</span>
          </h2>
          <p className="mt-4 text-lg text-[#666666] max-w-xl mx-auto">
            Pick your car brand below to find the perfect accessories for your ride
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[#EEEEEE] flex items-center justify-center hover:bg-[#F8F8F8] transition-all active:scale-90"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-[#EEEEEE] flex items-center justify-center hover:bg-[#F8F8F8] transition-all active:scale-90"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory"
          >
            {brands.map((brand) => (
              <motion.button
                key={brand.id}
                onClick={() => handleBrandClick(brand.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`snap-start shrink-0 w-[180px] h-[180px] rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                  selectedBrand === brand.name
                    ? "border-[#E53935] bg-[#FFF5F5] shadow-lg shadow-red-100"
                    : "border-[#EEEEEE] bg-white hover:border-[#666666] hover:shadow-md"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center text-2xl font-bold text-[#111111]">
                  {brand.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-[#111111]">{brand.name}</span>
                <span className="text-xs text-[#666666]">
                  {brandData?.models.length || 0} Models
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {brands.map((brand, i) => (
              <button
                key={brand.id}
                onClick={() => {
                  if (!scrollRef.current) return;
                  const el = scrollRef.current.children[i] as HTMLElement;
                  el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedBrand === brand.name ? "bg-[#E53935] w-6" : "bg-[#DDDDDD] hover:bg-[#999999]"
                }`}
                aria-label={`Go to ${brand.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedBrand && brandData && (
          <motion.div
            ref={modelsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-12 md:mt-16 bg-[#F8F8F8] py-12 md:py-16 border-t border-b border-[#EEEEEE]"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#E53935] flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#111111] font-heading">
                      {selectedBrand}{" "}
                      <span className="text-[#E53935]">Models</span>
                    </h3>
                  </div>
                  <p className="text-[#666666]">
                    Select your model to browse compatible accessories
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-sm text-[#666666] hover:text-[#111111] transition-colors underline"
                >
                  Change Brand
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {brandData.models.map((model) => {
                  const imgSrc = modelImages[model.name] || `https://placehold.co/400x250/F8F8F8/111111?text=${model.name}`;
                  return (
                    <motion.button
                      key={model.name}
                      onClick={() =>
                        router.push(
                          `/vehicle/${selectedBrand.toLowerCase().replace(/\s+/g, "-")}/${model.name.toLowerCase().replace(/\s+/g, "-")}`
                        )
                      }
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      className="group bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden hover:border-[#E53935] hover:shadow-xl transition-all text-left"
                    >
                      <div className="aspect-[16/10] bg-[#F8F8F8] overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={model.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-base font-semibold text-[#111111]">{model.name}</p>
                        <p className="text-xs text-[#666666] mt-1">
                          {model.variants.length} variants available
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#E53935] opacity-0 group-hover:opacity-100 transition-opacity">
                          View Accessories
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
