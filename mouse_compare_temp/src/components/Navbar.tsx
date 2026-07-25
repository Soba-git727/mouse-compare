'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MousePointer2, GitCompare, Shapes, Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/visualizer', label: 'Visualizer', icon: Shapes },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2a2a3a] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#e8e8ed]">
          <MousePointer2 className="h-5 w-5 text-[#6c5ce7]" />
          <span>MouseDB</span>
        </Link>
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                    : 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center rounded-lg p-2 text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed] sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#2a2a3a] px-4 py-2 sm:hidden">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                    : 'text-[#9a9aab] hover:bg-[#1a1a26] hover:text-[#e8e8ed]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
