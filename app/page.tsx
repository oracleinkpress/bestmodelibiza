import React from 'react';
import { getAllModels } from '@/lib/models';
import { HeroBanner } from '@/components/HeroBanner';
import { ModelGrid } from '@/components/ModelGrid';
import Link from 'next/link';
import { Sparkles, Ship, Wine, Crown, Plane, ShieldCheck, ChevronRight } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const models = await getAllModels();
  const vipCount = models.filter((m) => m.is_vip).length;

  return (
    <div className="space-y-12">
      
      {/* Hero Banner */}
      <HeroBanner totalCount={models.length} vipCount={vipCount} />

      {/* Main Interactive Model Search & Discovery Grid */}
      <ModelGrid initialModels={models} />

      {/* VIP Luxury Experiences & Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1c26]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Unmatched Companionship
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            VIP Services &amp; Exclusive Occasions
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            From Mediterranean yacht charters to confidential dinner dates and elite private gatherings, our companions deliver impeccable elegance and charm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-[#0e0f17] border border-[#202230] hover:border-gold-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
              <Ship className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Superyacht Hostesses</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Glamorous companions for luxury boat charters around Formentera, Es Vedrà, and Mediterranean cruising.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f17] border border-[#202230] hover:border-gold-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fine Dining &amp; Galas</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cultured, articulate, and stunning partners for Michelin-starred dinners, VIP club tables, and private parties.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f17] border border-[#202230] hover:border-gold-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Private Villa Stays</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Discreet out-call visits to secluded luxury villas across Ibiza, Marbella, and Madrid with complete privacy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f17] border border-[#202230] hover:border-gold-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4 group-hover:scale-110 transition-transform">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">International Travel</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Jet-set travel companions ready to accompany discerning clients worldwide to Dubai, London, Monaco, and beyond.
            </p>
          </div>

        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141520] hover:bg-gold-500 hover:text-black text-gold-400 text-xs font-bold border border-gold-500/40 transition-all"
          >
            <span>Explore All VIP Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Model Recruitment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#141524] via-[#0d0e17] to-[#141524] border border-[#222538] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Model Casting 2026
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Join Our Premier International Agency
            </h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              Are you an independent model or escort seeking high-caliber, respectful VIP clients with flexible scheduling and utmost confidentiality?
            </p>
          </div>

          <Link
            href="/join"
            className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0"
          >
            Apply for Casting
          </Link>
        </div>
      </section>

    </div>
  );
}
