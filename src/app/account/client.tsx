"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Package, Heart, Settings, LogOut, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { useWishlistStore } from "@/store/wishlist";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AccountClient() {
  const [activeTab, setActiveTab] = useState("profile");
  const { items: wishlistItems } = useWishlistStore();

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "My Account" }]} />

        <h1 className="text-3xl font-semibold text-[#111111] mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#ECECEC] p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#FFF5F5] text-[#E53935]"
                      : "text-[#666666] hover:bg-[#F8F8F8] hover:text-[#111111]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === "wishlist" && wishlistItems.length > 0 && (
                    <span className="ml-auto text-xs bg-[#E53935] text-white w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              ))}
              <div className="border-t border-[#ECECEC] mt-2 pt-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#666666] hover:bg-red-50 hover:text-[#E53935] transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-6 md:p-8"
            >
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">Profile Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#666666] mb-1.5">First Name</label>
                      <Input placeholder="John" defaultValue="John" className="rounded-xl border-[#ECECEC]" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#666666] mb-1.5">Last Name</label>
                      <Input placeholder="Doe" defaultValue="Doe" className="rounded-xl border-[#ECECEC]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#666666] mb-1.5">Email</label>
                    <Input type="email" placeholder="john@example.com" defaultValue="john@example.com" className="rounded-xl border-[#ECECEC]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#666666] mb-1.5">Phone</label>
                    <Input placeholder="+91 98765 43210" defaultValue="+91 98765 43210" className="rounded-xl border-[#ECECEC]" />
                  </div>
                  <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                    Save Changes
                  </Button>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">Order History</h2>
                  <p className="text-[#666666]">You haven&apos;t placed any orders yet.</p>
                  <Link href="/categories">
                    <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">
                    My Wishlist ({wishlistItems.length} items)
                  </h2>
                  {wishlistItems.length === 0 ? (
                    <p className="text-[#666666]">Your wishlist is empty.</p>
                  ) : (
                    <Link href="/wishlist">
                      <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full px-8">
                        View Wishlist
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">Saved Addresses</h2>
                  <div className="p-4 rounded-xl border border-dashed border-[#ECECEC] text-center">
                    <p className="text-[#666666] mb-3">No saved addresses yet.</p>
                    <Button variant="outline" className="rounded-full border-[#ECECEC]">
                      Add New Address
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">Payment Methods</h2>
                  <div className="p-4 rounded-xl border border-dashed border-[#ECECEC] text-center">
                    <p className="text-[#666666] mb-3">No saved payment methods.</p>
                    <Button variant="outline" className="rounded-full border-[#ECECEC]">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-[#111111]">Account Settings</h2>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-xl border border-[#ECECEC]">
                      <div>
                        <p className="text-sm font-medium text-[#111111]">Email Notifications</p>
                        <p className="text-xs text-[#666666]">Receive order updates and promotions</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E53935]" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-xl border border-[#ECECEC]">
                      <div>
                        <p className="text-sm font-medium text-[#111111]">SMS Notifications</p>
                        <p className="text-xs text-[#666666]">Get delivery updates via SMS</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#E53935]" />
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
