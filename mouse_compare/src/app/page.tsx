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

import { FeaturedMiceBackgrounds } from '@/components/FeaturedMiceBackgrounds';
import { HeroSlider } from '@/components/HeroSlider';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-16 relative">
      <FeaturedMiceBackgrounds />
      <HeroSlider />

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