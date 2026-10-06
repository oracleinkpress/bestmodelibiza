'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, MessageSquare, Camera, CheckCircle } from 'lucide-react';
import { Model } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const imageUrl = resolveImageUrl(model.cover_image);
  const photoCount = model.gallery?.length || 1;
  const primaryCity = model.cities?.[0] || 'Ibiza, Spain';
  const whatsappUrl = `https://wa.me/${model.whatsapp || '34678012530'}?text=${encodeURIComponent(
    `Hello, I would like to inquire about ${model.name} in ${primaryCity} via Best Model Ibiza.`
  )}`;

  return (
    <div className="group relative bg-[#0a0a0f] rounded-[28px] overflow-hidden border border-[#221c17] hover:border-copper-500/70 transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,125,85,0.25)] flex flex-col p-2.5">
      
      {/* Curved Image Container (26px border radius) */}
      <Link href={`/model/${model.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#14141d] border border-[#26201b]">
        <img
          src={imageUrl}
          alt={model.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://bestmodelibiza.com/wp-content/uploads/2023/05/Best-Model-Ibiza-1.png';
          }}
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {model.is_vip ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-copper-500 to-copper-600 text-white text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_15px_rgba(200,125,85,0.5)]">
              <Sparkles className="w-3 h-3 fill-white" />
              VIP
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#362b24] text-neutral-300 text-[11px] font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          )}

          {/* Photos Count Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
            <Camera className="w-3 h-3 text-copper-400" />
            {photoCount}
          </span>
        </div>

        {/* Active Availability Status Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] text-neutral-200 border border-[#302620] pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available Now</span>
        </div>
      </Link>

      {/* Card Info Details */}
      <div className="p-3.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Location & Nationality */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="flex items-center gap-1 truncate text-copper-400 font-medium">
              <MapPin className="w-3 h-3 text-copper-500 shrink-0" />
              <span className="truncate">{primaryCity}</span>
            </span>
            {model.nationality && (
              <span className="uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#16120f] text-[10px] text-copper-300 border border-[#2d221b] font-semibold">
                {model.nationality}
              </span>
            )}
          </div>

          {/* Model Name */}
          <Link href={`/model/${model.slug}`}>
            <h3 className="text-base font-extrabold text-white group-hover:text-copper-400 transition-colors tracking-wide uppercase truncate">
              {model.name}
            </h3>
          </Link>

          {/* Physical Stats Pills with Curved Edges */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-neutral-400">
            {model.age && (
              <span className="bg-[#141217] px-2 py-0.5 rounded-lg text-neutral-300 border border-[#241e1b]">
                {model.age} yrs
              </span>
            )}
            {model.height && (
              <span className="bg-[#141217] px-2 py-0.5 rounded-lg text-neutral-300 border border-[#241e1b]">
                {model.height.split('/')[0].trim()}
              </span>
            )}
            {model.breast && (
              <span className="bg-[#141217] px-2 py-0.5 rounded-lg text-copper-300 border border-[#2d221b]">
                Cup {model.breast}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Row with Curved Corners */}
        <div className="mt-4 pt-3 border-t border-[#1e1916] flex items-center gap-2">
          <Link
            href={`/model/${model.slug}`}
            className="flex-grow text-center py-2.5 px-3 rounded-2xl bg-[#14131a] hover:bg-gradient-to-r hover:from-copper-500 hover:to-copper-600 hover:text-white text-neutral-200 text-xs font-bold border border-[#2a221c] hover:border-copper-500 transition-all shadow-sm"
          >
            View Portfolio
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
