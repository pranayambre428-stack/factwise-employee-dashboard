import { useMemo, useState, useEffect } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { Employee } from "../../types/employee";
import { cn } from "../../lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Avatar, PerfBadge } from "./components/EmployeeUIComponents";
import { EmployeeCardList } from "./EmployeeCardList";

ModuleRegistry.registerModules([AllCommunityModule]);

const lightTheme = themeQuartz.withParams({
  borderRadius: 0,
  wrapperBorderRadius: 0,
});
const darkTheme = themeQuartz.withParams({
  backgroundColor: "#111827",
  foregroundColor: "#F9FAFB",
  browserColorScheme: "dark",
  headerBackgroundColor: "#1F2937",
  rowHoverColor: "#1F2937",
  borderColor: "#374151",
  borderRadius: 0,
  wrapperBorderRadius: 0,
});

interface EmployeeGridProps {
  data: Employee[];
  onRowClick?: (employee: Employee) => void;
}

export function EmployeeGrid({ data, onRowClick }: EmployeeGridProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const darkObserver = new MutationObserver(() => checkDark());
    darkObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mq = window.matchMedia("(max-width: 700px)");
    setIsMobile(mq.matches);
    const onResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onResize);

    return () => {
      darkObserver.disconnect();
      mq.removeEventListener("change", onResize);
    };
  }, []);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: "Employee Name",
        valueGetter: (p) => `${p.data?.firstName} ${p.data?.lastName}`,
        minWidth: 240,
        cellRenderer: (p: any) => (
          <div className="flex items-center gap-3 py-1.5 h-full">
            <Avatar name={p.value} />
            <div className="flex flex-col leading-tight justify-center">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {p.value}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {p.data?.email}
              </span>
            </div>
          </div>
        ),
        pinned: "left",
      },
      {
        field: "department",
        minWidth: 150,
        filter: "agSetColumnFilter",
        cellRenderer: (p: any) =>
          p.value ? (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {p.value}
            </span>
          ) : null,
      },
      {
        field: "position",
        minWidth: 180,
        cellRenderer: (p: any) => (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {p.value}
          </span>
        ),
      },
      {
        headerName: "Status",
        field: "isActive",
        minWidth: 120,
        cellRenderer: (p: any) => (
          <div className="flex items-center h-full">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                p.value
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                  : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full mr-1.5",
                  p.value ? "bg-emerald-500" : "bg-gray-400",
                )}
              />
              {p.value ? "Active" : "Inactive"}
            </span>
          </div>
        ),
      },
      {
        headerName: "Salary",
        field: "salary",
        minWidth: 130,
        type: "rightAligned",
        valueFormatter: (p) =>
          p.value != null ? `$${Number(p.value).toLocaleString("en-US")}` : "—",
        cellRenderer: (p: any) => (
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {p.valueFormatted}
          </span>
        ),
      },
      {
        headerName: "Performance",
        field: "performanceRating",
        minWidth: 140,
        cellRenderer: (p: any) => {
          const v = p.value as number | undefined;
          if (v == null) return "—";
          return (
            <div className="flex items-center gap-2 h-full">
              <PerfBadge value={v} />
            </div>
          );
        },
      },
      {
        headerName: "Skills",
        field: "skills",
        minWidth: 300,
        cellRenderer: (p: any) => {
          const skills = Array.isArray(p.value) ? p.value : [];
          if (!skills.length) return null;
          const skillColors = [
            "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
            "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
            "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20",
          ];
          return (
            <div className="flex items-center gap-1.5 h-full py-1.5 overflow-hidden">
              {skills.map((skill: string, i: number) => (
                <span
                  key={skill}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full h-[30px] text-[10px] font-medium border whitespace-nowrap",
                    skillColors[i % skillColors.length],
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        headerName: "Manager",
        field: "manager",
        minWidth: 170,
        cellRenderer: (p: any) =>
          !p.value ? (
            <span className="text-gray-400 dark:text-gray-500 italic text-sm">
              — Top Level —
            </span>
          ) : (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {p.value}
            </span>
          ),
      },
      { headerName: "Location", field: "location", minWidth: 140 },
      {
        headerName: "",
        field: "id",
        minWidth: 60,
        maxWidth: 60,
        sortable: false,
        filter: false,
        cellRenderer: () => (
          <div className="flex items-center justify-center h-full">
            <button className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
    }),
    [],
  );

  if (isMobile) {
    return <EmployeeCardList data={data} onRowClick={onRowClick} />;
  }

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <AgGridReact
        theme={isDark ? darkTheme : lightTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        onRowClicked={(e) => onRowClick && e.data && onRowClick(e.data)}
        rowHeight={64}
        headerHeight={48}
        suppressCellFocus
      />
    </div>
  );
}
