import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  salePrice: number;
  regularPrice: number;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: 0,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                  : i
              ),
              lastAdded: Date.now(),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }], lastAdded: Date.now() };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(0, Math.min(quantity, i.stock)) } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.salePrice * i.quantity, 0),
    }),
    {
      name: "ap-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
