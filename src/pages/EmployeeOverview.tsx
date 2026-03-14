import React, { useState, useMemo } from "react";
import { Users, UserCheck, BadgeDollarSign, LineChart } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { FilterBar, type FilterState } from "../features/employees/FilterBar";
import { EmployeeGrid } from "../features/employees/EmployeeGrid";
import { EmployeeModal } from "../features/employees/EmployeeModal";
import { EMPLOYEES } from "../data/employees";
import type { Employee } from "../types/employee";

export function EmployeeOverview() {
  const [filters, setFilters] = useState<FilterState>({
    department: null,
    status: "All",
  });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  const departments = useMemo(() => {
    const depts = new Set(EMPLOYEES.map((emp) => emp.department));
    return Array.from(depts);
  }, []);

  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter((emp) => {
      if (filters.department && emp.department !== filters.department)
        return false;
      if (filters.status === "Active" && !emp.isActive) return false;

      return true;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = EMPLOYEES.length;
    const active = EMPLOYEES.filter((e) => e.isActive).length;
    const avgSalary =
      EMPLOYEES.reduce((acc, curr) => acc + curr.salary, 0) / total;
    const avgPerf =
      EMPLOYEES.reduce((acc, curr) => acc + curr.performanceRating, 0) / total;

    return { total, active, avgSalary, avgPerf };
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={stats.total.toLocaleString()}
          icon={Users}
          iconBgColor="bg-blue-100 dark:bg-blue-900/40"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Active Employees"
          value={stats.active.toLocaleString()}
          icon={UserCheck}
          iconBgColor="bg-emerald-100 dark:bg-emerald-900/40"
          iconColor="text-emerald-600 dark:text-emerald-400"
          subValue={
            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-xs">
              {((stats.active / stats.total) * 100).toFixed(0)}% of total
            </span>
          }
        />
        <StatCard
          title="Average Salary"
          value={`$${Math.round(stats.avgSalary).toLocaleString()}`}
          icon={BadgeDollarSign}
          iconBgColor="bg-amber-100 dark:bg-amber-900/40"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Avg. Performance"
          value={`${stats.avgPerf.toFixed(1)} / 5.0`}
          icon={LineChart}
          iconBgColor="bg-purple-100 dark:bg-purple-900/40"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      <div className="flex-none">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          departments={departments}
        />
      </div>

      <div className="flex-1 min-h-0">
        <EmployeeGrid
          data={filteredEmployees}
          onRowClick={setSelectedEmployee}
        />
      </div>

      <EmployeeModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
