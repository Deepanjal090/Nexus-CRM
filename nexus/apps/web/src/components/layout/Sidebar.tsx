import { useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, Users, Briefcase, CheckSquare, 
  Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight,
  MessageCircle, FolderKanban, ShieldCheck, PieChart, Activity,
  Search, Bell, Command, Calendar, HardDrive, Mail, PhoneCall, Zap
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/authSlice';
import { toggleSidebar } from '@/store/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface NavSubItem {
  label: string;
  icon?: any;
  path: string;
  badge?: string | number;
}

interface NavItem {
  label: string;
  icon: any;
  path: string;
  badge?: string | number;
  subItems?: NavSubItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function Sidebar({ isMobile }: { isMobile: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { sidebarCollapsed } = useAppSelector((s) => s.ui);

  const navGroups: NavGroup[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      ]
    },
    {
      title: 'CRM',
      items: [
        { label: 'Leads', icon: Activity, path: '/crm/leads' },
        { label: 'Deals', icon: Briefcase, path: '/crm/deals' },
        { label: 'Customers', icon: Users, path: '/crm/contacts' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { label: 'Tasks and Projects', icon: CheckSquare, path: '/tasks', badge: 10 },
        { label: 'Collaboration', icon: MessageCircle, path: '/chat', badge: 19, subItems: [
          { label: 'Messenger', icon: MessageCircle, path: '/chat' },
          { label: 'Calendar', icon: Calendar, path: '/calendar' },
          { label: 'Drive', icon: HardDrive, path: '/drive' },
          { label: 'Webmail', icon: Mail, path: '/mail', badge: '99+' },
        ]},
      ]
    },
    {
      title: 'System',
      items: [
        { label: 'Employees', icon: Users, path: '/employees' },
        { label: 'Twilio Hub', icon: PhoneCall, path: '/twilio' },
        { label: 'Settings', icon: Settings, path: '/settings' },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="h-full flex flex-col text-slate-300">
      {/* Bitrix24 Logo Area */}
      <div className="h-[60px] px-6 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
           <Zap size={20} className="fill-current" />
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold text-white text-lg tracking-tight">NEXUS<span className="text-white/40 ml-1">24</span></span>
        )}
      </div>

      {/* Search Bar - Bitrix style */}
      {!sidebarCollapsed && (
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs">
            <Search size={14} className="text-slate-500" />
            <input placeholder="Find..." className="bg-transparent border-none outline-none text-slate-300 w-full" />
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-2 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{group.title}</p>
            )}
            {group.items.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 h-10 rounded-lg transition-all group relative ${
                    isActive(item.path) 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={18} className={isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="text-[13px] font-medium flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold leading-none">{item.badge}</span>
                      )}
                    </>
                  )}
                </button>
                {/* Simplified sub-items if present and active */}
                {!sidebarCollapsed && item.subItems && isActive(item.path) && (
                   <div className="ml-8 mt-1 space-y-1 border-l border-white/5">
                      {item.subItems.map((sub: NavSubItem) => (
                        <button key={sub.label} className="w-full flex items-center gap-3 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors">
                           <span>{sub.label}</span>
                           {sub.badge && <span className="text-[9px] text-red-400 font-bold ml-auto">{sub.badge}</span>}
                        </button>
                      ))}
                   </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Upgrade Button - Bitrix style */}
      {!sidebarCollapsed && (
        <div className="p-4 mt-auto">
          <button className="w-full h-10 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-pink-500/20 active:scale-95 transition-all">
            Upgrade your plan
          </button>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/5 flex items-center justify-between">
        <button onClick={() => dispatch(toggleSidebar())} className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all">
           {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        {!sidebarCollapsed && (
          <button onClick={() => dispatch(logout())} className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-red-400 transition-all">
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
