"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataStore } from "@/store/data-store";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const products = useDataStore((s) => s.products);
  const updateProduct = useDataStore((s) => s.updateProduct);
  const deleteProduct = useDataStore((s) => s.deleteProduct);
  const [saving, setSaving] = useState(false);

  const product = products.find((p) => p.id === params.id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    regularPrice: 0,
    salePrice: 0,
    stock: 0,
    SKU: "",
    shippingInfo: "",
    features: "",
    images: "",
    vehicleCompatibility: "",
  });

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        brand: product.brand,
        category: product.category,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        stock: product.stock,
        SKU: product.SKU,
        shippingInfo: product.shippingInfo,
        features: product.features.join("\n"),
        images: product.images.join("\n"),
        vehicleCompatibility: product.vehicleCompatibility.join("\n"),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-[#666666]">Product not found</p>
        <Button variant="outline" onClick={() => router.push("/admin/products")} className="mt-4 rounded-full">
          Back to Products
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));

    updateProduct(product.id, {
      title: form.title,
      description: form.description,
      brand: form.brand,
      category: form.category,
      regularPrice: form.regularPrice,
      salePrice: form.salePrice,
      stock: form.stock,
      SKU: form.SKU,
      shippingInfo: form.shippingInfo,
      features: form.features.split("\n").filter(Boolean),
      images: form.images.split("\n").filter(Boolean),
      vehicleCompatibility: form.vehicleCompatibility.split("\n").filter(Boolean),
      isSale: form.salePrice < form.regularPrice,
    });

    setSaving(false);
    router.push("/admin/products");
  };

  const handleDelete = () => {
    if (confirm("Delete this product permanently?")) {
      deleteProduct(product.id);
      router.push("/admin/products");
    }
  };

  const update = (field: string, value: string | number) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-[#F8F8F8]">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">Edit Product</h1>
            <p className="text-sm text-[#666666] mt-1">{product.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg hover:bg-red-50 text-[#666666] hover:text-[#E53935] transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-[#ECECEC] p-6 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Title</label>
            <Input required value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Brand</label>
            <Input required value={form.brand} onChange={(e) => update("brand", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Category</label>
            <Input required value={form.category} onChange={(e) => update("category", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full h-24 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Sale Price (₹)</label>
            <Input type="number" required value={form.salePrice} onChange={(e) => update("salePrice", Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Regular Price (₹)</label>
            <Input type="number" value={form.regularPrice} onChange={(e) => update("regularPrice", Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Stock</label>
            <Input type="number" value={form.stock} onChange={(e) => update("stock", Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">SKU</label>
            <Input value={form.SKU} onChange={(e) => update("SKU", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Image URLs (one per line)</label>
            <textarea
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Features (one per line)</label>
            <textarea
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Compatible Vehicles (one per line)</label>
            <textarea
              value={form.vehicleCompatibility}
              onChange={(e) => update("vehicleCompatibility", e.target.value)}
              className="w-full h-20 px-4 py-3 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all resize-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#666666] mb-1.5 uppercase tracking-wide">Shipping Info</label>
            <Input value={form.shippingInfo} onChange={(e) => update("shippingInfo", e.target.value)} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="rounded-full border-[#ECECEC]">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full">
              <Save className="w-4 h-4 mr-1.5" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
