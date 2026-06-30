"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataStore } from "@/store/data-store";

export default function NewProductPage() {
  const router = useRouter();
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const addProduct = useDataStore((s) => s.addProduct);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    regularPrice: 0,
    salePrice: 0,
    stock: 10,
    SKU: "",
    shippingInfo: "Free shipping. Delivery in 3-5 business days.",
    features: "",
    images: "",
    vehicleCompatibility: "",
  });

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.brand || !form.category) return;

    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));

    addProduct({
      title: form.title,
      description: form.description || "Premium quality car accessory.",
      brand: form.brand,
      category: form.category,
      regularPrice: form.regularPrice || form.salePrice,
      salePrice: form.salePrice,
      stock: form.stock,
      SKU: form.SKU || `SKU-${Date.now().toString(36).toUpperCase()}`,
      shippingInfo: form.shippingInfo,
      features: form.features ? form.features.split("\n").filter(Boolean) : ["Premium quality", "Easy installation"],
      images: form.images ? form.images.split("\n").filter(Boolean) : ["https://placehold.co/600x600/ECECEC/111111?text=New+Product"],
      vehicleCompatibility: form.vehicleCompatibility ? form.vehicleCompatibility.split("\n").filter(Boolean) : ["Universal"],
      attributes: {},
      isNew: true,
      isSale: form.salePrice < form.regularPrice,
    });

    setSaving(false);
    router.push("/admin/products");
  };

  const update = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[#F8F8F8]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Add Product</h1>
          <p className="text-sm text-[#666666] mt-1">Create a new product listing</p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-[#ECECEC] p-6 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Title *</label>
            <Input required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Hyundai Premium Leather Seat Covers" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Brand *</label>
            <Input required value={form.brand} onChange={(e) => update("brand", e.target.value)} placeholder="Hyundai" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Category *</label>
            <Input required value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="Interior" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe the product..."
              className="w-full h-24 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Sale Price (₹) *</label>
            <Input type="number" required value={form.salePrice || ""} onChange={(e) => update("salePrice", Number(e.target.value))} placeholder="5999" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Regular Price (₹)</label>
            <Input type="number" value={form.regularPrice || ""} onChange={(e) => update("regularPrice", Number(e.target.value))} placeholder="8999" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Stock</label>
            <Input type="number" value={form.stock} onChange={(e) => update("stock", Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">SKU</label>
            <Input value={form.SKU} onChange={(e) => update("SKU", e.target.value)} placeholder="HY-SC-001" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Image URLs (one per line)</label>
            <textarea
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              placeholder="https://placehold.co/600x600/ECECEC/111111?text=Product"
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Features (one per line)</label>
            <textarea
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
              placeholder="100% genuine leather&#10;Easy installation&#10;Water-resistant"
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Compatible Vehicles (one per line)</label>
            <textarea
              value={form.vehicleCompatibility}
              onChange={(e) => update("vehicleCompatibility", e.target.value)}
              placeholder="Hyundai i10&#10;Hyundai i20&#10;Hyundai Creta"
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Shipping Info</label>
            <Input value={form.shippingInfo} onChange={(e) => update("shippingInfo", e.target.value)} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => router.back()} className="rounded-full border-[#ECECEC]">
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full">
            <Save className="w-4 h-4 mr-1.5" />
            {saving ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
