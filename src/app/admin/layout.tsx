"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  FolderOpen,
  Package,
  X,
  Menu,
  ChevronRight,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useDataStore } from "@/store/data-store";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: ShoppingBag },
  { label: "Brands", href: "/admin/brands", icon: Tags },
  { label: "Categories", href: "/admin/categories", icon: FolderOpen },
  { label: "Orders", href: "/admin/orders", icon: Package },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const initialize = useDataStore((s) => s.initialize);
  const initialized = useDataStore((s) => s.initialized);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!initialized) initialize();
  }, [initialized, initialize]);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      router.push("/sign-in?redirect=/admin");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8]">
        <div className="text-center">
          <Shield className="w-12 h-12 text-[#E53935] mx-auto mb-4 animate-pulse" />
          <p className="text-[#666666]">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#ECECEC] flex flex-col lg:flex"
      >
        <div className="p-5 border-b border-[#ECECEC] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-sm font-semibold">
              Admin<span className="text-[#E53935]">Panel</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-[#F8F8F8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-[#E53935]/10 text-[#E53935]"
                    : "text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8]"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#ECECEC]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E53935] to-[#C62828] flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#111111] truncate">{user?.name}</p>
              <p className="text-[10px] text-[#666666]">Admin</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#666666] hover:text-[#E53935] hover:bg-red-50 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#ECECEC] h-14 flex items-center px-4 lg:px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F8F8F8]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="text-xs text-[#666666] hover:text-[#111111] ml-auto">
            View Site
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
