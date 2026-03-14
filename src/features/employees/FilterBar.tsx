import React from 'react';
import { cn } from '../../lib/utils';
import { Filter, X } from 'lucide-react';

export interface FilterState {
  department: string | null;
  status: 'All' | 'Active';
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  departments: string[];
}

export function FilterBar({ filters, setFilters, departments }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-4 flex-wrap flex-1">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilters({ ...filters, department: null })}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
              filters.department === null
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
            )}
          >
            All Depts
          </button>
          
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setFilters({ ...filters, department: dept })}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                filters.department === dept
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
        
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block mx-1"></div>
        
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => setFilters({ ...filters, status: 'All' })}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              filters.status === 'All'
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilters({ ...filters, status: 'Active' })}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              filters.status === 'Active'
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            Active Only
          </button>
        </div>
      </div>
      
      {(filters.department !== null || filters.status !== 'All') && (
        <button
          onClick={() => setFilters({ department: null, status: 'All' })}
          className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
}
