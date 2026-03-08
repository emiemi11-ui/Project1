'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { register } from '@/lib/auth';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800));

    const user = register(name, email, password, invitationCode);
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid invitation code or email already in use. Valid codes: UNIT-2025, FORMATION-2025, COMMAND-2025');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
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
            CREATE ACCOUNT
          </h1>
          <p className="text-sm text-ice3 text-center mb-8">
            Join VitaNova with your invitation code
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">FULL NAME</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
                placeholder="your@email.io"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)]"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono text-ice3 mb-1.5 block">INVITATION CODE</label>
              <input
                type="text"
                value={invitationCode}
                onChange={e => setInvitationCode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-ice outline-none focus:border-cyan/50 focus:shadow-[0_0_0_2px_rgba(0,212,255,0.1)] font-mono"
                placeholder="UNIT-2025"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 text-red text-sm p-3 bg-red/5 rounded-lg border border-red/10"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                {error}
              </motion.div>
            )}

            <Button type="submit" variant="fill" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  CREATING...
                </span>
              ) : (
                'CREATE ACCOUNT'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm text-cyan hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
