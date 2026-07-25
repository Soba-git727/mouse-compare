'use client';

import { useState } from 'react';
import { mice } from '@/data/mice';
import {
  Trophy,
  Star,
  ShieldCheck,
  ThumbsUp,
  PenLine,
  ChevronRight,
  MessageSquare,
  User,
} from 'lucide-react';

const tierList = [
  {
    tier: 'S',
    label: 'Best for FPS',
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/5',
    badge: 'bg-yellow-500/15 text-yellow-400',
    mice: ['logitech-gpx2', 'razer-viper-v3-pro', 'pulsar-x2h'],
  },
  {
    tier: 'A',
    label: 'Top Ultra-lightweight',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    badge: 'bg-emerald-500/15 text-emerald-400',
    mice: ['finalmouse-starlight', 'lamzu-atlantis', 'ninjutso-sora'],
  },
  {
    tier: 'B',
    label: 'Great All-Rounders',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    badge: 'bg-blue-500/15 text-blue-400',
    mice: ['vaxee-xe-wireless', 'endgame-xm2we', 'g-wolves-hsk-pro'],
  },
  {
    tier: 'C',
    label: 'Budget Picks',
    color: 'text-gray-400',
    border: 'border-gray-500/30',
    bg: 'bg-gray-500/5',
    badge: 'bg-gray-500/15 text-gray-400',
    mice: ['cooler-master-mm712', 'steelseries-aerox-3', 'zowie-ec2-cw'],
  },
];

const sampleReviews = [
  {
    id: 1,
    user: 'AimLabPro',
    avatar: 'AP',
    date: '2026-07-15',
    verified: true,
    mouse: 'Razer Viper V3 Pro',
    scores: { build: 9, coating: 8, clicks: 9, weight: 10, shape: 8 },
    overall: 8.8,
    text: 'Upgraded from a GPX and the Viper V3 Pro is noticeably lighter with better coating. The clicks are crisp and the sensor tracking is flawless. Battery life is excellent too.',
  },
  {
    id: 2,
    user: 'ClawGripKing',
    avatar: 'CK',
    date: '2026-07-12',
    verified: true,
    mouse: 'Pulsar X2H',
    scores: { build: 8, coating: 7, clicks: 8, weight: 10, shape: 9 },
    overall: 8.4,
    text: 'The X2H has an amazing hump for claw grip. The weight distribution is perfect and the stock skates are surprisingly good. Only gripe is the coating gets a bit slippery after long sessions.',
  },
  {
    id: 3,
    user: 'FingertipFred',
    avatar: 'FF',
    date: '2026-07-08',
    verified: false,
    mouse: 'Finalmouse Starlight-12',
    scores: { build: 7, coating: 9, clicks: 7, weight: 10, shape: 9 },
    overall: 8.4,
    text: 'The magnesium shell feels premium but the battery life is terrible. Shape is god-tier for fingertip grip though. Would not recommend for palm grip users at all.',
  },
  {
    id: 4,
    user: 'PalmGripGuru',
    avatar: 'PG',
    date: '2026-07-05',
    verified: true,
    mouse: 'Zowie EC2-CW',
    scores: { build: 9, coating: 8, clicks: 8, weight: 6, shape: 10 },
    overall: 8.2,
    text: 'Zowie finally made wireless and it was worth the wait. The EC2 shape is still king for palm grip. Weight is a bit high by modern standards but the shape makes up for it.',
  },
  {
    id: 5,
    user: 'TechEnthusiast',
    avatar: 'TE',
    date: '2026-06-28',
    verified: true,
    mouse: 'Logitech G Pro X Superlight 2',
    scores: { build: 9, coating: 8, clicks: 9, weight: 9, shape: 8 },
    overall: 8.6,
    text: 'The Superlight 2 refines an already amazing mouse. The HERO 2 sensor is flawless, Lightforce switches feel great, and the weight reduction is noticeable. Best all-rounder on the market.',
  },
  {
    id: 6,
    user: 'BudgetGamer99',
    avatar: 'BG',
    date: '2026-06-20',
    verified: false,
    mouse: 'Cooler Master MM712',
    scores: { build: 7, coating: 6, clicks: 7, weight: 8, shape: 7 },
    overall: 7.0,
    text: 'Great value wireless mouse under $70. The shape is safe and works for most grip styles. Build quality is decent but the coating could be better. Solid budget option overall.',
  },
];

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-xs text-[#6a6a7a]">{label}</span>
      <div className="flex-1 rounded-full bg-[#1a1a26] h-1.5">
        <div
          className="h-full rounded-full bg-[#6c5ce7] transition-all"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="w-5 text-right text-xs font-mono text-[#9a9aab]">{value}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e8e8ed] sm:text-4xl">Community Reviews</h1>
          <p className="mt-2 text-[#9a9aab]">Discover what the community thinks about their gear.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 rounded-lg bg-[#6c5ce7] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a4bd6]">
          <PenLine className="h-4 w-4" />
          Write a Review
        </button>
      </div>

      {/* Editor's Tier List */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed] mb-4">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Editor&apos;s Tier List
        </h2>
        <div className="grid gap-3">
          {tierList.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-xl border ${tier.border} ${tier.bg} p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-lg font-black ${tier.color}`}>{tier.tier}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tier.badge}`}>
                  {tier.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tier.mice.map((id) => {
                  const m = mice.find((x) => x.id === id);
                  if (!m) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#2a2a3a] bg-[#0a0a0f] px-3 py-1.5 text-xs font-medium text-[#e8e8ed]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1a1a26] text-[10px] font-bold text-[#6c5ce7]">
                        {m.brand[0]}
                      </span>
                      {m.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-[#e8e8ed] mb-4">
          <MessageSquare className="h-5 w-5 text-[#6c5ce7]" />
          Latest Reviews
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleReviews.map((review, idx) => (
            <div
              key={review.id}
              className="animate-fade-slide-up rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5 transition-all hover:border-[#6c5ce7]/30"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a26] text-xs font-bold text-[#6c5ce7]">
                    {review.avatar}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#e8e8ed]">
                      {review.user}
                      {review.verified && (
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-xs text-[#6a6a7a]">{review.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#e8e8ed]">{review.overall}</div>
                  <div className="text-[10px] text-[#6a6a7a]">/ 10</div>
                </div>
              </div>

              <div className="mb-2 text-xs font-medium text-[#6c5ce7]">{review.mouse}</div>

              <div className="space-y-1.5 mb-3">
                <ScoreBar label="Build Quality" value={review.scores.build} />
                <ScoreBar label="Coating" value={review.scores.coating} />
                <ScoreBar label="Click Feel" value={review.scores.clicks} />
                <ScoreBar label="Weight" value={review.scores.weight} />
                <ScoreBar label="Shape" value={review.scores.shape} />
              </div>

              <p className="text-xs leading-relaxed text-[#9a9aab] line-clamp-3">{review.text}</p>

              <button className="mt-2 flex items-center gap-1 text-xs font-medium text-[#6c5ce7] hover:text-[#7c6cf7] transition-colors">
                Read more <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Write Review FAB */}
      <button className="fixed bottom-6 right-6 sm:hidden flex items-center justify-center h-14 w-14 rounded-full bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/30">
        <PenLine className="h-6 w-6" />
      </button>
    </div>
  );
}