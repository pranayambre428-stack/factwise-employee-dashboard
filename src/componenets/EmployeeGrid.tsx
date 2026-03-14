import {
  AllCommunityModule,
  type ColDef,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import type { Employee } from "../types/employee";

const modules = [AllCommunityModule];

/* ─── tiny palette tokens (feel free to move to CSS vars / Tailwind config) ─── */
const STATUS_ACTIVE = "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
const STATUS_INACTIVE = "bg-rose-50 text-rose-600 ring-1 ring-rose-200";

const EmployeeGrid = ({ employees }: { employees: Employee[] }) => {

  const columnDefs: ColDef<Employee>[] = [
    {
      headerName: "ID",
      field: "id",
      width: 72,
      // filter: "agNumberColumnFilter",
      cellStyle: { color: "var(--ag-secondary-foreground-color)" },
    },
    {
      headerName: "Name",
      valueGetter: (p) => `${p.data?.firstName} ${p.data?.lastName}`,
      width: 180,
      cellStyle: { fontWeight: 500 },
    },
    {
      field: "email",
      width: 230,
      filter: "agTextColumnFilter",
      cellStyle: { color: "var(--ag-secondary-foreground-color)" },
    },
    {
      field: "department",
      width: 150,
      filter: "agSetColumnFilter",
      cellRenderer: (p: any) =>
        p.value ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            {p.value}
          </span>
        ) : null,
    },
    { field: "position", width: 180 },
    {
      headerName: "Salary",
      field: "salary",
      width: 128,
      valueFormatter: (p) =>
        p.value != null ? `$${Number(p.value).toLocaleString("en-US")}` : "—",
      type: "rightAligned",
      filter: "agNumberColumnFilter",
      cellStyle: { fontVariantNumeric: "tabular-nums", fontWeight: 600 },
    },
    {
      headerName: "Hire Date",
      field: "hireDate",
      width: 130,
      filter: "agDateColumnFilter",
      cellStyle: { color: "var(--ag-secondary-foreground-color)" },
      minWidth: 190,
    },
    {
      headerName: "Age",
      field: "age",
      width: 72,
      filter: "agNumberColumnFilter",
    },
    { headerName: "Location", field: "location", width: 140 },
    {
      headerName: "Perf.",
      field: "performanceRating",
      width: 90,
      valueFormatter: (p) => (p.value != null ? p.value.toFixed(1) : "—"),
      cellStyle: (p): { color: string; fontWeight: number } => {
        const v = p.value as number | undefined;
        if (v == null) return { color: "", fontWeight: 400 };
        if (v >= 4.5) return { color: "#059669", fontWeight: 700 };
        if (v >= 3.5) return { color: "#2563eb", fontWeight: 700 };
        if (v < 2.5) return { color: "#dc2626", fontWeight: 700 };
        return { color: "", fontWeight: 400 };
      },
    },
    {
      headerName: "Projects",
      field: "projectsCompleted",
      width: 100,
      type: "rightAligned",
    },
    {
      headerName: "Status",
      field: "isActive",
      width: 96,
      cellRenderer: (p: any) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
            p.value ? STATUS_ACTIVE : STATUS_INACTIVE
          }`}
        >
          {p.value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      headerName: "Skills",
      field: "skills",
      width: 240,
      valueFormatter: (p) => (Array.isArray(p.value) ? p.value.join(", ") : ""),
      tooltipValueGetter: (p) =>
        Array.isArray(p.value) ? p.value.join(", ") : "",
      cellStyle: { color: "var(--ag-secondary-foreground-color)" },
    },
    {
      headerName: "Manager",
      field: "manager",
      width: 170,
      cellStyle: { color: "var(--ag-secondary-foreground-color)" },
    },
  ];

  return (
    <AgGridProvider modules={modules}>
      <div
        className="flex flex-col h-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
        style={{ width: "100%", height: window.innerHeight - 200 }}
      >
        <div
          className="ag-theme-quartz flex-1 min-h-0"
          style={{ height: "calc(100vh - 220px)" }}
        >
          <AgGridReact
            rowData={employees}
            columnDefs={columnDefs}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              floatingFilter: true,
            }}
          />
        </div>
      </div>

      <style>{`
        .ag-theme-quartz {
          --ag-font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
          --ag-font-size: 13px;
          --ag-header-background-color: #f8fafc;
          --ag-header-foreground-color: #475569;
          --ag-header-column-separator-color: #e2e8f0;
          --ag-border-color: #e2e8f0;
          --ag-row-border-color: #f1f5f9;
          --ag-odd-row-background-color: #fafbfd;
          --ag-row-hover-color: #eff6ff;
          --ag-selected-row-background-color: #dbeafe;
          --ag-cell-horizontal-padding: 14px;
          --ag-row-height: 44px;
          --ag-header-height: 40px;
          --ag-floating-filter-height: 36px;
          --ag-wrapper-border-radius: 0px;
          --ag-secondary-foreground-color: #94a3b8;
        }

        .ag-theme-quartz .ag-header-cell-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748b;
        }

        .ag-theme-quartz .ag-header-cell {
          border-right: 1px solid #e2e8f0 !important;
        }

        .ag-theme-quartz .ag-cell {
          display: flex;
          align-items: center;
          line-height: 1.4;
        }

        .ag-theme-quartz .ag-row {
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.12s ease;
        }

        .ag-theme-quartz .ag-row-group-contracted .ag-group-value,
        .ag-theme-quartz .ag-row-group-expanded .ag-group-value {
          font-weight: 600;
          color: #1e293b;
        }

        .ag-theme-quartz .ag-group-expanded .ag-icon,
        .ag-theme-quartz .ag-group-contracted .ag-icon {
          color: #3b82f6;
        }

        .ag-theme-quartz .ag-floating-filter-input {
          border-radius: 6px;
          font-size: 12px;
        }

        .ag-theme-quartz .ag-paging-panel {
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
          color: #64748b;
        }

        .ag-theme-quartz .ag-status-bar {
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 11px;
          padding: 0 16px;
        }
      `}</style>
    </AgGridProvider>
  );
};

export default EmployeeGrid;
