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
      <div className="aspect-[3/4] bg-[#101017] rounded-[32px] flex items-center justify-center text-neutral-500 border border-[#221c17]">
        <Camera className="w-8 h-8 text-copper-400" />
      </div>
    );
  }

  const currentImage = images[selectedIndex];
  const currentUrl = resolveImageUrl(currentImage?.url || images[0].url);

  return (
    <div className="space-y-4">
      
      {/* Main Curved Hero Portrait (32px border radius) */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-[#0c0c11] border-2 border-[#26201b] hover:border-copper-500/70 cursor-pointer group shadow-[0_0_30px_rgba(200,125,85,0.18)] transition-all duration-500"
      >
        <img
          src={currentUrl}
          alt={`${modelName} - photo ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Hover Fullscreen Hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-copper-500/50 shadow-[0_0_20px_rgba(200,125,85,0.35)]">
            <Maximize2 className="w-4 h-4 text-copper-400" />
            <span>Click to View Fullscreen ({images.length} Photos)</span>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-white border border-[#30261f]">
          <span className="text-copper-400 font-bold">{selectedIndex + 1}</span> / {images.length} Photos
        </div>
      </div>

      {/* Curved Thumbnails Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5">
          {images.map((img, idx) => {
            const thumbUrl = resolveImageUrl(img.thumbnail || img.url);
            const isActive = idx === selectedIndex;
            return (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-square rounded-[20px] overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-copper-500 scale-95 shadow-[0_0_15px_rgba(200,125,85,0.5)]'
                    : 'border-[#221c17] opacity-60 hover:opacity-100 hover:border-copper-400/50'
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
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
          
          {/* Top Header */}
          <div className="w-full flex items-center justify-between text-white max-w-6xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold uppercase tracking-widest text-copper-gradient">
                {modelName}
              </span>
              <span className="text-xs text-neutral-400">
                Photo {selectedIndex + 1} of {images.length}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-neutral-900 border border-[#2b241e] text-white hover:text-copper-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Main Stage with Curved Image */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full my-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 sm:left-4 z-10 p-3.5 rounded-full bg-black/80 hover:bg-copper-500 hover:text-white text-copper-400 border border-copper-500/40 transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={currentUrl}
              alt={`${modelName} fullscreen`}
              className="max-h-[80vh] max-w-full object-contain rounded-[28px] border border-copper-500/30 shadow-[0_0_50px_rgba(200,125,85,0.25)]"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 sm:right-4 z-10 p-3.5 rounded-full bg-black/80 hover:bg-copper-500 hover:text-white text-copper-400 border border-copper-500/40 transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto max-w-3xl py-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  idx === selectedIndex ? 'border-copper-500 scale-105' : 'border-[#221c17] opacity-50'
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
