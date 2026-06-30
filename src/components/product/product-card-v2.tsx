"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatPrice, calculateSavings } from "@/lib/format";
import { QuickView } from "./quick-view";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardV2Props {
  product: Product;
  index?: number;
}

export function ProductCardV2({ product, index = 0 }: ProductCardV2Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { requireAuth } = useRequireAuth();
  const wishlisted = isWishlisted(product.id);

  const savings = product.isSale
    ? calculateSavings(product.salePrice, product.regularPrice)
    : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group"
      >
        <div className="relative bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <Link href={`/product/${product.slug}`} className="block">
            <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden">
              {!imgError ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700",
                    isHovered && "scale-110"
                  )}
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#666666] text-sm">
                  {product.title.charAt(0)}
                </div>
              )}

              {product.isSale && (
                <Badge className="absolute top-3 left-3 bg-[#E53935] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold z-10">
                  -{savings}%
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-3 right-3 bg-[#111111] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold z-10">
                  New
                </Badge>
              )}

              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent transition-all duration-300",
                  "lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0",
                  "opacity-100 translate-y-0"
                )}
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    requireAuth(() =>
                      addItem({
                        id: product.id,
                        slug: product.slug,
                        title: product.title,
                        image: product.images[0],
                        salePrice: product.salePrice,
                        regularPrice: product.regularPrice,
                        stock: product.stock,
                      })
                    );
                  }}
                  className="w-full bg-white text-[#111111] hover:bg-[#F8F8F8] rounded-full h-10 text-xs font-semibold shadow-lg transition-all active:scale-95"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Link>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleItem(product.id);
              }}
              className={cn(
                "absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-all duration-300 z-10",
                "lg:opacity-0 lg:translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0",
                "opacity-100 translate-x-0"
              )}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn(
                  "w-4 h-4",
                  wishlisted ? "fill-[#E53935] text-[#E53935]" : "text-[#666666]"
                )}
              />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className={cn(
                "absolute top-3 left-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-all duration-300 z-10",
                "lg:opacity-0 lg:-translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0",
                "opacity-100 translate-x-0"
              )}
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4 text-[#666666]" />
            </button>

          <div className="p-4 md:p-5">
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.round(product.rating)
                      ? "fill-[#E53935] text-[#E53935]"
                      : "fill-[#EEEEEE] text-[#EEEEEE]"
                  )}
                />
              ))}
              <span className="text-xs text-[#666666] ml-1.5">
                ({product.reviewCount})
              </span>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-semibold text-[#111111] leading-snug hover:text-[#E53935] transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>

            <p className="text-xs text-[#666666] mt-1">
              Compatible with:{" "}
              <span className="font-medium text-[#111111]">
                {product.vehicleCompatibility[0] || "Universal"}
                {product.vehicleCompatibility.length > 1 && "+"}
              </span>
            </p>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#E53935]">
                {formatPrice(product.salePrice)}
              </span>
              {product.salePrice < product.regularPrice && (
                <span className="text-sm text-[#666666] line-through">
                  {formatPrice(product.regularPrice)}
                </span>
              )}
            </div>

            {product.salePrice < product.regularPrice && (
              <p className="text-xs font-semibold text-green-600 mt-1">
                Save {formatPrice(product.regularPrice - product.salePrice)} ({savings}% off)
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <QuickView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
