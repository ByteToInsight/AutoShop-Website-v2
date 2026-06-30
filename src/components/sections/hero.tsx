"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Package, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Package, label: "50000+ Customers" },
  { icon: Truck, label: "1000+ Products" },
  { icon: ShieldCheck, label: "Fast Delivery" },
  { icon: CreditCard, label: "Secure Payments" },
];

export function HeroSection() {
  return (
    <section className="bg-white pt-28 md:pt-32 lg:pt-36">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F8F8] text-sm text-[#666666] rounded-full mb-6">
              Premium Automotive Accessories
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-[#111111]">
              Premium Car Accessories{" "}
              <span className="text-[#E53935]">For Every Drive</span>
            </h1>
            <p className="mt-6 text-lg text-[#666666] max-w-lg leading-relaxed">
              Upgrade your vehicle with premium quality accessories built for style, comfort, and performance.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/categories">
                <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base font-medium border-[#ECECEC] text-[#111111] hover:bg-[#F8F8F8]"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-[#F8F8F8] overflow-hidden">
              <img
                src="https://placehold.co/700x700/ECECEC/111111?text=Premium+Car+Accessories"
                alt="Premium car accessories showcase"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-[#ECECEC] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">1 Year Warranty</p>
                  <p className="text-xs text-[#666666]">On all products</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#F8F8F8]"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 justify-center"
            >
              <badge.icon className="w-5 h-5 text-[#E53935]" />
              <span className="text-sm font-medium text-[#666666]">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
