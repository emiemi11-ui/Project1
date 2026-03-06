import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wider text-[#00d4ff] font-[Syne]">
            VITANOVA
          </h1>
          <p className="text-sm text-gray-500 mt-2 tracking-widest uppercase font-mono">
            Human Performance Intelligence
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#12121a] border border-white/10 p-8 space-y-6"
        >
          <h2 className="text-lg font-semibold text-gray-200 tracking-wide">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 font-mono">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#0a0a0f] border border-white/10 text-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
              placeholder="operator@vitanova.io"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 font-mono">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0a0a0f] border border-white/10 text-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00d4ff] text-[#0a0a0f] font-semibold py-3 text-sm uppercase tracking-wider hover:bg-[#00b8d9] transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access System'}
          </button>

          <div className="text-xs text-gray-600 text-center pt-2 font-mono">
            Authorized personnel only
          </div>
        </form>
      </div>
    </div>
  );
}
