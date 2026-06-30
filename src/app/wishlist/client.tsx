"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";
import { formatPrice } from "@/lib/format";

export function WishlistClient() {
  const { items, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { requireAuth } = useRequireAuth();

  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const products = useDataStore((s) => s.products);

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Wishlist" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
          >
            <Heart className="w-20 h-20 text-[#ECECEC] mx-auto mb-6" />
            <h1 className="text-2xl font-semibold text-[#111111] mb-2">
              Your Wishlist is Empty
            </h1>
            <p className="text-[#666666] mb-8">
              Save your favourite products to buy them later.
            </p>
            <Link href="/categories">
              <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                Explore Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Wishlist" }]} />

        <h1 className="text-3xl font-semibold text-[#111111] mb-8">
          My Wishlist ({wishlistProducts.length} items)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[#ECECEC] overflow-hidden group"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="aspect-square bg-[#F8F8F8] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs text-[#666666] mb-1">{product.brand}</p>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-medium text-[#111111] hover:text-[#E53935] transition-colors line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                  </h3>
                </Link>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-bold text-[#E53935]">
                    {formatPrice(product.salePrice)}
                  </span>
                  {product.salePrice < product.regularPrice && (
                    <span className="text-xs text-[#666666] line-through">
                      {formatPrice(product.regularPrice)}
                    </span>
                  )}
                </div>
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
                    className="flex-1 bg-[#111111] hover:bg-[#111111]/90 text-white rounded-full h-9 text-xs font-semibold"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => toggleItem(product.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-[#ECECEC] hover:bg-red-50 hover:border-red-200 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-[#E53935]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
