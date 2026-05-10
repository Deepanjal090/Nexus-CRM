import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import api from '@/lib/api';

export function useUsersController() {
  const { user: currentUser, workspaceSlug } = useAppSelector((s) => s.auth);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const isAdmin = currentUser?.role === 'ADMIN';

  useEffect(() => {
    if (!workspaceSlug) return;

    const fetchUsers = async () => {
      try {
        const res = await api.get(`/workspaces/${workspaceSlug}/hr/employees`);
        setUsers(res.data.map((e: any) => ({
          id: e.user.id,
          name: e.user.name,
          email: e.user.email,
          role: e.user.role || 'EMPLOYEE',
          department: e.department?.name || 'Unassigned',
          status: e.status || 'ACTIVE',
        })));
      } catch (err) {
        console.error('Failed to fetch employees', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [workspaceSlug]);

  const filteredUsers = users.filter((u) => 
    (u.name.toLowerCase().includes(search.toLowerCase()) || 
     u.email.toLowerCase().includes(search.toLowerCase())) &&
    (isAdmin || u.department === currentUser?.department)
  );

  const handleInviteUser = async (data: { name: string; email: string; role: string; department: string }) => {
    try {
      await api.post(`/workspaces/${workspaceSlug}/hr/employees`, {
        name: data.name,
        email: data.email,
        departmentId: data.department, // Assuming department ID is passed
        role: data.role,
      });
      setInviteModalOpen(false);
      // Refresh list
      const res = await api.get(`/workspaces/${workspaceSlug}/hr/employees`);
      setUsers(res.data.map((e: any) => ({
        id: e.user.id,
        name: e.user.name,
        email: e.user.email,
        role: e.user.role || 'EMPLOYEE',
        department: e.department?.name || 'Unassigned',
        status: e.status || 'ACTIVE',
      })));
    } catch (err) {
      console.error('Failed to invite user', err);
    }
  };

  const handleToggleStatus = async (id: string) => {
    // Status toggle logic would go here
  };

  return {
    users: filteredUsers,
    isAdmin,
    search,
    setSearch,
    inviteModalOpen,
    setInviteModalOpen,
    handleInviteUser,
    handleToggleStatus,
    loading,
  };
}
