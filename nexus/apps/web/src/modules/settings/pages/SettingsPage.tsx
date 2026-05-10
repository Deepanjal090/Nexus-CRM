import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Users, Shield, Link2, Mail, Database, Bell, User as UserIcon, Lock } from 'lucide-react';
import { useAppSelector } from '@/store/store';

const adminSections = [
  { label: 'General', icon: SettingsIcon, desc: 'Workspace name, logo, timezone, and language' },
  { label: 'Members', icon: Users, desc: 'Invite, remove, and manage member roles' },
  { label: 'Roles & Permissions', icon: Shield, desc: 'Create custom roles with module-level access' },
  { label: 'Integrations', icon: Link2, desc: 'Connect Google Calendar, Slack, GitHub, and more' },
  { label: 'Email', icon: Mail, desc: 'Configure SMTP for outbound transactional email' },
  { label: 'Audit Log', icon: Database, desc: 'View all data mutations with timestamps' },
];

const userSections = [
  { label: 'My Profile', icon: UserIcon, desc: 'Update your name, avatar, and contact info' },
  { label: 'Security', icon: Lock, desc: 'Change password and manage 2FA' },
  { label: 'Notifications', icon: Bell, desc: 'Email, push, and in-app alert preferences' },
];

export default function SettingsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [demoRole, setDemoRole] = useState<'EMPLOYEE' | 'ADMIN'>('ADMIN');
  
  const isAdmin = demoRole === 'ADMIN';

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-semibold text-text">Settings</h1>
          <p className="text-sm text-text-muted mt-1">Manage your configuration and preferences</p>
        </div>
        
        {/* Role Demo Switcher */}
        <div className="flex items-center gap-2 bg-surface-2 p-1 rounded-lg border border-border">
          <button 
            onClick={() => setDemoRole('EMPLOYEE')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${!isAdmin ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-text'}`}
          >
            User View
          </button>
          <button 
            onClick={() => setDemoRole('ADMIN')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isAdmin ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-text'}`}
          >
            Admin View
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-text mb-3">Personal Settings</h2>
          <div className="space-y-2">
            {userSections.map((s, i) => (
              <motion.button key={s.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-surface border border-border hover:border-primary/30 transition-colors text-left shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-offset flex items-center justify-center shrink-0 text-text-muted">
                  <s.icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text">{s.label}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{s.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {isAdmin && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <h2 className="text-sm font-medium text-text mb-3 flex items-center gap-2">
              <Shield size={16} className="text-warning" /> Workspace Administration
            </h2>
            <div className="space-y-2">
              {adminSections.map((s, i) => (
                <motion.button key={s.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.04) }}
                  className="w-full flex items-center gap-4 p-4 rounded-lg bg-surface border border-warning/20 hover:border-warning/50 transition-colors text-left shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 text-warning">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-text">{s.label}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{s.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
