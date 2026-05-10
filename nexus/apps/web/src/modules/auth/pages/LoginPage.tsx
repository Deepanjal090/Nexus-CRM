import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, ChevronRight, Github, Chrome, ShieldCheck, 
  Globe, Zap, ArrowRight, Server, Command, Fingerprint,
  Info, AlertCircle
} from 'lucide-react';
import { useAppDispatch } from '@/store/store';
import { setCredentials, setWorkspace } from '@/store/authSlice';
import { useNavigate } from 'react-router';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('sood@nexus.local');
  const [password, setPassword] = useState('password123');

  // Verify backend connectivity on mount
  useEffect(() => {
    const ping = async () => {
      try {
        await api.get('/auth/me');
        // If already logged in, skip to dashboard
        navigate('/dashboard');
      } catch (err) {
        // Not logged in, stay on page
      }
    };
    ping();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, tokens, workspaceSlug } = response.data.data;
      
      dispatch(setCredentials({ 
        user, 
        accessToken: tokens.accessToken 
      }));

      if (workspaceSlug) {
        dispatch(setWorkspace(workspaceSlug));
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] overflow-hidden">
      {/* Branding Section */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[45%] bg-primary relative overflow-hidden flex-col justify-between p-16 shadow-2xl">
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-2xl shadow-black/10 mb-10">
             <span className="font-black text-3xl">N</span>
          </div>
          <h1 className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.95]">
            Enterprise<br />Workforce Hub
          </h1>
          <p className="text-blue-100/70 mt-8 text-lg font-medium max-w-md leading-relaxed">
            The next generation of workforce management, optimized for high-performance corporate ecosystems.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8 mt-auto">
           <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10"><ShieldCheck size={20} /></div>
              <p className="text-sm font-black text-white uppercase tracking-widest">Audit Ready</p>
              <p className="text-xs text-blue-100/50 font-medium">Compliance-first data infrastructure.</p>
           </div>
           <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10"><Server size={20} /></div>
              <p className="text-sm font-black text-white uppercase tracking-widest">Global Sync</p>
              <p className="text-xs text-blue-100/50 font-medium">Real-time collaboration across nodes.</p>
           </div>
        </div>

        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-[480px] bg-white lg:bg-transparent p-10 sm:p-14 lg:p-0 rounded-[40px] shadow-2xl lg:shadow-none border border-slate-100 lg:border-none relative z-10">
          <div className="mb-12">
            <div className="lg:hidden w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-8 mx-auto">
               <span className="font-black text-xl">N</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tighter text-center lg:text-left">Nexus Platform</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
               <Fingerprint size={12} className="text-primary" /> Corporate Authentication Hub
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold">
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Workforce Identity</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                <input 
                  type="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-15 pl-14 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-[15px] font-bold focus:outline-none focus:bg-white focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all outline-none py-4"
                  placeholder="name@nexus.local"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secret Key</label>
                 <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot Access?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                <input 
                  type="password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-15 pl-14 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-[15px] font-bold focus:outline-none focus:bg-white focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all outline-none py-4"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-16 btn-primary font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-[22px] mt-4 relative overflow-hidden group">
               {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
               ) : (
                 <span className="flex items-center justify-center gap-3">
                   Authenticate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </span>
               )}
            </Button>
          </form>

          <div className="mt-12">
            <div className="relative flex items-center justify-center mb-8">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
               <span className="relative px-4 bg-white lg:bg-[#f8fafc] text-[10px] font-black text-slate-400 uppercase tracking-widest">SSO Gateways</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="h-14 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all group">
                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><Chrome size={18} /></div>
                 <span className="text-xs font-black text-slate-600">Office 365</span>
              </button>
              <button className="h-14 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all group">
                 <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Github size={18} /></div>
                 <span className="text-xs font-black text-slate-600">GitHub Ent.</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-16 flex items-center gap-6 opacity-30 group cursor-default">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors"><ShieldCheck size={14} /> Security Protocol v2.4</div>
           <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors"><Globe size={14} /> Global Node: Asia-South</div>
        </div>
      </div>
    </div>
  );
}
