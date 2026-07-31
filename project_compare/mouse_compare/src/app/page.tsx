import Link from 'next/link';
import { GitCompare, Shapes, Calculator, MessageSquare, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Compare Mice',
    desc: 'Side-by-side spec comparison of up to 4 mice with highlight differences toggle.',
    icon: GitCompare,
    href: '/compare',
    color: 'text-[#6c5ce7]',
  },
  {
    title: 'Shape Overlay',
    desc: 'Overlap and compare mouse shapes from different views.',
    icon: Shapes,
    href: '/visualizer',
    color: 'text-emerald-400',
  },
  {
    title: 'Grip Calculator',
    desc: 'Find your perfect mouse based on hand size and grip style.',
    icon: Calculator,
    href: '/calculator',
    color: 'text-blue-400',
  },
  {
    title: 'Community Reviews',
    desc: 'Multi-metric reviews with build quality, coating, and click feel scores.',
    icon: MessageSquare,
    href: '/reviews',
    color: 'text-yellow-400',
  },
];

import { HeroSlider } from '@/components/HeroSlider';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 relative">
      <HeroSlider />

      {/* Features Grid */}
      <section className="mb-20">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#e8e8ed]">
          Everything you need to find your endgame mouse
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                className="group animate-fade-slide-up relative overflow-hidden rounded-2xl border border-[#2a2a3a] bg-[#12121a] p-8 transition-all hover:border-[#6c5ce7]/40 hover:bg-[#1a1a26]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#6c5ce7]/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
                <div className="relative">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[#2a2a3a] bg-[#0a0a0f]">
                    <Icon className={`h-7 w-7 ${f.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#e8e8ed]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6a6a7a]">{f.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-[#6c5ce7] opacity-0 transition-all group-hover:opacity-100">
                    Open
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="text-center">
        <div className="inline-flex items-center gap-8 rounded-xl border border-[#2a2a3a] bg-[#12121a] px-8 py-5">
          <div>
            <div className="text-xl font-bold text-[#e8e8ed]">12+</div>
            <div className="text-xs text-[#6a6a7a]">Mice in Database</div>
          </div>
          <div className="h-8 w-px bg-[#2a2a3a]" />
          <div>
            <div className="text-xl font-bold text-[#e8e8ed]">4</div>
            <div className="text-xs text-[#6a6a7a]">Compare at Once</div>
          </div>
          <div className="h-8 w-px bg-[#2a2a3a]" />
          <div>
            <div className="text-xl font-bold text-[#e8e8ed]">3</div>
            <div className="text-xs text-[#6a6a7a]">View Angles</div>
          </div>
        </div>
      </section>
    </div>
  );
}