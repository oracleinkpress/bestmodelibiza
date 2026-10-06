'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Crown, ShieldCheck, MessageSquare, ChevronRight, MapPin, Heart } from 'lucide-react';

export function BottomLuxurySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#121018] via-[#09080e] to-[#121018] border border-[#2b221c] shadow-[0_0_50px_rgba(200,125,85,0.2)] p-6 sm:p-12 lg:p-16">
        
        {/* Ambient Copper Lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Text & Highlights (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper-500/15 border border-copper-500/40 text-copper-300 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(200,125,85,0.2)]">
              <Crown className="w-3.5 h-3.5 text-copper-400" />
              <span>Ibiza Private Villa Companionship</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Secluded Luxury Suites &amp;{' '}
              <span className="text-copper-gradient">Private Villa Stays</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              Experience the ultimate intimacy, charm, and beauty in the comfort of your private residence, secluded Finca, or 5-star hotel in Ibiza, Marbella, and Madrid.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-neutral-300 pt-2 text-left">
              <div className="p-3 rounded-2xl bg-[#14121b] border border-[#26201b] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Anonymity &amp; Discretion</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#14121b] border border-[#26201b] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-copper-400 shrink-0" />
                <span>Verified Natural Portfolios</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#14121b] border border-[#26201b] flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-copper-400 shrink-0" />
                <span>Direct Out-Call Villa Visits</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#14121b] border border-[#26201b] flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Dinner Dates &amp; Extended Stays</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20arrange%20a%20private%20villa%20booking%20via%20Best%20Model%20Ibiza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.4)] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reserve Private Villa Date</span>
              </a>

              <Link
                href="/services"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#14121b] hover:bg-[#1a1724] text-copper-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-copper-500/40 hover:border-copper-400 transition-all flex items-center justify-center gap-2"
              >
                <span>View All Services</span>
                <ChevronRight className="w-4 h-4 text-copper-400" />
              </Link>
            </div>

          </div>

          {/* Right Image Feature with Curves (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-copper-500/40 shadow-[0_0_40px_rgba(200,125,85,0.3)] group bg-[#16141e]">
              <img
                src="/stock/bottom-luxury.jpg"
                alt="Luxury Villa Companionship Ibiza"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Float Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-copper-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-copper-400" />
                  <span>Ibiza Private Suite Companion</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Available Tonight
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
