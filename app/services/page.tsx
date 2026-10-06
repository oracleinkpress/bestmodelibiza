import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Ship, Wine, Crown, Plane, Shield, MessageSquare, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VIP Companion & Escort Services in Ibiza | Best Model Ibiza',
  description: 'Explore luxury yacht escorts, private villa companions, high-class dinner dates, and international travel companions in Ibiza, Marbella, and Madrid.',
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Services Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bespoke Companionship Experiences</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Elite VIP Escort Services in Ibiza
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
          We curate unforgettable, discreet companionship tailored to international high-net-worth individuals, entrepreneurs, and connoisseurs of luxury living.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Yacht Charters */}
        <div className="p-8 rounded-3xl bg-[#0e0f17] border border-[#202232] space-y-4 hover:border-gold-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Ship className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Superyacht Hostesses &amp; Boat Charters</h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Enhance your Mediterranean voyage with charming, bikini-ready companions. Whether cruising along the turquoise waters of Formentera, lounging at Illetas, or watching the sunset at Es Vedrà, our models bring effortless elegance to your yachting day or week.
          </p>
          <ul className="text-xs text-neutral-400 space-y-1.5 pt-2">
            <li>&bull; Full-day and multi-day sailing packages</li>
            <li>&bull; Discrete pick-up at Marina Ibiza or Marina Botafoch</li>
            <li>&bull; Fluent English, Spanish, and multi-lingual models</li>
          </ul>
        </div>

        {/* Private Villa Out-Calls */}
        <div className="p-8 rounded-3xl bg-[#0e0f17] border border-[#202232] space-y-4 hover:border-gold-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Crown className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Private Villa Companionship</h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Ibiza is renowned for magnificent secluded villas. Our models are experienced in providing total discretion during private villa visits, pool parties, intimate dinners, and overnight stays in areas like Vista Alegre, Roca Llisa, Cap Martinet, and Santa Gertrudis.
          </p>
          <ul className="text-xs text-neutral-400 space-y-1.5 pt-2">
            <li>&bull; Complete anonymity with direct private chauffeurs</li>
            <li>&bull; Flexible arrangements from a few hours to extended weekends</li>
            <li>&bull; In-call luxury apartments also available upon request</li>
          </ul>
        </div>

        {/* Fine Dining & Galas */}
        <div className="p-8 rounded-3xl bg-[#0e0f17] border border-[#202232] space-y-4 hover:border-gold-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Wine className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">Fine Dining, VIP Clubs &amp; Events</h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Looking for a breathtaking companion for dinner at L&apos;Atelier de Joël Robuchon, Sublimotion, Cipriani, or a VIP table at Hï Ibiza, Ushuaïa, or Pacha? Our models possess poise, sophisticated etiquette, and magnetic charisma that turns heads.
          </p>
          <ul className="text-xs text-neutral-400 space-y-1.5 pt-2">
            <li>&bull; Elegant haute couture wardrobe matching any dress code</li>
            <li>&bull; Engaging conversation and social grace</li>
            <li>&bull; Afterparty companionship and intimate continuity</li>
          </ul>
        </div>

        {/* International Travel */}
        <div className="p-8 rounded-3xl bg-[#0e0f17] border border-[#202232] space-y-4 hover:border-gold-500/40 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Plane className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white">International Fly-Me-To-You Travel</h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Many of our top models hold valid EU passports, US visas, and UAE residency, making international travel effortless. Whether your destination is Dubai, London, Zurich, Monaco, Saint-Tropez, or Miami, we coordinate seamless first-class travel companionship.
          </p>
          <ul className="text-xs text-neutral-400 space-y-1.5 pt-2">
            <li>&bull; Business trips, vacations, and grand prix weekends</li>
            <li>&bull; All logistics handled discretely by our agency concierge</li>
            <li>&bull; Dedicated travel itinerary planning</li>
          </ul>
        </div>

      </div>

      {/* Discretion Commitment & Booking CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171926] via-[#0d0e17] to-[#171926] border border-[#26293d] text-center space-y-6">
        <Shield className="w-12 h-12 text-gold-400 mx-auto" />
        <h2 className="text-3xl font-bold text-white max-w-xl mx-auto">
          Ready to Arrange Your Next Unforgettable Experience?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
          Contact our 24/7 private concierge directly on WhatsApp. We cater to tailored requests with lightning-fast confirmation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20arrange%20a%20VIP%20service%20via%20Best%20Model%20Ibiza"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with VIP Concierge</span>
          </a>
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-[#181a28] hover:bg-gold-500 hover:text-black text-gold-400 font-bold text-xs uppercase tracking-wider border border-gold-500/40 transition-all"
          >
            Browse All Models
          </Link>
        </div>
      </div>

    </div>
  );
}
