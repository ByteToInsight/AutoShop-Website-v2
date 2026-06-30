"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";

export function TestimonialsSection() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const testimonials = useDataStore((s) => s.testimonials);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const visible = testimonials.slice(activeIndex, activeIndex + 3);
  const remaining = 3 - visible.length;
  const wrapped = remaining > 0 ? [...visible, ...testimonials.slice(0, remaining)] : visible;

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="container-custom">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Trusted by thousands of car owners across India"
        />
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {wrapped.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-[#ECECEC] p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s < testimonial.rating
                          ? "fill-[#E53935] text-[#E53935]"
                          : "fill-[#ECECEC] text-[#ECECEC]"
                      }`}
                    />
                  ))}
                </div>
                <div className="relative">
                  <p className={`text-sm text-[#666666] leading-relaxed ${
                    expandedId !== testimonial.id ? "line-clamp-4" : ""
                  }`}>
                    {testimonial.text}
                  </p>
                  {testimonial.text.length > 150 && (
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === testimonial.id ? null : testimonial.id
                        )
                      }
                      className="text-xs text-[#E53935] font-medium mt-1 hover:underline"
                    >
                      {expandedId === testimonial.id ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#ECECEC]">
                  <div className="w-10 h-10 rounded-full bg-[#F8F8F8] overflow-hidden shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#666666]">
                      {testimonial.city}
                    </p>
                  </div>
                  <Quote className="w-8 h-8 text-[#ECECEC] ml-auto" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i >= activeIndex && i < activeIndex + 3
                      ? "bg-[#E53935] w-6"
                      : "bg-[#ECECEC]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#ECECEC] bg-white flex items-center justify-center hover:bg-[#F8F8F8] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
