import React from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { EmployeeOverview } from './pages/EmployeeOverview';

function App() {
  return (
    <DashboardLayout>
      <EmployeeOverview />
    </DashboardLayout>
  );
}

export default App;
