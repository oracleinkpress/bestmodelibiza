'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="group relative bg-[#0e0f16] rounded-2xl overflow-hidden border border-[#1e202d] hover:border-gold-500/60 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col">
      
      {/* Image Container with 4:5 Aspect Ratio */}
      <Link href={`/model/${model.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-[#161822]">
        <img
          src={imageUrl}
          alt={model.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // graceful fallback to placeholder if an image errors
            (e.target as HTMLImageElement).src = 'https://bestmodelibiza.com/wp-content/uploads/2023/05/Best-Model-Ibiza-1.png';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {model.is_vip ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500/90 text-black text-[11px] font-bold tracking-wider uppercase shadow-lg">
              <Sparkles className="w-3 h-3 fill-black" />
              VIP
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[11px] font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Verified
            </span>
          )}

          {/* Photos Count Badge */}
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
            <Camera className="w-3 h-3 text-neutral-300" />
            {photoCount}
          </span>
        </div>

        {/* Active Now Status Indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-neutral-300 border border-white/10 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available Now</span>
        </div>
      </Link>

      {/* Card Info Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#0e0f16]">
        <div>
          {/* Location & Nationality */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1 truncate text-gold-400/90 font-medium">
              <MapPin className="w-3 h-3 text-gold-500 shrink-0" />
              <span className="truncate">{primaryCity}</span>
            </span>
            {model.nationality && (
              <span className="uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#171924] text-[10px] text-neutral-300 border border-[#232636]">
                {model.nationality}
              </span>
            )}
          </div>

          {/* Model Name */}
          <Link href={`/model/${model.slug}`}>
            <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors tracking-wide uppercase truncate">
              {model.name}
            </h3>
          </Link>

          {/* Physical Stats Pills */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] text-neutral-400">
            {model.age && (
              <span className="bg-[#151722] px-2 py-0.5 rounded text-neutral-300 border border-[#232636]">
                {model.age} yrs
              </span>
            )}
            {model.height && (
              <span className="bg-[#151722] px-2 py-0.5 rounded text-neutral-300 border border-[#232636]">
                {model.height.split('/')[0].trim()}
              </span>
            )}
            {model.breast && (
              <span className="bg-[#151722] px-2 py-0.5 rounded text-neutral-300 border border-[#232636]">
                Cup {model.breast}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 pt-3 border-t border-[#1a1c27] flex items-center gap-2">
          <Link
            href={`/model/${model.slug}`}
            className="flex-grow text-center py-2 px-3 rounded-xl bg-[#171925] hover:bg-gold-500 hover:text-black text-neutral-200 text-xs font-semibold border border-[#282b3d] hover:border-gold-500 transition-all"
          >
            View Book
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all flex items-center justify-center shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
