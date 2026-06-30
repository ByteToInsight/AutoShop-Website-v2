"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  User,
  Heart,
  ShoppingCart,
  Phone,
  LogOut,
} from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { useSearchStore } from "@/store/search";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useAuthStore } from "@/store/auth";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenuV2 } from "./mega-menu-v2";
import { SearchOverlayV2 } from "./search-overlay-v2";
import { CartDrawer } from "./cart-drawer";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands", hasMegaMenu: true },
  { label: "Car Accessories", href: "/categories", hasMegaMenu: true },
  { label: "Exterior", href: "/category/exterior" },
  { label: "Interior", href: "/category/interior" },
  { label: "Lighting", href: "/category/lighting" },
  { label: "Electronics", href: "/category/electronics" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const scrolled = useScroll(60);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [cartBounce, setCartBounce] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const { openSearch } = useSearchStore();
  const { toggleCart, itemCount, lastAdded } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleMegaEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMegaMenu(label);
  };

  const handleMegaLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  useEffect(() => {
    if (lastAdded) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [lastAdded]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <AnnouncementBar />
        <div
          className={cn(
            "border-b border-[#ECECEC] transition-shadow duration-300 relative",
            scrolled && "shadow-sm"
          )}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between h-16 md:h-20">
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-lg bg-[#E53935] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-semibold tracking-tight hidden sm:block text-[#111111]">
                  Auto<span className="text-[#E53935]">Prestige</span>
                </span>
              </Link>

              <div
                className="hidden lg:flex items-center gap-1"
                onMouseLeave={handleMegaLeave}
              >
                {navItems.map((item) => (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasMegaMenu && handleMegaEnter(item.label)
                    }
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        "text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8]"
                      )}
                    >
                      {item.label}
                      {item.hasMegaMenu && (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={openSearch}
                  className="p-2.5 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Link
                  href={isAuthenticated ? "/account" : "/sign-in"}
                  className="hidden sm:flex items-center gap-2 p-2.5 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                  {isAuthenticated && user && (
                    <span className="text-xs font-medium hidden xl:block max-w-[80px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                  )}
                </Link>

                <Link
                  href="/wishlist"
                  className="hidden sm:flex relative p-2.5 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>

                <motion.button
                  onClick={toggleCart}
                  animate={cartBounce ? { scale: [1, 1.3, 0.9, 1.15, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative p-2.5 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount() > 0 && (
                    <motion.span
                      key={itemCount()}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-4 h-4 bg-[#E53935] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount()}
                    </motion.span>
                  )}
                </motion.button>

                <a
                  href="tel:+9118001234567"
                  className="hidden xl:flex items-center gap-2 ml-2 pl-3 border-l border-[#ECECEC] text-sm text-[#666666] hover:text-[#111111] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">1800-123-4567</span>
                </a>
              </div>
            </div>
          </div>

          {activeMegaMenu && (
            <div
              onMouseEnter={() => handleMegaEnter(activeMegaMenu)}
              onMouseLeave={handleMegaLeave}
              className="absolute left-0 right-0 top-full z-40"
            >
              <MegaMenuV2 />
            </div>
          )}
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#ECECEC]">
                <span className="font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#F8F8F8]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-[#ECECEC] pt-4 mt-4 space-y-3">
                  <Link
                    href={isAuthenticated ? "/account" : "/sign-in"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{isAuthenticated ? `Hi, ${user?.name.split(" ")[0]}` : "My Account"}</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </Link>
                  {isAuthenticated && (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#666666] hover:text-[#E53935] hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  )}
                  <a
                    href="tel:+9118001234567"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>1800-123-4567</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlayV2 />
      <CartDrawer />
    </>
  );
}
