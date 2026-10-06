'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Menu, X, MessageSquare } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#050507]/92 backdrop-blur-md border-b border-[#1c1815]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Copper Aura */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl border border-copper-500/40 flex items-center justify-center bg-copper-500/10 group-hover:border-copper-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(200,125,85,0.2)]">
              <Sparkles className="w-5 h-5 text-copper-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-copper-gradient uppercase">
                BEST MODEL
              </span>
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase -mt-0.5 font-medium">
                IBIZA &bull; VIP COMPANIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link href="/" className="text-neutral-300 hover:text-copper-400 transition-colors">
              All Models
            </Link>
            <Link href="/category/vip" className="text-copper-400 flex items-center gap-1.5 hover:text-copper-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5" />
              VIP Exclusive
            </Link>
            <Link href="/city/ibizaspain" className="text-neutral-300 hover:text-copper-400 transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-copper-500" />
              Ibiza
            </Link>
            <Link href="/city/madridspain" className="text-neutral-300 hover:text-copper-400 transition-colors">
              Madrid
            </Link>
            <Link href="/city/barcelonaspain" className="text-neutral-300 hover:text-copper-400 transition-colors">
              Barcelona
            </Link>
            <Link href="/city/dubai-unitedarabemirates" className="text-neutral-300 hover:text-copper-400 transition-colors">
              Dubai
            </Link>
            <Link href="/services" className="text-neutral-300 hover:text-copper-400 transition-colors">
              Services
            </Link>
          </div>

          {/* Right Action Button: Copper WhatsApp VIP */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-copper-500/50 bg-gradient-to-r from-copper-500/20 to-copper-600/10 text-copper-300 hover:text-white hover:border-copper-400 hover:bg-copper-500/30 text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(200,125,85,0.25)]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>VIP Concierge</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="https://wa.me/34678012530"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-copper-500/15 border border-copper-500/30 text-copper-400"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-neutral-400 hover:text-white bg-[#101017] border border-[#201d1b]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090d] border-b border-[#201d1b] px-4 pt-3 pb-6 space-y-2.5">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-200 hover:text-copper-400 hover:bg-[#14141c]"
          >
            All Models
          </Link>
          <Link
            href="/category/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-copper-400 hover:bg-[#14141c]"
          >
            VIP Exclusive Models
          </Link>
          <Link
            href="/city/ibizaspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-copper-400 hover:bg-[#14141c]"
          >
            Ibiza Models
          </Link>
          <Link
            href="/city/madridspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-copper-400 hover:bg-[#14141c]"
          >
            Madrid Models
          </Link>
          <Link
            href="/city/barcelonaspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-copper-400 hover:bg-[#14141c]"
          >
            Barcelona Models
          </Link>
          <Link
            href="/city/dubai-unitedarabemirates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-copper-400 hover:bg-[#14141c]"
          >
            Dubai Models
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-neutral-300 hover:text-copper-400 hover:bg-[#14141c]"
          >
            VIP Agency Services
          </Link>
          <Link
            href="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-emerald-400 hover:bg-[#14141c]"
          >
            Model Casting / Join Agency
          </Link>

          <div className="pt-2">
            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-copper-500/20 border border-copper-500/50 text-copper-300 font-bold text-xs uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on VIP WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
