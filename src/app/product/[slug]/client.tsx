"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Check,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Rating } from "@/components/common/rating";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCardV2 } from "@/components/product/product-card-v2";
import { StickyCartBar } from "@/components/product/sticky-cart-bar";
import { SectionHeader } from "@/components/common/section-header";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useDataStore } from "@/store/data-store";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { formatPrice, calculateSavings } from "@/lib/format";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product: initialProduct, relatedProducts: initialRelated }: Props) {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const storeProducts = useDataStore((s) => s.products);

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const product = initialized && storeProducts.length > 0
    ? storeProducts.find((p) => p.slug === initialProduct.slug) ?? initialProduct
    : initialProduct;

  const relatedProducts = initialized && storeProducts.length > 0
    ? storeProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : initialRelated;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { requireAuth } = useRequireAuth();
  const wishlisted = isWishlisted(product.id);

  const savings = calculateSavings(product.salePrice, product.regularPrice);

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
    });
  };

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb
          items={[
            { label: product.category, href: `/category/${product.category.toLowerCase()}` },
            { label: product.brand, href: `/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}` },
            { label: product.title },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F8F8F8] border border-[#ECECEC] group cursor-crosshair">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.isSale && (
                <Badge className="absolute top-4 left-4 bg-[#E53935] text-white text-xs px-3 py-1.5 rounded-lg font-semibold">
                  -{savings}%
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-[#111111] text-white text-xs px-3 py-1.5 rounded-lg font-semibold">
                  New
                </Badge>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-20 h-20 rounded-xl overflow-hidden border-2 bg-[#F8F8F8] shrink-0 transition-all",
                    i === selectedImage
                      ? "border-[#E53935]"
                      : "border-[#ECECEC] hover:border-[#666666]"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-[#666666] mb-2">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#111111] leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-[#666666]">
                  | SKU: {product.SKU}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#E53935]">
                {formatPrice(product.salePrice)}
              </span>
              {product.salePrice < product.regularPrice && (
                <>
                  <span className="text-lg text-[#666666] line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                  <Badge className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-lg font-semibold">
                    Save {formatPrice(product.regularPrice - product.salePrice)}
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div
                className={cn(
                  "flex items-center gap-1.5",
                  product.stock > 20 ? "text-green-600" : "text-amber-600"
                )}
              >
                <Check className="w-4 h-4" />
                <span className="font-medium">
                  {product.stock > 20 ? "In Stock" : "Only Few Left"}
                </span>
              </div>
            </div>

            <Separator className="bg-[#ECECEC]" />

            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-2">Description</h3>
              <p className={cn("text-sm text-[#666666] leading-relaxed", !showFullDescription && "line-clamp-3")}>
                {product.description}
              </p>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-xs text-[#E53935] font-medium mt-1 hover:underline"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#666666]">
                    <Check className="w-4 h-4 text-[#E53935] mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {product.vehicleCompatibility.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-[#111111] mb-3">Compatible Vehicles</h3>
                <div className="flex flex-wrap gap-2">
                  {product.vehicleCompatibility.map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1.5 bg-[#F8F8F8] text-xs text-[#666666] rounded-lg border border-[#ECECEC]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Separator className="bg-[#ECECEC]" />

            <div>
              <h3 className="text-sm font-semibold text-[#111111] mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-[#ECECEC] last:border-0">
                    <span className="text-sm text-[#666666]">{key}</span>
                    <span className="text-sm font-medium text-[#111111]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-[#ECECEC]" />

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#ECECEC] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-12 font-semibold"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - {formatPrice(product.salePrice * quantity)}
              </Button>

              <button
                onClick={() => toggleItem(product.id)}
                className="w-12 h-12 rounded-full border border-[#ECECEC] flex items-center justify-center hover:bg-[#F8F8F8] transition-colors shrink-0"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    wishlisted ? "fill-[#E53935] text-[#E53935]" : "text-[#666666]"
                  )}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F8F8F8]">
              <div className="text-center">
                <Truck className="w-5 h-5 text-[#E53935] mx-auto mb-1.5" />
                <p className="text-xs font-medium text-[#111111]">Free Shipping</p>
                <p className="text-[10px] text-[#666666]">On orders above ₹999</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 text-[#E53935] mx-auto mb-1.5" />
                <p className="text-xs font-medium text-[#111111]">Easy Returns</p>
                <p className="text-[10px] text-[#666666]">15-day return policy</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-5 h-5 text-[#E53935] mx-auto mb-1.5" />
                <p className="text-xs font-medium text-[#111111]">1 Year Warranty</p>
                <p className="text-[10px] text-[#666666]">On all products</p>
              </div>
            </div>

            <p className="text-sm text-[#666666]">{product.shippingInfo}</p>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24">
            <SectionHeader
              title="Related Products"
              subtitle="You might also like these accessories"
              align="left"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCardV2 key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
      <StickyCartBar product={product} />
    </div>
  );
}
