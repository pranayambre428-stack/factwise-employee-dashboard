import { cn } from "../../../lib/utils";

const AVATAR_COLORS = [
  "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
  "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
  "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
];

export const Avatar = ({ name, size = "md" }: { name: string; size?: "sm" | "md" }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const color = AVATAR_COLORS[name ? name.charCodeAt(0) % AVATAR_COLORS.length : 0];
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full font-bold shrink-0",
      size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm",
      color
    )}>
      {initial}
    </div>
  );
};

export const PerfBadge = ({ value }: { value: number }) => {
  const color =
    value >= 4.5 ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30"
    : value >= 3.5 ? "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"
    : "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30";
  return (
    <span className={cn("inline-flex items-center justify-center w-8 h-6 rounded font-semibold text-xs", color)}>
      {value.toFixed(1)}
    </span>
  );
};
