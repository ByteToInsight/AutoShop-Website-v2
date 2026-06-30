import type { Metadata } from "next";
import { FAQPageClient } from "./client";

export const metadata: Metadata = {
  title: "FAQs | AutoPrestige",
  description: "Frequently asked questions about orders, shipping, returns, and more.",
};

export default function FAQPage() {
  return <FAQPageClient />;
}
