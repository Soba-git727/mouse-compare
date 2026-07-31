'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, Scale, Weight, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Mouse } from '@/data/mice';

const PAGE_SIZE = 12;

export default function MicePage() {
  const [mice, setMice] = useState<Mouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`/api/mice?page=${page}&pageSize=${PAGE_SIZE}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load mice');
        return r.json();
      })
      .then((d) => {
        setMice(d.mice || []);
        setTotal(d.total ?? 0);
      })
      .catch(() => setError('Could not load mice. Please try again.'))
      .finally(() => setLoading(false));
  }, [page]);

  const filtered = mice.filter((m) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.brand.toLowerCase().includes(q) ||
      m.sensor.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const renderStars = (r: number) => {
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    return (
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < full ? 'fill-[#f59e0b] text-[#f59e0b]' : i === full && half ? 'fill-[#f59e0b]/50 text-[#f59e0b]' : 'text-[#2a2a3a]'}`}
          />
        ))}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">Mouse Database</h1>
        <p className="mt-2 text-[#9a9aab]">Browse the catalog of gaming mice with full specifications.</p>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6a6a7a]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, brand or sensor..."
          className="w-full rounded-xl border border-[#2a2a3a] bg-[#12121a] py-2.5 pl-10 pr-4 text-sm text-[#e8e8ed] placeholder-[#6a6a7a] outline-none transition-colors focus:border-[#6c5ce7]"
        />
      </div>

      {loading ? (
        <p className="text-sm text-[#6a6a7a]">Loading catalog...</p>
      ) : error ? (
        <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-[#6a6a7a]">No mice match your search.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <Link
                key={m.id}
                href={`/mice/${m.id}`}
                className="group rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-colors hover:border-[#6c5ce7]/50"
              >
                <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-[#1a1a26]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-24 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#6c5ce7]">{m.brand}</span>
                  <span className="text-sm font-semibold text-[#e8e8ed]">${m.price.toFixed(2)}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#e8e8ed]">{m.name}</h3>
                <div className="mt-2 flex items-center gap-1">
                  {renderStars(m.rating)}
                  <span className="ml-1 text-xs text-[#6a6a7a]">{m.rating.toFixed(1)} ({m.review_count})</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#9a9aab]">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#1a1a26] px-2 py-1">
                    <Weight className="h-3 w-3" /> {m.weight}g
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#1a1a26] px-2 py-1">
                    <Scale className="h-3 w-3" /> {m.dimensions.split(' × ')[0]}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#1a1a26] px-2 py-1">
                    <Zap className="h-3 w-3" /> {m.sensor}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 rounded-lg border border-[#2a2a3a] px-3 py-2 text-sm text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <span className="px-3 text-sm text-[#6a6a7a]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex items-center gap-1 rounded-lg border border-[#2a2a3a] px-3 py-2 text-sm text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
