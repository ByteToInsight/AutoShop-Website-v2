"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCartStore();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#ECECEC]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Cart ({items.length})</h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                <ShoppingBag className="w-16 h-16 text-[#ECECEC]" />
                <p className="text-lg font-medium text-[#666666]">Your cart is empty</p>
                <p className="text-sm text-[#666666] text-center max-w-xs">
                  Looks like you haven&apos;t added anything yet. Start shopping to fill it up!
                </p>
                <Button onClick={closeCart} className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8 mt-2">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-5">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4 p-3 rounded-xl border border-[#ECECEC]"
                      >
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="w-20 h-20 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-[#111111] hover:text-[#E53935] transition-colors line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="text-sm font-semibold text-[#E53935] mt-1">
                            {formatPrice(item.salePrice)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#ECECEC] rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-[#F8F8F8] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-sm font-medium min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-[#F8F8F8] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-lg hover:bg-[#F8F8F8] text-[#666666] hover:text-[#E53935] transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-[#ECECEC] p-5 space-y-4">
                  {!couponApplied ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="rounded-lg border-[#ECECEC]"
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
                    <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                      Coupon PRESTIGE10 applied! 10% off will be applied at checkout.
                    </p>
                  )}

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
                    <Separator className="bg-[#ECECEC]" />
                    <div className="flex justify-between font-semibold text-base text-[#111111]">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    {subtotal() < 999 && (
                      <p className="text-xs text-[#666666]">
                        Add {formatPrice(999 - subtotal())} more for free shipping
                      </p>
                    )}
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={closeCart}
                      className="w-full bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-12 text-base font-semibold"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full text-sm text-[#666666] hover:text-[#111111] transition-colors text-center"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
