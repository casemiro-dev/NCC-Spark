import { type FC } from "react";

interface AvatarProps {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

const dotSizes = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
};

export const Avatar: FC<AvatarProps> = ({ name, color = "#3B82F6", size = "md", isOnline }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-semibold`}
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      {isOnline !== undefined && (
        <span
          className={`${dotSizes[size]} absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-gray-900 ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      )}
    </div>
  );
};
