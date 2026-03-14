import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import type { Employee } from "../../types/employee";
import {
  X,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { createPortal } from "react-dom";
import { EMPLOYEES } from "../../data/employees";

interface EmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onEmployeeChange?: (employee: Employee) => void;
}

const Divider = () => (
  <div className="h-px w-full bg-gray-100 dark:bg-white/[0.06]" />
);

const Tag = ({
  children,
  color = "default",
}: {
  children: React.ReactNode;
  color?: "default" | "indigo" | "emerald" | "amber" | "rose";
}) => {
  const map = {
    default:
      "bg-gray-100 text-gray-600 dark:bg-white/[0.07] dark:text-gray-300",
    indigo:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
    emerald:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
    amber:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide",
        map[color],
      )}
    >
      {children}
    </span>
  );
};

const Field = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
      {label}
    </span>
    <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100 font-medium">
      <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
      <span className="truncate">{value}</span>
    </div>
  </div>
);

const PerfBar = ({ value, max = 5 }: { value: number; max?: number }) => {
  const pct = (value / max) * 100;
  const color = value >= 4.5 ? "#10b981" : value >= 3.5 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-white/[0.07] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums" style={{ color }}>
        {value.toFixed(1)}
      </span>
    </div>
  );
};

export function EmployeeModal({
  employee,
  isOpen,
  onClose,
  onEmployeeChange,
}: EmployeeModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!employee) return null;

  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`;
  const avatarColors = [
    ["#e0e7ff", "#4f46e5"],
    ["#fce7f3", "#db2777"],
    ["#d1fae5", "#059669"],
    ["#fef3c7", "#d97706"],
    ["#ede9fe", "#7c3aed"],
  ];
  const [avatarBg, avatarFg] =
    avatarColors[employee.firstName.charCodeAt(0) % avatarColors.length];

  const directReports = EMPLOYEES.filter(
    (emp) => emp.manager === `${employee.firstName} ${employee.lastName}`,
  );

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${employee.firstName} ${employee.lastName} details`}
        className={cn(
          "fixed z-50 bg-white dark:bg-[#0f1117] flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_24px_48px_-12px_rgba(0,0,0,0.18)]",
          "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_48px_-12px_rgba(0,0,0,0.6)]",
          "md:inset-y-0 md:right-0 md:w-[440px] md:rounded-l-2xl md:border-l md:border-gray-200 md:dark:border-white/[0.07]",
          isOpen ? "md:translate-x-0" : "md:translate-x-full",

          "max-md:inset-x-0 max-md:bottom-0 max-md:rounded-t-2xl max-md:max-h-[92dvh]",
          "max-md:border-t max-md:border-gray-200 max-md:dark:border-white/[0.07]",
          isOpen ? "max-md:translate-y-0" : "max-md:translate-y-full",
        )}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
        </div>

        <div className="flex items-start justify-between px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 select-none"
              style={{ backgroundColor: avatarBg, color: avatarFg }}
            >
              {initials}
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {employee.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border",
                employee.isActive
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                  : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-white/[0.05] dark:text-gray-400 dark:border-white/10",
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  employee.isActive ? "bg-emerald-500" : "bg-gray-400",
                )}
              />
              {employee.isActive ? "Active" : "Inactive"}
            </span>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-white/[0.07] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Divider />

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-white/[0.06]">
            {[
              {
                label: "Salary",
                value: `$${(employee.salary / 1000).toFixed(0)}k`,
                icon: Briefcase,
                accent: false,
              },
              {
                label: "Rating",
                value: `${employee.performanceRating.toFixed(1)}/5`,
                icon: Award,
                accent: true,
              },
              {
                label: "Projects",
                value: `${employee.projectsCompleted}`,
                icon: TrendingUp,
                accent: false,
              },
            ].map(({ label, value, icon: Icon, accent }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1 py-4 px-2"
              >
                <Icon
                  className={cn(
                    "w-4 h-4 mb-0.5",
                    accent
                      ? "text-indigo-500 dark:text-indigo-400"
                      : "text-gray-400 dark:text-gray-500",
                  )}
                />
                <span
                  className={cn(
                    "text-base font-bold tabular-nums",
                    accent
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-900 dark:text-white",
                  )}
                >
                  {value}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <Divider />

          <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Performance Rating
              </span>
              <Tag
                color={
                  employee.performanceRating >= 4.5
                    ? "emerald"
                    : employee.performanceRating >= 3.5
                      ? "amber"
                      : "rose"
                }
              >
                {employee.performanceRating >= 4.5
                  ? "Exceptional"
                  : employee.performanceRating >= 3.5
                    ? "On Track"
                    : "Needs Review"}
              </Tag>
            </div>
            <PerfBar value={employee.performanceRating} />
          </div>

          <Divider />

          <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <Field icon={Mail} label="Email" value={employee.email} />
            <Field icon={MapPin} label="Location" value={employee.location} />
            <Field
              icon={Calendar}
              label="Hire Date"
              value={employee.hireDate}
            />
            <Field
              icon={Users}
              label="Manager"
              value={employee.manager || "— Top Level —"}
            />
            <Field
              icon={Briefcase}
              label="Department"
              value={employee.department}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Status
              </span>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                {employee.isActive ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-700 dark:text-emerald-400">
                      Active Employee
                    </span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Inactive
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <Divider />

          <div className="px-5 py-5">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-3">
              Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {employee.skills.map((skill, i) => (
                <Tag
                  key={skill}
                  color={
                    (["indigo", "default", "indigo", "default"] as const)[i % 2]
                  }
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>

          {directReports.length > 0 && (
            <>
              <Divider />
              <div className="px-5 py-5">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-3">
                  Direct Reports ({directReports.length})
                </span>
                <div className="flex flex-col gap-3">
                  {directReports.map((report) => {
                    const initials = `${report.firstName.charAt(0)}${report.lastName.charAt(0)}`;
                    const avatarColors = [
                      ["#e0e7ff", "#4f46e5"],
                      ["#fce7f3", "#db2777"],
                      ["#d1fae5", "#059669"],
                      ["#fef3c7", "#d97706"],
                      ["#ede9fe", "#7c3aed"],
                    ];
                    const [bg, fg] =
                      avatarColors[
                        report.firstName.charCodeAt(0) % avatarColors.length
                      ];
                    return (
                      <button
                        key={report.id}
                        onClick={() => onEmployeeChange?.(report)}
                        className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 dark:border-white/[0.05] bg-gray-50/50 dark:bg-white/[0.02] hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:bg-white dark:hover:bg-white/[0.05] transition-all text-left w-full group"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 select-none group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: bg, color: fg }}
                        >
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {report.firstName} {report.lastName}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {report.position}
                          </p>
                        </div>
                        {report.isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="h-4" />
        </div>

        <div className="shrink-0 px-5 py-4 flex items-center gap-2.5 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.02]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
