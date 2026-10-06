'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Search, Menu, X, Phone, MessageSquare } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#08080c]/90 backdrop-blur-md border-b border-[#202230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold-500/40 flex items-center justify-center bg-gold-500/10 group-hover:border-gold-400 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-gold-gradient uppercase">
                BEST MODEL
              </span>
              <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase -mt-1 font-medium">
                IBIZA &bull; VIP COMPANIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium">
            <Link href="/" className="text-neutral-300 hover:text-gold-400 transition-colors">
              All Models
            </Link>
            <Link href="/category/vip" className="text-gold-400 flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5" />
              VIP Exclusive
            </Link>
            <Link href="/city/ibizaspain" className="text-neutral-300 hover:text-gold-400 transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              Ibiza
            </Link>
            <Link href="/city/madridspain" className="text-neutral-300 hover:text-gold-400 transition-colors">
              Madrid
            </Link>
            <Link href="/city/barcelonaspain" className="text-neutral-300 hover:text-gold-400 transition-colors">
              Barcelona
            </Link>
            <Link href="/city/dubai-unitedarabemirates" className="text-neutral-300 hover:text-gold-400 transition-colors">
              Dubai
            </Link>
            <Link href="/services" className="text-neutral-300 hover:text-gold-400 transition-colors">
              Services
            </Link>
          </div>

          {/* Right Action Button: WhatsApp Concierge */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 hover:border-gold-400 text-sm font-medium transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>VIP WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="https://wa.me/34678012530"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d12] border-b border-[#202230] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:text-gold-400 hover:bg-[#161822]"
          >
            All Models
          </Link>
          <Link
            href="/category/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gold-400 hover:bg-[#161822]"
          >
            VIP Exclusive Models
          </Link>
          <Link
            href="/city/ibizaspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            Ibiza Models
          </Link>
          <Link
            href="/city/madridspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            Madrid Models
          </Link>
          <Link
            href="/city/barcelonaspain"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            Barcelona Models
          </Link>
          <Link
            href="/city/dubai-unitedarabemirates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            Dubai Models
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            VIP Agency Services
          </Link>
          <Link
            href="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-gold-400 hover:bg-[#161822]"
          >
            Model Casting / Join Agency
          </Link>

          <div className="pt-2">
            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20models%20at%20Best%20Model%20Ibiza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500/20 border border-gold-500/50 text-gold-400 font-semibold"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Chat on VIP WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
