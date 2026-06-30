import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, isAdmin?: boolean) => boolean;
  logout: () => void;
  seedAdmin: () => void;
}

const ADMIN_EMAIL = "admin@autoprestige.in";

function ensureAdminExists() {
  const users = JSON.parse(localStorage.getItem("ap-users") || "[]");
  if (!users.find((u: { email: string }) => u.email === ADMIN_EMAIL)) {
    users.push({
      id: "u-admin",
      name: "Admin",
      email: ADMIN_EMAIL,
      password: "admin123",
      phone: "",
      isAdmin: true,
    });
    localStorage.setItem("ap-users", JSON.stringify(users));
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        const users = JSON.parse(localStorage.getItem("ap-users") || "[]");
        const found = users.find(
          (u: { email: string; password: string }) => u.email === email && u.password === _password
        );
        if (found) {
          const user = { id: found.id, name: found.name, email: found.email, phone: found.phone, isAdmin: found.isAdmin };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (name: string, email: string, password: string, isAdmin?: boolean) => {
        const users = JSON.parse(localStorage.getItem("ap-users") || "[]");
        if (users.find((u: { email: string }) => u.email === email)) {
          return false;
        }
        const newUser: Record<string, unknown> = {
          id: `u-${Date.now().toString(36)}`,
          name,
          email,
          password,
          phone: "",
        };
        if (isAdmin) newUser.isAdmin = true;
        users.push(newUser);
        localStorage.setItem("ap-users", JSON.stringify(users));
        set({
          user: { id: newUser.id as string, name: newUser.name as string, email: newUser.email as string, isAdmin: !!isAdmin },
          isAuthenticated: true,
        });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      seedAdmin: () => {
        ensureAdminExists();
      },
    }),
    { name: "ap-auth" }
  )
);
