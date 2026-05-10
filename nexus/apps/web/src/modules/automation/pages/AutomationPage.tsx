import { motion } from 'framer-motion';
import { Plus, Workflow, Play, Pause, Zap, Mail, Clock } from 'lucide-react';

const workflows = [
  { name: 'Lead Nurture Sequence', trigger: 'Lead Created', actions: 3, active: true, runs: 142 },
  { name: 'Deal Won Notification', trigger: 'Deal Stage Changed', actions: 2, active: true, runs: 56 },
  { name: 'Task Overdue Reminder', trigger: 'Date Reached', actions: 1, active: false, runs: 89 },
  { name: 'New Employee Onboarding', trigger: 'Employee Created', actions: 5, active: true, runs: 12 },
];

export default function AutomationPage() {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text">Automation</h1>
          <p className="text-sm text-text-muted mt-1">Build workflows to automate your processes</p>
        </div>
        <button className="h-8 px-3 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5">
          <Plus size={16} /> New Workflow
        </button>
      </div>

      <div className="space-y-3">
        {workflows.map((w, i) => (
          <motion.div key={w.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-lg bg-surface-2 border border-border hover:border-primary/20 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${w.active ? 'bg-primary-subtle' : 'bg-surface-offset'}`}>
                  <Workflow size={16} className={w.active ? 'text-primary' : 'text-text-faint'} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text">{w.name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-text-muted flex items-center gap-1"><Zap size={10} />{w.trigger}</span>
                    <span className="text-xs text-text-muted">{w.actions} actions</span>
                    <span className="text-xs text-text-faint">{w.runs} runs</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${w.active ? 'bg-success/10 text-success' : 'bg-surface-offset text-text-faint'}`}>
                  {w.active ? 'Active' : 'Paused'}
                </span>
                <button className="p-1.5 rounded-md hover:bg-surface-offset transition-colors">
                  {w.active ? <Pause size={14} className="text-text-muted" /> : <Play size={14} className="text-text-muted" />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
