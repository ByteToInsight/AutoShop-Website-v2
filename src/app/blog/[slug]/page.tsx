import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/products";
import { BlogPostClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | AutoPrestige Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
