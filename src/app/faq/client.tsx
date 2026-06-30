"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-7 business days. Express delivery (2-3 days) and priority delivery (next business day) are available at checkout for an additional fee.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day return policy on all unused items in original packaging. Simply initiate a return from your account or contact our support team.",
  },
  {
    q: "Are the products compatible with my car?",
    a: "Each product page lists compatible car models. If you cannot find your car, contact our support team and we will help you find the right accessory.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from the Track Order page on our website.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, COD is available for orders under ₹10,000. A COD fee of ₹49 applies. For orders above ₹10,000, we recommend prepaid payment for faster processing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and Cash on Delivery.",
  },
  {
    q: "How do I apply a coupon code?",
    a: "Enter your coupon code in the 'Coupon code' field in your cart or at checkout, then click 'Apply'. The discount will be reflected in your order total.",
  },
  {
    q: "Do products come with a warranty?",
    a: "Yes, most products come with a manufacturer's warranty ranging from 6 months to 5 years. Check the product details for specific warranty information.",
  },
];

export function FAQPageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb items={[{ label: "FAQs" }]} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111]">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-[#666666]">
            Find answers to common questions about our products and services
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[#ECECEC] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-[#111111] pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[#666666]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-[#666666] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
