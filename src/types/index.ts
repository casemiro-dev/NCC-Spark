export interface Sector {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  sectorId: string;
  isAdmin: boolean;
  isOnline: boolean;
  lastAccess: string;
}

export interface Attachment {
  name: string;
  size: number;
  type: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachment?: Attachment;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: string;
}

export interface VisibilityRule {
  id: string;
  sourceSectorId: string | null;
  sourceRole: string | null;
  targetSectorId: string | null;
  targetRole: string | null;
  canView: boolean;
}

export interface MessagePermission {
  id: string;
  sourceSectorId: string | null;
  sourceRole: string | null;
  targetSectorId: string | null;
  targetRole: string | null;
  canSend: boolean;
}

export type ThemeMode = "light" | "dark";
