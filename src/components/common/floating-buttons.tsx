"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Package, HelpCircle, ChevronUp } from "lucide-react";

const buttons = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/9118001234567", color: "bg-green-500 hover:bg-green-600" },
  { icon: Phone, label: "Call", href: "tel:+9118001234567", color: "bg-blue-500 hover:bg-blue-600" },
  { icon: Package, label: "Track", href: "/track-order", color: "bg-[#111111] hover:bg-[#111111]/90" },
  { icon: HelpCircle, label: "Help", href: "/faq", color: "bg-[#E53935] hover:bg-[#C62828]" },
];

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {buttons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.href.startsWith("http") ? "_blank" : undefined}
                rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-2.5 ${btn.color} text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all active:scale-95`}
              >
                <btn.icon className="w-4 h-4" />
                {btn.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#E53935] text-white shadow-lg hover:shadow-xl hover:bg-[#C62828] transition-all active:scale-90 flex items-center justify-center"
        aria-label={isOpen ? "Close floating menu" : "Open floating menu"}
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white border border-[#ECECEC] shadow-md flex items-center justify-center hover:bg-[#F8F8F8] transition-all active:scale-90"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 text-[#666666]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
