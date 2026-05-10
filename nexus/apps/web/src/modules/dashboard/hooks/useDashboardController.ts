import { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/store';
import { TrendingUp, Users, CheckSquare, MessageCircle, DollarSign, Clock } from 'lucide-react';
import { DashboardService } from '../services/dashboard.service';

export function useDashboardController() {
  const { user, workspaceSlug } = useAppSelector((s) => s.auth);
  const [viewAs, setViewAs] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  
  const isSupervisor = user?.role === 'SUPERVISOR' || user?.role === 'ADMIN';
  const dashboardService = useMemo(() => workspaceSlug ? new DashboardService(workspaceSlug) : null, [workspaceSlug]);

  useEffect(() => {
    if (!dashboardService) return;

    const fetchData = async () => {
      try {
        const [stats, team] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getTeam(),
        ]);

        setStatsData(stats);
        setTeamMembers(team.map((m: any) => ({
          id: m.userId,
          name: m.user.name,
        })));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dashboardService]);

  const stats = useMemo(() => {
    if (!statsData?.stats) return [];
    return statsData.stats.map((s: any) => ({
      ...s,
      icon: s.label.includes('Leads') ? TrendingUp : 
            s.label.includes('Deals') ? DollarSign : 
            s.label.includes('Tasks') ? CheckSquare : Users
    }));
  }, [statsData]);

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Revenue Trend',
        data: statsData?.revenueData || [0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const tasksData = {
    labels: ['To Do', 'In Progress', 'In Review', 'Done'],
    datasets: [
      {
        data: [12, 19, 5, 28], // Static for now, can be wired via service later
        backgroundColor: ['#94a3b8', '#3b82f6', '#f59e0b', '#22c55e'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  return {
    user,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    stats,
    revenueData,
    tasksData,
    loading,
  };
}
