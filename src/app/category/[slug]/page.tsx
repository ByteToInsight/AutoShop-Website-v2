import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, categories } from "@/data/products";
import { CategoryClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} Car Accessories | AutoPrestige`,
    description: `Shop premium ${category.name.toLowerCase()} car accessories at AutoPrestige. Quality products for all car brands with fast delivery across India.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <CategoryClient
      category={category}
      products={categoryProducts}
    />
  );
}
