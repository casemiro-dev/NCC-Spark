import { type FC, useState, useMemo } from "react";
import { useChatStore, getChatName } from "../../stores/chatStore";
import { useAuthStore } from "../../stores/authStore";
import { SearchInput } from "../common/SearchInput";
import { Avatar } from "../common/Avatar";
import { Badge } from "../common/Badge";
import type { Chat } from "../../types";

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
}

const getLastMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);

  if (days === 0) return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  if (days === 1) return "Ontem";
  if (days < 7) return date.toLocaleDateString("pt-BR", { weekday: "short" });
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
};

const getLastMessagePreview = (chat: Chat, currentUserId: string) => {
  const msgs = chat.messages;
  if (msgs.length === 0) return "Nenhuma mensagem ainda";
  const last = msgs[msgs.length - 1];
  const prefix = last.senderId === currentUserId ? "Você: " : "";
  return prefix + last.text;
};

export const ChatList: FC<ChatListProps> = ({ onSelectChat }) => {
  const { currentUser } = useAuthStore();
  const { chats, activeChatId } = useChatStore();
  const [search, setSearch] = useState("");

  const userChats = chats.filter((c) => currentUser && c.participants.includes(currentUser.id));

  const sortedChats = useMemo(
    () =>
      [...userChats].sort((a, b) => {
        const aTime = a.messages.length > 0 ? new Date(a.messages[a.messages.length - 1].timestamp).getTime() : new Date(a.createdAt).getTime();
        const bTime = b.messages.length > 0 ? new Date(b.messages[b.messages.length - 1].timestamp).getTime() : new Date(b.createdAt).getTime();
        return bTime - aTime;
      }),
    [userChats]
  );

  const filteredChats = search.trim()
    ? sortedChats.filter((c) => {
        const name = currentUser ? getChatName(c, currentUser.id) : "";
        return name.toLowerCase().includes(search.toLowerCase());
      })
    : sortedChats;

  if (!currentUser) return null;

  return (
    <div className="w-full lg:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <SearchInput value={search} onChange={setSearch} placeholder="Pesquisar conversas..." />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-400">Nenhuma conversa encontrada</div>
        ) : (
          filteredChats.map((chat) => {
            const name = getChatName(chat, currentUser.id);
            const unread = chat.messages.filter((m) => m.senderId !== currentUser.id && !m.read).length;
            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-100 dark:border-gray-700/50 ${
                  activeChatId === chat.id ? "bg-primary-50 dark:bg-primary-900/20" : ""
                }`}
              >
                <Avatar name={name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium truncate">{name}</span>
                    {chat.messages.length > 0 && (
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {getLastMessageTime(chat.messages[chat.messages.length - 1].timestamp)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {getLastMessagePreview(chat, currentUser.id)}
                    </span>
                    <Badge count={unread} />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
