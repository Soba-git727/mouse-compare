'use client';

import { useState, useMemo } from 'react';
import { mice, type Mouse } from '@/data/mice';
import {
  Hand,
  Move,
  Percent,
  Ruler,
  Weight,
  Star,
  ChevronRight,
} from 'lucide-react';

type GripStyle = 'palm' | 'claw' | 'fingertip';

const gripOptions: {
  key: GripStyle;
  label: string;
  desc: string;
}[] = [
  {
    key: 'palm',
    label: 'Palm Grip',
    desc: 'Full hand rests on mouse',
  },
  {
    key: 'claw',
    label: 'Claw Grip',
    desc: 'Palm rests, fingers arched',
  },
  {
    key: 'fingertip',
    label: 'Fingertip Grip',
    desc: 'Only fingertips touch',
  },
];

function computeMatch(m: Mouse, length: number, width: number, grip: GripStyle): number {
  let score = 0;
  if (length >= m.hand_size_min && length <= m.hand_size_max) score += 40;
  else {
    const mid = (m.hand_size_min + m.hand_size_max) / 2;
    const dist = Math.abs(length - mid);
    const range = m.hand_size_max - m.hand_size_min;
    score += Math.max(0, 40 - (dist / range) * 40);
  }
  if (m.grip_styles.includes(grip)) score += 40;
  else score += 10;
  const weightScore = Math.max(0, 25 - Math.abs(m.weight - 65) * 0.5);
  score += weightScore;
  return Math.round(Math.min(100, score));
}

export default function CalculatorPage() {
  const [length, setLength] = useState(18);
  const [width, setWidth] = useState(10);
  const [grip, setGrip] = useState<GripStyle | null>(null);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    if (!calculated || !grip) return [];
    const scored = mice
      .map((m) => ({
        mouse: m,
        match: computeMatch(m, length, width, grip),
      }))
      .sort((a, b) => b.match - a.match);
    return scored;
  }, [length, width, grip, calculated]);

  const handleCalculate = () => {
    if (grip) setCalculated(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">Grip Calculator</h1>
        <p className="mt-2 text-[#9a9aab]">Find your perfect mouse based on hand size and grip style.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Input Form */}
        <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#6a6a7a]">Your Hand</h2>

          {/* Hand Length */}
          <div className="mb-5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-medium text-[#e8e8ed]">
                <Ruler className="h-4 w-4 text-[#6c5ce7]" />
                Hand Length
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={10}
                  max={25}
                  step={0.1}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-16 rounded-md border border-[#2a2a3a] bg-[#0a0a0f] px-2 py-1 text-center text-sm font-mono text-[#e8e8ed] outline-none focus:border-[#6c5ce7]/50"
                />
                <span className="text-xs text-[#6a6a7a]">cm</span>
              </div>
            </div>
            <input
              type="range"
              min={10}
              max={25}
              step={0.1}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2a2a3a] accent-[#6c5ce7] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6c5ce7]"
            />
          <div className="mt-1 flex justify-between text-xs text-[#6a6a7a]">
            <span>10cm</span>
            <span>25cm</span>
          </div>
          <div className="mt-1 text-right text-xs font-mono text-[#6c5ce7]">
            {length} cm
          </div>
        </div>

        {/* Hand Width */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-medium text-[#e8e8ed]">
                <Move className="h-4 w-4 text-[#6c5ce7]" />
                Hand Width
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={5}
                  max={15}
                  step={0.1}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-16 rounded-md border border-[#2a2a3a] bg-[#0a0a0f] px-2 py-1 text-center text-sm font-mono text-[#e8e8ed] outline-none focus:border-[#6c5ce7]/50"
                />
                <span className="text-xs text-[#6a6a7a]">cm</span>
              </div>
            </div>
            <input
              type="range"
              min={5}
              max={15}
              step={0.1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2a2a3a] accent-[#6c5ce7] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6c5ce7]"
            />
          <div className="mt-1 flex justify-between text-xs text-[#6a6a7a]">
            <span>5cm</span>
            <span>15cm</span>
          </div>
          <div className="mt-1 text-right text-xs font-mono text-[#6c5ce7]">
            {width} cm
          </div>
        </div>

          {/* Grip Style */}
          <h3 className="mb-3 text-sm font-semibold text-[#e8e8ed]">Grip Style</h3>
          <div className="grid gap-2">
            {gripOptions.map((g) => {
              const selected = grip === g.key;
              return (
                <button
                  key={g.key}
                  onClick={() => setGrip(g.key)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                    selected
                      ? 'border-[#6c5ce7] bg-[#6c5ce7]/10'
                      : 'border-[#2a2a3a] bg-[#0a0a0f] hover:border-[#6c5ce7]/30'
                  }`}
                >
                  <Hand className={`mt-0.5 h-5 w-5 shrink-0 ${selected ? 'text-[#6c5ce7]' : 'text-[#6a6a7a]'}`} />
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${selected ? 'text-[#6c5ce7]' : 'text-[#e8e8ed]'}`}>
                      {g.label}
                    </div>
                    <div className="text-xs text-[#6a6a7a]">{g.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={!grip}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#6c5ce7] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5a4bd6] disabled:cursor-not-allowed disabled:opacity-40 animate-pulse-glow"
          >
            <Percent className="h-4 w-4" />
            Calculate
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div>
          {!calculated && (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-[#2a2a3a] p-12 text-center">
              <div>
                <Hand className="mx-auto h-10 w-10 text-[#2a2a3a]" />
                <p className="mt-3 text-sm text-[#6a6a7a]">
                  Fill in your hand measurements and grip style, then calculate.
                </p>
              </div>
            </div>
          )}
          {calculated && (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((item, idx) => (
                <div
                  key={item.mouse.id}
                  className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4 transition-all hover:border-[#6c5ce7]/30"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#1a1a26]">
                      <img src={item.mouse.photo} alt={item.mouse.name} className="block h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-[#e8e8ed]">{item.mouse.name}</div>
                      <div className="text-xs text-[#6a6a7a]">{item.mouse.brand}</div>
                      <div className="mt-1 flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-2.5 w-2.5 ${i < Math.floor(item.mouse.rating) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-[#2a2a3a]'}`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Match Badge */}
                    <div
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        item.match >= 80
                          ? 'bg-[#00d68f]/15 text-[#00d68f]'
                          : item.match >= 60
                            ? 'bg-[#fbbf24]/15 text-[#fbbf24]'
                            : 'bg-[#6a6a7a]/15 text-[#6a6a7a]'
                      }`}
                    >
                      {item.match}%
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6a6a7a]">
                    <div className="flex items-center gap-1">
                      <Weight className="h-3 w-3" />
                      <span className="font-mono text-[#c0c0cc]">{item.mouse.weight}g</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-3 w-3" />
                      <span className="font-mono text-[#c0c0cc] truncate">{item.mouse.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
