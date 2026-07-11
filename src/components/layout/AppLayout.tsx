import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useChatStore } from "../../stores/chatStore";
import { useAuthStore } from "../../stores/authStore";

export const AppLayout: FC = () => {
  const { currentUser } = useAuthStore();
  const { chats } = useChatStore();

  const unreadCount = chats.reduce((acc, chat) => {
    if (!currentUser) return acc;
    return acc + chat.messages.filter((m) => m.senderId !== currentUser.id && !m.read).length;
  }, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar unreadCount={unreadCount} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
