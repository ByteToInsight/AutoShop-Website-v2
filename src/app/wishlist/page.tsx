import type { Metadata } from "next";
import { WishlistClient } from "./client";

export const metadata: Metadata = {
  title: "Wishlist | AutoPrestige",
  description: "Your saved products and favourites.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
