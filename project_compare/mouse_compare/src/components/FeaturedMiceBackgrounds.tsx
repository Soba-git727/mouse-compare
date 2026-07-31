'use client';

import { useMemo } from 'react';
import Image from 'next/image';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return hash;
}

export function FeaturedMiceBackgrounds() {
  const featuredMice = [
    { id: 'logitech-gpx2', name: 'G Pro X Superlight 2', weight: 60, rating: 4.7, image: '/assets/mice/logitech-gpx2-top.svg' },
    { id: 'razer-viper-v3-pro', name: 'Viper V3 Pro', weight: 54, rating: 4.8, image: '/assets/mice/razer-viper-v3-pro-top.svg' },
    { id: 'pulsar-x2h', name: 'X2H', weight: 52, rating: 4.5, image: '/assets/mice/pulsar-x2h-top.svg' },
    { id: 'lamzu-atlantis', name: 'Atlantis Mini', weight: 49, rating: 4.6, image: '/assets/mice/lamzu-atlantis-top.svg' },
    { id: 'finalmouse-starlight', name: 'Starlight-12 Medium', weight: 43, rating: 4.3, image: '/assets/mice/finalmouse-starlight-top.svg' },
    { id: 'g-wolves-hsk-pro', name: 'HSK Pro 4K', weight: 35, rating: 4.1, image: '/assets/mice/g-wolves-hsk-pro-top.svg' },
    { id: 'zowie-ec2-cw', name: 'EC2-CW', weight: 77, rating: 4.4, image: '/assets/mice/zowie-ec2-cw-top.svg' },
    { id: 'vaxee-xe-wireless', name: 'XE Wireless', weight: 68, rating: 4.5, image: '/assets/mice/vaxee-xe-wireless-top.svg' },
    { id: 'ninjutso-sora', name: 'Sora V2', weight: 47, rating: 4.4, image: '/assets/mice/ninjutso-sora-top.svg' },
    { id: 'endgame-xm2we', name: 'XM2we', weight: 63, rating: 4.6, image: '/assets/mice/endgame-xm2we-top.svg' },
    { id: 'cooler-master-mm712', name: 'MM712', weight: 58, rating: 4.0, image: '/assets/mice/cooler-master-mm712-top.svg' },
    { id: 'steelseries-aerox-3', name: 'Aerox 3 Wireless', weight: 66, rating: 4.2, image: '/assets/mice/steelseries-aerox-3-top.svg' },
  ];

  const generateBackgrounds = useMemo(() => featuredMice.map((mouse, index) => {
    const rand = seededRandom(hashId(mouse.id));
    const top = `${rand() * 100}%`;
    const left = `${rand() * 100}%`;
    const width = `${80 + rand() * 120}px`;
    const height = `${80 + rand() * 120}px`;
    const animationDelay = `${index * 0.5}s`;
    const animationDuration = `${20 + rand() * 20}s`;

    return { id: mouse.id, top, left, width, height, animationDelay, animationDuration };
  }), []);

  return (
    <section className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]"></div>
      
      <div className="relative h-full">
        {generateBackgrounds.map((bg, index) => (
          <div
            key={bg.id}
            className="absolute animate-float opacity-20"
            style={bg as React.CSSProperties}
          >
            <Image
              src={featuredMice.find(m => m.id === bg.id)?.image || ''}
              alt={featuredMice.find(m => m.id === bg.id)?.name || ''}
              width={200}
              height={200}
              className="object-contain filter grayscale hover:grayscale-0 hover:opacity-50 hover:scale-110 transition-all duration-700"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}