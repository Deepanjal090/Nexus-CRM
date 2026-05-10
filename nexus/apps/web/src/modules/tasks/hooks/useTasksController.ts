import { useState, useRef, useMemo, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { exportToExcel, downloadTemplate } from '@/lib/excel';
import api from '@/lib/api';

const DEFAULT_STAGES = [
  { id: 'todo', name: 'Todo', color: '#94a3b8' },
  { id: 'in_progress', name: 'In Progress', color: '#3b82f6' },
  { id: 'in_review', name: 'In Review', color: '#f59e0b' },
  { id: 'done', name: 'Done', color: '#22c55e' },
];

export function useTasksController() {
  const { user, workspaceSlug } = useAppSelector((s) => s.auth);
  const [tasks, setTasks] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [viewAs, setViewAs] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('Kanban');

  const isSupervisor = user?.role === 'SUPERVISOR' || user?.role === 'ADMIN';

  useEffect(() => {
    if (!workspaceSlug) return;

    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const [tasksRes, teamRes] = await Promise.all([
          api.get(`/workspaces/${workspaceSlug}/tasks`),
          api.get(`/workspaces/${workspaceSlug}/dashboard/team`),
        ]);
        const tasksData = tasksRes.data?.data || tasksRes.data || [];
        const teamData = teamRes.data?.data || teamRes.data || [];
        
        setTasks(tasksData);
        setTeamMembers(teamData.map((m: any) => ({
          id: m.userId,
          name: m.user?.name || 'Unknown',
        })));
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [workspaceSlug]);

  const visibleTasks = useMemo(() => {
    let base = tasks;
    if (isSupervisor && viewAs !== 'all') {
      return base.filter(t => t.assigneeId === viewAs);
    }
    return base;
  }, [tasks, viewAs, isSupervisor]);

  const stages = DEFAULT_STAGES.map(stage => ({
    ...stage,
    tasks: visibleTasks.filter((t: any) => t.status === stage.name.toUpperCase().replace(' ', '_'))
  }));

  const handleCreateTask = async (data: any) => {
    try {
      const res = await api.post(`/workspaces/${workspaceSlug}/tasks`, {
        title: data.title,
        priority: data.priority,
        status: data.stageName.toUpperCase().replace(' ', '_'),
        assigneeId: data.assigneeId || user?.id,
      });
      const taskData = res.data?.data || res.data;
      setTasks([taskData, ...tasks]);
      return true;
    } catch (err) {
      console.error('Failed to create task', err);
      return false;
    }
  };

  return {
    stages,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    isLoading,
    activeView,
    setActiveView,
    handleCreateTask,
    handleExport: () => exportToExcel(visibleTasks, 'tasks', 'Tasks'),
    handleTemplate: () => downloadTemplate(['Title', 'Status', 'Priority'], 'tasks_template', 'Tasks'),
  };
}
