"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/common/breadcrumb";

const sampleOrders = [
  {
    id: "AP-6F8K2M",
    date: "June 25, 2026",
    status: "delivered",
    items: "Hyundai Premium Leather Seat Covers",
    timeline: [
      { step: "Order Placed", date: "Jun 25", done: true },
      { step: "Shipped", date: "Jun 26", done: true },
      { step: "Out for Delivery", date: "Jun 28", done: true },
      { step: "Delivered", date: "Jun 29", done: true },
    ],
  },
  {
    id: "AP-9H3N7P",
    date: "June 28, 2026",
    status: "shipped",
    items: "Toyota LED Tail Light Assembly",
    timeline: [
      { step: "Order Placed", date: "Jun 28", done: true },
      { step: "Shipped", date: "Jun 29", done: true },
      { step: "Out for Delivery", date: "—", done: false },
      { step: "Delivered", date: "—", done: false },
    ],
  },
];

export function TrackOrderClient() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  const handleTrack = () => {
    if (orderId.trim()) setTracked(true);
  };

  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-custom">
        <Breadcrumb items={[{ label: "Track Order" }]} />

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Package className="w-16 h-16 text-[#E53935] mx-auto mb-4" />
            <h1 className="text-3xl font-semibold text-[#111111] mb-2">
              Track Your Order
            </h1>
            <p className="text-[#666666]">
              Enter your order ID to see the latest status
            </p>
          </motion.div>

          <div className="flex gap-2 mb-8">
            <Input
              placeholder="Enter Order ID (e.g. AP-6F8K2M)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="rounded-xl border-[#ECECEC]"
            />
            <Button
              onClick={handleTrack}
              className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-xl px-6 shrink-0"
            >
              <Search className="w-4 h-4 mr-2" />
              Track
            </Button>
          </div>

          {tracked && (
            <div className="space-y-6">
              {sampleOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-[#ECECEC] p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#666666]">Order</p>
                      <p className="font-semibold text-[#111111]">{order.id}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status === "delivered" ? "Delivered" : "Shipped"}
                    </span>
                  </div>
                  <p className="text-sm text-[#666666] mb-1">{order.items}</p>
                  <p className="text-xs text-[#666666] mb-4">Ordered on {order.date}</p>

                  <div className="space-y-3">
                    {order.timeline.map((step) => (
                      <div key={step.step} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            step.done
                              ? "bg-green-100 text-green-600"
                              : "bg-[#F8F8F8] text-[#CCCCCC]"
                          }`}
                        >
                          {step.done ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span
                            className={`text-sm ${
                              step.done ? "text-[#111111] font-medium" : "text-[#999999]"
                            }`}
                          >
                            {step.step}
                          </span>
                          <span className="text-xs text-[#666666]">{step.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!tracked && (
            <div className="text-center py-10">
              <Truck className="w-12 h-12 text-[#ECECEC] mx-auto mb-3" />
              <p className="text-[#666666]">
                Enter your order ID above to track your delivery
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
