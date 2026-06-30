"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Search } from "lucide-react";
import { useDataStore, type Order } from "@/store/data-store";
import { cn } from "@/lib/utils";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminOrdersPage() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const orders = useDataStore((s) => s.orders);
  const updateOrderStatus = useDataStore((s) => s.updateOrderStatus);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Orders</h1>
        <p className="text-sm text-[#666666] mt-1">{orders.length} orders total</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all"
        />
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#ECECEC]">
          <Package className="w-12 h-12 text-[#ECECEC] mx-auto mb-4" />
          <p className="text-[#666666]">{search ? "No orders match your search" : "No orders yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-2xl border border-[#ECECEC] p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <p className="text-sm font-semibold text-[#111111]">{order.id}</p>
                  <p className="text-xs text-[#666666]">{new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                    className={cn(
                      "text-xs font-semibold px-3 py-1.5 rounded-full border appearance-none cursor-pointer focus:outline-none",
                      statusColors[order.status]
                    )}
                  >
                    {(["pending", "confirmed", "shipped", "delivered", "cancelled"] as const).map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <span className="text-sm font-bold text-[#111111]">₹{order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs text-[#666666]">
                <div>
                  <p className="font-medium text-[#111111] mb-1">Customer</p>
                  <p>{order.customer.name}</p>
                  <p>{order.customer.email}</p>
                  <p>{order.customer.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-[#111111] mb-1">Shipping Address</p>
                  <p>{order.customer.address}</p>
                </div>
              </div>

              <details className="mt-3">
                <summary className="text-xs font-medium text-[#E53935] cursor-pointer hover:underline">View Items ({order.items.length})</summary>
                <div className="mt-2 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-[#ECECEC] last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded bg-[#F8F8F8] overflow-hidden shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-[#111111] truncate">{item.title}</span>
                      </div>
                      <span className="text-xs text-[#666666] whitespace-nowrap">x{item.quantity} — ₹{(item.salePrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
