'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { ModelGalleryImage } from '@/lib/models';
import { resolveImageUrl } from '@/lib/cloudflare';

interface LightboxGalleryProps {
  images: ModelGalleryImage[];
  modelName: string;
}

export function LightboxGallery({ images, modelName }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-[#14151f] rounded-2xl flex items-center justify-center text-neutral-500">
        <Camera className="w-8 h-8" />
      </div>
    );
  }

  const currentImage = images[selectedIndex];
  const currentUrl = resolveImageUrl(currentImage?.url || images[0].url);

  return (
    <div className="space-y-4">
      
      {/* Main Large Image */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0d0e14] border border-[#202230] cursor-pointer group shadow-2xl"
      >
        <img
          src={currentUrl}
          alt={`${modelName} - photo ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Lightbox Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
            <Maximize2 className="w-4 h-4 text-gold-400" />
            <span>Click to View Fullscreen ({images.length} Photos)</span>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-medium text-white border border-white/10">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {images.map((img, idx) => {
            const thumbUrl = resolveImageUrl(img.thumbnail || img.url);
            const isActive = idx === selectedIndex;
            return (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  isActive
                    ? 'border-gold-500 scale-95 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-neutral-500'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          
          {/* Top Header */}
          <div className="w-full flex items-center justify-between text-white max-w-6xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-wider text-gold-400">
                {modelName}
              </span>
              <span className="text-xs text-neutral-400">
                Photo {selectedIndex + 1} of {images.length}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Main Stage */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full my-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/70 hover:bg-gold-500 hover:text-black text-white border border-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentUrl}
              alt={`${modelName} fullscreen`}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/70 hover:bg-gold-500 hover:text-black text-white border border-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-3xl py-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  idx === selectedIndex ? 'border-gold-500 scale-105' : 'border-transparent opacity-50'
                }`}
              >
                <img
                  src={resolveImageUrl(img.thumbnail || img.url)}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
