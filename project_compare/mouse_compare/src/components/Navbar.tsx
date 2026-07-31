'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MousePointer2, GitCompare, Shapes, Calculator, Menu, X, MessageSquare, ShieldCheck, LogIn, LogOut, Database } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import AuthModal from '@/components/AuthModal';

const links = [
  { href: '/mice', label: 'Mice', icon: Database },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/visualizer', label: 'Shape Overlay', icon: Shapes },
  { href: '/calculator', label: 'Grip Calculator', icon: Calculator },
  { href: '/reviews', label: 'Reviews', icon: MessageSquare },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const renderLink = (l: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }, mobile = false) => {
    const Icon = l.icon;
    const active = pathname.startsWith(l.href);
    const base = 'flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-colors';
    const mobileBase = 'flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors';
    const activeStyle = 'bg-[#6c5ce7]/15 text-[#6c5ce7]';
    const inactiveStyle = 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]';
    return (
      <Link
        key={l.href}
        href={l.href}
        onClick={() => mobile && setOpen(false)}
        className={`${mobile ? mobileBase : base} ${active ? activeStyle : inactiveStyle}`}
      >
        <Icon className="h-5 w-5" />
        {l.label}
      </Link>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3.5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-[#e8e8ed]">
            <MousePointer2 className="h-6 w-6 text-[#6c5ce7]" />
            <span>MouseDB</span>
          </Link>
          <div className="hidden items-center gap-1.5 sm:flex">
            {links.map((l) => renderLink(l))}
            <div className="mx-2 h-6 w-px bg-[#2a2a3a]" />
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                      pathname.startsWith('/admin') ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]' : 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]'
                    }`}
                  >
                    <ShieldCheck className="h-5 w-5" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed]"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-2 rounded-lg bg-[#6c5ce7] px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#5a4bd6]"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </button>
            )}
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center rounded-lg p-2 text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed] sm:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-[#2a2a3a] px-4 py-2 sm:hidden">
            {links.map((l) => renderLink(l, true))}
            <div className="my-2 border-t border-[#2a2a3a]" />
            {user ? (
              <div className="space-y-1">
                {user.role === 'admin' && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]">
                    <ShieldCheck className="h-5 w-5" /> Admin
                  </Link>
                )}
                <button onClick={() => { logout(); setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]">
                  <LogOut className="h-5 w-5" /> Sign Out
                </button>
              </div>
            ) : (
              <button onClick={() => { setShowAuth(true); setOpen(false); }} className="flex w-full items-center gap-2 rounded-lg bg-[#6c5ce7] px-3 py-2 text-base font-medium text-white">
                <LogIn className="h-5 w-5" /> Sign In
              </button>
            )}
          </div>
        )}
      </nav>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
