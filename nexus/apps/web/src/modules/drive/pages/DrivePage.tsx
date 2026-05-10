import { motion } from 'framer-motion';
import { Folder, Upload, Grid, List, MoreHorizontal, Search } from 'lucide-react';
import { useDriveController } from '../hooks/useDriveController';
import { Button } from '@/components/ui/Button';

export default function DrivePage() {
  const {
    folders,
    files,
    viewMode,
    setViewMode,
  } = useDriveController();

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">Drive</h1>
          <p className="text-sm text-text-muted mt-1">Shared workspace storage</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative hidden md:block">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
             <input className="w-64 h-9 pl-9 pr-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-primary/40 transition-all" placeholder="Search files..." />
           </div>
           <div className="flex bg-surface-2 p-1 rounded-lg border border-border">
             <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-surface text-primary shadow-sm' : 'text-text-faint hover:text-text'}`}><Grid size={16} /></button>
             <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-text-faint hover:text-text'}`}><List size={16} /></button>
           </div>
           <Button icon={<Upload size={16} />}>Upload</Button>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Folders</h2>
          <button className="text-xs text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {folders.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-all cursor-pointer shadow-sm group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ backgroundColor: f.color + '15' }}>
                <Folder size={20} style={{ color: f.color }} fill={f.color + '30'} />
              </div>
              <h3 className="text-sm text-text font-semibold truncate">{f.name}</h3>
              <p className="text-xs text-text-faint mt-1">{f.items} items</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text uppercase tracking-wider">Recent Files</h2>
          <button className="text-xs text-primary font-medium hover:underline">Recent</button>
        </div>
        <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-2/50 border-b border-border">
                <th className="text-left text-[10px] text-text-faint font-bold uppercase tracking-widest px-6 py-3">Name</th>
                <th className="text-left text-[10px] text-text-faint font-bold uppercase tracking-widest px-6 py-3">Size</th>
                <th className="text-left text-[10px] text-text-faint font-bold uppercase tracking-widest px-6 py-3">Modified</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {files.map((f, i) => (
                <tr key={f.id} className="group hover:bg-black/[0.01] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-2 flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                        <f.icon size={16} className="text-text-muted" />
                      </div>
                      <span className="text-sm font-medium text-text group-hover:text-primary transition-colors">{f.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-muted font-medium">{f.size}</td>
                  <td className="px-6 py-4 text-xs text-text-muted">{f.modified}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg text-text-faint hover:text-text-muted hover:bg-surface-2 transition-all opacity-0 group-hover:opacity-100"><MoreHorizontal size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
