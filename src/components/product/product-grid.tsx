"use client";

import { ProductCard } from "./product-card";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6",
        columns === 4
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        className
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
