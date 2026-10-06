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
        <Link href="/" className="hover:text-gold-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/" className="hover:text-gold-400">Models</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium uppercase">{model.name}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Full Photo Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <LightboxGallery images={model.gallery} modelName={model.name} />
        </div>

        {/* Right Column: Model Specs & Booking Card (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0e0f17] p-6 sm:p-8 rounded-3xl border border-[#202232] shadow-2xl space-y-6">
            
            {/* Top Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {model.is_vip ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <Sparkles className="w-3.5 h-3.5 fill-black" />
                    VIP Exclusive
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 border border-neutral-700 text-neutral-300 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Model
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#151722] text-[11px] text-emerald-400 border border-[#232636]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available Today
                </span>
              </div>

              {model.nationality && (
                <span className="text-xs uppercase font-semibold text-neutral-300 px-2.5 py-1 rounded-lg bg-[#181a26] border border-[#252838]">
                  {model.nationality}
                </span>
              )}
            </div>

            {/* Model Name & Location */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide">
                {model.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-gold-400">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="font-medium">{primaryCity}</span>
                {model.cities?.length > 1 && (
                  <span className="text-xs text-neutral-400">
                    (+{model.cities.length - 1} more locations)
                  </span>
                )}
              </div>
            </div>

            {/* Bio Description if available */}
            {model.bio && (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic bg-[#13141f] p-4 rounded-xl border border-[#222434]">
                &ldquo;{model.bio}&rdquo;
              </p>
            )}

            {/* Physical Attributes & Statistics Table */}
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Model Profile &amp; Specifications
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {model.age && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Age:</span>
                    <strong className="text-white font-semibold">{model.age} years</strong>
                  </div>
                )}
                {model.height && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Height:</span>
                    <strong className="text-white font-semibold">{model.height}</strong>
                  </div>
                )}
                {model.weight && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Weight:</span>
                    <strong className="text-white font-semibold">{model.weight}</strong>
                  </div>
                )}
                {model.breast && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Breast / Cup:</span>
                    <strong className="text-white font-semibold">
                      {model.breast} {model.breast_type ? `(${model.breast_type})` : ''}
                    </strong>
                  </div>
                )}
                {model.hair && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Hair:</span>
                    <strong className="text-white font-semibold">{model.hair}</strong>
                  </div>
                )}
                {model.eye && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] flex justify-between">
                    <span className="text-neutral-400">Eyes:</span>
                    <strong className="text-white font-semibold">{model.eye}</strong>
                  </div>
                )}
                {model.available_for && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] col-span-2 flex justify-between">
                    <span className="text-neutral-400">Available For:</span>
                    <strong className="text-emerald-400 font-semibold">{model.available_for}</strong>
                  </div>
                )}
                {model.travel && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] col-span-2 flex justify-between">
                    <span className="text-neutral-400">Travel Availability:</span>
                    <strong className="text-gold-400 font-semibold">{model.travel}</strong>
                  </div>
                )}
                {model.meeting_with && (
                  <div className="bg-[#141520] p-2.5 rounded-xl border border-[#222534] col-span-2 flex justify-between">
                    <span className="text-neutral-400">Meeting With:</span>
                    <strong className="text-white font-semibold">{model.meeting_with}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Booking & VIP Contact Action Center */}
            <div className="pt-4 border-t border-[#1f2130] space-y-3">
              <BookingButton model={model} />

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Chat on WhatsApp</span>
              </a>

              <p className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Confidential &bull; Verified Identity &bull; Direct Agency Service</span>
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Similar / Recommended Models */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-[#1a1c26]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">
              Similar Verified Models
            </h2>
            <Link href="/" className="text-xs text-gold-400 hover:underline">
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
