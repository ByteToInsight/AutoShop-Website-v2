"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, Check, Minus, Plus, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatPrice, calculateSavings } from "@/lib/format";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface QuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { requireAuth } = useRequireAuth();
  const wishlisted = isWishlisted(product.id);

  const savings = product.isSale ? calculateSavings(product.salePrice, product.regularPrice) : 0;

  const handleAddToCart = () => {
    requireAuth(() => {
      addItem({
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        salePrice: product.salePrice,
        regularPrice: product.regularPrice,
        stock: product.stock,
      });
      for (let i = 1; i < quantity; i++) {
        addItem({
          id: product.id,
          slug: product.slug,
          title: product.title,
          image: product.images[0],
          salePrice: product.salePrice,
          regularPrice: product.regularPrice,
          stock: product.stock,
        });
      }
      onOpenChange(false);
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[71] bg-white rounded-2xl shadow-2xl max-w-3xl w-full md:max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
              aria-label="Close quick view"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="p-4 md:p-6">
                <div className="aspect-square rounded-xl bg-[#F8F8F8] overflow-hidden mb-3">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={cn(
                          "w-14 h-14 rounded-lg overflow-hidden border-2 bg-[#F8F8F8] shrink-0 transition-all",
                          i === selectedImage ? "border-[#E53935]" : "border-[#EEEEEE]"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 md:pr-8 flex flex-col">
                <p className="text-xs text-[#666666] mb-1">{product.brand}</p>
                <h2 className="text-lg font-semibold text-[#111111] leading-snug">
                  {product.title}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3.5 h-3.5",
                          i < Math.round(product.rating)
                            ? "fill-[#E53935] text-[#E53935]"
                            : "fill-[#EEEEEE] text-[#EEEEEE]"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#666666]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#E53935]">{formatPrice(product.salePrice)}</span>
                  {product.salePrice < product.regularPrice && (
                    <>
                      <span className="text-base text-[#666666] line-through">{formatPrice(product.regularPrice)}</span>
                      <Badge className="bg-green-50 text-green-700 text-xs">
                        Save {savings}%
                      </Badge>
                    </>
                  )}
                </div>

                <p className="text-xs text-[#666666] mt-1 line-clamp-2">{product.description}</p>

                <div className="mt-3 space-y-1.5">
                  {product.features.slice(0, 3).map((f, i) => (
                    <p key={i} className="text-xs text-[#666666] flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-[#E53935] mt-0.5 shrink-0" />
                      {f}
                    </p>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center border border-[#EEEEEE] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-[#F8F8F8] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-medium min-w-[24px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 hover:bg-[#F8F8F8] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-10 text-sm font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => toggleItem(product.id)}
                    className="w-10 h-10 rounded-full border border-[#EEEEEE] flex items-center justify-center hover:bg-[#F8F8F8] transition-colors shrink-0"
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        wishlisted ? "fill-[#E53935] text-[#E53935]" : "text-[#666666]"
                      )}
                    />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F8F8F8]">
                  <div className="text-center">
                    <Truck className="w-4 h-4 text-[#E53935] mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-[#111111]">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-4 h-4 text-[#E53935] mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-[#111111]">Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <ShieldCheck className="w-4 h-4 text-[#E53935] mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-[#111111]">1 Yr Warranty</p>
                  </div>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => onOpenChange(false)}
                  className="text-xs text-[#E53935] font-medium hover:underline mt-3 text-center"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
