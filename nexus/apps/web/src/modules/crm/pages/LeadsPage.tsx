import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, 
  Target, Mail, Phone, Building, User as UserIcon, 
  X, MoreHorizontal, ListFilter, Activity, PhoneCall, 
  MessageCircle, Calendar, ChevronRight, Settings2, Settings, Bell
} from 'lucide-react';
import { useLeadsController } from '../hooks/useLeadsController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function LeadsPage() {
  const {
    stages,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    search,
    setSearch,
    isLoading,
    handleExport,
    handleCreateLead,
    handleConvertLead,
  } = useLeadsController();

  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState<{ open: boolean; defaultStage?: string }>({ open: false });

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-4 border-[#00aaff]/30 border-t-[#00aaff] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="h-full flex flex-col relative space-y-6">
      {/* Bitrix24 Style Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-700">Leads</h1>
          <button className="p-1 text-slate-400 hover:text-slate-600"><Settings size={18} /></button>
          
          <div className="flex items-center bg-[#2fc6f6]/10 text-[#2fc6f6] border border-[#2fc6f6]/20 px-3 py-1.5 rounded-lg text-xs font-bold gap-2 ml-4">
             <Plus size={16} /> Create
             <ChevronRight size={14} className="rotate-90" />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 gap-2 ml-4 group focus-within:ring-2 focus-within:ring-sky-400/20">
             <span className="text-slate-400 text-xs font-medium">Leads in progress</span>
             <X size={12} className="text-slate-300 hover:text-slate-500 cursor-pointer" />
             <div className="w-px h-4 bg-slate-200" />
             <input placeholder="+ search" className="bg-transparent border-none outline-none text-xs text-slate-700 w-32" />
             <Search size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm"><Settings2 size={18} /></button>
           <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm"><Bell size={18} /></button>
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
         <div className="flex items-center gap-3 px-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
               <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">0</span> Inbound
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
               <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">0</span> Planned
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
               <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white">29</span> More
            </div>
         </div>
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
               <span>{stage.name} ({stage.leads.length})</span>
            </div>

            {/* Stage Total */}
            <div className="flex items-center justify-center py-2">
               <span className="text-2xl font-black text-slate-500/30">$0</span>
            </div>

            {/* Quick Lead Button */}
            <button onClick={() => setNewLeadModalOpen({open: true, defaultStage: stage.name})} className="w-full h-8 bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center gap-2 rounded-lg transition-all">
               <Plus size={14} /> Quick Lead
            </button>

            {/* Cards List */}
            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 max-h-[calc(100vh-380px)]">
              {stage.leads.map((lead: any) => (
                <div key={lead.id} onClick={() => setSelectedLead(lead)} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                  {si === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#48b8f2]" />}
                  
                  <div className="flex items-start justify-between mb-3">
                     <h3 className="text-[14px] font-bold text-slate-700 group-hover:text-sky-500 transition-colors flex-1 leading-tight">{lead.title}</h3>
                     <span className="text-[10px] font-bold text-white bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center ml-2">29</span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-bold mb-4">April 21</div>

                  <div className="flex items-center justify-between mb-4">
                     <div className="flex gap-2 text-slate-300">
                        <Phone size={14} />
                        <Mail size={14} className="text-sky-400" />
                        <MessageCircle size={14} />
                     </div>
                     <div className="text-[10px] font-bold text-slate-400">Task</div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                     <div className="flex items-center gap-1.5 text-[#ff5252] text-[9px] font-black uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
                        Overdue
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="text-right">
                           <p className="text-[9px] font-bold text-slate-300 uppercase">Activity</p>
                           <p className="text-[10px] font-bold text-slate-500">Yesterday, 3:00</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-black">
                           {lead.ownerId?.split('-')[2]?.charAt(0).toUpperCase() || 'U'}
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
        {selectedLead && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLead(null)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" />
            <motion.div initial={{ x: 600 }} animate={{ x: 0 }} exit={{ x: 600 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                 <h2 className="font-bold text-slate-700">Lead Detail View</h2>
                 <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-slate-200 rounded-lg transition-all"><X size={20} /></button>
              </div>
              <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                 <h1 className="text-2xl font-black text-slate-800">{selectedLead.title}</h1>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Entity</p>
                       <p className="text-sm font-bold text-slate-700">{selectedLead.company}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Contact</p>
                       <p className="text-sm font-bold text-slate-700">{selectedLead.contact}</p>
                    </div>
                 </div>
                 <div className="pt-8 flex flex-col gap-3">
                    <Button onClick={() => handleConvertLead(selectedLead.id)} className="w-full bg-sky-500 hover:bg-sky-600 text-white">Convert to Deal</Button>
                    <Button variant="outline" className="w-full">Archive Lead</Button>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Modal isOpen={newLeadModalOpen.open} onClose={() => setNewLeadModalOpen({open: false})} title="Create New Lead">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const defaultStage = stages.find(s => s.name === newLeadModalOpen.defaultStage) || stages[0];
          const success = await handleCreateLead({
            title: formData.get('title') as string,
            contact: formData.get('contact') as string,
            company: formData.get('company') as string,
            stageId: defaultStage?.id,
          });
          if (success) setNewLeadModalOpen({ open: false });
        }} className="space-y-4 pt-4">
          <input name="title" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Lead Title" />
          <input name="contact" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Contact Name" />
          <input name="company" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Company Name" />
          <Button type="submit" className="w-full bg-sky-500 text-white h-12 rounded-lg font-bold">Create Lead</Button>
        </form>
      </Modal>
    </div>
  );
}
