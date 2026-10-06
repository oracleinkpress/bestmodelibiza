import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, HeartHandshake, PhoneCall, MessageCircle, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#040406] border-t border-[#1a1613] text-neutral-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Badges with Curves */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#1a1613]">
          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-[#09090d] border border-[#221c17]">
            <Shield className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">100% Real &amp; Verified Photos</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Strict model verification &amp; natural portfolios.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-[#09090d] border border-[#221c17]">
            <HeartHandshake className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">Strict Discretion &amp; Privacy</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Confidential VIP arrangements for elite clients.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[26px] bg-[#09090d] border border-[#221c17]">
            <PhoneCall className="w-8 h-8 text-copper-400 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm">24/7 VIP Concierge Support</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Direct response via encrypted WhatsApp &amp; Telegram.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-copper-400" />
              <span className="text-lg font-bold text-copper-gradient tracking-widest uppercase">
                BEST MODEL IBIZA
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The premier international agency for VIP companions, elite models, and luxury escorts in Ibiza, Madrid, Barcelona, Marbella, Dubai, and worldwide travel.
            </p>
            <div className="flex items-center gap-2 text-xs text-copper-400 font-medium">
              <MapPin className="w-4 h-4 text-copper-500" />
              <span>Ibiza, Balearic Islands &bull; Spain</span>
            </div>
          </div>

          {/* Top Locations */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Top Locations
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/city/ibizaspain" className="hover:text-copper-400 transition-colors">Ibiza, Spain</Link></li>
              <li><Link href="/city/madridspain" className="hover:text-copper-400 transition-colors">Madrid, Spain</Link></li>
              <li><Link href="/city/barcelonaspain" className="hover:text-copper-400 transition-colors">Barcelona, Spain</Link></li>
              <li><Link href="/city/marbellaspain" className="hover:text-copper-400 transition-colors">Marbella, Spain</Link></li>
              <li><Link href="/city/dubai-unitedarabemirates" className="hover:text-copper-400 transition-colors">Dubai, UAE</Link></li>
              <li><Link href="/city/amsterdam-netherlands" className="hover:text-copper-400 transition-colors">Amsterdam, Netherlands</Link></li>
              <li><Link href="/city/travel-girl" className="hover:text-copper-400 transition-colors">Available For Traveling</Link></li>
            </ul>
          </div>

          {/* Agency Categories */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/category/vip" className="text-copper-400 hover:text-copper-300 font-semibold">VIP Exclusive Models</Link></li>
              <li><Link href="/category/girl_model" className="hover:text-copper-400 transition-colors">Girl Models</Link></li>
              <li><Link href="/category/guy-model" className="hover:text-copper-400 transition-colors">Guy Models</Link></li>
              <li><Link href="/category/trans-model" className="hover:text-copper-400 transition-colors">Trans Models</Link></li>
              <li><Link href="/category/independent-girl-model" className="hover:text-copper-400 transition-colors">Independent Models</Link></li>
              <li><Link href="/services" className="hover:text-copper-400 transition-colors">VIP Yacht &amp; Event Escorts</Link></li>
              <li><Link href="/join" className="hover:text-copper-400 font-medium text-emerald-400">Model Casting Application</Link></li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              VIP Concierge
            </h5>
            <p className="text-xs text-neutral-400 mb-3">
              Direct and discreet inquiries:
            </p>
            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20from%20the%20Best%20Model%20Ibiza%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-all mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: +34 678 012 530
            </a>
            <p className="text-[11px] text-neutral-500">
              Discreet booking assistance available 24/7.
            </p>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-[#1a1613] text-[11px] text-neutral-500 space-y-2">
          <p>
            <strong>Disclaimer:</strong> Best Model Ibiza operates strictly as an upscale advertisement and introduction platform. All models and escorts featured on this website are consenting adults aged 18 or older. We respect personal autonomy, privacy, and full legal compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-neutral-400">
            <span>&copy; {new Date().getFullYear()} Best Model Ibiza &bull; All Rights Reserved.</span>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/terms" className="hover:text-neutral-300">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-neutral-300">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-neutral-300">Contact</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
