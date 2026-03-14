import "./App.css";
import EmployeeGrid from "./componenets/EmployeeGrid";
import { useEmployeeData } from "./hooks/useEmployeeData";

function App() {
  const { employees } = useEmployeeData();
  return (
 
      <main className="p-10">
        <EmployeeGrid employees={employees} />
      </main>
  );
}

export default App;
