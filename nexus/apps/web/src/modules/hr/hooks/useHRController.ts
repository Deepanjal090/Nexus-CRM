import { useState } from 'react';
import { Users, Building2, CalendarDays } from 'lucide-react';

const mockEmployees = [
  { id: '1', name: 'Sarah Chen', role: 'Lead Designer', department: 'Design', avatar: 'S', status: 'Active', color: '#ec4899' },
  { id: '2', name: 'Alex Rivera', role: 'Senior Engineer', department: 'Engineering', avatar: 'A', status: 'Active', color: '#3b82f6' },
  { id: '3', name: 'Mike Johnson', role: 'Frontend Dev', department: 'Engineering', avatar: 'M', status: 'Active', color: '#3b82f6' },
  { id: '4', name: 'Emily Park', role: 'Product Manager', department: 'Product', avatar: 'E', status: 'Active', color: '#8b5cf6' },
  { id: '5', name: 'David Kim', role: 'Sales Lead', department: 'Sales', avatar: 'D', status: 'On Leave', color: '#f59e0b' },
  { id: '6', name: 'Tom Brown', role: 'DevOps Engineer', department: 'Engineering', avatar: 'T', status: 'Active', color: '#3b82f6' },
];

export function useHRController() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [newEmployeeModalOpen, setNewEmployeeModalOpen] = useState(false);

  const stats = [
    { label: 'Total Employees', value: employees.length.toString(), icon: Users },
    { label: 'Departments', value: '4', icon: Building2 },
    { label: 'On Leave', value: employees.filter(e => e.status === 'On Leave').length.toString(), icon: CalendarDays },
  ];

  return {
    employees,
    stats,
    newEmployeeModalOpen,
    setNewEmployeeModalOpen,
  };
}
