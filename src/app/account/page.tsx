import type { Metadata } from "next";
import { AccountClient } from "./client";

export const metadata: Metadata = {
  title: "My Account | AutoPrestige",
  description: "Manage your account, orders, and preferences.",
};

export default function AccountPage() {
  return <AccountClient />;
}
