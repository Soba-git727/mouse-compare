import Link from 'next/link';
import { GitCompare, Shapes, Calculator, MessageSquare, MousePointer2, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Compare Mice',
    desc: 'Side-by-side spec comparison of up to 4 mice with highlight differences toggle.',
    icon: GitCompare,
    href: '/compare',
    color: 'text-[#6c5ce7]',
  },
  {
    title: 'Shape Visualizer',
    desc: 'Overlay SVG outlines of any two mice in top, side, and back views.',
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

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16">
      {/* Hero */}
      <section className="mb-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6c5ce7]/10">
          <MousePointer2 className="h-8 w-8 text-[#6c5ce7]" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#e8e8ed] sm:text-5xl lg:text-6xl">
          Find Your{' '}
          <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] bg-clip-text text-transparent">
            Perfect Aim
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#9a9aab] sm:text-lg">
          The ultimate gaming mouse database. Compare specs, visualize shapes, and discover
          the perfect mouse for your hand size and grip style.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/compare"
            className="flex items-center gap-2 rounded-lg bg-[#6c5ce7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5a4bd6] animate-pulse-glow"
          >
            <GitCompare className="h-4 w-4" />
            Start Comparing
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/visualizer"
            className="flex items-center gap-2 rounded-lg border border-[#2a2a3a] px-6 py-3 text-sm font-semibold text-[#e8e8ed] transition-colors hover:bg-[#1a1a26]"
          >
            <Shapes className="h-4 w-4" />
            Visualize Shapes
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-20">
        <h2 className="mb-6 text-center text-lg font-semibold text-[#e8e8ed]">
          Everything you need to find your endgame mouse
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                href={f.href}
                className="group animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all hover:border-[#6c5ce7]/30 hover:bg-[#1a1a26]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Icon className={`mb-3 h-6 w-6 ${f.color} transition-transform group-hover:scale-110`} />
                <h3 className="text-sm font-semibold text-[#e8e8ed]">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#6a6a7a]">{f.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Mice */}
      <section className="mb-20">
        <h2 className="mb-6 text-lg font-semibold text-[#e8e8ed]">Featured Mice</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: 'logitech-gpx2', name: 'G Pro X Superlight 2', brand: 'Logitech', weight: 60, rating: 4.7 },
            { id: 'razer-viper-v3-pro', name: 'Viper V3 Pro', brand: 'Razer', weight: 54, rating: 4.8 },
            { id: 'pulsar-x2h', name: 'X2H', brand: 'Pulsar', weight: 52, rating: 4.5 },
            { id: 'lamzu-atlantis', name: 'Atlantis Mini', brand: 'Lamzu', weight: 49, rating: 4.6 },
          ].map((m, i) => (
            <Link
              key={m.id}
              href={`/compare`}
              className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all hover:border-[#6c5ce7]/30 hover:bg-[#1a1a26]"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a26] text-sm font-bold text-[#6c5ce7]">
                  {m.brand[0]}
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#e8e8ed]">{m.name}</div>
                  <div className="text-xs text-[#6a6a7a]">{m.brand}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6a6a7a]">
                <span className="font-mono text-[#c0c0cc]">{m.weight}g</span>
                <span className="text-yellow-400">{'★'.repeat(Math.floor(m.rating))}</span>
              </div>
            </Link>
          ))}
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