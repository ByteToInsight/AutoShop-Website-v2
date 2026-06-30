import type { Metadata } from "next";
import { BlogClient } from "./client";

export const metadata: Metadata = {
  title: "Blog | AutoPrestige",
  description:
    "Read the latest articles about car accessories, maintenance tips, and product guides from AutoPrestige.",
};

export default function BlogPage() {
  return <BlogClient />;
}
