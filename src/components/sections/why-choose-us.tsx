"use client";

import { motion } from "framer-motion";
import { Truck, RefreshCw, Gem, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";

const features = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Free delivery on orders above ₹999. Most orders arrive within 2-5 business days across India.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Not satisfied? Return within 15 days for a full refund. No questions asked policy.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Every product is tested for quality and durability. We source only from verified manufacturers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure checkout with encrypted payment processing. Multiple payment options available.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Why Choose AutoPrestige"
          subtitle="We are committed to providing the best shopping experience for car enthusiasts"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group relative bg-white rounded-2xl border border-[#ECECEC] p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-[#F8F8F8] flex items-center justify-center mb-5 group-hover:bg-[#E53935] transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-[#E53935] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
