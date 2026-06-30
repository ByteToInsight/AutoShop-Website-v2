import type { Metadata } from "next";
import { BrandsClient } from "./client";

export const metadata: Metadata = {
  title: "All Brands | AutoPrestige",
  description:
    "Explore car accessories from top brands - Hyundai, Toyota, Maruti Suzuki, Mahindra, Tata, Honda, Kia, MG, Skoda, and Volkswagen.",
};

export default function BrandsPage() {
  return <BrandsClient />;
}
