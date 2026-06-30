"use client";

import { motion } from "framer-motion";

const announcements = [
  "Free Shipping Above ₹999",
  "Easy Returns",
  "COD Available",
  "Premium Quality Accessories",
];

export function AnnouncementBar() {
  return (
    <div className="h-10 bg-white border-b border-[#ECECEC] overflow-hidden relative">
      <motion.div
        className="flex items-center h-full whitespace-nowrap absolute inset-0"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...announcements, ...announcements, ...announcements].map(
          (text, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-sm text-[#666666] font-medium px-8"
            >
              <span className="w-1 h-1 rounded-full bg-[#E53935] shrink-0" />
              {text}
            </span>
          )
        )}
      </motion.div>
    </div>
  );
}
