import { motion } from 'framer-motion';
import { Plus, FolderKanban, Users, Calendar, Target, TrendingUp, MoreHorizontal, LayoutGrid, List, Search, Filter } from 'lucide-react';
import { useProjectsController } from '../hooks/useProjectsController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function ProjectsPage() {
  const {
    projects,
    isLoading,
    newModalOpen,
    setNewModalOpen,
    handleCreateProject,
  } = useProjectsController();

  return (
    <div className="space-y-10 pb-16">
      {/* Premium Laptop Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[40px] border border-slate-200 shadow-premium relative overflow-hidden shrink-0">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-[24px] bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <FolderKanban size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h1 className="text-3xl font-black text-slate-800 tracking-tighter leading-none">Global Initiatives</h1>
               <span className="px-3 py-1 rounded-full bg-blue-50 text-primary text-[10px] font-black uppercase tracking-widest border border-blue-100">Live Roadmap</span>
            </div>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Strategic Portfolio • {projects.length} Active Workstreams</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 relative z-10">
           <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
            {[
              { id: 'Grid', icon: LayoutGrid },
              { id: 'List', icon: List }
            ].map((v) => (
              <button key={v.id} className={`p-2.5 rounded-xl transition-all ${v.id === 'Grid' ? 'bg-white text-primary shadow-lg border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>
                <v.icon size={18} />
              </button>
            ))}
          </div>
          <Button size="lg" onClick={() => setNewModalOpen(true)} className="btn-primary font-black uppercase tracking-widest h-14 px-8 rounded-2xl shadow-xl shadow-primary/20 text-xs">
            <Plus size={22} className="mr-2" /> Launch Initiative
          </Button>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Advanced Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Filter initiatives by title, lead, or status..."
            className="w-full h-14 pl-14 pr-6 rounded-[20px] bg-slate-50 border border-slate-100 text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all font-medium"
          />
        </div>
        <Button variant="outline" className="h-14 px-8 rounded-[20px] border-slate-200 text-slate-600 gap-3 font-black text-xs uppercase tracking-widest hover:bg-slate-50">
           <Filter size={18} /> Optimization Hub
        </Button>
      </div>

      {/* Projects Grid - High Information Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p: any, i: number) => (
          <motion.div key={p.id || p.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="group relative bg-white p-8 rounded-[36px] border border-slate-200 hover:border-primary/40 transition-all duration-500 shadow-premium hover:shadow-2xl cursor-pointer overflow-hidden active:scale-[0.98]">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-start justify-between mb-10 relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500 bg-white" style={{ borderColor: (p.color || '#3b82f6') + '20' }}>
                <FolderKanban size={26} style={{ color: p.color || '#3b82f6' }} />
              </div>
              <button className="p-3 rounded-2xl text-slate-300 hover:text-primary hover:bg-slate-50 transition-all">
                <MoreHorizontal size={24} />
              </button>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase border ${
                    p.status === 'ACTIVE' ? 'bg-green-50 text-success border-green-100' :
                    p.status === 'ON_HOLD' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-primary border-blue-100'
                  }`}>{p.status?.replace('_', ' ') || 'PLANNING'}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 group-hover:text-primary transition-colors tracking-tighter leading-tight">{p.name}</h3>
              <p className="text-sm text-slate-500 font-medium line-clamp-2">Integrated workforce deployment and talent resource optimization for Q2 milestones.</p>
            </div>

            <div className="mt-8 flex items-center gap-8 relative z-10">
               <div className="flex items-center gap-3 text-slate-500">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100"><Users size={16} className="text-slate-400" /></div>
                  <span className="text-xs font-black uppercase tracking-widest">{p.members || 0} Team</span>
               </div>
               <div className="flex items-center gap-3 text-slate-500">
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100"><Calendar size={16} className="text-slate-400" /></div>
                  <span className="text-xs font-black uppercase tracking-widest">{p.tasks || 0} Targets</span>
               </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Global Execution Progress</span>
                <span className="text-sm font-black text-slate-800">{p.completion || 0}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-50 overflow-hidden border border-slate-100 p-0.5 shadow-inner">
                <motion.div className="h-full rounded-full shadow-lg" style={{ backgroundColor: p.color || '#3b82f6' }}
                  initial={{ width: 0 }} animate={{ width: `${p.completion || 0}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }} />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">
               <span className="flex items-center gap-2 group-hover:gap-4 transition-all">Explore Roadmap <TrendingUp size={16} /></span>
               <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Plus size={14} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Project Modal - Bright Interface */}
      <Modal isOpen={newModalOpen} onClose={() => setNewModalOpen(false)} title="Strategic Initiative Launch">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleCreateProject({
            name: formData.get('name') as string,
            status: 'PLANNING',
            color: '#0052cc',
          });
        }} className="space-y-8 pt-6">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Initiative Title</label>
            <input name="name" required className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="e.g. Infrastructure Deployment 2026" />
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-3">
               <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Resource Allocation</label>
               <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none font-bold">
                 <option>Standard Priority</option>
                 <option>Strategic Priority</option>
                 <option>Mission Critical</option>
               </select>
             </div>
             <div className="space-y-3">
               <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Deployment Phase</label>
               <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none font-bold">
                 <option>Planning</option>
                 <option>Execution</option>
                 <option>Monitoring</option>
               </select>
             </div>
          </div>
          <Button type="submit" className="w-full h-16 btn-primary font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-[24px] text-xs">
            Initialize workstream
          </Button>
        </form>
      </Modal>
    </div>
  );
}
