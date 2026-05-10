import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from './store/store';
import { setWorkspace } from './store/authSlice';
import api from './lib/api';
import AppShell from './components/layout/AppShell';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import CRMPage from './modules/crm/pages/CRMPage';
import DealsPage from './modules/crm/pages/DealsPage';
import LeadsPage from './modules/crm/pages/LeadsPage';
import ContactsPage from './modules/crm/pages/ContactsPage';
import TasksPage from './modules/tasks/pages/TasksPage';
import ProjectsPage from './modules/projects/pages/ProjectsPage';
import ChatPage from './modules/chat/pages/ChatPage';
import DrivePage from './modules/drive/pages/DrivePage';
import HRPage from './modules/hr/pages/HRPage';
import AutomationPage from './modules/automation/pages/AutomationPage';
import ReportsPage from './modules/reports/pages/ReportsPage';
import SettingsPage from './modules/settings/pages/SettingsPage';
import NotificationsPage from './modules/notifications/pages/NotificationsPage';

import UsersPage from './modules/crm/pages/UsersPage';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, workspaceSlug } = useAppSelector((s) => s.auth);
  const [hydrating, setHydrating] = useState(false);

  useEffect(() => {
    // If authenticated but workspaceSlug missing, fetch it from the API
    if (isAuthenticated && !workspaceSlug) {
      setHydrating(true);
      api.get('/workspaces')
        .then((res) => {
          const workspaces = res.data?.data || res.data;
          if (Array.isArray(workspaces) && workspaces.length > 0) {
            dispatch(setWorkspace(workspaces[0].slug));
          }
        })
        .catch(() => {/* handled by api interceptor */})
        .finally(() => setHydrating(false));
    }
  }, [isAuthenticated, workspaceSlug, dispatch]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (hydrating) return <div className="flex items-center justify-center h-screen bg-[#f0f2f5]"><div className="w-10 h-10 border-4 border-[#00aaff]/30 border-t-[#00aaff] rounded-full animate-spin" /></div>;
  return <>{children}</>;
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <AppShell>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/crm" element={<CRMPage />} />
                  <Route path="/crm/leads" element={<LeadsPage />} />
                  <Route path="/crm/deals" element={<DealsPage />} />
                  <Route path="/crm/contacts" element={<ContactsPage />} />
                  <Route path="/employees" element={<UsersPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/chat/:channelId" element={<ChatPage />} />
                  <Route path="/drive" element={<DrivePage />} />
                  <Route path="/hr" element={<HRPage />} />
                  <Route path="/automation" element={<AutomationPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  
                  {/* Sidebar Placeholders */}
                  <Route path="/calendar" element={<div className="flex items-center justify-center h-full text-slate-400 font-bold text-xl">Calendar (Coming Soon)</div>} />
                  <Route path="/mail" element={<div className="flex items-center justify-center h-full text-slate-400 font-bold text-xl">Webmail (Coming Soon)</div>} />
                  <Route path="/twilio" element={<div className="flex items-center justify-center h-full text-slate-400 font-bold text-xl">Twilio Hub (Coming Soon)</div>} />
                </Routes>
              </AppShell>
            </AuthGuard>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
