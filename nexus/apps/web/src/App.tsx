import { Routes, Route, Navigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from './store/store';
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
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
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
                </Routes>
              </AppShell>
            </AuthGuard>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
