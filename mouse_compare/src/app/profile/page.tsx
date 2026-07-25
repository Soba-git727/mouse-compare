'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/AuthContext';
import AuthModal from '@/components/AuthModal';
import { mice, type Mouse } from '@/data/mice';
import {
  User,
  Lock,
  Bookmark,
  Heart,
  GitCompare,
  Plus,
  X,
  Star,
  LogIn,
  UserPlus,
  Search,
  Trash2,
  Clock,
} from 'lucide-react';

const ownedMiceIds = ['razer-viper-v3-pro', 'logitech-gpx2', 'pulsar-x2h', 'lamzu-atlantis'];
const wishlistIds = ['finalmouse-starlight', 'vaxee-xe-wireless', 'endgame-xm2we'];

const savedComparisons = [
  { id: 'c1', mice: ['razer-viper-v3-pro', 'logitech-gpx2'], date: '2026-07-20' },
  { id: 'c2', mice: ['pulsar-x2h', 'lamzu-atlantis', 'ninjutso-sora'], date: '2026-07-18' },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const owned = useMemo(() => mice.filter((m) => ownedMiceIds.includes(m.id)), []);
  const wishlist = useMemo(() => mice.filter((m) => wishlistIds.includes(m.id)), []);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">My Gear Desk</h1>
          <p className="mt-2 text-[#9a9aab]">Manage your collection, wishlist, and saved comparisons.</p>
        </div>

        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-8 text-center max-w-lg mx-auto">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a26]">
            <User className="h-8 w-8 text-[#6a6a7a]" />
          </div>
          <h2 className="text-xl font-semibold text-[#e8e8ed]">Welcome, Guest</h2>
          <p className="mt-2 text-sm text-[#6a6a7a]">Sign in to manage your gear collection and save comparisons.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#6c5ce7] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6]"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          </div>
        </div>

        {/* Locked preview cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]/50 p-6 opacity-50">
            <Lock className="h-5 w-5 text-[#6a6a7a] mb-2" />
            <h3 className="text-sm font-semibold text-[#e8e8ed]">My Collection</h3>
            <p className="text-xs text-[#6a6a7a] mt-1">Track the mice you own</p>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]/50 p-6 opacity-50">
            <Lock className="h-5 w-5 text-[#6a6a7a] mb-2" />
            <h3 className="text-sm font-semibold text-[#e8e8ed]">Wishlist</h3>
            <p className="text-xs text-[#6a6a7a] mt-1">Save mice for later</p>
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a]/50 p-6 opacity-50">
            <Lock className="h-5 w-5 text-[#6a6a7a] mb-2" />
            <h3 className="text-sm font-semibold text-[#e8e8ed]">Saved Comparisons</h3>
            <p className="text-xs text-[#6a6a7a] mt-1">Resume past comparisons</p>
          </div>
        </div>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">My Gear Desk</h1>
          <p className="mt-2 text-[#9a9aab]">Welcome back, {user.name}</p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-[#2a2a3a] px-3 py-1.5 text-xs text-[#6a6a7a] hover:bg-[#1a1a26]"
        >
          Sign Out
        </button>
      </div>

      {/* Add to Collection */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
          <input
            placeholder="Search mice to add to collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#2a2a3a] bg-[#12121a] py-2.5 pl-10 pr-3 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
          />
        </div>
      </div>

      {/* My Collection */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed] mb-4">
          <Bookmark className="h-5 w-5 text-[#6c5ce7]" /> My Collection
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {owned.map((m, idx) => (
            <MouseCard key={m.id} mouse={m} idx={idx} action={<Trash2 className="h-3.5 w-3.5 text-red-400" />} />
          ))}
        </div>
      </section>

      {/* Wishlist */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed] mb-4">
          <Heart className="h-5 w-5 text-rose-400" /> Wishlist
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((m, idx) => (
            <MouseCard key={m.id} mouse={m} idx={idx} action={<X className="h-3.5 w-3.5 text-[#6a6a7a]" />} />
          ))}
        </div>
      </section>

      {/* Saved Comparisons */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed] mb-4">
          <GitCompare className="h-5 w-5 text-[#6c5ce7]" /> Saved Comparisons
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {savedComparisons.map((cmp) => (
            <div
              key={cmp.id}
              className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4 transition-all hover:border-[#6c5ce7]/30"
            >
              <div className="flex items-center gap-2 text-xs text-[#6a6a7a] mb-2">
                <Clock className="h-3 w-3" />
                {cmp.date}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {cmp.mice.map((id, i) => {
                  const m = mice.find((x) => x.id === id);
                  if (!m) return null;
                  return (
                    <span key={id} className="flex items-center gap-1.5 text-sm text-[#e8e8ed]">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-[#1a1a26] text-[10px] font-bold text-[#6c5ce7]">
                        {m.brand[0]}
                      </span>
                      {m.name}
                      {i < cmp.mice.length - 1 && <span className="text-[#6a6a7a]">vs</span>}
                    </span>
                  );
                })}
              </div>
              <button className="flex items-center gap-1.5 rounded-lg bg-[#6c5ce7] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5a4bd6]">
                <GitCompare className="h-3 w-3" /> Resume
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MouseCard({ mouse, idx, action }: { mouse: Mouse; idx: number; action: React.ReactNode }) {
  return (
    <div
      className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4 transition-all hover:border-[#6c5ce7]/30"
      style={{ animationDelay: `${idx * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a1a26] text-sm font-bold text-[#6c5ce7]">
          {mouse.brand[0]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-[#e8e8ed]">{mouse.name}</div>
          <div className="text-xs text-[#6a6a7a]">{mouse.brand}</div>
        </div>
        <button className="rounded-md p-1.5 text-[#6a6a7a] hover:bg-[#1a1a26] transition-colors">
          {action}
        </button>
      </div>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-2.5 w-2.5 ${i < Math.floor(mouse.rating) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#2a2a3a]'}`}
          />
        ))}
        <span className="ml-1 text-xs font-mono text-[#6a6a7a]">{mouse.weight}g</span>
      </div>
    </div>
  );
}