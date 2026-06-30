import { create } from "zustand";

interface WishlistStore {
  items: string[];
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  toggleItem: (id) =>
    set((state) => ({
      items: state.items.includes(id)
        ? state.items.filter((i) => i !== id)
        : [...state.items, id],
    })),
  isWishlisted: (id) => get().items.includes(id),
  clearWishlist: () => set({ items: [] }),
}));
