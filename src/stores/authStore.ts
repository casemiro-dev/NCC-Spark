import { create } from "zustand";
import type { User } from "../types";
import { users } from "../data/demo";

interface AuthState {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  login: (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      set({ currentUser: { ...user, isOnline: true, lastAccess: new Date().toISOString() } });
    }
  },
  logout: () => set({ currentUser: null }),
}));
