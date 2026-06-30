"use client";

import { motion } from "framer-motion";
import { Shield, Truck, HeartHandshake, Award, Users, Package } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";

const stats = [
  { label: "Happy Customers", value: "50,000+", icon: Users },
  { label: "Products", value: "1,200+", icon: Package },
  { label: "Brands", value: "10+", icon: Award },
  { label: "Cities Served", value: "500+", icon: Truck },
];

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every product in our catalogue is rigorously tested and quality-checked before it reaches you. We partner only with trusted manufacturers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We understand the excitement of receiving your new car accessories. That's why we offer express delivery across India.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Support",
    description:
      "Our dedicated support team is available 7 days a week to help you with orders, returns, and product recommendations.",
  },
  {
    icon: Award,
    title: "Best Prices",
    description:
      "We work directly with manufacturers to bring you premium accessories at the most competitive prices in the market.",
  },
];

export function AboutClient() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "About Us" }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-4">
            About AutoPrestige
          </h1>
          <p className="text-lg text-[#666666] leading-relaxed">
            India&apos;s premier destination for premium car accessories. We started with a
            simple mission: to make high-quality car accessories accessible to every car owner
            in India. From seat covers to lighting, electronics to exterior styling, we have
            everything to make your car truly yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-[#F8F8F8] border border-[#ECECEC]"
            >
              <stat.icon className="w-8 h-8 text-[#E53935] mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-bold text-[#111111]">{stat.value}</p>
              <p className="text-sm text-[#666666] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[#ECECEC] hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF5F5] flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-[#E53935]" />
              </div>
              <h3 className="text-lg font-semibold text-[#111111] mb-2">{value.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F8F8F8] rounded-2xl p-8 md:p-12 text-center border border-[#ECECEC]"
        >
          <h2 className="text-2xl font-semibold text-[#111111] mb-3">
            Our Mission
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto leading-relaxed">
            To provide every car owner in India with access to premium, reliable, and
            stylish car accessories. We believe your car is an extension of your personality,
            and we are here to help you express it.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
