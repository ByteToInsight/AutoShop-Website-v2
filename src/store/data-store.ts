"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  products as staticProducts,
  categories as staticCategories,
  brands as staticBrands,
  vehicleData as staticVehicleData,
  blogPosts as staticBlogPosts,
  testimonials as staticTestimonials,
  type Product,
} from "@/data/products";

export type { Product };

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface VehicleModel {
  name: string;
  variants: string[];
}

export interface VehicleBrand {
  name: string;
  models: VehicleModel[];
}

export interface VehicleData {
  brands: VehicleBrand[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  image?: string;
  vehicle?: string;
}

export interface Order {
  id: string;
  items: { id: string; title: string; salePrice: number; quantity: number; image: string }[];
  customer: { name: string; email: string; phone: string; address: string };
  shippingMethod: string;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface DataState {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  vehicleData: VehicleData;
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  orders: Order[];
  initialized: boolean;
}

interface DataActions {
  initialize: () => void;
  addProduct: (product: Omit<Product, "id" | "slug" | "rating" | "reviewCount">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addBrand: (brand: Omit<Brand, "id" | "slug">) => Brand;
  deleteBrand: (id: string) => void;
  addCategory: (category: Omit<Category, "id" | "slug">) => Category;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addVehicleBrand: (brand: VehicleBrand) => void;
  addVehicleModel: (brandName: string, model: VehicleModel) => void;
}

export const useDataStore = create<DataState & DataActions>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      brands: [],
      vehicleData: { brands: [] },
      blogPosts: [],
      testimonials: [],
      orders: [],
      initialized: false,

      initialize: () => {
        if (!get().initialized) {
          set({
            products: staticProducts,
            categories: staticCategories,
            brands: staticBrands,
            vehicleData: staticVehicleData as VehicleData,
            blogPosts: staticBlogPosts,
            testimonials: staticTestimonials,
            initialized: true,
          });
        }
      },

      addProduct: (input) => {
        const id = `p-${Date.now().toString(36)}`;
        const slug = slugify(input.title);
        const product: Product = {
          ...input,
          id,
          slug,
          rating: 0,
          reviewCount: 0,
        };
        set((s) => ({ products: [...s.products, product] }));
        return product;
      },

      updateProduct: (id, updates) => {
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((s) => ({ products: s.products.filter((p) => p.id !== id) }));
      },

      addBrand: (input) => {
        const id = `b-${Date.now().toString(36)}`;
        const slug = slugify(input.name);
        const brand: Brand = { ...input, id, slug };
        set((s) => ({ brands: [...s.brands, brand] }));
        return brand;
      },

      deleteBrand: (id) => {
        set((s) => ({ brands: s.brands.filter((b) => b.id !== id) }));
      },

      addCategory: (input) => {
        const id = `c-${Date.now().toString(36)}`;
        const slug = slugify(input.name);
        const category: Category = { ...input, id, slug };
        set((s) => ({ categories: [...s.categories, category] }));
        return category;
      },

      deleteCategory: (id) => {
        set((s) => ({ categories: s.categories.filter((c) => c.id !== id) }));
      },

      addOrder: (input) => {
        const id = `AP-${Date.now().toString(36).toUpperCase()}`;
        const order: Order = {
          ...input,
          id,
          date: new Date().toISOString(),
          status: "pending",
        };
        set((s) => ({ orders: [...s.orders, order] }));
        return order;
      },

      updateOrderStatus: (id, status) => {
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },

      addVehicleBrand: (brand) => {
        set((s) => ({
          vehicleData: {
            brands: [...s.vehicleData.brands, brand],
          },
        }));
      },

      addVehicleModel: (brandName, model) => {
        set((s) => ({
          vehicleData: {
            brands: s.vehicleData.brands.map((b) =>
              b.name === brandName ? { ...b, models: [...b.models, model] } : b
            ),
          },
        }));
      },
    }),
    {
      name: "ap-data",
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
        brands: state.brands,
        vehicleData: state.vehicleData,
        orders: state.orders,
        initialized: state.initialized,
      }),
    }
  )
);
