export type Department =
  | 'Engineering'
  | 'Marketing'
  | 'Sales'
  | 'HR'
  | 'Finance'
  | 'Operations';

export type Position =
  | 'Senior Developer'
  | 'Marketing Manager'
  | 'VP Marketing'
  | 'Engineering Manager'
  | 'CTO'
  | 'Sales Representative'
  | 'Sales Manager'
  | 'VP Sales'
  | 'HR Specialist'
  | 'HR Manager'
  | 'Junior Developer'
  | 'Financial Analyst'
  | 'Finance Manager'
  | 'Content Specialist'
  | 'DevOps Engineer'
  | 'Account Executive'
  | 'Senior Accountant'
  | 'Recruiter'
  | 'QA Engineer'
  | 'Digital Marketing Specialist';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  position: Position;
  salary: number;
  hireDate: string;
  age: number;
  location: string;
  performanceRating: number;
  projectsCompleted: number;
  isActive: boolean;
  skills: string[];
  manager: string | null;
}