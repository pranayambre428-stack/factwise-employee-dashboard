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
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/20 bg-white/80 p-6 shadow-sm",
        "backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        "dark:border-gray-700/30 dark:bg-gray-800/80",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
          {subValue && (
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {subValue}
            </div>
          )}
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconBgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
