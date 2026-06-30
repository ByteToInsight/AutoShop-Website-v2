import type { Metadata } from "next";
import { CategoriesPageClient } from "./client";

export const metadata: Metadata = {
  title: "All Categories | AutoPrestige",
  description:
    "Browse car accessories by category - Interior, Exterior, Lighting, Electronics, Car Care, and more.",
};

export default function CategoriesPage() {
  return <CategoriesPageClient />;
}
