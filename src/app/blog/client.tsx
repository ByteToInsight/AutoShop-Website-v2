"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useEffect } from "react";
import { useDataStore } from "@/store/data-store";

export function BlogClient() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  useEffect(() => { if (!initialized) initialize(); }, [initialized, initialize]);
  const blogPosts = useDataStore((s) => s.blogPosts);

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Blog" }]} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111]">
            Our Blog
          </h1>
          <p className="mt-2 text-[#666666]">
            Tips, guides, and news from the world of car accessories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl border border-[#ECECEC] overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/10] bg-[#F8F8F8] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 sm:gap-4 text-xs text-[#666666] mb-3">
                    <span className="bg-[#F8F8F8] px-2 py-1 rounded-md font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-[#111111] group-hover:text-[#E53935] transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#666666] line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E53935]">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
