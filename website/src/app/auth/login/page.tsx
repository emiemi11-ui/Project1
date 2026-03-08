'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { getDemoAccounts } from '@/lib/auth';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const user = login(email, password);
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try one of the demo accounts below.');
      setLoading(false);
    }
  };

  const demoAccounts = getDemoAccounts();

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan to-signal rounded-lg rotate-45" />
              <div className="absolute inset-[3px] bg-ink rounded-[5px] rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-signal font-bold text-sm">V</span>
              </div>
            </div>
            <span className="font-syne font-bold text-lg tracking-[3px]">VITANOVA</span>
          </Link>
        </div>

        <div className="bg-panel border border-white/5 rounded-2xl p-8">
          <h1 className="font-syne text-2xl font-bold text-white text-center mb-2">
            ACCESS SYSTEM
          </h1>
          <p className="text-sm text-ice3 text-center mb-8">
            Sign in to your VitaNova dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none transition-all focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
                placeholder="your@email.io"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none transition-all focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ice3"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red text-sm p-3 bg-red/5 rounded-lg border border-red/10"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              variant="fill"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ACCESSING...
                </span>
              ) : (
                'ACCESS SYSTEM'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/register" className="text-sm text-cyan hover:underline">
              Need an account? Register
            </Link>
          </div>
        </div>

        {/* Demo accounts hint */}
        <div className="mt-6 bg-panel/50 border border-white/5 rounded-xl p-4">
          <p className="text-xs font-mono text-ice3 mb-3">DEMO ACCOUNTS</p>
          <div className="space-y-1.5">
            {demoAccounts.map(acc => (
              <button
                key={acc.email}
                onClick={() => {
                  setEmail(acc.email);
                  const passwords: Record<string, string> = {
                    admin: 'admin123', commander: 'cmd123', physician: 'doc123',
                    psychologist: 'psy123', trainer: 'train123', user: 'user123',
                  };
                  setPassword(passwords[acc.role]);
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-xs text-ice2">{acc.email}</span>
                <span className="text-[10px] font-mono text-ice3 bg-white/5 px-2 py-0.5 rounded">{acc.role}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
