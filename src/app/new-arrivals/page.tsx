"use client";

import { useEffect } from "react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useDataStore } from "@/store/data-store";
import { ProductGrid } from "@/components/product/product-grid";

export default function NewArrivalsPage() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const products = useDataStore((s) => s.products);
  const newProducts = products.filter((p) => p.isNew || p.isSale).slice(0, 12);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "New Arrivals" }]} />

        <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-2">
          New Arrivals
        </h1>
        <p className="text-[#666666] mb-8">
          Check out the latest additions to our collection
        </p>

        <ProductGrid products={newProducts} />
      </div>
    </div>
  );
}
