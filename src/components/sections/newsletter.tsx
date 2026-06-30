"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border border-[#ECECEC] flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#E53935]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] mb-3">
            Stay in the Loop
          </h2>
          <p className="text-lg text-[#666666] mb-8 max-w-lg mx-auto">
            Subscribe to get special offers, free giveaways, and exclusive deals straight to your inbox.
          </p>
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl"
            >
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">
                Thanks for subscribing! Check your inbox for a welcome offer.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-[#ECECEC] bg-white text-base"
              />
              <Button
                type="submit"
                className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full h-12 px-6 font-semibold shrink-0"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          )}
          <p className="text-xs text-[#666666] mt-4">
            No spam, ever. Unsubscribe anytime. Read our{" "}
            <a href="/privacy" className="text-[#E53935] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
