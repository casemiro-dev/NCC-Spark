import { type FC } from "react";
import type { Message } from "../../types";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

export const MessageBubble: FC<MessageBubbleProps> = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
          isOwn
            ? "bg-primary-600 text-white rounded-br-md"
            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md"
        }`}
      >
        {message.attachment && (
          <div className={`flex items-center gap-2 mb-1 text-xs ${isOwn ? "text-primary-100" : "text-gray-500"}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span>{message.attachment.name}</span>
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <div className={`flex items-center justify-end gap-1 mt-1 ${isOwn ? "text-primary-200" : "text-gray-400"}`}>
          <span className="text-[10px]">{formatTime(message.timestamp)}</span>
          {isOwn && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={message.read ? "#60A5FA" : "currentColor"}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
