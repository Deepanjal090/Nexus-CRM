import { useAppSelector, useAppDispatch } from '@/store/store';
import { toggleSidebar } from '@/store/uiSlice';
import { 
  Bell, Search, Menu, User, 
  HelpCircle, Settings, Command, Globe, 
  MessageSquare, Briefcase, Zap, Plus,
  ShieldCheck, LayoutGrid, Users, Package, ChevronDown, Send
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export default function Topbar({ isMobile }: { isMobile?: boolean }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((s) => s.auth);

  const tabs = [
    { label: 'Leads', path: '/crm/leads', icon: Activity },
    { label: 'Deals', path: '/crm/deals', icon: Briefcase },
    { label: 'Inventory', path: '/inventory', icon: Package },
    { label: 'Customers', path: '/crm/contacts', icon: Users },
  ];

  return (
    <header className="h-[70px] bg-[#3e4954] text-white px-8 flex items-center justify-between sticky top-0 z-50 shadow-xl border-b border-white/5">
      <div className="flex items-center gap-10 h-full">
        {isMobile && (
          <button onClick={() => dispatch(toggleSidebar())} className="p-2 text-white/70 hover:text-white transition-colors">
            <Menu size={22} />
          </button>
        )}
        
        {/* Horizontal Navigation Tabs - Bitrix Style */}
        <nav className="hidden lg:flex h-full items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`px-5 h-[40px] flex items-center gap-2 text-[13px] font-bold rounded-full transition-all relative ${
                location.pathname.startsWith(tab.path)
                  ? 'bg-white/20 text-white shadow-inner'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button className="px-4 h-full flex items-center gap-1 text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
             More <ChevronDown size={14} />
          </button>
        </nav>
      </div>

      {/* Center Branding - Bitrix/InfoStride style */}
      <div className="hidden xl:flex flex-col items-center justify-center text-center px-8 flex-1">
        <div className="flex items-center gap-3">
           <span className="font-black text-2xl italic tracking-tighter text-white drop-shadow-md">NEXUS</span>
           <span className="text-sky-400 font-bold text-xl drop-shadow-sm">››</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Workforce Intelligence Hub</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex items-center bg-white/10 rounded-xl px-4 py-2 border border-white/10 group focus-within:bg-white focus-within:border-white transition-all shadow-inner">
          <Search size={16} className="text-white/40 group-focus-within:text-slate-500" />
          <input 
            placeholder="Search everything..." 
            className="bg-transparent border-none outline-none text-xs text-white group-focus-within:text-slate-800 ml-3 w-40 focus:w-64 transition-all placeholder:text-white/30" 
          />
        </div>

        <div className="flex items-center gap-2">
           {user?.role === 'ADMIN' && (
             <button 
               onClick={() => navigate('/employees')}
               className="hidden sm:flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-success/90 transition-all shadow-lg shadow-success/20 mr-2"
             >
                <Plus size={16} /> Invite
             </button>
           )}
           <button className="p-2.5 text-white/50 hover:text-white relative bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#3e4954] text-[9px] font-bold flex items-center justify-center text-white shadow-lg">4</span>
           </button>
           <button className="p-2.5 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <HelpCircle size={20} />
           </button>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

        {/* Time & Profile - Bitrix style */}
        <div className="flex items-center gap-4 pl-2">
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full text-white text-xs font-black shadow-xl shadow-sky-500/30">
             <Clock size={14} className="animate-pulse" />
             <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold text-sm shadow-xl transition-all border border-white/10 ring-2 ring-transparent hover:ring-sky-400/50">
             {user?.name?.[0]?.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}

const Activity = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
