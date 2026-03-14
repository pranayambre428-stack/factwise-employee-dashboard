import React from 'react';
import { cn } from '../lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subValue?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subValue,
  iconBgColor = "bg-indigo-100 dark:bg-indigo-900/50",
  iconColor = "text-indigo-600 dark:text-indigo-400",
  className
}: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border border-white/20 bg-white/80 shadow-sm",
      "backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
      "dark:border-gray-700/30 dark:bg-gray-800/80",
      "p-3.5 sm:p-5 lg:p-6",
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
          <p className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-none">
            {value}
          </p>
          {subValue && (
            <div className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              {subValue}
            </div>
          )}
        </div>

        <div className={cn(
          "flex shrink-0 items-center justify-center rounded-full",
          "h-8 w-8 sm:h-10 w-10 sm:w-10 lg:h-12 lg:w-12",
          iconBgColor
        )}>
          <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6", iconColor)} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}