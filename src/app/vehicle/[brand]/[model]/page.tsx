import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, vehicleData } from "@/data/products";
import { VehicleProductsClient } from "./client";

interface Props {
  params: Promise<{ brand: string; model: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, model } = await params;
  const brandName = brand.replace(/-/g, " ");
  const modelName = model.replace(/-/g, " ");
  return {
    title: `${modelName} Accessories for ${brandName} | AutoPrestige`,
    description: `Shop premium ${modelName} accessories for ${brandName}. Find seat covers, floor mats, lighting, electronics and more for your ${brandName} ${modelName}.`,
  };
}

export default async function VehicleProductsPage({ params }: Props) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const brandName = brandSlug.replace(/-/g, " ");
  const modelName = modelSlug.replace(/-/g, " ");

  const matchedProducts = products.filter((p) =>
    p.vehicleCompatibility.some(
      (v) =>
        v.toLowerCase().includes(brandName.toLowerCase()) &&
        v.toLowerCase().includes(modelName.toLowerCase())
    )
  );

  const brand = vehicleData.brands.find(
    (b) => b.name.toLowerCase() === brandName.toLowerCase()
  );

  const model = brand?.models.find(
    (m) => m.name.toLowerCase() === modelName.toLowerCase()
  );

  if (!brand || !model) notFound();

  return (
    <VehicleProductsClient
      brandName={brandName}
      modelName={modelName}
      products={matchedProducts}
      variants={model.variants}
    />
  );
}
