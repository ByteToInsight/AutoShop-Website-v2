"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do you offer free shipping?",
    a: "Yes, we offer free shipping on all orders above ₹999. Standard delivery takes 3-5 business days across India. Express shipping is also available at an additional cost.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 15-day hassle-free return policy. If you're not satisfied with your purchase, you can return it in original condition for a full refund. We also provide free return pickup for defective items.",
  },
  {
    q: "Are the accessories compatible with my car?",
    a: "All our products list compatible vehicle models. You can also use our Vehicle Finder tool to see exactly which products fit your car. If you're unsure, our customer support team is happy to help.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order from the 'Track Order' section on our website using your order number.",
  },
  {
    q: "Do you offer COD (Cash on Delivery)?",
    a: "Yes, Cash on Delivery is available for all orders across India. There's no additional charge for COD on orders up to ₹50,000.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before making a purchase"
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-[#EEEEEE] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-[#F8F8F8] transition-colors"
              >
                <span className="text-sm font-medium text-[#111111] pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[#666666] shrink-0 transition-transform duration-300",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-[#666666] leading-relaxed border-t border-[#EEEEEE] pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
