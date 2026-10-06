import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getModelBySlug, getRelatedModels, getAllModels } from '@/lib/models';
import { LightboxGallery } from '@/components/LightboxGallery';
import { ModelCard } from '@/components/ModelCard';
import { BookingButton } from './BookingButton';
import {
  Sparkles,
  MapPin,
  Calendar,
  Ruler,
  Eye,
  Heart,
  Plane,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Phone,
  CheckCircle,
  Crown,
  Compass,
} from 'lucide-react';

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

  const related = await getRelatedModels(model.slug, 4);
  const primaryCity = model.cities?.[0] || 'Ibiza, Spain';
  const whatsappUrl = `https://wa.me/${model.whatsapp || '34678012530'}?text=${encodeURIComponent(
    `Hello, I would like to inquire about ${model.name} in ${primaryCity} via Best Model Ibiza.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-copper-400 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <Link href="/" className="hover:text-copper-400 transition-colors">Models</Link>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <span className="text-copper-300 font-semibold uppercase">{model.name}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Full Photo Gallery with Curves (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <LightboxGallery images={model.gallery} modelName={model.name} />
        </div>

        {/* Right Column: Model Specs & Booking Card with Curves (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#09090e] p-6 sm:p-8 rounded-[36px] border border-[#241e19] shadow-[0_0_35px_rgba(200,125,85,0.15)] space-y-6">
            
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {model.is_vip ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-copper-500 to-copper-600 text-white text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(200,125,85,0.45)]">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    VIP Exclusive
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121118] border border-[#2a221b] text-neutral-300 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Roster
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13121b] text-[11px] text-emerald-400 border border-[#221c17]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available Tonight
                </span>
              </div>

              {model.nationality && (
                <span className="text-xs uppercase font-bold text-copper-300 px-3 py-1 rounded-full bg-[#16120e] border border-[#2d221a]">
                  {model.nationality}
                </span>
              )}
            </div>

            {/* Model Name & Location */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
                <span className="text-copper-gradient">{model.name}</span>
              </h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-copper-400">
                <MapPin className="w-4 h-4 shrink-0 text-copper-500" />
                <span className="font-semibold">{primaryCity}</span>
                {model.cities?.length > 1 && (
                  <span className="text-xs text-neutral-400">
                    (+{model.cities.length - 1} more locations)
                  </span>
                )}
              </div>
            </div>

            {/* Bio Description with Curves */}
            {model.bio && (
              <div className="bg-[#121118] p-5 rounded-[24px] border border-[#261f1a]">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  &ldquo;{model.bio}&rdquo;
                </p>
              </div>
            )}

            {/* Physical Attributes Matrix with Curved Pills */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-copper-400" />
                  Model Specifications &amp; Stats
                </h3>
                <span className="text-[10px] text-copper-400 font-semibold">100% Genuine</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {model.age && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Age:</span>
                    <strong className="text-white font-bold">{model.age} years</strong>
                  </div>
                )}
                {model.height && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Height:</span>
                    <strong className="text-white font-bold">{model.height}</strong>
                  </div>
                )}
                {model.weight && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Weight:</span>
                    <strong className="text-white font-bold">{model.weight}</strong>
                  </div>
                )}
                {model.breast && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Breast:</span>
                    <strong className="text-copper-300 font-bold">
                      {model.breast} {model.breast_type ? `(${model.breast_type})` : ''}
                    </strong>
                  </div>
                )}
                {model.hair && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Hair:</span>
                    <strong className="text-white font-bold">{model.hair}</strong>
                  </div>
                )}
                {model.eye && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] flex justify-between items-center">
                    <span className="text-neutral-400">Eyes:</span>
                    <strong className="text-white font-bold">{model.eye}</strong>
                  </div>
                )}
                {model.available_for && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] col-span-2 flex justify-between items-center">
                    <span className="text-neutral-400">Available For:</span>
                    <strong className="text-emerald-400 font-bold">{model.available_for}</strong>
                  </div>
                )}
                {model.travel && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] col-span-2 flex justify-between items-center">
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-copper-400" />
                      Travel Availability:
                    </span>
                    <strong className="text-copper-300 font-bold">{model.travel}</strong>
                  </div>
                )}
                {model.orientation && (
                  <div className="bg-[#121118] p-3 rounded-2xl border border-[#221c17] col-span-2 flex justify-between items-center">
                    <span className="text-neutral-400">Orientation:</span>
                    <strong className="text-white font-bold">{model.orientation}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Booking & VIP Contact Action Center */}
            <div className="pt-4 border-t border-[#1f1a16] space-y-3">
              <BookingButton model={model} />

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Chat on VIP WhatsApp</span>
              </a>

              <div className="p-3.5 rounded-2xl bg-[#121118] border border-[#201b17] flex items-center justify-center gap-2 text-[11px] text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Verified Photos &bull; Direct Agency Service &bull; Total Privacy</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Similar / Recommended Models */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-[#1e1916]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">
              Similar Verified Models
            </h2>
            <Link href="/" className="text-xs text-copper-400 hover:underline">
              View All Portfolios &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
