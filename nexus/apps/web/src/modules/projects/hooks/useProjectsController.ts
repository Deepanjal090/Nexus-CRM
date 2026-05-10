import { useState } from 'react';

const mockProjects = [
  { id: '1', name: 'Q3 Product Launch', color: '#6366f1', status: 'ACTIVE', members: 5, tasks: 24, completion: 45 },
  { id: '2', name: 'Website Redesign', color: '#22c55e', status: 'ACTIVE', members: 3, tasks: 18, completion: 72 },
  { id: '3', name: 'Mobile App v2', color: '#f59e0b', status: 'PLANNING', members: 4, tasks: 32, completion: 10 },
  { id: '4', name: 'API Platform', color: '#ef4444', status: 'ACTIVE', members: 6, tasks: 41, completion: 58 },
  { id: '5', name: 'Data Migration', color: '#3b82f6', status: 'ON_HOLD', members: 2, tasks: 12, completion: 30 },
];

export function useProjectsController() {
  const [projects, setProjects] = useState<any[]>(mockProjects);
  const [newModalOpen, setNewModalOpen] = useState(false);

  const handleCreateProject = async (data: { name: string; status: string; color: string }) => {
    const newProject = {
      id: Date.now().toString(),
      name: data.name,
      status: data.status,
      color: data.color,
      members: 1,
      tasks: 0,
      completion: 0,
    };
    setProjects([newProject, ...projects]);
    setNewModalOpen(false);
  };

  return {
    projects,
    isLoading: false,
    newModalOpen,
    setNewModalOpen,
    handleCreateProject,
  };
}
