"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";
import { SectionHeader } from "@/components/common/section-header";

export function BlogSection() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const blogPosts = useDataStore((s) => s.blogPosts);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Latest from Our Blog"
          subtitle="Tips, guides, and insights for car enthusiasts"
        />
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F8F8] mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-[#666666] mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#F8F8F8] font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#111111] mb-2 group-hover:text-[#E53935] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E53935] mt-4 group-hover:gap-2.5 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
