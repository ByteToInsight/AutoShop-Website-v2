"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export function BlogPostClient({ post }: { post: Post }) {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom max-w-3xl">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-sm text-[#666666] mb-4">
            <span className="bg-[#F8F8F8] px-3 py-1 rounded-md font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-[#111111] mb-6">
            {post.title}
          </h1>

          <div className="aspect-[16/9] bg-[#F8F8F8] rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none text-[#666666]">
            <p className="text-lg leading-relaxed mb-4">{post.excerpt}</p>
            <p className="leading-relaxed mb-4">
              Car accessories play a vital role in enhancing both the aesthetics and functionality
              of your vehicle. Whether you are looking for comfort, protection, or style, the
              right accessories can transform your driving experience completely.
            </p>
            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-3">
              Why Quality Matters
            </h2>
            <p className="leading-relaxed mb-4">
              When it comes to car accessories, quality should never be compromised. Premium
              accessories not only look better but also last longer and provide better protection
              for your vehicle. Always choose products from trusted brands that offer warranties.
            </p>
            <h2 className="text-xl font-semibold text-[#111111] mt-8 mb-3">
              Our Recommendations
            </h2>
            <p className="leading-relaxed mb-4">
              At AutoPrestige, we carefully curate our product selection to ensure only the best
              makes it to our shelves. Each product is tested for durability, fit, and performance
              before being listed on our platform.
            </p>
            <p className="leading-relaxed">
              Browse our extensive collection of car accessories and find the perfect match for
              your vehicle. With over 1,200 products across 10+ brands, we have something for
              every car and every budget.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#ECECEC]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#E53935] hover:text-[#C62828] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
