import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import { ProductDetailClient } from "./client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
