'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, User, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = () => {
    setEmail('admin@mousecompare.com');
    setPassword('admin123');
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:py-24">
      <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6c5ce7]/15">
            <ShieldCheck className="h-7 w-7 text-[#6c5ce7]" />
          </div>
          <h1 className="text-xl font-bold text-[#e8e8ed]">Admin Login</h1>
          <p className="mt-1 text-sm text-[#6a6a7a]">Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#9a9aab]">Email</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@mousecompare.com"
                className="w-full rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] py-2.5 pl-10 pr-3 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#9a9aab]">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] py-2.5 pl-10 pr-10 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6a6a7a] hover:text-[#e8e8ed]"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6c5ce7] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6] disabled:opacity-50"
          >
            <LogIn className="h-4 w-4" />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#2a2a3a]">
          <p className="mb-3 text-xs text-center text-[#6a6a7a]">Quick demo access</p>
          <button
            onClick={quickLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2a2a3a] py-2.5 text-sm font-medium text-[#e8e8ed] transition-colors hover:bg-[#1a1a26]"
          >
            <LogIn className="h-4 w-4 text-[#6c5ce7]" />
            Auto-fill Admin Credentials
          </button>
          <p className="mt-3 text-xs text-center text-[#6a6a7a]">
            Then click <strong className="text-[#e8e8ed]">Sign In</strong> above
          </p>
        </div>
      </div>
    </div>
  );
}
