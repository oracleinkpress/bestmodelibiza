'use client';

import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#110f17] via-[#09080e] to-[#110f17] rounded-[36px] border border-[#271f19] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-[0_0_40px_rgba(200,125,85,0.12)]">
      <span className="text-xs font-bold text-copper-400 uppercase tracking-widest block">
        VIP Inner Circle
      </span>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wide">
        SUBSCRIBE TO OUR NEWSLETTER TO RECEIVE REGULAR UPDATES!
      </h3>
      <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
        Receive discreet notifications about newly arrived international models, summer tours, private yacht availability, and exclusive Ibiza events.
      </p>

      {submitted ? (
        <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>Thank you. You have been added to our private VIP registry.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center max-w-md mx-auto pt-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email Address"
            className="flex-grow bg-[#15131e] text-white text-xs px-4 py-3.5 rounded-l-2xl border border-[#2c231d] focus:outline-none focus:border-copper-500 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3.5 rounded-r-2xl bg-gradient-to-r from-copper-500 to-copper-600 hover:from-copper-400 hover:to-copper-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center shadow-lg"
            aria-label="Subscribe"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-copper-500/80" />
        <span>100% Confidential. No spam. Unsubscribe anytime.</span>
      </div>
    </section>
  );
}
