import type { Metadata } from "next";
import { TrackOrderClient } from "./client";

export const metadata: Metadata = {
  title: "Track Order | AutoPrestige",
  description: "Track your order status and delivery information.",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
