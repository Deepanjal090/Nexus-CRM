import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, 
  Target, Mail, Phone, Building, User as UserIcon, 
  X, MoreHorizontal, ListFilter, Activity, PhoneCall, 
  MessageCircle, Calendar, ChevronRight, Settings2, Settings,
  Briefcase, TrendingUp, DollarSign
} from 'lucide-react';
import { useDealsController } from '../hooks/useDealsController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function DealsPage() {
  const {
    stages,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    search,
    setSearch,
    handleCreateDeal,
  } = useDealsController();

  const [newDealModalOpen, setNewDealModalOpen] = useState<{open: boolean, defaultStage?: string}>({open: false});

  const [selectedDeal, setSelectedDeal] = useState<any | null>(null);

  const totalValue = stages.reduce((acc, s) => acc + s.deals.reduce((a: any, b: any) => a + (Number(b.value) || 0), 0), 0);

  return (
    <div className="h-full flex flex-col relative space-y-6">
      {/* Bitrix24 Style Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-700">Deals</h1>
          <button className="p-1 text-slate-400 hover:text-slate-600"><Settings size={18} /></button>
          
          <div className="flex items-center bg-[#2fc6f6]/10 text-[#2fc6f6] border border-[#2fc6f6]/20 px-3 py-1.5 rounded-lg text-xs font-bold gap-2 ml-4">
             <Plus size={16} /> Create
             <ChevronRight size={14} className="rotate-90" />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 gap-2 ml-4 group focus-within:ring-2 focus-within:ring-sky-400/20">
             <span className="text-slate-400 text-xs font-medium">Active deals</span>
             <X size={12} className="text-slate-300 hover:text-slate-500 cursor-pointer" />
             <div className="w-px h-4 bg-slate-200" />
             <input placeholder="+ search" className="bg-transparent border-none outline-none text-xs text-slate-700 w-32" />
             <Search size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Value</span>
              <span className="text-sm font-black text-sky-500">${totalValue.toLocaleString()}</span>
           </div>
           <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm"><Settings2 size={18} /></button>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px shrink-0">
         {['Kanban', 'List', 'Activities', 'Calendar'].map((tab, i) => (
           <button key={tab} className={`px-4 py-2 text-xs font-bold transition-all relative ${i === 0 ? 'bg-white text-slate-700 rounded-t-lg border-t border-x border-slate-200 -mb-px' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab}
           </button>
         ))}
         <div className="flex-1" />
         <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100/50 rounded-lg flex items-center gap-2">
            <Target size={14} /> Automation rules
         </button>
      </div>

      {/* Kanban Board - Bitrix24 Chevron Design */}
      <div className="flex gap-4 overflow-x-auto pb-6 flex-1 items-start custom-scrollbar">
        {stages.map((stage, si) => (
          <div key={stage.id} className="min-w-[320px] w-[320px] flex flex-col gap-4">
            {/* Chevron Header */}
            <div className={`kanban-chevron ${si === 0 ? 'kanban-chevron-first' : ''} shadow-sm uppercase tracking-wide flex justify-between`} style={{ backgroundColor: si === 0 ? '#48b8f2' : si === 1 ? '#a8e5f8' : si === 2 ? '#9fe8f6' : '#2fc6f6' }}>
               <span>{stage.name} ({stage.deals.length})</span>
            </div>

            {/* Stage Total */}
            <div className="flex items-center justify-center py-2">
               <span className="text-2xl font-black text-slate-500/30">${stage.deals.reduce((a: any, b: any) => a + (Number(b.value) || 0), 0).toLocaleString()}</span>
            </div>

            {/* Quick Deal Button */}
            <button onClick={() => setNewDealModalOpen({open: true, defaultStage: stage.name})} className="w-full h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center gap-2 rounded-lg transition-all">
               <Plus size={14} /> Quick Deal
            </button>

            {/* Cards List */}
            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 max-h-[calc(100vh-380px)]">
              {stage.deals.map((deal: any) => (
                <div key={deal.id} onClick={() => setSelectedDeal(deal)} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-400" />
                  
                  <div className="flex items-start justify-between mb-3">
                     <h3 className="text-[14px] font-bold text-slate-700 group-hover:text-sky-500 transition-colors flex-1 leading-tight">{deal.title}</h3>
                     <span className="text-[10px] font-black text-sky-500 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">${Number(deal.value).toLocaleString()}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-bold mb-4">{deal.company}</div>

                  <div className="flex items-center justify-between mb-4">
                     <div className="flex gap-2 text-slate-300">
                        <Phone size={14} />
                        <Mail size={14} className="text-sky-400" />
                        <MessageCircle size={14} />
                     </div>
                     <div className="text-[10px] font-bold text-slate-400">Pipeline</div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                     <div className="flex items-center gap-1.5 text-sky-600 text-[9px] font-black uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded">
                        Active deal
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="text-right">
                           <p className="text-[9px] font-bold text-slate-300 uppercase">Lead Rep</p>
                           <p className="text-[10px] font-bold text-slate-500">Online</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-black">
                           {deal.ownerId?.split('-')[2]?.charAt(0).toUpperCase() || 'U'}
                        </div>
                     </div>
                  </div>
                </div>
              ))}

              <div className="h-20 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                 <Plus size={24} className="text-slate-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Side Drawer - Bitrix24 Style */}
      <AnimatePresence>
        {selectedDeal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDeal(null)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                 <h2 className="font-bold text-slate-700">Deal Analytics</h2>
                 <button onClick={() => setSelectedDeal(null)} className="p-1 hover:bg-slate-200 rounded-lg transition-all"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                 <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black text-slate-800">{selectedDeal.title}</h1>
                    <span className="text-2xl font-black text-sky-500">${Number(selectedDeal.value).toLocaleString()}</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Organization</p>
                       <p className="text-sm font-bold text-slate-700">{selectedDeal.company}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Strategic Rep</p>
                       <p className="text-sm font-bold text-slate-700">Lead assigned</p>
                    </div>
                 </div>
                 <div className="pt-8 flex flex-col gap-3">
                    <Button className="w-full bg-sky-500 text-white">Update Status</Button>
                    <Button variant="outline" className="w-full">Download Contract</Button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal isOpen={newDealModalOpen.open} onClose={() => setNewDealModalOpen({open: false})} title="Initialize Corporate Deal">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleCreateDeal({
            title: formData.get('title') as string,
            value: Number(formData.get('value')),
            company: formData.get('company') as string,
            stageName: newDealModalOpen.defaultStage || stages[0].name
          });
        }} className="space-y-4 pt-4">
          <input name="title" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Deal Designation" />
          <input name="value" type="number" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Asset Value ($)" />
          <input name="company" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Organization" />
          <Button type="submit" className="w-full bg-sky-500 text-white h-12 rounded-lg font-bold">Authorize Deal</Button>
        </form>
      </Modal>
    </div>
  );
}
