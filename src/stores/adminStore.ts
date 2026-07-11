import { create } from "zustand";
import type { Sector, VisibilityRule, MessagePermission } from "../types";
import { sectors as demoSectors, visibilityRules as demoVR, messagePermissions as demoMP } from "../data/demo";

interface AdminState {
  sectors: Sector[];
  visibilityRules: VisibilityRule[];
  messagePermissions: MessagePermission[];
  addSector: (name: string, color: string) => void;
  updateSector: (id: string, data: Partial<Sector>) => void;
  deleteSector: (id: string) => void;
  addVisibilityRule: (rule: Omit<VisibilityRule, "id">) => void;
  removeVisibilityRule: (id: string) => void;
  addMessagePermission: (perm: Omit<MessagePermission, "id">) => void;
  removeMessagePermission: (id: string) => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const useAdminStore = create<AdminState>((set) => ({
  sectors: demoSectors,
  visibilityRules: demoVR,
  messagePermissions: demoMP,

  addSector: (name, color) =>
    set((state) => ({
      sectors: [...state.sectors, { id: generateId(), name, color }],
    })),

  updateSector: (id, data) =>
    set((state) => ({
      sectors: state.sectors.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),

  deleteSector: (id) =>
    set((state) => ({
      sectors: state.sectors.filter((s) => s.id !== id),
    })),

  addVisibilityRule: (rule) =>
    set((state) => ({
      visibilityRules: [...state.visibilityRules, { ...rule, id: generateId() }],
    })),

  removeVisibilityRule: (id) =>
    set((state) => ({
      visibilityRules: state.visibilityRules.filter((r) => r.id !== id),
    })),

  addMessagePermission: (perm) =>
    set((state) => ({
      messagePermissions: [...state.messagePermissions, { ...perm, id: generateId() }],
    })),

  removeMessagePermission: (id) =>
    set((state) => ({
      messagePermissions: state.messagePermissions.filter((p) => p.id !== id),
    })),
}));
