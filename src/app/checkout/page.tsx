"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  Truck,
  CreditCard,
  MapPin,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useCartStore } from "@/store/cart";
import { useDataStore } from "@/store/data-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const steps = [
  { id: "address", label: "Address", icon: MapPin },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "review", label: "Review", icon: Package },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { items, subtotal, clearCart } = useCartStore();
  const addOrder = useDataStore((s) => s.addOrder);

  const shipping = subtotal() >= 999 ? 0 : 199;
  const total = subtotal() + shipping;

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const order = addOrder({
        items: items.map((i) => ({ id: i.id, title: i.title, salePrice: i.salePrice, quantity: i.quantity, image: i.image })),
        customer: { name: "Customer", email: "customer@example.com", phone: "+91 98765 43210", address: "123, Main Street, Mumbai - 400001" },
        shippingMethod: "Standard",
        paymentMethod: "Credit Card",
        subtotal: subtotal(),
        shipping,
        total,
      });
      setOrderId(order.id);
      setOrderPlaced(true);
      clearCart();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  if (orderPlaced) {
    return (
      <div className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-semibold text-[#111111] mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-[#666666] mb-2">
              Thank you for your order. Your order number is{" "}
              <span className="font-semibold text-[#111111]">
                AP-{orderId}
              </span>
            </p>
            <p className="text-sm text-[#666666] mb-8">
              You will receive a confirmation email shortly with order details and tracking information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
              <Button variant="outline" className="rounded-full border-[#ECECEC]">
                View Order
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Checkout" }]} />

        <h1 className="text-3xl font-semibold text-[#111111] mb-8">Checkout</h1>

        <div className="flex mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all",
                    i < currentStep
                      ? "bg-[#E53935] border-[#E53935] text-white"
                      : i === currentStep
                      ? "border-[#E53935] text-[#E53935]"
                      : "border-[#ECECEC] text-[#666666]"
                  )}
                >
                  {i < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <p
                  className={cn(
                    "text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-medium",
                    i <= currentStep ? "text-[#111111]" : "text-[#666666]"
                  )}
                >
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-[calc(50%+20px)] right-0 h-0.5 -translate-y-1/2",
                    i < currentStep ? "bg-[#E53935]" : "bg-[#ECECEC]"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && <AddressForm />}
                {currentStep === 1 && <ShippingForm />}
                {currentStep === 2 && <PaymentForm />}
                {currentStep === 3 && <ReviewOrder items={items} total={total} shipping={shipping} />}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="rounded-full border-[#ECECEC]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full"
              >
                {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#F8F8F8] rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-[#111111]">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-white overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111111] truncate">{item.title}</p>
                      <p className="text-xs text-[#666666]">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#111111]">
                        {formatPrice(item.salePrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="bg-[#ECECEC]" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#666666]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                </div>
                <Separator className="bg-[#ECECEC]" />
                <div className="flex justify-between font-semibold text-base text-[#111111]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#111111]">Shipping Address</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#666666] mb-1.5">First Name</label>
          <Input placeholder="John" className="rounded-xl border-[#ECECEC]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666666] mb-1.5">Last Name</label>
          <Input placeholder="Doe" className="rounded-xl border-[#ECECEC]" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#666666] mb-1.5">Phone Number</label>
        <Input placeholder="+91 98765 43210" className="rounded-xl border-[#ECECEC]" />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#666666] mb-1.5">Email</label>
        <Input type="email" placeholder="john@example.com" className="rounded-xl border-[#ECECEC]" />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#666666] mb-1.5">Address</label>
        <Input placeholder="House/Flat No., Street, Area" className="rounded-xl border-[#ECECEC]" />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#666666] mb-1.5">City</label>
          <Input placeholder="Mumbai" className="rounded-xl border-[#ECECEC]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666666] mb-1.5">State</label>
          <Input placeholder="Maharashtra" className="rounded-xl border-[#ECECEC]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#666666] mb-1.5">PIN Code</label>
          <Input placeholder="400001" className="rounded-xl border-[#ECECEC]" />
        </div>
      </div>
    </div>
  );
}

function ShippingForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#111111]">Shipping Method</h2>
      {[
        { id: "standard", label: "Standard Delivery", time: "5-7 business days", price: 0, min: "Orders above ₹999" },
        { id: "express", label: "Express Delivery", time: "2-3 business days", price: 299, min: "All orders" },
        { id: "priority", label: "Priority Delivery", time: "Next business day", price: 499, min: "All orders" },
      ].map((method) => (
        <label
          key={method.id}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#ECECEC] cursor-pointer hover:bg-[#F8F8F8] transition-colors has-checked:border-[#E53935] has-checked:bg-[#FFF5F5]"
        >
          <input
            type="radio"
            name="shipping"
            defaultChecked={method.id === "standard"}
            className="w-4 h-4 accent-[#E53935]"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-[#111111]">{method.label}</p>
            <p className="text-xs text-[#666666]">{method.time}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-[#111111]">
              {method.price === 0 ? "Free" : formatPrice(method.price)}
            </p>
            <p className="text-xs text-[#666666]">{method.min}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#111111]">Payment Method</h2>
      {[
        { id: "card", label: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay" },
        { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
        { id: "netbanking", label: "Net Banking", desc: "All major banks" },
        { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
      ].map((method) => (
        <label
          key={method.id}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#ECECEC] cursor-pointer hover:bg-[#F8F8F8] transition-colors has-checked:border-[#E53935] has-checked:bg-[#FFF5F5]"
        >
          <input
            type="radio"
            name="payment"
            defaultChecked={method.id === "card"}
            className="w-4 h-4 accent-[#E53935]"
          />
          <div>
            <p className="text-sm font-medium text-[#111111]">{method.label}</p>
            <p className="text-xs text-[#666666]">{method.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function ReviewOrder({
  items,
  total,
  shipping,
}: {
  items: { id: string; title: string; image: string; salePrice: number; quantity: number }[];
  total: number;
  shipping: number;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#111111]">Review Your Order</h2>
      <div className="rounded-xl border border-[#ECECEC] p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#111111]">
          <MapPin className="w-4 h-4 text-[#E53935]" />
          Shipping To
        </div>
        <p className="text-sm text-[#666666]">John Doe, +91 98765 43210</p>
        <p className="text-sm text-[#666666]">123, Main Street, Andheri West, Mumbai, Maharashtra - 400053</p>
      </div>
      <div className="rounded-xl border border-[#ECECEC] p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#111111]">
          <Truck className="w-4 h-4 text-[#E53935]" />
          Shipping Method
        </div>
        <p className="text-sm text-[#666666]">Standard Delivery (5-7 business days) - Free</p>
      </div>
      <div className="rounded-xl border border-[#ECECEC] p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#111111]">
          <CreditCard className="w-4 h-4 text-[#E53935]" />
          Payment Method
        </div>
        <p className="text-sm text-[#666666]">Credit/Debit Card</p>
      </div>
    </div>
  );
}
