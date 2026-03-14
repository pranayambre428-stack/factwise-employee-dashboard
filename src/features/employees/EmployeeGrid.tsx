
import { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry, type ColDef, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { Employee } from "../../types/employee";
import { cn } from "../../lib/utils";
import { MoreHorizontal } from "lucide-react";

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

const Avatar = ({ name }: { name: string }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const colors = [
    "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
  ];
  const charCode = name ? name.charCodeAt(0) : 0;
  const color = colors[charCode % colors.length];
  return (
    <div className={cn("flex h-9 w-9 items-center justify-center rounded-full font-bold shadow-sm shrink-0", color)}>
      {initial}
    </div>
  );
};

export function EmployeeGrid({ data, onRowClick }: EmployeeGridProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(() => checkDark());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const columnDefs = useMemo<ColDef<Employee>[]>(() => [
    {
      headerName: "Employee Name",
      valueGetter: (p) => `${p.data?.firstName} ${p.data?.lastName}`,
      minWidth: 240,
      cellRenderer: (p: any) => (
        <div className="flex items-center gap-3 py-1.5 h-full">
          <Avatar name={p.value} />
          <div className="flex flex-col leading-tight justify-center">
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{p.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{p.data?.email}</span>
          </div>
        </div>
      ),
      pinned: "left",
    },
    {
      field: "department",
      minWidth: 150,
      filter: "agSetColumnFilter",
      cellRenderer: (p: any) => p.value ? (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{p.value}</span>
      ) : null,
    },
    {
      field: "position",
      minWidth: 180,
      cellRenderer: (p: any) => <span className="text-sm text-gray-600 dark:text-gray-300">{p.value}</span>,
    },
    {
      headerName: "Status",
      field: "isActive",
      minWidth: 120,
      cellRenderer: (p: any) => (
        <div className="flex items-center h-full">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
            p.value
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
              : "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", p.value ? "bg-emerald-500" : "bg-gray-400")} />
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
      valueFormatter: (p) => p.value != null ? `$${Number(p.value).toLocaleString("en-US")}` : "—",
      cellRenderer: (p: any) => <span className="font-medium text-gray-700 dark:text-gray-300">{p.valueFormatted}</span>,
    },
    {
      headerName: "Performance",
      field: "performanceRating",
      minWidth: 140,
      cellRenderer: (p: any) => {
        const v = p.value as number | undefined;
        if (v == null) return "—";
        let colorClass = "text-gray-600 dark:text-gray-400";
        let bgClass = "bg-gray-100 dark:bg-gray-800";
        if (v >= 4.5) { colorClass = "text-emerald-700 dark:text-emerald-400"; bgClass = "bg-emerald-100 dark:bg-emerald-900/30"; }
        else if (v >= 3.5) { colorClass = "text-amber-700 dark:text-amber-400"; bgClass = "bg-amber-100 dark:bg-amber-900/30"; }
        else if (v < 3.0)  { colorClass = "text-rose-700 dark:text-rose-400";   bgClass = "bg-rose-100 dark:bg-rose-900/30"; }
        return (
          <div className="flex items-center gap-2 h-full">
            <span className={cn("inline-flex items-center justify-center w-8 h-6 rounded font-semibold text-xs", colorClass, bgClass)}>
              {v.toFixed(1)}
            </span>
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
              <span key={skill} className={cn("inline-flex items-center px-2 py-0.5 rounded-full h-[30px] text-[10px] font-medium border whitespace-nowrap", skillColors[i % skillColors.length])}>
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
      cellRenderer: (p: any) => {
        if (!p.value) return <span className="text-gray-400 dark:text-gray-500 italic text-sm">— Top Level —</span>;
        return <span className="text-sm text-gray-700 dark:text-gray-300">{p.value}</span>;
      },
    },
    { headerName: "Location", field: "location", minWidth: 140 },
    {
      headerName: "",
      field: "id",
      minWidth: 60,
      maxWidth: 60,
      pinned: "right",
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
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    suppressMovable: false,
  }), []);

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
      <AgGridReact
        theme={isDark ? darkTheme : lightTheme}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        onRowClicked={(e) => onRowClick && e.data && onRowClick(e.data)}
        rowHeight={64}
        headerHeight={48}
        suppressCellFocus={true}
        // style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}