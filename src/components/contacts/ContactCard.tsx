import { type FC } from "react";
import type { User } from "../../types";
import { Avatar } from "../common/Avatar";

interface ContactCardProps {
  user: User;
  sectorColor: string;
  onStartChat: (userId: string) => void;
}

const formatLastAccess = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return "agora";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
  return date.toLocaleDateString("pt-BR");
};

export const ContactCard: FC<ContactCardProps> = ({ user, sectorColor, onStartChat }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
      <Avatar name={user.name} color={sectorColor} size="md" isOnline={user.isOnline} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {user.isOnline ? "Online" : `Visto ${formatLastAccess(user.lastAccess)}`}
        </p>
      </div>
      <button
        onClick={() => onStartChat(user.id)}
        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Iniciar conversa"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};
