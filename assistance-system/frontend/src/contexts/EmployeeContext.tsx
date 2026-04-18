import { createContext, useState, ReactNode } from 'react';

interface Employee {
  id: string;
  document_id: string;
  full_name: string;
}

interface EmployeeContextType {
  currentEmployee: Employee | null;
  setCurrentEmployee: (emp: Employee | null) => void;
}

export const EmployeeContext = createContext<EmployeeContextType>({
  currentEmployee: null,
  setCurrentEmployee: () => {},
});

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  return (
    <EmployeeContext.Provider value={{ currentEmployee, setCurrentEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
