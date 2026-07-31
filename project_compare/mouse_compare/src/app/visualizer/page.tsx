'use client';

import { useState, useRef, useEffect } from 'react';
import type { Mouse } from '@/data/mice';
import {
  Eye,
  ZoomIn,
  Palette,
  Columns2,
  Smartphone,
  Monitor,
} from 'lucide-react';

type View = 'top' | 'side' | 'back';

const views: { key: View; label: string }[] = [
  { key: 'top', label: 'Top View' },
  { key: 'side', label: 'Side View' },
  { key: 'back', label: 'Back View' },
];

const viewIcons: Record<View, typeof Monitor> = {
  top: Monitor,
  side: Columns2,
  back: Smartphone,
};

const presetColors = [
  '#6c5ce7',
  '#00d68f',
  '#ff6b6b',
  '#fbbf24',
  '#60a5fa',
  '#f472b6',
  '#34d399',
  '#f97316',
];

function MouseSelector({
  label,
  value,
  miceList,
  onChange,
}: {
  label: string;
  value: Mouse | null;
  miceList: Mouse[];
  onChange: (m: Mouse) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#6a6a7a] uppercase tracking-wider">{label}</label>
      <select
        value={value?.id ?? ''}
        onChange={(e) => {
          const m = miceList.find((x) => x.id === e.target.value);
          if (m) onChange(m);
        }}
        className="w-full rounded-lg border border-[#2a2a3a] bg-[#12121a] px-3 py-2 text-sm text-[#e8e8ed] outline-none transition-colors focus:border-[#6c5ce7]/50"
      >
        <option value="" disabled>
          Select a mouse...
        </option>
        {miceList.map((m) => (
          <option key={m.id} value={m.id}>
            {m.brand} — {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function VisualizerPage() {
  const [allMice, setAllMice] = useState<Mouse[]>([]);
  const [miceError, setMiceError] = useState('');
  const [mouse1, setMouse1] = useState<Mouse | null>(null);
  const [mouse2, setMouse2] = useState<Mouse | null>(null);
  const [view, setView] = useState<View>('top');
  const [opacity1, setOpacity1] = useState(60);
  const [opacity2, setOpacity2] = useState(60);
  const [color1, setColor1] = useState('#6c5ce7');
  const [color2, setColor2] = useState('#00d68f');
  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch('/api/mice')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load mice');
        return r.json();
      })
      .then(d => setAllMice(d.mice || []))
      .catch(() => setMiceError('Could not load mice. Please try again.'));
  }, []);

  const path1 = mouse1?.shape_svg?.[view] ?? '';
  const path2 = mouse2?.shape_svg?.[view] ?? '';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">Shape Overlay</h1>
        <p className="mt-2 text-[#9a9aab]">Overlap and compare mouse shapes from different views.</p>
      </div>

      {/* Selectors */}
      <div className="grid gap-4 sm:grid-cols-2">
        <MouseSelector label="Mouse 1" value={mouse1} miceList={allMice} onChange={setMouse1} />
        <MouseSelector label="Mouse 2" value={mouse2} miceList={allMice} onChange={setMouse2} />
      </div>

      {miceError && (
        <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">{miceError}</p>
      )}

      {mouse1 && mouse2 && (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          {/* Canvas Area */}
          <div>
            {/* View Toggles */}
            <div className="mb-4 flex gap-1 rounded-lg border border-[#2a2a3a] bg-[#12121a] p-1">
              {views.map((v) => {
                const Icon = viewIcons[v.key];
                const active = view === v.key;
                return (
                  <button
                    key={v.key}
                    onClick={() => setView(v.key)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#6c5ce7] text-white shadow-sm'
                        : 'text-[#9a9aab] hover:text-[#e8e8ed]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {v.label}
                  </button>
                );
              })}
            </div>

            {/* SVG Canvas */}
            <div className="relative overflow-hidden rounded-xl border border-[#2a2a3a] bg-[#12121a]">
              <div className="flex items-center justify-center p-4">
                <svg
                  ref={svgRef}
                  viewBox="0 0 200 200"
                  className="h-auto w-full max-w-md"
                  style={{ touchAction: 'pinch-zoom' }}
                >
                  <rect width="200" height="200" fill="#0a0a0f" rx="8" />
                  <path d={path1} fill={color1} opacity={opacity1 / 100} />
                  <path d={path2} fill={color2} opacity={opacity2 / 100} />
                </svg>
              </div>
              <div className="absolute bottom-2 right-2 rounded-md bg-[#0a0a0f]/80 px-2 py-1 text-xs text-[#6a6a7a]">
                <ZoomIn className="mr-1 inline h-3 w-3" />
                Scroll to zoom
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-5 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            {/* Legend */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">Legend</h3>
              <div className="space-y-2">
                {[
                  { mouse: mouse1, color: color1 },
                  { mouse: mouse2, color: color2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#e8e8ed]">
                    <span
                      className="h-3 w-3 rounded-sm border border-[#2a2a3a]"
                      style={{ background: item.color }}
                    />
                    <span className="truncate font-medium">{item.mouse.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opacity & Color for Mouse 1 */}
            <ControlGroup
              label="Mouse 1"
              color={color1}
              opacity={opacity1}
              onColorChange={setColor1}
              onOpacityChange={setOpacity1}
              showPicker={showPicker1}
              onTogglePicker={() => setShowPicker1(!showPicker1)}
            />

            {/* Opacity & Color for Mouse 2 */}
            <ControlGroup
              label="Mouse 2"
              color={color2}
              opacity={opacity2}
              onColorChange={setColor2}
              onOpacityChange={setOpacity2}
              showPicker={showPicker2}
              onTogglePicker={() => setShowPicker2(!showPicker2)}
            />
          </div>
        </div>
      )}

      {(!mouse1 || !mouse2) && (
        <div className="mt-16 text-center">
          <Eye className="mx-auto h-12 w-12 text-[#2a2a3a]" />
          <p className="mt-4 text-sm text-[#6a6a7a]">Select two mice to compare their shapes.</p>
        </div>
      )}
    </div>
  );
}

function ControlGroup({
  label,
  color,
  opacity,
  onColorChange,
  onOpacityChange,
  showPicker,
  onTogglePicker,
}: {
  label: string;
  color: string;
  opacity: number;
  onColorChange: (c: string) => void;
  onOpacityChange: (o: number) => void;
  showPicker: boolean;
  onTogglePicker: () => void;
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold text-[#9a9aab]">{label}</h4>

      {/* Opacity slider */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-[#6a6a7a]">
          <span>Opacity</span>
          <span className="font-mono">{opacity}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={(e) => onOpacityChange(Number(e.target.value))}
          className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#2a2a3a] accent-[#6c5ce7] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6c5ce7]"
        />
      </div>

      {/* Color */}
      <div className="relative">
        <button
          onClick={onTogglePicker}
          className="flex w-full items-center gap-2 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] px-3 py-2 text-xs text-[#e8e8ed] transition-colors hover:border-[#6c5ce7]/50"
        >
          <span className="h-4 w-4 rounded border border-[#2a2a3a]" style={{ background: color }} />
          <span className="flex-1 text-left">Color</span>
          <Palette className="h-3 w-3 text-[#6a6a7a]" />
        </button>
        {showPicker && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-[#2a2a3a] bg-[#12121a] p-3 shadow-xl">
            <div className="grid grid-cols-4 gap-2">
              {presetColors.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onColorChange(c);
                    onTogglePicker();
                  }}
                  className={`h-7 w-full rounded-md border transition-transform hover:scale-110 ${
                    c === color ? 'border-white ring-1 ring-white' : 'border-[#2a2a3a]'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
