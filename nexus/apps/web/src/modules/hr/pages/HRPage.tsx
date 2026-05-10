import { motion } from 'framer-motion';
import { UserPlus, MoreVertical, Mail, Phone } from 'lucide-react';
import { useHRController } from '../hooks/useHRController';
import { Button } from '@/components/ui/Button';

export default function HRPage() {
  const {
    employees,
    stats,
    setNewEmployeeModalOpen,
  } = useHRController();

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Human Resources</h1>
          <p className="text-sm text-text-muted mt-1">Manage your global team</p>
        </div>
        <Button icon={<UserPlus size={16} />} onClick={() => setNewEmployeeModalOpen(true)}>
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-xl bg-surface border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-text-faint uppercase tracking-wider">{s.label}</span>
              <div className="p-1.5 rounded-lg bg-surface-2">
                <s.icon size={16} className="text-primary" />
              </div>
            </div>
            <span className="text-3xl font-bold text-text font-mono">{s.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
            <div className="h-2" style={{ backgroundColor: e.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-offset flex items-center justify-center border border-border group-hover:scale-105 transition-transform" style={{ color: e.color }}>
                    <span className="text-lg font-bold">{e.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text group-hover:text-primary transition-colors">{e.name}</h3>
                    <p className="text-xs text-text-muted font-medium">{e.role}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg text-text-faint hover:bg-surface-2 transition-colors"><MoreVertical size={16} /></button>
              </div>
              
              <div className="flex items-center gap-4 py-3 border-y border-border/50">
                 <div className="flex-1">
                   <p className="text-[10px] text-text-faint font-bold uppercase mb-1">Department</p>
                   <p className="text-xs text-text font-medium">{e.department}</p>
                 </div>
                 <div className="flex-1">
                   <p className="text-[10px] text-text-faint font-bold uppercase mb-1">Status</p>
                   <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                     e.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                   }`}>{e.status.toUpperCase()}</span>
                 </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 h-8 rounded-lg border border-border text-text-muted text-[10px] font-bold uppercase hover:bg-surface-2 transition-colors flex items-center justify-center gap-1.5">
                  <Mail size={12} /> Message
                </button>
                <button className="flex-1 h-8 rounded-lg border border-border text-text-muted text-[10px] font-bold uppercase hover:bg-surface-2 transition-colors flex items-center justify-center gap-1.5">
                  <Phone size={12} /> Call
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
