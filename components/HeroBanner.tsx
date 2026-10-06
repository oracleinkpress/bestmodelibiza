'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, ArrowDown, ChevronRight, MessageSquare, Star, Crown } from 'lucide-react';
import { Model } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';

interface HeroBannerProps {
  totalCount: number;
  vipCount: number;
  featuredModels?: Model[];
}

export function HeroBanner({ totalCount = 236, vipCount = 146, featuredModels = [] }: HeroBannerProps) {
  const topShowcase = featuredModels.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0a080d] via-[#050507] to-[#050507] pt-12 pb-20 border-b border-[#201a16]">
      
      {/* Radiant Copper Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-copper-500/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-[450px] h-[450px] bg-copper-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Typography + Right Uploaded Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text & CTA Area (7 columns) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Copper Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-copper-500/20 to-copper-600/10 border border-copper-500/40 text-copper-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(200,125,85,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
              <span>The Pinnacle of Ibiza Companionship &bull; 2026 VIP Season</span>
            </div>

            {/* Headline with Copper Gradient */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              The World&apos;s Most Stunning{' '}
              <span className="text-copper-gradient block mt-1">
                VIP Escort Models
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Ibiza&apos;s premier luxury directory of elite companion models, superyacht hostesses, private villa escorts, and international travel companions.
            </p>

            {/* Live Metrics Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center gap-2.5 bg-[#0e0d14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-white text-sm leading-none">{totalCount}</span>
                  <span className="text-neutral-400 text-[11px]">Verified Models</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#0e0d14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <Sparkles className="w-4 h-4 text-copper-400" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-copper-300 text-sm leading-none">{vipCount}</span>
                  <span className="text-neutral-400 text-[11px]">VIP Exclusives</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#0e0d14] px-4 py-2.5 rounded-2xl border border-copper-500/25 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div className="text-left text-xs">
                  <span className="block font-bold text-white text-sm leading-none">100% Real</span>
                  <span className="text-neutral-400 text-[11px]">Natural Photos</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#models-section"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.45)] flex items-center justify-center gap-2"
              >
                <span>Browse All Portfolios</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0e0d14] hover:bg-[#161420] text-copper-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-copper-500/40 hover:border-copper-400 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with VIP Concierge</span>
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
                  className="text-xs px-3.5 py-1.5 rounded-full bg-[#111017] hover:bg-copper-500/20 text-neutral-300 hover:text-copper-200 border border-[#26201b] hover:border-copper-500/50 transition-all font-medium"
                >
                  {city.name}
                </Link>
              ))}
            </div>

          </div>

          {/* Right Showcase: Featuring the Uploaded Hero Luxury Image (5 columns) */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* Main Featured Hero Image with Curved Frame (36px radius) */}
            <div className="relative aspect-[16/11] rounded-[36px] overflow-hidden border-2 border-copper-500/50 shadow-[0_0_40px_rgba(200,125,85,0.35)] group bg-[#111017]">
              <img
                src="/stock/hero-luxury.jpg"
                alt="Luxury Escort Model Ibiza"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

              {/* Float VIP Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-copper-500 to-copper-600 text-white text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 fill-white" />
                  <span>VIP Featured</span>
                </span>
              </div>

              {/* Float Live Status */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div>
                  <h3 className="text-white font-extrabold text-sm uppercase tracking-wide">
                    Ibiza VIP Escorts
                  </h3>
                  <span className="text-[11px] text-copper-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-copper-400" />
                    Marina Botafoch &bull; Superyacht &amp; Villa Hostess
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Available Today
                </span>
              </div>
            </div>

            {/* Mini Curved Portraits Strip Below */}
            {topShowcase.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {topShowcase.map((model, idx) => {
                  const imgUrl = resolveImageUrl(model.cover_image);
                  return (
                    <Link
                      key={model.id || idx}
                      href={`/model/${model.slug}`}
                      className="group relative flex flex-col items-center"
                    >
                      <div className="relative w-full aspect-[3/4] rounded-[22px] overflow-hidden bg-[#16141e] border-2 border-[#241e19] group-hover:border-copper-400 transition-all duration-500 shadow-md">
                        <img
                          src={imgUrl}
                          alt={model.name}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-1.5 left-2 right-2 text-left">
                          <span className="block text-[10px] font-bold text-white truncate uppercase group-hover:text-copper-300">
                            {model.name.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
