'use client';

import React, { useState, useEffect } from 'react';
import { Model } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';
import { BookingModal } from '@/components/BookingModal';
import {
  Sparkles,
  MapPin,
  Calendar,
  MessageSquare,
  Star,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Send,
  Heart,
  Globe,
} from 'lucide-react';

interface ModelProfileClientProps {
  model: Model;
  primaryCity: string;
}

export function ModelProfileClient({ model, primaryCity }: ModelProfileClientProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);

  // User review state
  const [userReviewName, setUserReviewName] = useState('');
  const [userReviewRating, setUserReviewRating] = useState(5);
  const [userReviewComment, setUserReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Collect all gallery images + fallback
  const rawGallery = model.gallery && model.gallery.length > 0 ? model.gallery : [{ url: model.cover_image }];
  // If fewer than 4 images, supplement with cover image variations
  const displayGallery = rawGallery.map((img, idx) => ({
    url: resolveImageUrl(img.url),
    title: img.title || `${model.name} photo ${idx + 1}`,
  }));

  // Avatar URL
  const avatarUrl = resolveImageUrl(model.cover_image);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % displayGallery.length : 0));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? (prev - 1 + displayGallery.length) % displayGallery.length : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, displayGallery.length]);

  // Tags list
  const tags = [
    model.is_vip ? 'VIP EXCLUSIVE' : 'NEW FACE',
    'DINNER DATE',
    'YACHT HOSTESS',
    'TRAVEL COMPANION',
    'PRIVATE VILLA',
    model.hair ? `${model.hair.toUpperCase()} HAIR` : 'ELEGANT',
    model.nationality ? model.nationality.toUpperCase() : 'INTERNATIONAL',
  ].filter(Boolean);

  // Sample Reviews
  const reviews = [
    {
      id: 1,
      author: 'Marcus V.',
      location: 'London & Ibiza',
      date: 'September 2025',
      rating: 5,
      comment: `An absolute dream to spend time with ${model.name}. Incredibly refined, articulate, and even more breathtaking in person than her photos. Utmost discretion and elegance throughout our evening at Marina Botafoch.`,
    },
    {
      id: 2,
      author: 'Alexander K.',
      location: 'Zurich',
      date: 'August 2025',
      rating: 5,
      comment: `We chartered a catamaran to Formentera and ${model.name} made the entire afternoon unforgettable. Warm, witty, and perfectly poised. Highly recommended for any discerning gentleman visiting Ibiza.`,
    },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSubmitted(false);
      setUserReviewName('');
      setUserReviewComment('');
    }, 2500);
  };

  const whatsappDirectUrl = `https://wa.me/${model.whatsapp || '34678012530'}?text=${encodeURIComponent(
    `Hello, I would like to inquire about confidential VIP booking with ${model.name} in ${primaryCity}.`
  )}`;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ========================================================
            LEFT COLUMN: Sticky Sidebar (~40% on Desktop / 5 cols)
            ======================================================== */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          
          {/* Header Card: Circular Avatar + Name + Tagline + Location */}
          <div className="bg-[#09080e] rounded-[30px] border border-[#231b15] p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-5">
              
              {/* Circular Avatar with Copper Glow */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-copper-500 shadow-[0_0_20px_rgba(200,125,85,0.45)] bg-[#14121b]">
                  <img
                    src={avatarUrl}
                    alt={model.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Active Online Indicator */}
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#09080e] shadow" title="Available" />
              </div>

              {/* Name & Tagline */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
                  {model.name}
                </h1>
                <p className="text-xs sm:text-sm text-copper-300 font-medium">
                  {model.hair ? `${model.hair} hair` : 'Sensual & Playful'} &bull; {model.nationality || 'International Model'}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-copper-400" />
                  <span className="text-neutral-300">{primaryCity}</span>
                </div>
              </div>

            </div>

            {/* Tag Chips Grid (Matching Blue Monday Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 pt-5 border-t border-[#1e1914]">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-[#121018] border border-[#271f19] text-[10px] font-bold text-center text-neutral-300 uppercase tracking-wider hover:border-copper-500/50 hover:text-copper-200 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 mt-6">
              {/* Primary Book CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(200,125,85,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>BOOK {model.name} NOW</span>
              </button>

              {/* WhatsApp Direct Chat */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-[#0f1d16] hover:bg-[#14261d] text-emerald-300 hover:text-emerald-200 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp VIP Concierge</span>
              </a>
            </div>

          </div>

          {/* ========================================================
              PERSONAL DETAILS TABLE (Matching Blue Monday Tara)
              ======================================================== */}
          <div className="bg-[#09080e] rounded-[30px] border border-[#231b15] p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#1f1914] pb-3 flex items-center justify-between">
              <span>{model.name}&apos;S PERSONAL DETAILS</span>
              <Sparkles className="w-3.5 h-3.5 text-copper-400" />
            </h2>

            <div className="divide-y divide-[#18141e] text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Age</span>
                <span className="text-neutral-200 font-medium">{model.age ? `${model.age} years` : 'Early 20s'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Nationality</span>
                <span className="text-neutral-200 font-medium">{model.nationality || 'Spanish / International'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Height</span>
                <span className="text-neutral-200 font-medium">{model.height || "5' 8\" / 173cm"}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Bust size</span>
                <span className="text-neutral-200 font-medium">
                  {model.breast ? `${model.breast} (${model.breast_type || 'Natural'})` : '34C (natural)'}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Dress size</span>
                <span className="text-neutral-200 font-medium">UK 8 / EU 36</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Weight</span>
                <span className="text-neutral-200 font-medium">{model.weight || '54 kg / 119 lbs'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Hair &amp; Eyes</span>
                <span className="text-neutral-200 font-medium">
                  {model.hair || 'Blonde'} &bull; {model.eye || 'Hazel'}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Smoking</span>
                <span className="text-neutral-200 font-medium">{model.smoking || 'No'}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Tattoos</span>
                <span className="text-neutral-200 font-medium">None / Discreet</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Location</span>
                <span className="text-copper-400 font-bold underline cursor-pointer">{primaryCity}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Education</span>
                <span className="text-neutral-200 font-medium">Higher Education &bull; Arts &amp; Fashion</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Languages</span>
                <span className="text-neutral-200 font-medium">English (fluent), Spanish (fluent)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-400">Available For</span>
                <span className="text-neutral-200 font-medium">{model.available_for || 'Out-Call & In-Call'}</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RATES TABLE (Matching Blue Monday Style)
              ======================================================== */}
          <div className="bg-[#09080e] rounded-[30px] border border-[#231b15] p-6 shadow-xl space-y-4">
            <h2 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#1f1914] pb-3 flex items-center justify-between">
              <span>{model.name}&apos;S RATES</span>
              <span className="text-[10px] text-copper-400 uppercase font-bold">Confidential</span>
            </h2>

            <div className="divide-y divide-[#18141e] text-xs">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">1 Hour</span>
                <span className="font-extrabold text-white">€350</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">90 Min</span>
                <span className="font-extrabold text-white">€500</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">2 Hours</span>
                <span className="font-extrabold text-white">€700</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Additional Hour</span>
                <span className="font-extrabold text-white">€300</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Dinner Date (3hr)</span>
                <span className="font-extrabold text-white">€1,000</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Dinner Date (4hr)</span>
                <span className="font-extrabold text-white">€1,300</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Overnight (9hr)</span>
                <span className="font-extrabold text-white">€2,500</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">Overnight (12hr)</span>
                <span className="font-extrabold text-white">€3,200</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-neutral-300">24 Hours (Full Day)</span>
                <span className="font-extrabold text-copper-400">€5,000</span>
              </div>
            </div>

            {/* Rates Disclaimer Notes */}
            <div className="space-y-2 pt-3 text-[11px] text-neutral-400 border-t border-[#1a151b] leading-relaxed">
              <p>
                The rates listed are for bookings in {primaryCity}. Please contact our concierge if you would like to fly {model.name} to your desired international destination.
              </p>
              <p>
                Booking with couples are an extra cost. Other currencies (USD, GBP, CHF) can be accepted subject to 5% conversion.
              </p>
              <p>
                Payment in Cryptocurrency (USDT, BTC) and Bank Wire accepted with absolute privacy.
              </p>
            </div>
          </div>

          {/* ========================================================
              DESCRIPTION (With View More toggle)
              ======================================================== */}
          <div className="bg-[#09080e] rounded-[30px] border border-[#231b15] p-6 shadow-xl space-y-3">
            <h2 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#1f1914] pb-3">
              {model.name}&apos;S DESCRIPTION
            </h2>

            <div className="text-xs text-neutral-300 leading-relaxed space-y-2">
              <p>
                {model.bio ? (
                  model.bio
                ) : (
                  <>
                    Meet {model.name}, one of our most enchanting and captivating international companions. With an irresistible blend of natural beauty, graceful sensuality, and sophisticated conversational charm, {model.name} transforms any rendezvous into an extraordinary experience.
                  </>
                )}
              </p>

              {descExpanded && (
                <div className="space-y-2 pt-2 text-neutral-400 border-t border-[#1e1914] animate-fadeIn">
                  <p>
                    Whether accompanying you to a Michelin-starred dining experience at Sublimotion, enjoying a sunset glass of champagne aboard a private superyacht sailing toward Formentera, or sharing an intimate retreat at your private villa, {model.name} offers warm warmth, discreet companionship, and unforgettable memories.
                  </p>
                  <p>
                    Fluent in multiple languages and highly cultured, {model.name} adapts effortlessly to any luxury social setting, gala, or relaxed weekend escape.
                  </p>
                </div>
              )}

              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="text-copper-400 hover:text-copper-300 font-bold text-xs underline pt-1 block cursor-pointer"
              >
                {descExpanded ? 'View Less' : 'View More'}
              </button>
            </div>
          </div>

          {/* ========================================================
              REVIEWS SUMMARY + LEAVE A REVIEW BUTTON
              ======================================================== */}
          <div className="bg-[#09080e] rounded-[30px] border border-[#231b15] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f1914] pb-3">
              <div>
                <h2 className="text-xs font-black uppercase text-white tracking-widest">
                  {model.name}&apos;S REVIEWS
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex text-copper-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-copper-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-300">5.0 (2 Verified)</span>
                </div>
              </div>

              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-copper-500/20 hover:bg-copper-500/30 text-copper-300 border border-copper-500/40 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                LEAVE A REVIEW
              </button>
            </div>

            {/* Testimonials List */}
            <div className="space-y-3.5 text-xs">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 rounded-2xl bg-[#110f17] border border-[#1f1914] space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span>{rev.author}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-neutral-500">{rev.date}</span>
                  </div>
                  <div className="flex text-copper-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-copper-400" />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-[11px] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: 2-Column Vertical Photo Stream (~60% / 7 cols)
            (Matching Blue Monday London Reference Exactly)
            ======================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Portfolio &bull; High Resolution
            </span>
            <span className="text-xs text-neutral-400">
              {displayGallery.length} High-Res Photos
            </span>
          </div>

          {/* 2-Column Vertical Photo Stream Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {displayGallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[3/4] sm:aspect-[2/3] rounded-[26px] overflow-hidden bg-[#0c0c11] border-2 border-[#201a16] hover:border-copper-500/80 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(200,125,85,0.3)] transition-all duration-500"
              >
                <img
                  src={img.url}
                  alt={`${model.name} photo ${idx + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Hover Fullscreen Overlay */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-black/80 backdrop-blur-md text-white border border-copper-500/60 shadow-[0_0_20px_rgba(200,125,85,0.4)]">
                    <Maximize2 className="w-5 h-5 text-copper-400" />
                  </div>
                </div>

                {/* Corner Watermark / Index Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-neutral-300 border border-white/10 pointer-events-none">
                  <span className="text-copper-400">{idx + 1}</span> / {displayGallery.length}
                </div>

                {/* First Image Verified Badge */}
                {idx === 0 && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-copper-500 text-black text-[9px] font-black uppercase tracking-wider shadow">
                      VERIFIED
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ========================================================
          FULLSCREEN LIGHTBOX MODAL
          ======================================================== */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Lightbox Top Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white z-10 py-2">
            <div>
              <span className="text-xs uppercase font-extrabold text-copper-400 tracking-wider">
                {model.name}
              </span>
              <span className="text-xs text-neutral-400 ml-2">
                &bull; Photo {lightboxIndex + 1} of {displayGallery.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-[#18141c] hover:bg-copper-500/30 text-neutral-300 hover:text-white border border-[#2d241d] transition-all"
                aria-label="Close fullscreen view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image View */}
          <div className="relative flex-grow flex items-center justify-center w-full max-w-5xl my-4">
            {/* Prev Button */}
            {displayGallery.length > 1 && (
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev !== null ? (prev - 1 + displayGallery.length) % displayGallery.length : 0))
                }
                className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-copper-500/80 text-white border border-[#33261f] transition-all hover:scale-110 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Current Image with Curved Frame */}
            <div className="relative max-h-[82vh] max-w-full rounded-[28px] overflow-hidden border-2 border-copper-500/50 shadow-[0_0_60px_rgba(200,125,85,0.35)]">
              <img
                src={displayGallery[lightboxIndex].url}
                alt={`${model.name} full view`}
                className="max-h-[82vh] max-w-full object-contain select-none"
              />
            </div>

            {/* Next Button */}
            {displayGallery.length > 1 && (
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % displayGallery.length : 0))
                }
                className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-copper-500/80 text-white border border-[#33261f] transition-all hover:scale-110 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnails Strip */}
          <div className="w-full max-w-4xl overflow-x-auto py-2 flex items-center justify-center gap-2">
            {displayGallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  idx === lightboxIndex
                    ? 'border-copper-500 scale-105 shadow-[0_0_15px_rgba(200,125,85,0.6)]'
                    : 'border-[#221c17] opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          BOOKING MODAL
          ======================================================== */}
      <BookingModal
        model={model}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* ========================================================
          LEAVE A REVIEW MODAL
          ======================================================== */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0a10] border border-[#2b221c] rounded-[32px] max-w-md w-full p-6 sm:p-8 relative shadow-[0_0_40px_rgba(200,125,85,0.25)] space-y-4">
            
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#16141c] text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-2 border-b border-[#1f1914]">
              <span className="text-[10px] font-bold text-copper-400 uppercase tracking-widest">
                Client Testimonial
              </span>
              <h3 className="text-xl font-extrabold text-white mt-1 uppercase">
                Leave a Review for {model.name}
              </h3>
            </div>

            {reviewSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white">Thank You!</h4>
                <p className="text-xs text-neutral-400">
                  Your confidential review has been submitted for moderation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Your Name / Initials *</label>
                  <input
                    type="text"
                    required
                    value={userReviewName}
                    onChange={(e) => setUserReviewName(e.target.value)}
                    placeholder="e.g. M. K. (London)"
                    className="w-full bg-[#13111a] text-white p-3 rounded-xl border border-[#2c221a] focus:border-copper-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserReviewRating(star)}
                        className={`p-2 rounded-lg border ${
                          star <= userReviewRating
                            ? 'bg-copper-500/20 border-copper-500 text-copper-400'
                            : 'border-[#221c17] text-neutral-600'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Your Feedback *</label>
                  <textarea
                    rows={4}
                    required
                    value={userReviewComment}
                    onChange={(e) => setUserReviewComment(e.target.value)}
                    placeholder="Describe your experience regarding poise, punctuality, conversation, and beauty..."
                    className="w-full bg-[#13111a] text-white p-3 rounded-xl border border-[#2c221a] focus:border-copper-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 text-white font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Confidential Review</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}
