import { type FC, useEffect, useRef } from "react";
import { useChatStore, getChatPartner } from "../../stores/chatStore";
import { useAuthStore } from "../../stores/authStore";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { Avatar } from "../common/Avatar";
import { sectors } from "../../data/demo";

export const ChatWindow: FC = () => {
  const { currentUser } = useAuthStore();
  const { chats, activeChatId, sendMessage, markAsRead } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    if (activeChatId && currentUser) {
      markAsRead(activeChatId, currentUser.id);
    }
  }, [activeChatId, currentUser, markAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  if (!activeChat || !currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-lg font-medium">Selecione uma conversa</p>
          <p className="text-sm mt-1">Escolha um chat para começar a conversar</p>
        </div>
      </div>
    );
  }

  const partner = getChatPartner(activeChat, currentUser.id);
  const partnerSector = partner ? sectors.find((s) => s.id === partner.sectorId) : null;

  const handleSend = (text: string, attachment?: { name: string; size: number; type: string }) => {
    sendMessage(activeChat.id, currentUser.id, text, attachment);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Avatar name={partner?.name ?? "Usuário"} color={partnerSector?.color} size="md" isOnline={partner?.isOnline} />
        <div>
          <p className="text-sm font-medium">{partner?.name ?? "Usuário"}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {partner?.role} {partnerSector ? `· ${partnerSector.name}` : ""}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {activeChat.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Nenhuma mensagem ainda. Envie uma mensagem para iniciar a conversa.
          </div>
        ) : (
          activeChat.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUser.id} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};
