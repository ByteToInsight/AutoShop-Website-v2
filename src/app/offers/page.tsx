"use client";

import { useEffect } from "react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useDataStore } from "@/store/data-store";
import { ProductGrid } from "@/components/product/product-grid";

export default function OffersPage() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const products = useDataStore((s) => s.products);
  const saleProducts = products.filter((p) => p.isSale);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Offers" }]} />

        <div className="bg-gradient-to-r from-[#E53935] to-[#C62828] rounded-2xl p-8 md:p-12 text-white mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            Exclusive Deals
          </h1>
          <p className="text-white/80">
            Use code <span className="font-bold">PRESTIGE10</span> for 10% off your first order!
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-[#111111] mb-6">
          Products on Sale
        </h2>

        <ProductGrid products={saleProducts} />
      </div>
    </div>
  );
}
