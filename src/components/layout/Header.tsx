import { type FC } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Avatar } from "../common/Avatar";

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const { currentUser } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      {currentUser && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.name}</span>
          <Avatar name={currentUser.name} size="sm" isOnline />
        </div>
      )}
    </header>
  );
};
