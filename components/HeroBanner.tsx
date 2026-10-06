'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, ArrowDown } from 'lucide-react';

interface HeroBannerProps {
  totalCount: number;
  vipCount: number;
}

export function HeroBanner({ totalCount = 236, vipCount = 146 }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e0f17] via-[#08080c] to-[#08080c] pt-12 pb-16 border-b border-[#1f212e]">
      
      {/* Subtle gold ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top VIP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive VIP Escorts &bull; Ibiza 2026 Season</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Discover The World&apos;s Most Stunning{' '}
          <span className="text-gold-gradient block sm:inline">
            VIP Escort Models
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
          Ibiza&apos;s most prestigious directory of elite companions, luxury yacht hostesses, international travel escorts, and private models.
        </p>

        {/* Live Metrics Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2 bg-[#12131c] px-4 py-2 rounded-xl border border-[#202230]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="text-white font-semibold">{totalCount}</strong> Verified Models
          </div>

          <div className="flex items-center gap-2 bg-[#12131c] px-4 py-2 rounded-xl border border-[#202230]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <strong className="text-gold-400 font-semibold">{vipCount}</strong> VIP Exclusive
          </div>

          <div className="flex items-center gap-2 bg-[#12131c] px-4 py-2 rounded-xl border border-[#202230]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Genuine Photos</span>
          </div>

          <div className="flex items-center gap-2 bg-[#12131c] px-4 py-2 rounded-xl border border-[#202230]">
            <HeartHandshake className="w-3.5 h-3.5 text-gold-400" />
            <span>Total Privacy Assured</span>
          </div>
        </div>

        {/* Quick Cities Pill Filter */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs text-neutral-400 mr-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gold-500" /> Select Destination:
          </span>
          {[
            { name: 'Ibiza', slug: 'ibizaspain' },
            { name: 'Madrid', slug: 'madridspain' },
            { name: 'Barcelona', slug: 'barcelonaspain' },
            { name: 'Marbella', slug: 'marbellaspain' },
            { name: 'Dubai', slug: 'dubai-unitedarabemirates' },
            { name: 'Amsterdam', slug: 'amsterdam-netherlands' },
            { name: 'Available for Travel', slug: 'travel-girl' },
          ].map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="text-xs px-3.5 py-1.5 rounded-full bg-[#14151f] hover:bg-gold-500/20 text-neutral-300 hover:text-gold-300 border border-[#252738] hover:border-gold-500/50 transition-all font-medium"
            >
              {city.name}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
