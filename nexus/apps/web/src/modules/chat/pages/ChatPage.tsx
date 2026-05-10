import { motion } from 'framer-motion';
import { Hash, Lock, Send, Smile, Paperclip, Search, Bell, Info, MoreVertical, Plus } from 'lucide-react';
import { useChatController } from '../hooks/useChatController';

export default function ChatPage() {
  const {
    channels,
    messages,
    input,
    setInput,
    activeChannel,
    setActiveChannel,
    handleSendMessage,
  } = useChatController();

  return (
    <div className="flex h-[calc(100dvh-var(--topbar-height)-64px)] rounded-[32px] overflow-hidden bg-surface border border-white/5 shadow-2xl">
      {/* Channels sidebar - High Density Office Style */}
      <div className="w-64 border-r border-white/5 bg-white/[0.02] flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tighter">Connect</h2>
            <button className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
              <Plus size={16} />
            </button>
          </div>
          <div className="relative group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint group-focus-within:text-primary transition-colors" />
            <input className="w-full h-10 pl-10 pr-3 rounded-xl bg-surface border border-white/5 text-text text-xs focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Find channels..." />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6 custom-scrollbar">
          <div>
            <p className="text-[10px] font-black text-text-faint px-3 py-2 uppercase tracking-[0.2em] mb-1">Public Channels</p>
            <div className="space-y-1">
              {channels.filter(c => c.type !== 'PRIVATE').map((ch) => (
                <button key={ch.name} onClick={() => setActiveChannel(ch.name)}
                  className={`w-full flex items-center gap-3 h-10 px-3 rounded-xl transition-all duration-200 group ${
                    activeChannel === ch.name ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}>
                  <Hash size={16} className={activeChannel === ch.name ? 'opacity-100' : 'opacity-40'} />
                  <span className="flex-1 text-left text-[13px] font-bold tracking-tight">{ch.name}</span>
                  {ch.unread > 0 && <span className={`w-5 h-5 rounded-lg text-[10px] flex items-center justify-center font-black ${activeChannel === ch.name ? 'bg-white text-primary' : 'bg-primary text-white'}`}>{ch.unread}</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-text-faint px-3 py-2 uppercase tracking-[0.2em] mb-1">Direct Encrypted</p>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'PRIVATE').map((ch) => (
                <button key={ch.name} onClick={() => setActiveChannel(ch.name)}
                  className={`w-full flex items-center gap-3 h-10 px-3 rounded-xl transition-all duration-200 group ${
                    activeChannel === ch.name ? 'bg-primary text-white shadow-lg' : 'text-text-muted hover:text-white hover:bg-white/5'
                  }`}>
                  <Lock size={16} className={activeChannel === ch.name ? 'opacity-100' : 'opacity-40'} />
                  <span className="flex-1 text-left text-[13px] font-bold tracking-tight">{ch.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white/[0.01]">
        <div className="h-20 px-8 border-b border-white/5 flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-faint">
               <Hash size={20} />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">{activeChannel}</span>
              <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" /> 24 active colleagues
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2.5 rounded-xl text-text-faint hover:text-white hover:bg-white/5 transition-all"><Bell size={18} /></button>
             <button className="p-2.5 rounded-xl text-text-faint hover:text-white hover:bg-white/5 transition-all"><Info size={18} /></button>
             <button className="p-2.5 rounded-xl text-text-faint hover:text-white hover:bg-white/5 transition-all"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-primary text-xs font-black uppercase">{msg.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-[14px] font-black text-white">{msg.author}</span>
                  <span className="text-[10px] text-text-faint font-bold uppercase tracking-widest">{msg.time}</span>
                </div>
                <div className="relative inline-block max-w-[85%]">
                  <div className="p-4 rounded-[20px] rounded-tl-none bg-surface border border-white/5 shadow-sm group-hover:shadow-xl group-hover:border-primary/20 transition-all">
                    <p className="text-[14px] text-text-muted font-medium leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Input Bar */}
        <div className="p-6 bg-surface/50 border-t border-white/5">
          <div className="flex flex-col bg-surface border border-white/10 rounded-[24px] focus-within:border-primary/40 focus-within:ring-8 focus-within:ring-primary/5 transition-all shadow-2xl">
            <div className="flex items-center gap-1 px-4 py-2 border-b border-white/5">
               <button className="p-1.5 rounded-lg text-text-faint hover:text-white hover:bg-white/5 transition-all"><Plus size={16} /></button>
               <div className="w-px h-4 bg-white/5 mx-1" />
               <button className="p-1.5 rounded-lg text-text-faint hover:text-white hover:bg-white/5 transition-all font-black text-xs">B</button>
               <button className="p-1.5 rounded-lg text-text-faint hover:text-white hover:bg-white/5 transition-all italic text-xs font-serif">I</button>
            </div>
            <div className="flex items-center gap-4 px-6 py-4">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-text-faint font-medium"
                placeholder={`Message #${activeChannel}...`} />
              <div className="flex items-center gap-3">
                <button className="text-text-faint hover:text-white transition-colors"><Smile size={20} /></button>
                <button className="text-text-faint hover:text-white transition-colors"><Paperclip size={20} /></button>
                <button onClick={handleSendMessage} disabled={!input.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim() ? 'bg-primary text-white shadow-lg active:scale-90' : 'text-text-faint bg-white/5'}`}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
