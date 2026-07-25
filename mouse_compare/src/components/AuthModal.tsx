'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { X, LogIn, UserPlus, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
        await register(name, email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-xl border border-[#2a2a3a] bg-[#0a0a0f] p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[#e8e8ed]">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-[#6a6a7a] hover:text-[#e8e8ed]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex mb-6 rounded-lg bg-[#12121a] p-1">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === 'login' ? 'bg-[#6c5ce7] text-white' : 'text-[#6a6a7a] hover:text-[#e8e8ed]'
            }`}
          >
            <LogIn className="inline h-4 w-4 mr-1.5" />Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === 'register' ? 'bg-[#6c5ce7] text-white' : 'text-[#6a6a7a] hover:text-[#e8e8ed]'
            }`}
          >
            <UserPlus className="inline h-4 w-4 mr-1.5" />Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div>
              <label className="text-xs font-medium text-[#9a9aab]">Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-[#2a2a3a] bg-[#12121a] py-2.5 pl-10 pr-3 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-[#9a9aab]">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#2a2a3a] bg-[#12121a] py-2.5 pl-10 pr-3 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
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
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-[#2a2a3a] bg-[#12121a] py-2.5 pl-10 pr-10 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
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

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6c5ce7] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6] disabled:opacity-50"
          >
            {tab === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {tab === 'login' && (
          <p className="mt-4 text-xs text-center text-[#6a6a7a]">
            Demo admin: <span className="text-[#e8e8ed]">admin@mousecompare.com</span> / <span className="text-[#e8e8ed]">admin123</span>
          </p>
        )}
      </div>
    </div>
  );
}
