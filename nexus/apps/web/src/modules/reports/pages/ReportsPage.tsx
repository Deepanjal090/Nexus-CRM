import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text">Reports</h1>
          <p className="text-sm text-text-muted mt-1">Analytics and insights</p>
        </div>
        <button className="h-8 px-3 rounded-md border border-border text-text-muted text-sm hover:bg-surface-2 transition-colors flex items-center gap-1.5">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Revenue by Month', icon: BarChart3, desc: 'Monthly revenue trend for the current year' },
          { title: 'Deals by Stage', icon: PieChart, desc: 'Distribution of deals across pipeline stages' },
          { title: 'Task Completion Rate', icon: TrendingUp, desc: 'Weekly task completion trends by team' },
          { title: 'Activity Leaderboard', icon: BarChart3, desc: 'Top performers by CRM activities' },
        ].map((r, i) => (
          <motion.div key={r.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-6 rounded-lg bg-surface-2 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <r.icon size={16} className="text-primary" />
              <h3 className="text-sm font-medium text-text">{r.title}</h3>
            </div>
            <div className="h-40 flex items-center justify-center bg-surface-offset/50 rounded-lg border border-dashed border-border">
              <p className="text-xs text-text-faint">{r.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
