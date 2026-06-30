"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit3, Trash2, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/data-store";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const products = useDataStore((s) => s.products);
  const deleteProduct = useDataStore((s) => s.deleteProduct);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Products</h1>
          <p className="text-sm text-[#666666] mt-1">{products.length} products total</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#ECECEC] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] transition-all"
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#ECECEC] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-[#ECECEC] mx-auto mb-4" />
            <p className="text-[#666666]">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECECEC] bg-[#F8F8F8]">
                  <th className="text-left text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Brand</th>
                  <th className="text-left text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="text-right text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3">Price</th>
                  <th className="text-right text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Stock</th>
                  <th className="text-right text-xs font-semibold text-[#666666] uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-[#ECECEC] last:border-0 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-[#F8F8F8] overflow-hidden shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-[#111111] truncate max-w-[200px]">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#666666] hidden sm:table-cell">{product.brand}</td>
                    <td className="px-4 py-3 text-sm text-[#666666] hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#111111] text-right whitespace-nowrap">₹{product.salePrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        product.stock > 20 ? "bg-green-50 text-green-700" :
                        product.stock > 5 ? "bg-amber-50 text-amber-700" :
                        "bg-red-50 text-red-700"
                      )}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 rounded-lg hover:bg-[#F8F8F8] text-[#666666] hover:text-[#111111] transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => { if (confirm("Delete this product?")) deleteProduct(product.id); }}
                          className="p-2 rounded-lg hover:bg-red-50 text-[#666666] hover:text-[#E53935] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
