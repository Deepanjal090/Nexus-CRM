import { motion } from 'framer-motion';
import { Plus, Search, Mail, Phone, Building, Download, FileSpreadsheet, User as UserIcon, MoreHorizontal, Filter } from 'lucide-react';
import { useContactsController } from '../hooks/useContactsController';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function ContactsPage() {
  const {
    filteredContacts,
    search,
    setSearch,
    newContactModalOpen,
    setNewContactModalOpen,
    handleExport,
    handleTemplate,
    handleCreateContact,
  } = useContactsController();

  return (
    <div className="space-y-8 pb-12">
      {/* High-End Enterprise Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[32px] border border-slate-200 shadow-premium relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <UserIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter">Global Directory</h1>
            <div className="flex items-center gap-3 mt-1">
               <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Workforce Records</p>
               <div className="w-1.5 h-1.5 rounded-full bg-success" />
               <p className="text-sm font-black text-primary">{filteredContacts.length} Verified Entries</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 mr-2">
             <Button variant="ghost" size="sm" onClick={handleExport} className="text-slate-500 hover:text-primary hover:bg-white transition-all px-4">
               <Download size={16} className="mr-2" /> Export
             </Button>
             <div className="w-px h-6 bg-slate-200 my-auto" />
             <Button variant="ghost" size="sm" onClick={handleTemplate} className="text-slate-500 hover:text-primary hover:bg-white transition-all px-4">
               <FileSpreadsheet size={16} className="mr-2" /> Template
             </Button>
          </div>
          <Button size="lg" onClick={() => setNewContactModalOpen(true)} className="btn-primary px-8 rounded-2xl shadow-xl shadow-primary/20 font-black uppercase tracking-widest text-xs h-12">
            <Plus size={20} className="mr-2" /> New Contact
          </Button>
        </div>
        
        {/* Subtle Background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>

      {/* Advanced Filtering & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name, organization, or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 text-sm focus:outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all font-medium"
          />
        </div>
        <Button variant="outline" className="h-14 px-6 border-slate-200 text-slate-600 gap-2 font-bold hover:bg-slate-50">
           <Filter size={18} /> Advanced Filters
        </Button>
      </div>

      {/* Premium Data Grid (Laptop Optimized) */}
      <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-premium">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Channels</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Organization</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Designation</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContacts.map((c: any, i: number) => (
                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center font-black border border-blue-100 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        {(c.name?.[0] || 'U').toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-800 tracking-tight leading-tight">{c.name}</p>
                        <p className="text-[10px] font-black text-primary uppercase mt-1 tracking-widest">ID: {c.id?.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[13px] font-bold text-slate-600 hover:text-primary transition-colors">
                        <Mail size={14} className="text-slate-400" /> {c.email}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                        <Phone size={14} className="text-slate-300" /> {c.phone || '+1 555-0000'}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[14px] font-bold text-slate-700">
                      <Building size={16} className="text-slate-300" /> {c.company}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest border border-slate-200">
                      {c.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <div className="flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-xl text-slate-300 hover:text-primary hover:bg-white transition-all border border-transparent hover:border-slate-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contact Modal */}
      <Modal isOpen={newContactModalOpen} onClose={() => setNewContactModalOpen(false)} title="Register Personnel">
        <form onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await handleCreateContact({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            company: formData.get('company') as string,
            role: formData.get('role') as string,
          });
        }} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Identity Name</label>
            <input name="name" required className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="e.g. Alexander Reed" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Primary Email</label>
              <input name="email" type="email" required className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="email@nexus.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Phone</label>
              <input name="phone" className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="+1..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
              <input name="company" required className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="Company Name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Workforce Role</label>
              <input name="role" required className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary transition-all font-bold" placeholder="Job Title" />
            </div>
          </div>
          <Button type="submit" className="w-full h-16 btn-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20 rounded-[20px] text-xs">
            Authorize & Save Record
          </Button>
        </form>
      </Modal>
    </div>
  );
}
