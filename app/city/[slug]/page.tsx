import React from 'react';
import type { Metadata } from 'next';
import { getAllModels } from '@/lib/models';
import { ModelGrid } from '@/components/ModelGrid';
import Link from 'next/link';
import { MapPin, ChevronRight, Sparkles } from 'lucide-react';

interface CityPageProps {
  params: {
    slug: string;
  };
}

const CITY_NAME_MAP: Record<string, string> = {
  ibizaspain: 'Ibiza, Spain',
  madridspain: 'Madrid, Spain',
  barcelonaspain: 'Barcelona, Spain',
  marbellaspain: 'Marbella, Spain',
  'dubai-unitedarabemirates': 'Dubai, United Arab Emirates',
  'amsterdam-netherlands': 'Amsterdam, Netherlands',
  'santo-domingo': 'Santo Domingo, Dominican Republic',
  'puntacana-dominicanrepublic': 'Punta Cana, Dominican Republic',
  'travel-girl': 'Available for traveling',
};

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityName = CITY_NAME_MAP[params.slug] || params.slug.replace('-', ' ').toUpperCase();

  return {
    title: `Best Escorts & VIP Models in ${cityName} | Best Model Ibiza`,
    description: `Discover top VIP models, luxury escorts, and private companions available in ${cityName}. 100% verified portfolios, high-class companions, and discreet bookings.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const allModels = await getAllModels();
  const cityName = CITY_NAME_MAP[params.slug] || params.slug.replace('-', ' ').toUpperCase();

  return (
    <div className="space-y-8 pt-8">
      
      {/* City Banner with Curves */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
          <Link href="/" className="hover:text-copper-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-copper-300 font-semibold">{cityName}</span>
        </nav>

        <div className="bg-gradient-to-r from-[#121017] to-[#08080c] p-8 sm:p-10 rounded-[36px] border border-[#251e18] shadow-[0_0_35px_rgba(200,125,85,0.15)]">
          <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            Destination Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            VIP Escorts &amp; Models in <span className="text-copper-gradient">{cityName}</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Browse our hand-selected roster of high-caliber models and companions currently available for in-call and out-call appointments in {cityName}.
          </p>
        </div>
      </div>

      {/* Grid filtered to this city */}
      <ModelGrid
        initialModels={allModels}
        preselectedCity={cityName}
      />

    </div>
  );
}
