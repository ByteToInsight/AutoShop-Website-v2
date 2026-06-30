import type { MetadataRoute } from "next";
import { products, categories } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://autoprestige.in";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/brands`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/offers`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/new-arrivals`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/shipping`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/returns`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/warranty`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/track-order`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
