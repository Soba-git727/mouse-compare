'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Star, Scale, Weight, Battery, Gauge, MousePointer2, Zap, Grid3X3, Cpu, Wifi, Palette, MessageSquare, ChevronRight } from 'lucide-react';
import { type Mouse } from '@/data/mice';

type ReviewItem = {
  id: number;
  userId: string;
  userName: string;
  mouseId: string;
  mouseName: string;
  text: string;
  rating: number;
  createdAt: string;
};

const views = [
  { key: 'top', label: 'Top' },
  { key: 'side', label: 'Side' },
  { key: 'back', label: 'Back' },
] as const;

export default function MouseDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [mouse, setMouse] = useState<Mouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [view, setView] = useState<'top' | 'side' | 'back'>('top');
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/mice/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.mouse) setMouse(d.mouse);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    setReviewsLoading(true);
    fetch(`/api/reviews?mouseId=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setReviews(d?.reviews || []))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false));
  }, [id]);

  const toggleExpand = (rid: number) => {
    setExpandedReviews(prev => {
      const next = new Set(prev);
      if (next.has(rid)) next.delete(rid);
      else next.add(rid);
      return next;
    });
  };

  const renderStars = (r: number) => {
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    return (
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < full ? 'fill-[#f59e0b] text-[#f59e0b]' : i === full && half ? 'fill-[#f59e0b]/50 text-[#f59e0b]' : 'text-[#2a2a3a]'}`}
          />
        ))}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="text-sm text-[#6a6a7a]">Loading mouse...</p>
      </div>
    );
  }

  if (notFound || !mouse) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-[#e8e8ed]">Mouse not found</h1>
        <p className="mt-2 text-sm text-[#9a9aab]">The mouse you are looking for does not exist.</p>
        <Link
          href="/mice"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5a4bd6]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to catalog
        </Link>
      </div>
    );
  }

  const specs: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Dimensions', value: mouse.dimensions, icon: Grid3X3 },
    { label: 'Weight', value: `${mouse.weight}g`, icon: Weight },
    { label: 'Sensor', value: mouse.sensor, icon: Cpu },
    { label: 'Connection', value: mouse.connection, icon: Wifi },
    { label: 'Battery', value: `${mouse.battery}h`, icon: Battery },
    { label: 'DPI', value: mouse.dpi.toLocaleString(), icon: Gauge },
    { label: 'IPS / Accel', value: `${mouse.ips} / ${mouse.acceleration}G`, icon: Zap },
    { label: 'Switches', value: mouse.switches, icon: MousePointer2 },
    { label: 'Buttons', value: String(mouse.buttons), icon: Grid3X3 },
    { label: 'Coating', value: mouse.coating, icon: Palette },
    { label: 'Hand Size', value: `${mouse.hand_size_min}-${mouse.hand_size_max} cm`, icon: Scale },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link
        href="/mice"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#9a9aab] transition-colors hover:text-[#e8e8ed]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: photo + shape */}
        <div className="space-y-4">
          <div className="flex h-64 items-center justify-center rounded-xl border border-[#2a2a3a] bg-[#12121a] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mouse.photo} alt={mouse.name} className="max-h-56 object-contain" />
          </div>
          <div className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#e8e8ed]">Shape Outline</h3>
              <span className="text-xs text-[#6a6a7a]">
                {mouse.ergonomic ? 'Ergonomic' : 'Symmetrical'}
              </span>
            </div>
            <div className="mb-3 flex gap-2">
              {views.map((v) => (
                <button
                  key={v.key}
                  onClick={() => setView(v.key)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    view === v.key
                      ? 'bg-[#6c5ce7] text-white'
                      : 'text-[#9a9aab] hover:text-[#e8e8ed]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <svg viewBox="0 0 200 200" className="mx-auto h-52 w-52">
              <rect width="200" height="200" fill="#0a0a0f" rx="8" />
              <path d={mouse.shape_svg?.[view] ?? ''} fill="#6c5ce7" fillOpacity={0.85} />
            </svg>
          </div>
        </div>

        {/* Right: info + specs */}
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-[#6c5ce7]">{mouse.brand}</span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">{mouse.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-[#e8e8ed]">${mouse.price.toFixed(2)}</span>
            <span className="inline-flex items-center gap-1">
              {renderStars(mouse.rating)}
              <span className="ml-1 text-sm text-[#6a6a7a]">
                {mouse.rating.toFixed(1)} · {mouse.review_count} reviews
              </span>
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {mouse.grip_styles.map((g) => (
              <span key={g} className="rounded-md bg-[#6c5ce7]/10 px-2.5 py-1 text-xs font-medium capitalize text-[#6c5ce7]">
                {g} grip
              </span>
            ))}
            {mouse.colors.map((c) => (
              <span key={c} className="rounded-md bg-[#1a1a26] px-2.5 py-1 text-xs text-[#9a9aab]">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {specs.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-3">
                  <div className="flex items-center gap-1.5 text-[#6a6a7a]">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#e8e8ed]">{s.value}</p>
                </div>
              );
            })}
          </div>

          {mouse.sensor_desc && (
            <div className="mt-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6a6a7a]">About the {mouse.sensor}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9a9aab]">{mouse.sensor_desc}</p>
            </div>
          )}

          <div className="mt-4">
            <Link
              href={`/compare?preselect=${mouse.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5a4bd6]"
            >
              Compare this mouse
            </Link>
          </div>
        </div>
      </div>

      {/* Community Reviews for this mouse */}
      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed]">
            <MessageSquare className="h-5 w-5 text-[#6c5ce7]" />
            Community Reviews ({reviews.length})
          </h2>
          <Link
            href={`/reviews`}
            className="rounded-lg border border-[#2a2a3a] px-3 py-1.5 text-xs font-medium text-[#9a9aab] transition-colors hover:bg-[#1a1a26] hover:text-[#e8e8ed]"
          >
            All reviews
          </Link>
        </div>

        {reviewsLoading ? (
          <p className="text-sm text-[#6a6a7a]">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="rounded-xl border border-[#2a2a3a] bg-[#12121a]/50 p-6 text-sm text-[#6a6a7a]">
            No community reviews for this mouse yet. Be the first to <Link href="/reviews" className="text-[#6c5ce7] hover:underline">write one</Link>.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${review.userName}`}
                      alt={review.userName}
                      className="h-9 w-9 rounded-full bg-[#1a1a26]"
                    />
                    <div>
                      <div className="text-sm font-medium text-[#e8e8ed]">{review.userName}</div>
                      <div className="text-xs text-[#6a6a7a]">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#e8e8ed]">{review.rating}</div>
                    <div className="text-[10px] text-[#6a6a7a]">/ 10</div>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed text-[#9a9aab] ${expandedReviews.has(review.id) ? '' : 'line-clamp-3'}`}>{review.text}</p>
                <button
                  onClick={() => toggleExpand(review.id)}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-[#6c5ce7] hover:text-[#7c6cf7] transition-colors"
                >
                  {expandedReviews.has(review.id) ? 'Show less' : 'Read more'} <ChevronRight className={`h-3 w-3 transition-transform ${expandedReviews.has(review.id) ? 'rotate-90' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
