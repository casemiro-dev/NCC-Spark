import { type FC } from "react";
import { useChatStore } from "../stores/chatStore";
import { ChatList } from "../components/chat/ChatList";
import { ChatWindow } from "../components/chat/ChatWindow";

export const ChatPage: FC = () => {
  const { setActiveChat } = useChatStore();

  return (
    <div className="flex flex-1 overflow-hidden">
      <ChatList onSelectChat={setActiveChat} />
      <ChatWindow />
    </div>
  );
};
