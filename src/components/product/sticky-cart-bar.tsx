"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface StickyCartBarProps {
  product: Product;
}

export function StickyCartBar({ product }: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { requireAuth } = useRequireAuth();
  const wishlisted = isWishlisted(product.id);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#EEEEEE] shadow-lg py-3 px-4"
        >
          <div className="container-custom flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0 hidden sm:block">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-[#111111] line-clamp-1">{product.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#E53935]">{formatPrice(product.salePrice)}</span>
                  {product.salePrice < product.regularPrice && (
                    <span className="text-xs text-[#666666] line-through">{formatPrice(product.regularPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleItem(product.id)}
                className="w-10 h-10 rounded-full border border-[#EEEEEE] flex items-center justify-center hover:bg-[#F8F8F8] transition-colors shrink-0"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "w-4 h-4",
                    wishlisted ? "fill-[#E53935] text-[#E53935]" : "text-[#666666]"
                  )}
                />
              </button>
              <Button
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
                className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-10 px-6 font-semibold text-sm whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - {formatPrice(product.salePrice)}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
