'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { mice, type Mouse as MouseSpec } from '@/data/mice';
import {
  Search,
  X,
  ChevronDown,
  Info,
  Star,
  ToggleLeft,
  ToggleRight,
  ChevronLeft,
  ChevronRight,
  Weight,
  Ruler,
  Cpu,
  Wifi,
  Battery,
  Mouse,
  ArrowUpFromDot,
  Gauge,
  Zap,
  Grid3X3,
  Droplets,
} from 'lucide-react';

const specRows: { key: keyof MouseSpec; label: string; icon: typeof Weight; mono?: boolean }[] = [
  { key: 'weight', label: 'Weight', icon: Weight, mono: true },
  { key: 'dimensions', label: 'Dimensions', icon: Ruler, mono: true },
  { key: 'sensor', label: 'Sensor', icon: Cpu, mono: true },
  { key: 'connection', label: 'Connection', icon: Wifi },
  { key: 'battery', label: 'Battery', icon: Battery, mono: true },
  { key: 'switches', label: 'Switches', icon: Mouse, mono: true },
  { key: 'dpi', label: 'DPI', icon: Gauge, mono: true },
  { key: 'ips', label: 'IPS', icon: Zap, mono: true },
  { key: 'acceleration', label: 'Acceleration', icon: ArrowUpFromDot, mono: true },
  { key: 'buttons', label: 'Buttons', icon: Grid3X3, mono: true },
  { key: 'coating', label: 'Coating', icon: Droplets },
];

const tooltipMap: Partial<Record<keyof MouseSpec, string>> = {
  sensor: 'sensor_desc',
  switches: 'switches_desc',
};

const fieldAccessor = {
  weight: (m: MouseSpec) => `${m.weight}g`,
  dimensions: (m: MouseSpec) => m.dimensions,
  sensor: (m: MouseSpec) => m.sensor,
  connection: (m: MouseSpec) => m.connection,
  battery: (m: MouseSpec) => `${m.battery}h`,
  switches: (m: MouseSpec) => m.switches,
  dpi: (m: MouseSpec) => `${(m.dpi / 1000).toFixed(0)}K`,
  ips: (m: MouseSpec) => `${m.ips} IPS`,
  acceleration: (m: MouseSpec) => `${m.acceleration}G`,
  buttons: (m: MouseSpec) => `${m.buttons}`,
  coating: (m: MouseSpec) => m.coating,
};

function SpecTooltip({ mouse, field }: { mouse: MouseSpec; field: keyof MouseSpec }) {
  const descKey = tooltipMap[field] as keyof MouseSpec | undefined;
  if (!descKey) return null;
  const desc = mouse[descKey] as string | undefined;
  if (!desc) return null;
  return (
    <span className="tooltip-trigger relative inline-flex items-center">
      <Info className="ml-1 h-3 w-3 shrink-0 cursor-help text-[#6a6a7a]" />
      <span className="tooltip-content absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-[#2a2a3a] bg-[#12121a] p-3 text-xs leading-relaxed text-[#c0c0cc] shadow-xl">
        <strong className="block text-sm text-[#e8e8ed]">{mouse.sensor === (mouse[field] as string) ? mouse.sensor : mouse[field as keyof MouseSpec] as string}</strong>
        {desc}
      </span>
    </span>
  );
}

function getSpecValues(miceList: MouseSpec[], field: keyof MouseSpec): string[] {
  return miceList.map((m) => fieldAccessor[field as keyof typeof fieldAccessor]?.(m) ?? String(m[field]));
}

function valuesDiffer(values: string[]): boolean {
  if (values.length < 2) return false;
  return new Set(values).size > 1;
}

type DropdownProps = {
  selected: MouseSpec[];
  onSelect: (m: MouseSpec) => void;
  onRemove: (id: string) => void;
};

function MouseSpecDropdown({ selected, onSelect, onRemove }: DropdownProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      mice.filter(
        (m) =>
          !selected.some((s) => s.id === m.id) &&
          (m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.brand.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, selected],
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#2a2a3a] bg-[#12121a] px-3 py-2 text-sm text-[#9a9aab] transition-colors hover:border-[#6c5ce7]/50"
        onClick={() => setOpen(!open)}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1">
          {selected.length >= 4
            ? 'Max 4 mice'
            : query || 'Search mice...'}
        </span>
        <ChevronDown className="h-4 w-4" />
      </div>
      {open && selected.length < 4 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-60 overflow-auto rounded-lg border border-[#2a2a3a] bg-[#12121a] shadow-xl scrollbar-thin">
          <div className="sticky top-0 border-b border-[#2a2a3a] bg-[#12121a] p-2">
            <input
              autoFocus
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-[#2a2a3a] bg-[#0a0a0f] px-2 py-1.5 text-sm text-[#e8e8ed] outline-none placeholder:text-[#6a6a7a] focus:border-[#6c5ce7]/50"
            />
          </div>
          {filtered.length === 0 ? (
            <p className="p-3 text-center text-sm text-[#6a6a7a]">No mice found</p>
          ) : (
            filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  onSelect(m);
                  setQuery('');
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-[#e8e8ed] transition-colors hover:bg-[#1a1a26]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#1a1a26] text-xs font-bold text-[#6c5ce7]">
                  {m.brand[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{m.name}</div>
                  <div className="text-xs text-[#6a6a7a]">{m.brand}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selected.map((m) => (
            <span
              key={m.id}
              className="flex items-center gap-1.5 rounded-full border border-[#2a2a3a] bg-[#1a1a26] px-3 py-1 text-xs font-medium text-[#e8e8ed]"
            >
              {m.brand[0]}.{m.name.split(' ').slice(0, 2).join(' ')}
              <button onClick={() => onRemove(m.id)} className="ml-0.5 text-[#6a6a7a] hover:text-[#e8e8ed]">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<MouseSpec[]>([]);
  const [highlightDiff, setHighlightDiff] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (m: MouseSpec) => {
    if (selected.length < 4) setSelected((prev) => [...prev, m]);
  };
  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((m) => m.id !== id));
    setActivePage(0);
  };

  const maxPages = Math.max(selected.length - 1, 0);

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
        <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">MouseSpec Comparison</h1>
        <p className="mt-2 text-[#9a9aab]">Select up to 4 mice to compare their specifications side by side.</p>
      </div>

      <MouseSpecDropdown selected={selected} onSelect={handleSelect} onRemove={handleRemove} />

      {selected.length > 0 && (
        <>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setHighlightDiff(!highlightDiff)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                highlightDiff
                  ? 'bg-[#6c5ce7]/15 text-[#6c5ce7]'
                  : 'bg-[#1a1a26] text-[#9a9aab] hover:text-[#e8e8ed]'
              }`}
            >
              {highlightDiff ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
              Highlight Differences
            </button>
          </div>

          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto rounded-xl border border-[#2a2a3a] bg-[#12121a] md:block scrollbar-thin">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="sticky top-0 z-30 border-b border-[#2a2a3a] bg-[#12121a]">
                  <th className="w-40 min-w-[140px] px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">
                    Specification
                  </th>
                  {selected.map((m) => (
                    <th key={m.id} className="min-w-[180px] px-4 py-4">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a26] text-lg font-bold text-[#6c5ce7]">
                          {m.brand[0]}
                        </span>
                        <div>
                          <div className="font-semibold text-[#e8e8ed]">{m.name}</div>
                          <div className="text-xs text-[#6a6a7a]">{m.brand}</div>
                        </div>
                        <div className="flex items-center gap-1">{renderStars(m.rating)}</div>
                        <button
                          onClick={() => handleRemove(m.id)}
                          className="rounded-md px-2 py-0.5 text-xs text-[#6a6a7a] transition-colors hover:bg-[#2a2a3a] hover:text-[#e8e8ed]"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, rowIdx) => {
                  const values = getSpecValues(selected, row.key);
                  const diff = valuesDiffer(values);
                  return (
                    <tr
                      key={row.key}
                      className="animate-fade-slide-up border-b border-[#2a2a3a] transition-colors hover:bg-[#1a1a26]/50"
                      style={{ animationDelay: `${rowIdx * 0.03}s` }}
                    >
                      <td className="flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#6a6a7a]">
                        <row.icon className="h-3.5 w-3.5" />
                        {row.label}
                      </td>
                      {selected.map((m, colIdx) => {
                        const val = fieldAccessor[row.key as keyof typeof fieldAccessor]?.(m) ?? String(m[row.key]);
                        const highlighted = highlightDiff && diff;
                        return (
                          <td
                            key={m.id}
                            className={`px-4 py-3 text-sm ${row.mono ? 'font-mono text-[#c0c0cc]' : 'text-[#e8e8ed]'} ${highlighted ? 'bg-[#6c5ce7]/10' : ''}`}
                          >
                            <span className="inline-flex items-center">
                              {val}
                              {tooltipMap[row.key] && (
                                <SpecTooltip mouse={m} field={row.key} />
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Swipe Cards */}
          <div className="mt-6 md:hidden">
            <div className="flex items-center justify-between px-1">
              <button
                onClick={() => setActivePage((p) => Math.max(0, p - 1))}
                disabled={activePage === 0}
                className="rounded-lg p-2 text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed] disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-medium text-[#6a6a7a]">
                {activePage + 1} / {selected.length}
              </span>
              <button
                onClick={() => setActivePage((p) => Math.min(maxPages, p + 1))}
                disabled={activePage >= maxPages}
                className="rounded-lg p-2 text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed] disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-thin"
            >
              {selected.map((m, idx) => (
                <div
                  key={m.id}
                  className="min-w-[85vw] shrink-0 snap-center rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4"
                  style={{ display: idx === activePage ? 'block' : 'none' }}
                >
                  <div className="mb-3 flex flex-col items-center gap-2 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a26] text-lg font-bold text-[#6c5ce7]">
                      {m.brand[0]}
                    </span>
                    <div>
                      <div className="font-semibold text-[#e8e8ed]">{m.name}</div>
                      <div className="text-xs text-[#6a6a7a]">{m.brand}</div>
                    </div>
                    <div className="flex items-center gap-1">{renderStars(m.rating)}</div>
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="rounded-md px-3 py-1 text-xs text-[#6a6a7a] transition-colors hover:bg-[#2a2a3a] hover:text-[#e8e8ed]"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-1">
                    {specRows.map((row) => {
                      const val = fieldAccessor[row.key as keyof typeof fieldAccessor]?.(m) ?? String(m[row.key]);
                      return (
                        <div
                          key={row.key}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[#1a1a26]"
                        >
                          <span className="flex items-center gap-1.5 text-xs font-medium text-[#6a6a7a]">
                            <row.icon className="h-3 w-3" />
                            {row.label}
                          </span>
                          <span className={`${row.mono ? 'font-mono' : ''} text-[#e8e8ed]`}>
                            {val}
                            {tooltipMap[row.key] && <SpecTooltip mouse={m} field={row.key} />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-1.5">
              {selected.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePage(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activePage ? 'w-6 bg-[#6c5ce7]' : 'w-1.5 bg-[#2a2a3a]'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {selected.length === 0 && (
        <div className="mt-16 text-center">
          <Search className="mx-auto h-12 w-12 text-[#2a2a3a]" />
          <p className="mt-4 text-sm text-[#6a6a7a]">Search and select mice above to start comparing.</p>
        </div>
      )}
    </div>
  );
}
