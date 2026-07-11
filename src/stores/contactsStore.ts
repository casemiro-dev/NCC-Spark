import { create } from "zustand";
import type { User } from "../types";
import { users as demoUsers } from "../data/demo";

interface ContactsState {
  users: User[];
  setOnlineStatus: (userId: string, online: boolean) => void;
}

export const useContactsStore = create<ContactsState>((set) => ({
  users: demoUsers,
  setOnlineStatus: (userId, online) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, isOnline: online, lastAccess: new Date().toISOString() } : u
      ),
    })),
}));
