'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, ArrowDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Model } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';

interface HeroBannerProps {
  totalCount: number;
  vipCount: number;
  featuredModels?: Model[];
}

export function HeroBanner({ totalCount = 236, vipCount = 146, featuredModels = [] }: HeroBannerProps) {
  // Select 3 top models for the hero showcase with curved portrait frames
  const topShowcase = featuredModels.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#09080c] via-[#050507] to-[#050507] pt-14 pb-20 border-b border-[#1f1a17]">
      
      {/* Radiant Copper Ambient Glow Flares */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-copper-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-[450px] h-[450px] bg-copper-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid: Left Content + Right Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA Area (7 columns) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Copper Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-copper-500/20 to-copper-600/10 border border-copper-500/40 text-copper-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(200,125,85,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
              <span>The Pinnacle of Ibiza Companionship &bull; 2026 VIP Season</span>
            </div>

            {/* Headline with Copper Gradient */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              The World&apos;s Most Stunning{' '}
              <span className="text-copper-gradient block mt-1">
                VIP Escort Models
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Ibiza&apos;s most prestigious directory of high-class escort models, superyacht hostesses, secluded villa companions, and international travel escorts.
            </p>

            {/* Live Metrics Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2.5 bg-[#0e0e14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-white text-sm leading-none">{totalCount}</span>
                  <span className="text-neutral-400 text-[11px]">Verified Models</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#0e0e14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <Sparkles className="w-4 h-4 text-copper-400" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-copper-300 text-sm leading-none">{vipCount}</span>
                  <span className="text-neutral-400 text-[11px]">VIP Exclusives</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#0e0e14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-white text-sm leading-none">100% Real</span>
                  <span className="text-neutral-400 text-[11px]">Natural Photos</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#models-section"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.45)] flex items-center justify-center gap-2"
              >
                <span>Browse Available Models</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#0e0e14] hover:bg-[#161622] text-copper-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-copper-500/40 hover:border-copper-400 transition-all flex items-center justify-center gap-2"
              >
                <span>Chat with VIP Concierge</span>
                <ChevronRight className="w-4 h-4 text-copper-400" />
              </a>
            </div>

            {/* Quick Cities Pill Filter */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-2xl">
              <span className="text-xs text-neutral-400 mr-1 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-copper-500" /> Destinations:
              </span>
              {[
                { name: 'Ibiza', slug: 'ibizaspain' },
                { name: 'Madrid', slug: 'madridspain' },
                { name: 'Barcelona', slug: 'barcelonaspain' },
                { name: 'Marbella', slug: 'marbellaspain' },
                { name: 'Dubai', slug: 'dubai-unitedarabemirates' },
                { name: 'Worldwide Travel', slug: 'travel-girl' },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/city/${city.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-[#101017] hover:bg-copper-500/20 text-neutral-300 hover:text-copper-200 border border-[#231e1a] hover:border-copper-500/50 transition-all font-medium"
                >
                  {city.name}
                </Link>
              ))}
            </div>

          </div>

          {/* Right Showcase: Curved Floating Model Portraits (5 columns) */}
          <div className="lg:col-span-5 relative">
            
            {/* Ambient Copper Ring Behind Showcase */}
            <div className="absolute inset-0 bg-gradient-to-tr from-copper-500/20 to-transparent rounded-[40px] blur-2xl transform rotate-3 scale-95 pointer-events-none" />

            <div className="relative bg-[#0b0b10] border border-copper-500/40 rounded-[36px] p-5 shadow-[0_0_40px_rgba(200,125,85,0.22)] space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#201c18]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Featured VIP Companions Tonight
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-copper-500/20 text-copper-300 text-[10px] font-bold border border-copper-500/40">
                  IBIZA LIVE
                </span>
              </div>

              {/* Showcase Cards with Generous Curves */}
              <div className="grid grid-cols-3 gap-3">
                {topShowcase.map((model, idx) => {
                  const imgUrl = resolveImageUrl(model.cover_image);
                  return (
                    <Link
                      key={model.id || idx}
                      href={`/model/${model.slug}`}
                      className="group relative flex flex-col items-center"
                    >
                      {/* Curved Model Frame */}
                      <div className="relative w-full aspect-[3/4] rounded-[26px] overflow-hidden bg-[#161622] border-2 border-[#26201b] group-hover:border-copper-400 transition-all duration-500 shadow-md group-hover:shadow-[0_0_20px_rgba(200,125,85,0.4)]">
                        <img
                          src={imgUrl}
                          alt={model.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Mini VIP Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="px-1.5 py-0.5 rounded-md bg-copper-500 text-black text-[9px] font-black uppercase shadow">
                            VIP
                          </span>
                        </div>

                        {/* Model Name */}
                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <span className="block text-[11px] font-bold text-white truncate group-hover:text-copper-300 transition-colors uppercase">
                            {model.name.split(' ')[0]}
                          </span>
                          <span className="block text-[9px] text-neutral-400 truncate">
                            {model.nationality || 'Model'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Showcase Footer Note */}
              <div className="pt-2 text-center">
                <Link
                  href="/category/vip"
                  className="text-xs font-semibold text-copper-400 hover:text-copper-300 transition-colors flex items-center justify-center gap-1 group"
                >
                  <span>Explore all 146 VIP Roster Portfolios</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
