import { useState, useEffect } from "react";
import type { Employee } from "../../types/employee";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Award, MapPin, Briefcase } from "lucide-react";
import { Avatar, PerfBadge } from "./components/EmployeeUIComponents";

interface EmployeeCardListProps {
  data: Employee[];
  onRowClick?: (employee: Employee) => void;
}

function EmployeeCard({ emp, onClick }: { emp: Employee; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-150 active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <Avatar name={`${emp.firstName} ${emp.lastName}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {emp.firstName} {emp.lastName}
            </span>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0",
              emp.isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
            )}>
              <span className={cn("w-1 h-1 rounded-full", emp.isActive ? "bg-emerald-500" : "bg-gray-400")} />
              {emp.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{emp.email}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
          <Briefcase className="w-3 h-3 shrink-0" />
          <span className="truncate">{emp.position}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 min-w-0">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{emp.location}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] font-medium text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
          {emp.department}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Award className="w-3 h-3" />
            <PerfBadge value={emp.performanceRating} />
          </div>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            ${(emp.salary / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {emp.skills?.length > 0 && (
        <div className="mt-2.5 flex gap-1 flex-wrap">
          {emp.skills.slice(0, 3).map((s, i) => {
            const colors = [
              "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
              "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
              "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
            ];
            return (
              <span key={s} className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium border", colors[i % colors.length])}>
                {s}
              </span>
            );
          })}
          {emp.skills.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              +{emp.skills.length - 3}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

const PAGE_SIZE = 10;

export function EmployeeCardList({ data, onRowClick }: EmployeeCardListProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const slice = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => { setPage(0); }, [data]);

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-2">
        {slice.map((emp) => (
          <EmployeeCard key={emp.id} emp={emp} onClick={() => onRowClick?.(emp)} />
        ))}
        {slice.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400 dark:text-gray-500">
            No employees found
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1 pt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, data.length)} of {data.length}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(0)} disabled={page === 0}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors">
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setPage(p => p - 1)} disabled={page === 0}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-medium text-gray-700 dark:text-gray-300">
              {page + 1} / {totalPages}
            </span>
            <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:pointer-events-none transition-colors">
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
