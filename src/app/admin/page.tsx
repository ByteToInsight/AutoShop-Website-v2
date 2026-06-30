"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Tags, FolderOpen, Package, TrendingUp, ArrowRight } from "lucide-react";
import { useDataStore } from "@/store/data-store";

export default function AdminDashboard() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const products = useDataStore((s) => s.products);
  const brands = useDataStore((s) => s.brands);
  const categories = useDataStore((s) => s.categories);
  const orders = useDataStore((s) => s.orders);

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const stats = [
    { label: "Products", value: products.length, icon: ShoppingBag, href: "/admin/products", color: "bg-blue-500" },
    { label: "Brands", value: brands.length, icon: Tags, href: "/admin/brands", color: "bg-purple-500" },
    { label: "Categories", value: categories.length, icon: FolderOpen, href: "/admin/categories", color: "bg-amber-500" },
    { label: "Orders", value: orders.length, icon: Package, href: "/admin/orders", color: "bg-green-500" },
  ];

  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stock < 10).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Dashboard</h1>
          <p className="text-sm text-[#666666] mt-1">Overview of your store</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={stat.label} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-[#111111]">{stat.value}</p>
              <p className="text-xs text-[#666666] mt-1">{stat.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#ECECEC] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#111111]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#E53935] font-medium hover:underline inline-flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-[#666666] py-8 text-center">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#ECECEC] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{order.id}</p>
                    <p className="text-xs text-[#666666]">{order.customer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#111111]">₹{order.total.toLocaleString()}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === "delivered" ? "bg-green-50 text-green-700" :
                      order.status === "shipped" ? "bg-blue-50 text-blue-700" :
                      order.status === "pending" ? "bg-amber-50 text-amber-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#ECECEC] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#111111]">Low Stock Products</h2>
            <Link href="/admin/products" className="text-xs text-[#E53935] font-medium hover:underline inline-flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-[#666666] py-8 text-center">All products are well stocked</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <Link key={product.id} href={`/admin/products/${product.id}/edit`} className="flex items-center justify-between py-2 border-b border-[#ECECEC] last:border-0 hover:bg-[#F8F8F8] -mx-2 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0">
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium text-[#111111] truncate">{product.title}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#E53935] whitespace-nowrap">Stock: {product.stock}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
