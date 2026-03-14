import { Filter, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export interface FilterState {
  department: string | null;
  status: "All" | "Active";
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  departments: string[];
}

export function FilterBar({
  filters,
  setFilters,
  departments,
}: FilterBarProps) {
  const [deptOpen, setDeptOpen] = useState(false);
  const hasActive = filters.department !== null || filters.status !== "All";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Filter className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />

        <div className="relative lg:hidden">
          <button
            onClick={() => setDeptOpen((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-full text-xs font-medium border transition-colors",
              filters.department !== null
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                : "bg-white text-gray-600 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",
            )}
          >
            {filters.department ?? "All Depts"}
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform",
                deptOpen && "rotate-180",
              )}
            />
          </button>

          {deptOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDeptOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1.5 z-20 min-w-[140px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden py-1">
                <button
                  onClick={() => {
                    setFilters({ ...filters, department: null });
                    setDeptOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-xs font-medium transition-colors",
                    filters.department === null
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                  )}
                >
                  All Depts
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setFilters({ ...filters, department: dept });
                      setDeptOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-xs font-medium transition-colors",
                      filters.department === dept
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilters({ ...filters, department: null })}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
              filters.department === null
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800",
            )}
          >
            All Depts
          </button>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilters({ ...filters, department: dept })}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                filters.department === dept
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800",
              )}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-0.5 shrink-0" />

        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-gray-50 dark:bg-gray-800/50 shrink-0">
          {(["All", "Active"] as const).map((s) => (
            <button
              key={s}
              onClick={() =>
                setFilters({
                  ...filters,
                  status: s === "Active" ? "Active" : "All",
                })
              }
              className={cn(
                "px-2.5 py-0.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                (
                  s === "Active"
                    ? filters.status === "Active"
                    : filters.status === "All"
                )
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              {s === "Active" ? "Active Only" : "All"}
            </button>
          ))}
        </div>

        {hasActive && (
          <button
            onClick={() => setFilters({ department: null, status: "All" })}
            className="ml-auto flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
