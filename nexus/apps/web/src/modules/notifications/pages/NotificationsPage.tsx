import { motion } from 'framer-motion';
import { Bell, Check, CheckCheck, MessageCircle, CheckSquare, Users, DollarSign } from 'lucide-react';

const notifications = [
  { type: 'message', title: 'New message in #engineering', body: 'Alex: "The deployment is ready for review"', time: '2m ago', read: false, icon: MessageCircle },
  { type: 'task', title: 'Task assigned to you', body: 'Fix checkout flow bug — marked as Urgent', time: '15m ago', read: false, icon: CheckSquare },
  { type: 'crm', title: 'Deal moved to Negotiation', body: 'DataFlow — Annual plan ($32,000)', time: '1h ago', read: false, icon: DollarSign },
  { type: 'team', title: 'Emily joined the workspace', body: 'emily@nexus.local was added as Member', time: '3h ago', read: true, icon: Users },
  { type: 'task', title: 'Task completed', body: 'Setup CI/CD pipeline — by Alex', time: '5h ago', read: true, icon: CheckSquare },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-text">Notifications</h1>
          <p className="text-sm text-text-muted mt-1">{notifications.filter(n => !n.read).length} unread</p>
        </div>
        <button className="h-8 px-3 rounded-md border border-border text-text-muted text-sm hover:bg-surface-2 transition-colors flex items-center gap-1.5">
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      <div className="space-y-1">
        {notifications.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
              n.read ? 'hover:bg-surface-2' : 'bg-primary-subtle/30 hover:bg-primary-subtle/50'
            }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.read ? 'bg-surface-offset' : 'bg-primary-subtle'}`}>
              <n.icon size={14} className={n.read ? 'text-text-faint' : 'text-primary'} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`text-sm ${n.read ? 'text-text-muted' : 'text-text font-medium'}`}>{n.title}</h3>
                {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
              </div>
              <p className="text-xs text-text-muted mt-0.5 truncate">{n.body}</p>
              <p className="text-xs text-text-faint mt-1">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
