import { create } from "zustand";
import type { Chat } from "../types";
import { initialChats, users } from "../data/demo";

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  sendMessage: (chatId: string, senderId: string, text: string, attachment?: { name: string; size: number; type: string }) => void;
  setActiveChat: (chatId: string | null) => void;
  markAsRead: (chatId: string, userId: string) => void;
  getOrCreateChat: (userId1: string, userId2: string) => string;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const useChatStore = create<ChatState>((set, get) => ({
  chats: initialChats,
  activeChatId: null,

  sendMessage: (chatId, senderId, text, attachment) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: generateId(),
                  chatId,
                  senderId,
                  text,
                  timestamp: new Date().toISOString(),
                  read: false,
                  attachment,
                },
              ],
            }
          : chat
      ),
    })),

  setActiveChat: (chatId) => set({ activeChatId: chatId }),

  markAsRead: (chatId, userId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.senderId !== userId ? { ...msg, read: true } : msg
              ),
            }
          : chat
      ),
    })),

  getOrCreateChat: (userId1, userId2) => {
    const { chats } = get();
    const existing = chats.find(
      (c) =>
        c.participants.includes(userId1) &&
        c.participants.includes(userId2) &&
        c.participants.length === 2
    );
    if (existing) return existing.id;

    const newChat: Chat = {
      id: generateId(),
      participants: [userId1, userId2],
      messages: [],
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ chats: [...state.chats, newChat] }));
    return newChat.id;
  },
}));

export const getChatPartner = (chat: Chat, currentUserId: string) => {
  const partnerId = chat.participants.find((p) => p !== currentUserId);
  return users.find((u) => u.id === partnerId);
};

export const getChatName = (chat: Chat, currentUserId: string) => {
  const partner = getChatPartner(chat, currentUserId);
  return partner?.name ?? "Conversa";
};
