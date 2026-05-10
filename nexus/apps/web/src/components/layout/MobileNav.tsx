import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Briefcase, CheckSquare, MessageCircle, User } from 'lucide-react';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const items = [
    { label: 'Dash', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'CRM', icon: Briefcase, path: '/crm/leads' },
    { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { label: 'Chat', icon: MessageCircle, path: '/chat' },
    { label: 'Account', icon: User, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 lg:hidden flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center justify-center flex-1 gap-1 group relative h-full"
        >
          <div className={`p-1.5 rounded-xl transition-all duration-300 ${
            isActive(item.path) ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'text-slate-400 group-active:scale-90'
          }`}>
            <item.icon size={20} />
          </div>
          <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
            isActive(item.path) ? 'text-primary' : 'text-slate-400'
          }`}>
            {item.label}
          </span>
          {isActive(item.path) && (
             <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(0,82,204,0.5)]" />
          )}
        </button>
      ))}
    </nav>
  );
}
