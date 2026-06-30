"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const brandLogos = [
  "https://placehold.co/120x40/ECECEC/111111?text=Toyota",
  "https://placehold.co/120x40/F8F8F8/111111?text=Hyundai",
  "https://placehold.co/120x40/ECECEC/111111?text=Mahindra",
  "https://placehold.co/120x40/F8F8F8/111111?text=Tata",
  "https://placehold.co/120x40/ECECEC/111111?text=Kia",
  "https://placehold.co/120x40/F8F8F8/111111?text=Honda",
];

export function HeroV2() {
  return (
    <section className="bg-white pt-28 md:pt-32 lg:pt-36">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F8F8F8] text-sm text-[#666666] rounded-full mb-6 border border-[#ECECEC]">
              Premium Accessories For Every Indian Car
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight text-[#111111] font-heading">
              Transform{" "}
              <span className="text-[#E53935]">Your Ride</span>
              <br className="hidden sm:block" />
              With Premium Accessories
            </h1>
            <p className="mt-6 text-lg text-[#666666] max-w-lg leading-relaxed">
              Upgrade your vehicle with premium quality accessories built for Indian roads. Style, comfort, and performance — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/categories">
                <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8 h-12 text-base font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.97]">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/vehicle-finder">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base font-medium border-[#ECECEC] text-[#111111] hover:bg-[#F8F8F8] active:scale-[0.97]"
                >
                  <Search className="mr-2 w-4 h-4" />
                  Find My Car
                </Button>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-[#ECECEC]">
              <p className="text-xs font-medium text-[#666666] uppercase tracking-wider mb-4">
                Compatible with top brands
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {brandLogos.map((logo, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    src={logo}
                    alt={`Brand ${i + 1}`}
                    className="h-8 md:h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[#F8F8F8] to-[#ECECEC] overflow-hidden relative">
              <img
                src="https://placehold.co/800x1000/F8F8F8/111111?text=Premium+Car+Accessories"
                alt="Premium car accessories showcase"
                className="w-full h-full object-cover mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-4 left-2 md:-left-4 bg-white rounded-2xl shadow-lg border border-[#ECECEC] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white bg-[#F8F8F8] overflow-hidden"
                    >
                      <img
                        src={`https://placehold.co/36x36/ECECEC/111111?text=U${i}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-[#E53935] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2K+</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111111]">Trusted by</p>
                  <p className="text-xs text-[#666666]">50,000+ car owners</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-[#ECECEC]"
            >
              <p className="text-2xl font-bold text-[#E53935] text-center">4.9</p>
              <p className="text-[10px] text-[#666666] text-center">★★★★★</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 rounded-2xl bg-[#F8F8F8] border border-[#ECECEC]"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "1,200+", label: "Premium Products" },
            { value: "4.9★", label: "Customer Rating" },
            { value: "PAN India", label: "Fast Delivery" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-[#111111]">{stat.value}</p>
              <p className="text-sm text-[#666666] mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
