"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export function useRequireAuth() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const requireAuth = (callback?: () => void) => {
    if (!isAuthenticated) {
      router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
      return false;
    }
    callback?.();
    return true;
  };

  return { isAuthenticated, requireAuth };
}
