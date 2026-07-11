import { type FC } from "react";

interface BadgeProps {
  count: number;
  variant?: "default" | "warning";
}

export const Badge: FC<BadgeProps> = ({ count, variant = "default" }) => {
  if (count <= 0) return null;
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold text-white ${
        variant === "warning" ? "bg-orange-500" : "bg-primary-600"
      }`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
