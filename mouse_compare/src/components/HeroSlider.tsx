'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { GitCompare, Shapes, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/assets/hero-niko.jpg',
    badge: 'New Release — Razer DeathAdder V4 Pro NiKo Edition',
    title: 'Find Your',
    subtitle: 'Perfect Aim',
    description:
      'The ultimate gaming mouse database. Compare specs, visualize shapes, and discover the perfect mouse for your hand size and grip style.',
  },
  {
    image: '/assets/hero-logitech.jpg',
    badge: 'Lightweight Champion — Logitech G Pro X Superlight 2',
    title: 'Barely There,',
    subtitle: 'Unstoppable',
    description:
      'At just 60 grams with the HERO 2 sensor, the Superlight 2 delivers pro-level precision in an impossibly light package.',
  },
  {
    image: '/assets/hero-razer.jpg',
    badge: 'Next-Gen Speed — Razer Viper V4 Pro',
    title: 'Speed That',
    subtitle: 'Outruns Everything',
    description:
      'The Viper V4 Pro combines a sub-55g design with the Focus Pro 35K sensor for pixel-perfect tracking at 35,000 DPI.',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const transitioning = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const goTo = useCallback((index: number) => {
    if (transitioning.current || index === current) return;
    transitioning.current = true;
    setCurrent(index);
    setTimeout(() => { transitioning.current = false; }, 700);
  }, [current]);

  const goNext = useCallback(() => {
    if (transitioning.current) return;
    const next = (current + 1) % slides.length;
    transitioning.current = true;
    setCurrent(next);
    setTimeout(() => { transitioning.current = false; }, 700);
  }, [current]);

  const goPrev = useCallback(() => {
    if (transitioning.current) return;
    const prev = (current - 1 + slides.length) % slides.length;
    transitioning.current = true;
    setCurrent(prev);
    setTimeout(() => { transitioning.current = false; }, 700);
  }, [current]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 5000);
    return () => clearInterval(timerRef.current);
  }, [goNext]);

  return (
    <section className="relative mb-20 overflow-hidden rounded-2xl border border-[#2a2a3a]">
      <div className="relative">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative min-w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-[#050508]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,transparent_30%,rgba(5,5,8,0.4)_100%)]" />

              <div className="relative flex flex-col items-center gap-6 px-6 py-16 lg:flex-row lg:px-16 lg:py-24">
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#050508]/60 px-3 py-1 text-xs font-medium text-[#6c5ce7] backdrop-blur-sm border border-[#2a2a3a]">
                    <Sparkles className="h-3 w-3" />
                    {slide.badge}
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-6xl">
                    {slide.title}{' '}
                    <span className="bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] bg-clip-text text-transparent">
                      {slide.subtitle}
                    </span>
                  </h1>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] lg:mx-0 lg:text-base">
                    {slide.description}
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
            </div>
          ))}
        </div>

        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-[#6c5ce7]' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
