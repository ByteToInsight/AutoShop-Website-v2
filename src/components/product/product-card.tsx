"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/common/rating";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatPrice, calculateSavings } from "@/lib/format";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { requireAuth } = useRequireAuth();
  const wishlisted = isWishlisted(product.id);

  const savings = product.isSale
    ? calculateSavings(product.salePrice, product.regularPrice)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group relative bg-white rounded-2xl border border-[#ECECEC] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
            {product.isNew && (
              <Badge className="absolute top-3 left-3 bg-[#111111] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="absolute top-3 left-3 bg-[#E53935] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold">
                {product.isNew ? "" : `-${savings}%`}
              </Badge>
            )}
          </div>
        </Link>

        <div className="p-4 md:p-5">
          <p className="text-xs text-[#666666] mb-1">{product.brand}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-medium text-[#111111] leading-snug hover:text-[#E53935] transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
          </Link>

          <div className="mt-2">
            <Rating value={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-base font-bold text-[#E53935]">
              {formatPrice(product.salePrice)}
            </span>
            {product.salePrice < product.regularPrice && (
              <span className="text-xs text-[#666666] line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          <p className="mt-1.5 text-xs text-[#666666] flex items-center gap-1">
            <span
              className={cn(
                "inline-block w-2 h-2 rounded-full",
                product.stock > 20 ? "bg-green-500" : "bg-amber-500"
              )}
            />
            {product.stock > 20 ? "In Stock" : "Only Few Left"}
          </p>

          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              onClick={() =>
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
                )
              }
              className="flex-1 bg-[#111111] hover:bg-[#111111]/90 text-white rounded-full h-9 text-xs font-semibold transition-all active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Add to Cart
            </Button>
            <button
              onClick={() => toggleItem(product.id)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#ECECEC] hover:bg-[#F8F8F8] transition-colors"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  wishlisted
                    ? "fill-[#E53935] text-[#E53935]"
                    : "text-[#666666]"
                )}
              />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "absolute top-3 right-3 flex flex-col gap-1.5 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          )}
        >
          <button
            onClick={() => toggleItem(product.id)}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                wishlisted ? "fill-[#E53935] text-[#E53935]" : "text-[#666666]"
              )}
            />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-[#666666]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
