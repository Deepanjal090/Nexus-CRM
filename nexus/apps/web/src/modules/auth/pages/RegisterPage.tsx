import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAppDispatch } from '@/store/store';
import { setCredentials } from '@/store/authSlice';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Registration failed');
      dispatch(setCredentials({ user: json.data.user, accessToken: json.data.tokens.accessToken }));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full items-center justify-center bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg font-mono">N</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-text">NEXUS</h1>
            <p className="text-xs text-text-muted">Create your workspace</p>
          </div>
        </div>

        <h2 className="text-lg font-medium text-text mb-1">Create an account</h2>
        <p className="text-sm text-text-muted mb-6">Get started with your team workspace</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted mb-1.5">Name</label>
            <input id="register-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-9 px-3 rounded-md bg-surface-2 border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1.5">Email</label>
            <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-9 px-3 rounded-md bg-surface-2 border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30" placeholder="you@company.com" required />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1.5">Password</label>
            <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-9 px-3 rounded-md bg-surface-2 border border-border text-text text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30" placeholder="Min 8 chars, 1 uppercase, 1 number" required />
          </div>
          <button id="register-submit" type="submit" disabled={loading} className="w-full h-9 px-4 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account? <Link to="/login" className="text-primary hover:text-primary-hover">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
