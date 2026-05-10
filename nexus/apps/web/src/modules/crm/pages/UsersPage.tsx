import { motion } from 'framer-motion';
import { 
  Plus, Search, Mail, ShieldCheck, User as UserIcon, 
  MoreHorizontal, Filter, Send, Shield, Users, 
  Settings, Settings2, Bell, X, ChevronRight, Target
} from 'lucide-react';
import { useUsersController } from '../hooks/useUsersController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function UsersPage() {
  const {
    users,
    isAdmin,
    search,
    setSearch,
    inviteModalOpen,
    setInviteModalOpen,
    handleInviteUser,
    handleToggleStatus,
  } = useUsersController();

  return (
    <div className="h-full flex flex-col relative space-y-6">
      {/* Bitrix24 Style Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-700">Employees & Personnel</h1>
          <button className="p-1 text-slate-400 hover:text-slate-600"><Settings size={18} /></button>
          
          {isAdmin && (
            <div 
              onClick={() => setInviteModalOpen(true)}
              className="flex items-center bg-success/10 text-success border border-success/20 px-4 py-1.5 rounded-lg text-xs font-black gap-2 ml-4 cursor-pointer hover:bg-success/20 transition-all"
            >
               <Send size={16} /> Invite User
               <ChevronRight size={14} className="rotate-90" />
            </div>
          )}

          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 gap-2 ml-4 group focus-within:ring-2 focus-within:ring-sky-400/20">
             <span className="text-slate-400 text-xs font-medium">All employees</span>
             <X size={12} className="text-slate-300 hover:text-slate-500 cursor-pointer" />
             <div className="w-px h-4 bg-slate-200" />
             <input 
                placeholder="+ search" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-slate-700 w-32" 
             />
             <Search size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button className="p-2 text-slate-400 hover:text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm"><Settings2 size={18} /></button>
        </div>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-px shrink-0">
         {['Active Personnel', 'Org Chart', 'Security Logs', 'Invited'].map((tab, i) => (
           <button key={tab} className={`px-4 py-2 text-xs font-bold transition-all relative ${i === 0 ? 'bg-white text-slate-700 rounded-t-lg border-t border-x border-slate-200 -mb-px' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab}
           </button>
         ))}
      </div>

      {/* Users Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role & Privilege</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-slate-700">{u.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <Shield size={14} className={u.role === 'ADMIN' ? 'text-red-400' : u.role === 'SUPERVISOR' ? 'text-blue-400' : 'text-slate-300'} />
                       <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{u.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{u.department}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                      u.status === 'ACTIVE' ? 'bg-success/10 text-success' : 
                      u.status === 'PENDING' ? 'bg-orange-50 text-orange-500' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-white transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal - Bitrix24 Style */}
      <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} title="Invite Strategic Workforce">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleInviteUser({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as string,
            department: formData.get('department') as string,
          });
        }} className="space-y-5 pt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
            <input name="name" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" placeholder="e.g. John Wilson" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Work Email</label>
            <input name="email" type="email" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" placeholder="name@nexus.local" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Role Privilege</label>
              <select name="role" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold">
                 <option value="EMPLOYEE">Employee</option>
                 <option value="SUPERVISOR">Supervisor</option>
                 <option value="ADMIN">Administrator</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Department</label>
              <select name="department" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold">
                 <option value="Sales">Sales</option>
                 <option value="Management">Management</option>
                 <option value="Tech Team">Tech Team</option>
                 <option value="RFP">RFP</option>
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full bg-sky-500 text-white h-12 rounded-lg font-black uppercase tracking-widest text-xs shadow-lg shadow-sky-500/20">
            Send Invitation Key
          </Button>
        </form>
      </Modal>
    </div>
  );
}
