import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllModels } from '@/lib/models';
import { ModelGrid } from '@/components/ModelGrid';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CATEGORY_MAP: Record<string, { title: string; categoryKey: string; description: string }> = {
  vip: {
    title: 'VIP Exclusive Escorts & Models',
    categoryKey: 'vip',
    description: 'Our most elite, high-profile companion models available in Ibiza, Madrid, Marbella, and worldwide travel.',
  },
  girl_model: {
    title: 'High-Class Female Escort Models',
    categoryKey: 'girl_model',
    description: 'Stunning female escorts and companions for dinner dates, private events, yacht charters, and VIP companionship.',
  },
  'guy-model': {
    title: 'Elite Male Escort Models',
    categoryKey: 'guy-model',
    description: 'Handsome, athletic, and sophisticated male companions available for ladies, gentlemen, and couples in Ibiza and Europe.',
  },
  'trans-model': {
    title: 'Luxury Trans Escort Models',
    categoryKey: 'trans-model',
    description: 'Gorgeous, elegant transgender models offering open-minded and sensual VIP companionship.',
  },
  'independent-girl-model': {
    title: 'Independent Escort Models',
    categoryKey: 'independent-girl-model',
    description: 'Independent model portfolios with direct private contact and verified natural photos.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = CATEGORY_MAP[params.slug];
  if (!cat) return { title: 'Category - Best Model Ibiza' };

  return {
    title: `${cat.title} | Best Model Ibiza`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryInfo = CATEGORY_MAP[params.slug];
  if (!categoryInfo) {
    notFound();
  }

  const allModels = await getAllModels();

  return (
    <div className="space-y-8 pt-8">
      
      {/* Category Header with Curves */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
          <Link href="/" className="hover:text-copper-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-copper-300 font-semibold">{categoryInfo.title}</span>
        </nav>

        <div className="bg-gradient-to-r from-[#121017] to-[#08080c] p-8 sm:p-10 rounded-[36px] border border-[#251e18] shadow-[0_0_35px_rgba(200,125,85,0.15)]">
          <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Category
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            <span className="text-copper-gradient">{categoryInfo.title}</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Grid filtered to this category */}
      <ModelGrid
        initialModels={allModels}
        preselectedCategory={categoryInfo.categoryKey}
      />

    </div>
  );
}
