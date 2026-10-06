import React from 'react';
import { getAllModels } from '@/lib/models';
import { HeroBanner } from '@/components/HeroBanner';
import { ModelGrid } from '@/components/ModelGrid';
import { VipBlogSection } from '@/components/VipBlogSection';
import { BottomLuxurySection } from '@/components/BottomLuxurySection';
import { NewsletterSection } from '@/components/NewsletterSection';
import Link from 'next/link';
import { Sparkles, Ship, Wine, Crown, Plane, ChevronRight } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const models = await getAllModels();
  const vipCount = models.filter((m) => m.is_vip).length;
  const topFeatured = models.filter((m) => m.is_vip && m.gallery?.length > 3).slice(0, 3);

  return (
    <div className="space-y-14">
      
      {/* 1. Fantastic Hero Banner with Copper Theme, Curves & Uploaded Hero Image */}
      <HeroBanner
        totalCount={models.length}
        vipCount={vipCount}
        featuredModels={topFeatured.length > 0 ? topFeatured : models.slice(0, 3)}
      />

      {/* 2. Main Interactive Model Search & Discovery Grid with Curved Cards */}
      <ModelGrid initialModels={models} />

      {/* 3. VIP Lifestyle Editorial & Travel Guides (Using Stock Images) */}
      <VipBlogSection />

      {/* 4. VIP Luxury Experiences & Services Section with Curves */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1e1915]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Unmatched Mediterranean Companionship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            VIP Services &amp; Exclusive Occasions
          </h2>
          <p className="mt-3 text-sm text-neutral-300">
            From Mediterranean yacht charters to confidential dinner dates and elite private villa gatherings, our models deliver poise, elegance, and beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-7 rounded-[30px] bg-[#09090e] border border-[#221c17] hover:border-copper-500/50 transition-all group shadow-lg hover:shadow-[0_0_25px_rgba(200,125,85,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-copper-500/10 border border-copper-500/30 flex items-center justify-center text-copper-400 mb-5 group-hover:scale-110 transition-transform p-3">
              <Ship className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Superyacht Hostesses</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Glamorous companions for luxury boat charters around Formentera, Es Vedrà, and Mediterranean cruising.
            </p>
          </div>

          <div className="p-7 rounded-[30px] bg-[#09090e] border border-[#221c17] hover:border-copper-500/50 transition-all group shadow-lg hover:shadow-[0_0_25px_rgba(200,125,85,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-copper-500/10 border border-copper-500/30 flex items-center justify-center text-copper-400 mb-5 group-hover:scale-110 transition-transform p-3">
              <Wine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fine Dining &amp; Galas</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cultured, articulate, and stunning partners for Michelin-starred dinners, VIP club tables, and private parties.
            </p>
          </div>

          <div className="p-7 rounded-[30px] bg-[#09090e] border border-[#221c17] hover:border-copper-500/50 transition-all group shadow-lg hover:shadow-[0_0_25px_rgba(200,125,85,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-copper-500/10 border border-copper-500/30 flex items-center justify-center text-copper-400 mb-5 group-hover:scale-110 transition-transform p-3">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Private Villa Stays</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Discreet out-call visits to secluded luxury villas across Ibiza, Marbella, and Madrid with complete privacy.
            </p>
          </div>

          <div className="p-7 rounded-[30px] bg-[#09090e] border border-[#221c17] hover:border-copper-500/50 transition-all group shadow-lg hover:shadow-[0_0_25px_rgba(200,125,85,0.2)]">
            <div className="w-12 h-12 rounded-2xl bg-copper-500/10 border border-copper-500/30 flex items-center justify-center text-copper-400 mb-5 group-hover:scale-110 transition-transform p-3">
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#121118] hover:bg-gradient-to-r hover:from-copper-500 hover:to-copper-600 hover:text-white text-copper-300 text-xs font-bold border border-copper-500/40 transition-all shadow-md"
          >
            <span>Explore All VIP Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Bottom Luxury Section (Featuring bottom-luxury.jpg & Villa Stays) */}
      <BottomLuxurySection />

      {/* 6. Model Recruitment Casting Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#14121a] via-[#0b0a10] to-[#14121a] border border-[#2b221c] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(200,125,85,0.15)]">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Model Casting 2026
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Join Our Premier International Agency
            </h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              Are you an independent model seeking high-caliber, respectful VIP clients with flexible scheduling and utmost confidentiality?
            </p>
          </div>

          <Link
            href="/join"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.4)] shrink-0"
          >
            Apply for Casting
          </Link>
        </div>
      </section>

      {/* 7. Newsletter Subscription Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <NewsletterSection />
      </div>

    </div>
  );
}
