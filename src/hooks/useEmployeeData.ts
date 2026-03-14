import { EMPLOYEES } from '../data/employees';
import type { Employee } from '../types/employee';

export function useEmployeeData(): { employees: Employee[] } {
  const employees = EMPLOYEES;

  return { employees };
}
