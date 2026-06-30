import type { Metadata } from "next";
import { AboutClient } from "./client";

export const metadata: Metadata = {
  title: "About Us | AutoPrestige",
  description:
    "Learn about AutoPrestige - India's premier destination for premium car accessories. Our mission, values, and commitment to quality.",
};

export default function AboutPage() {
  return <AboutClient />;
}
