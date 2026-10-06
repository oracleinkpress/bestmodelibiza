import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getModelBySlug, getRelatedModels, getAllModels, getPrevAndNextModels } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';
import { BookingButton } from './BookingButton';
import { ModelProfileClient } from './ModelProfileClient';
import { NewsletterSection } from '@/components/NewsletterSection';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ModelPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const models = await getAllModels();
  return models.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const model = await getModelBySlug(params.slug);
  if (!model) return { title: 'Model Not Found - Best Model Ibiza' };

  const city = model.cities?.[0] || 'Ibiza, Spain';
  return {
    title: `${model.name} - ${city} VIP Escort & Model | Best Model Ibiza`,
    description: `Book ${model.name} in ${city}. Verified photos, measurements, age ${model.age || '24'}, ${model.nationality || 'international'} escort model available for in-call, out-call, and travel.`,
    openGraph: {
      title: `${model.name} - VIP Escort Model in ${city}`,
      description: `Exclusive portfolio of ${model.name}. Verified photos, natural beauty, and VIP companionship in ${city}.`,
      images: [
        {
          url: model.cover_image,
          width: 800,
          height: 1000,
          alt: model.name,
        },
      ],
    },
  };
}

export default async function ModelDetailPage({ params }: ModelPageProps) {
  const model = await getModelBySlug(params.slug);
  if (!model) {
    notFound();
  }

  const { prev, next } = await getPrevAndNextModels(model.slug);
  const related = await getRelatedModels(model.slug, 4);
  const primaryCity = model.cities?.[0] || 'Ibiza, Spain';

  return (
    <div className="bg-[#050507] min-h-screen text-white">
      
      {/* Top Bar: Breadcrumb + Prev/Next Model Switcher */}
      <div className="border-b border-[#1c1814] bg-[#08080c]/80 backdrop-blur-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-neutral-400">
            <Link href="/" className="hover:text-copper-400 transition-colors">
              Ibiza Escorts
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-copper-300 font-bold uppercase">{model.name}</span>
          </div>

          {/* Prev / Next Model Navigation */}
          <div className="flex items-center gap-5 font-bold tracking-wider uppercase text-[11px]">
            {prev && (
              <Link
                href={`/model/${prev.slug}`}
                className="flex items-center gap-1 text-neutral-400 hover:text-copper-400 transition-colors group"
              >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>PREV</span>
              </Link>
            )}
            <span className="text-neutral-700">|</span>
            {next && (
              <Link
                href={`/model/${next.slug}`}
                className="flex items-center gap-1 text-neutral-400 hover:text-copper-400 transition-colors group"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Interactive Model Profile: Left Sticky Sidebar + Right 2-Column Photo Stream */}
        <ModelProfileClient model={model} primaryCity={primaryCity} />

        {/* Bottom Section: "OTHER GIRLS IN [LOCATION]" */}
        {related.length > 0 && (
          <section className="pt-12 border-t border-[#1e1915]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-copper-400 uppercase tracking-widest block mb-1">
                  Discover More
                </span>
                <h2 className="text-2xl font-extrabold text-white tracking-wide uppercase">
                  OTHER GIRLS IN {primaryCity.toUpperCase()}
                </h2>
              </div>
              <Link
                href="/"
                className="text-xs font-bold text-copper-400 hover:text-copper-300 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span>View All Models</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((m) => {
                const img = resolveImageUrl(m.cover_image);
                return (
                  <Link
                    key={m.id}
                    href={`/model/${m.slug}`}
                    className="group relative bg-[#09090e] rounded-[28px] overflow-hidden border border-[#221c17] hover:border-copper-500/70 transition-all duration-500 flex flex-col p-2.5 shadow-lg hover:shadow-[0_0_25px_rgba(200,125,85,0.25)]"
                  >
                    <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#14141d] border border-[#26201b]">
                      <img
                        src={img}
                        alt={m.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-full bg-copper-500 text-black text-[9px] font-black uppercase shadow">
                          {m.is_vip ? 'VIP' : 'NEW PHOTOS'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[9px] font-bold border border-white/10">
                          VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="p-3 text-center">
                      <h3 className="text-sm font-extrabold text-white uppercase group-hover:text-copper-400 transition-colors truncate">
                        {m.name}
                      </h3>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {m.nationality || 'Exclusive Model'} &bull; {m.cities?.[0] || 'Ibiza'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Newsletter Subscription Bar (Matching Blue Monday Style) */}
        <NewsletterSection />

      </div>
    </div>
  );
}
