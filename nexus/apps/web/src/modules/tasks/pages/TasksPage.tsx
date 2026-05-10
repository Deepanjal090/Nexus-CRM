import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, MessageSquare, Download, X, ListFilter, LayoutGrid, List, Clock, AlertCircle, Settings, Settings2, ChevronRight, Search, Target } from 'lucide-react';
import { useTasksController } from '../hooks/useTasksController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';

export default function TasksPage() {
  const {
    stages,
    isSupervisor,
    viewAs,
    setViewAs,
    teamMembers,
    activeView,
    setActiveView,
    newModalOpen,
    setNewModalOpen,
    handleCreateTask,
  } = useTasksController();

  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  return (
    <div className="h-full flex flex-col relative space-y-6">
      {/* Bitrix24 Style Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-700">Tasks and Projects</h1>
          <button className="p-1 text-slate-400 hover:text-slate-600"><Settings size={18} /></button>
          
          <div className="flex items-center bg-[#2fc6f6]/10 text-[#2fc6f6] border border-[#2fc6f6]/20 px-3 py-1.5 rounded-lg text-xs font-bold gap-2 ml-4">
             <Plus size={16} /> New Task
             <ChevronRight size={14} className="rotate-90" />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 gap-2 ml-4 group focus-within:ring-2 focus-within:ring-sky-400/20">
             <span className="text-slate-400 text-xs font-medium">In progress</span>
             <X size={12} className="text-slate-300 hover:text-slate-500 cursor-pointer" />
             <div className="w-px h-4 bg-slate-200" />
             <input placeholder="+ search" className="bg-transparent border-none outline-none text-xs text-slate-700 w-32" />
             <Search size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
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
      </div>

      {/* Kanban Board - Bitrix24 Chevron Design */}
      <div className="flex gap-4 overflow-x-auto pb-6 flex-1 items-start custom-scrollbar">
        {stages.map((stage, si) => (
          <div key={stage.id} className="min-w-[320px] w-[320px] flex flex-col gap-4">
            {/* Chevron Header */}
            <div className={`kanban-chevron ${si === 0 ? 'kanban-chevron-first' : ''} shadow-sm uppercase tracking-wide flex justify-between`} style={{ backgroundColor: si === 0 ? '#48b8f2' : si === 1 ? '#a8e5f8' : si === 2 ? '#9fe8f6' : '#2fc6f6' }}>
               <span>{stage.name} ({stage.tasks.length})</span>
            </div>

            <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1 max-h-[calc(100vh-320px)]">
              {stage.tasks.map((task: any) => (
                <div key={task.id} onClick={() => setSelectedTask(task)} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300" />
                  
                  <div className="flex items-start justify-between mb-3">
                     <h3 className="text-[14px] font-bold text-slate-700 group-hover:text-sky-500 transition-colors flex-1 leading-tight">{task.title}</h3>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                     <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${task.priority === 'HIGH' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                           {task.priority}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-[10px] font-black">
                           {task.ownerId?.split('-')[2]?.charAt(0).toUpperCase() || 'U'}
                        </div>
                     </div>
                  </div>
                </div>
              ))}
              
              <button onClick={() => setNewModalOpen({open: true, defaultStage: stage.name})} className="w-full h-12 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 hover:border-sky-400 hover:text-sky-400 transition-all">
                 <Plus size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={newModalOpen.open} onClose={() => setNewModalOpen({open: false})} title="Initialize Objective">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleCreateTask({
            title: formData.get('title') as string,
            priority: formData.get('priority') as string,
            stageName: newModalOpen.defaultStage || stages[0].name
          });
        }} className="space-y-4 pt-4">
          <input name="title" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Task Objective" />
          <select name="priority" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm">
             <option value="LOW">Low</option>
             <option value="MEDIUM">Medium</option>
             <option value="HIGH">High</option>
             <option value="URGENT">Urgent</option>
          </select>
          <Button type="submit" className="w-full bg-sky-500 text-white h-12 rounded-lg font-bold">Authorize Workstream</Button>
        </form>
      </Modal>
    </div>
  );
}
