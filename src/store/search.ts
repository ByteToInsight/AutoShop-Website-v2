import { create } from "zustand";

interface SearchStore {
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>((set, get) => ({
  isOpen: false,
  query: "",
  recentSearches: [],
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: "" }),
  setQuery: (query) => set({ query }),
  addRecentSearch: (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const filtered = get().recentSearches.filter((s) => s !== trimmed);
    set({ recentSearches: [trimmed, ...filtered].slice(0, 5) });
  },
  clearRecentSearches: () => set({ recentSearches: [] }),
}));
