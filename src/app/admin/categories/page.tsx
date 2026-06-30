"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataStore } from "@/store/data-store";

export default function AdminCategoriesPage() {
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const categories = useDataStore((s) => s.categories);
  const addCategory = useDataStore((s) => s.addCategory);
  const deleteCategory = useDataStore((s) => s.deleteCategory);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  const handleAdd = () => {
    if (!name.trim()) return;
    addCategory({
      name: name.trim(),
      image: `https://placehold.co/400x400/F8F8F8/111111?text=${encodeURIComponent(name.trim())}`,
      count: 0,
    });
    setName("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Categories</h1>
        <p className="text-sm text-[#666666] mt-1">{categories.length} categories</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECECEC] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-[#111111]">Add Category</h2>
        <div className="flex gap-3">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} className="bg-[#E53935] hover:bg-[#C62828] text-white rounded-full shrink-0">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white rounded-2xl border border-[#ECECEC] p-4 text-center group relative"
          >
            <button
              onClick={() => { if (confirm(`Delete "${cat.name}"?`)) deleteCategory(cat.id); }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#E53935]" />
            </button>
            {cat.image && (
              <img src={cat.image} alt={cat.name} className="w-full aspect-square rounded-xl bg-[#F8F8F8] object-cover mb-3" />
            )}
            <p className="text-sm font-medium text-[#111111]">{cat.name}</p>
            <p className="text-xs text-[#666666] mt-0.5">{cat.count} products</p>
          </motion.div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#666666]">
            <FolderOpen className="w-8 h-8 mx-auto mb-2 text-[#ECECEC]" />
            <p className="text-sm">No categories yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
