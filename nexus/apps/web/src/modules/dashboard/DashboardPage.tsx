import { motion } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, Users as UsersIcon, 
  CheckSquare, MessageCircle, DollarSign, Clock, LayoutGrid, 
  ListFilter, Activity, ShieldCheck, Zap
} from 'lucide-react';
import { useDashboardController } from './hooks/useDashboardController';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement,
  ChartTitle, Tooltip, Legend, ArcElement, Filler
);

export default function DashboardPage() {
  const {
    user,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    stats,
    revenueData,
    tasksData,
  } = useDashboardController();

  // Override chart colors for Light Theme
  const lightRevenueData = {
    ...revenueData,
    datasets: revenueData.datasets.map(ds => ({
      ...ds,
      borderColor: '#0052cc',
      backgroundColor: 'rgba(0, 82, 204, 0.05)',
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#0052cc',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }))
  };

  const lightTasksData = {
    ...tasksData,
    datasets: tasksData.datasets.map(ds => ({
      ...ds,
      backgroundColor: ['#cbd5e1', '#3b82f6', '#f59e0b', '#10b981'],
    }))
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden bg-white p-10 sm:p-12 rounded-[32px] border border-slate-200 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest border border-blue-100">Workspace Active</span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-2"><Activity size={12} /> Live Workforce Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tighter leading-none">
              Welcome back, <span className="text-primary">{user?.name}</span>
            </h1>
            <p className="text-slate-500 font-medium mt-3 max-w-xl">
              {isSupervisor && viewAs === 'all' 
                ? 'Your departmental performance is trending upwards. Review team activity and strategic goals below.'
                : 'Focus on your active objectives and organizational tasks. Performance index is optimal.'}
            </p>
          </div>

          {isSupervisor && (
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
               <div className="pl-4 pr-2 py-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Context Switch</p>
                 <p className="text-xs font-bold text-slate-800 whitespace-nowrap">View as Employee</p>
               </div>
               <select 
                value={viewAs} 
                onChange={(e) => setViewAs(e.target.value)}
                className="bg-white border border-slate-200 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer text-slate-800 shadow-sm min-w-[200px]"
              >
                <option value="all">Department Overview</option>
                {teamMembers.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Abstract Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-primary/40 transition-all group relative overflow-hidden active:scale-[0.98] cursor-default">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-inner">
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-lg border ${stat.up ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-10 sm:p-12 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Performance Growth</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Analytics Overview • Monthly Sync</p>
            </div>
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Active Trends
               </div>
            </div>
          </div>
          <div className="h-[360px] relative z-10">
            <Line data={lightRevenueData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#ffffff',
                  titleColor: '#1e293b',
                  bodyColor: '#1e293b',
                  titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
                  bodyFont: { family: 'Outfit', size: 14, weight: 'bold' },
                  padding: 12,
                  cornerRadius: 12,
                  displayColors: false,
                  borderColor: '#e2e8f0',
                  borderWidth: 1,
                }
              },
              scales: {
                x: { 
                  grid: { display: false }, 
                  ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' } } 
                },
                y: { 
                  grid: { color: '#f1f5f9', borderDash: [5, 5] } as any, 
                  ticks: { color: '#94a3b8', font: { size: 10 }, callback: (v) => `$${Number(v) / 1000}k` } 
                }
              }
            }} />
          </div>
        </div>

        {/* Task Distribution Card */}
        <div className="bg-white p-10 sm:p-12 rounded-[32px] border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
          <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Resource Load</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-10">Allocation Metrics</p>
          
          <div className="h-[280px] relative mb-10">
            <Doughnut data={lightTasksData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              cutout: '82%'
            }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-slate-800 tracking-tighter">
                {lightTasksData.datasets[0].data.reduce((a, b) => a + b, 0)}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</span>
            </div>
          </div>

          <div className="space-y-4">
            {lightTasksData.labels.map((label, i) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: lightTasksData.datasets[0].backgroundColor[i] }} />
                  <span className="text-xs font-bold text-slate-600">{label}</span>
                </div>
                <span className="text-xs font-black text-slate-800 px-2 py-0.5 rounded-md bg-white border border-slate-100">
                  {lightTasksData.datasets[0].data[i]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-100">
             <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} /> Compliance Verified
             </div>
             <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-all">
                <Zap size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
