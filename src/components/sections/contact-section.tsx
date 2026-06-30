"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { SectionHeader } from "@/components/common/section-header";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["1800-123-4567", "+91 98765 43210"],
    action: { label: "Call Now", href: "tel:+9118001234567" },
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@autoprestige.in", "sales@autoprestige.in"],
    action: { label: "Send Email", href: "mailto:support@autoprestige.in" },
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["B-123, Sector 18, Noida", "Uttar Pradesh 201301, India"],
    action: { label: "Get Directions", href: "#" },
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 6:00 PM"],
  },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a question? We'd love to hear from you. Reach out to our team anytime."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group bg-white rounded-2xl border border-[#ECECEC] p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F8F8F8] flex items-center justify-center mb-4 group-hover:bg-[#E53935] transition-colors">
                  <item.icon className="w-5 h-5 text-[#E53935] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#111111] mb-2">{item.title}</h3>
                {item.details.map((d) => (
                  <p key={d} className="text-sm text-[#666666] leading-relaxed">{d}</p>
                ))}
                {item.action && (
                  <a
                    href={item.action.href}
                    className="inline-block mt-3 text-xs font-medium text-[#E53935] hover:underline"
                  >
                    {item.action.label}
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-16 rounded-2xl border border-[#ECECEC] bg-[#F8F8F8]"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Send className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111] mb-2">Message Sent!</h3>
                <p className="text-sm text-[#666666] text-center max-w-sm">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-[#ECECEC] p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111111] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#ECECEC] text-sm text-[#111111] bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-full bg-[#E53935] hover:bg-[#C62828] text-white font-semibold text-sm shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
