"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = subtotal() >= 999 ? 0 : 199;
  const couponDiscount = couponApplied ? Math.round(subtotal() * 0.1) : 0;
  const total = subtotal() + shipping - couponDiscount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "PRESTIGE10") {
      setCouponApplied(true);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Cart" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
          >
            <ShoppingBag className="w-20 h-20 text-[#ECECEC] mx-auto mb-6" />
            <h1 className="text-2xl font-semibold text-[#111111] mb-2">Your Cart is Empty</h1>
            <p className="text-[#666666] mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link href="/categories">
              <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                Start Shopping
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
        <Breadcrumb items={[{ label: "Shopping Cart" }]} />

        <h1 className="text-3xl font-semibold text-[#111111] mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 rounded-2xl border border-[#ECECEC]"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="w-24 h-24 rounded-xl bg-[#F8F8F8] overflow-hidden shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-medium text-[#111111] hover:text-[#E53935] transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-lg font-semibold text-[#E53935] mt-1">
                        {formatPrice(item.salePrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg hover:bg-[#F8F8F8] text-[#666666] hover:text-[#E53935] transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#ECECEC] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#F8F8F8] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 sm:px-4 text-sm font-medium min-w-[24px] sm:min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#F8F8F8] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-[#111111]">
                      {formatPrice(item.salePrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#F8F8F8] rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-[#111111]">Order Summary</h3>

              {!couponApplied ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="rounded-lg border-[#ECECEC] bg-white"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyCoupon}
                    className="shrink-0 rounded-lg border-[#ECECEC]"
                  >
                    Apply
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-green-600 font-medium">
                  Coupon PRESTIGE10 applied! 10% off at checkout.
                </p>
              )}

              <Separator className="bg-[#ECECEC]" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon (PRESTIGE10)</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                {subtotal() < 999 && (
                  <p className="text-xs text-[#666666]">
                    Add {formatPrice(999 - subtotal())} more for free shipping
                  </p>
                )}
                <Separator className="bg-[#ECECEC]" />
                <div className="flex justify-between font-semibold text-base text-[#111111]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-12 font-semibold">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
