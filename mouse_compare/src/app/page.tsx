import Link from 'next/link';
import { GitCompare, Shapes, Calculator, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

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

import { FeaturedMiceBackgrounds } from '@/components/FeaturedMiceBackgrounds';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 relative">
      <FeaturedMiceBackgrounds />
      {/* Hero Banner */}
      <section className="relative mb-20 overflow-hidden rounded-2xl border border-[#2a2a3a]">
        {/* Background: NiKo image */}
        <div className="absolute inset-0 bg-[url('/assets/hero-niko.jpg')] bg-cover bg-center" />
        {/* Subtle darkening at edges only, image stays vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_40%,rgba(5,5,8,0.3)_100%)]" />

        <div className="relative flex flex-col items-center gap-6 px-6 py-16 lg:flex-row lg:px-16 lg:py-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#050508]/60 px-3 py-1 text-xs font-medium text-[#6c5ce7] backdrop-blur-sm border border-[#2a2a3a]">
              <Sparkles className="h-3 w-3" />
              New Release — Razer DeathAdder V4 Pro NiKo Edition
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-6xl">
              Find Your{' '}
              <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] bg-clip-text text-transparent">
                Perfect Aim
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#c0c0cc] drop-shadow lg:mx-0 lg:text-base">
              The ultimate gaming mouse database. Compare specs, visualize shapes, and discover
              the perfect mouse for your hand size and grip style.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/compare"
                className="flex items-center gap-2 rounded-lg bg-[#6c5ce7] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5a4bd6] animate-pulse-glow shadow-lg"
              >
                <GitCompare className="h-4 w-4" />
                Start Comparing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/visualizer"
                className="flex items-center gap-2 rounded-lg border border-[#ffffff30] bg-[#050508]/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#050508]/70 backdrop-blur-sm"
              >
                <Shapes className="h-4 w-4" />
                Shape Overlay
              </Link>
            </div>
          </div>
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
            { id: 'logitech-gpx2', name: 'G Pro X Superlight 2', brand: 'Logitech', weight: 60, rating: 4.7, image: '/assets/mice/photos/logitech-gpx2.jpg' },
            { id: 'razer-viper-v3-pro', name: 'Viper V3 Pro', brand: 'Razer', weight: 54, rating: 4.8, image: '/assets/mice/photos/razer-viper-v3-pro.jpg' },
            { id: 'pulsar-x2h', name: 'X2H', brand: 'Pulsar', weight: 52, rating: 4.5, image: '/assets/mice/photos/pulsar-x2h.jpg' },
            { id: 'lamzu-atlantis', name: 'Atlantis Mini', brand: 'Lamzu', weight: 49, rating: 4.6, image: '/assets/mice/photos/lamzu-atlantis.jpg' },
            { id: 'finalmouse-starlight', name: 'Starlight-12 Medium', brand: 'Finalmouse', weight: 43, rating: 4.3, image: '/assets/mice/photos/finalmouse-starlight.jpg' },
            { id: 'g-wolves-hsk-pro', name: 'HSK Pro 4K', brand: 'G-Wolves', weight: 35, rating: 4.1, image: '/assets/mice/photos/g-wolves-hsk-pro.jpg' },
            { id: 'zowie-ec2-cw', name: 'EC2-CW', brand: 'Zowie', weight: 77, rating: 4.4, image: '/assets/mice/photos/zowie-ec2-cw.png' },
            { id: 'vaxee-xe-wireless', name: 'XE Wireless', brand: 'Vaxee', weight: 68, rating: 4.5, image: '/assets/mice/photos/vaxee-xe-wireless.jpg' },
            { id: 'ninjutso-sora', name: 'Sora V2', brand: 'Ninjutso', weight: 47, rating: 4.4, image: '/assets/mice/photos/ninjutso-sora.jpg' },
            { id: 'endgame-xm2we', name: 'XM2we', brand: 'Endgame Gear', weight: 63, rating: 4.6, image: '/assets/mice/photos/endgame-xm2we.jpg' },
            { id: 'cooler-master-mm712', name: 'MM712', brand: 'Cooler Master', weight: 58, rating: 4.0, image: '/assets/mice/photos/cooler-master-mm712.png' },
            { id: 'steelseries-aerox-3', name: 'Aerox 3 Wireless', brand: 'SteelSeries', weight: 66, rating: 4.2, image: '/assets/mice/photos/steelseries-aerox-3.png' },
          ].map((m, i) => (
            <Link
              key={m.id}
              href={`/compare?preselect=${m.id}`}
              className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all hover:border-[#6c5ce7]/30 hover:bg-[#1a1a26]"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative h-10 w-10 shrink-0">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
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