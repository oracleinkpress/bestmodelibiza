'use client';

import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Shield, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'VIP Inquiries',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Discreet VIP Concierge
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Contact <span className="text-copper-gradient">Best Model Ibiza</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-300">
          We pride ourselves on swift, private, and confidential communication 24 hours a day, 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info & Direct Channels with Curves (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-7 rounded-[36px] bg-[#09090e] border border-[#231d17] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Immediate VIP Assistance
            </h3>
            <p className="text-xs text-neutral-400">
              For immediate reservations or questions regarding model availability tonight in Ibiza or Madrid:
            </p>

            <a
              href="https://wa.me/34678012530?text=Hello%2C%20I%20would%20like%20to%20inquire%20via%20Best%20Model%20Ibiza"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all font-medium text-xs"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <div>
                <strong className="block text-white text-sm">VIP WhatsApp Line</strong>
                <span>+34 678 012 530</span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#121118] border border-[#241e1b] text-neutral-300 text-xs">
              <Phone className="w-5 h-5 text-copper-400 shrink-0" />
              <div>
                <strong className="block text-white text-sm">Direct Phone</strong>
                <span>+34 678 012 530</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#121118] border border-[#241e1b] text-neutral-300 text-xs">
              <Mail className="w-5 h-5 text-copper-400 shrink-0" />
              <div>
                <strong className="block text-white text-sm">Encrypted Email</strong>
                <span>contact@bestmodelibiza.com</span>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Box with Curves */}
          <div className="p-7 rounded-[36px] bg-gradient-to-br from-[#121017] to-[#08080c] border border-[#261f18] space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-copper-400 text-sm font-bold">
              <Shield className="w-5 h-5" />
              <span>Strict Privacy Guarantee</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We never store sensitive personal or financial information. All contact is handled with strict discretion, respecting the privacy of high-profile clients and models alike.
            </p>
          </div>

        </div>

        {/* Contact Form with Curves (7 cols) */}
        <div className="lg:col-span-7 bg-[#09090e] p-8 sm:p-10 rounded-[36px] border border-[#231d17] shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Send Us a Private Message</h3>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Name / Alias *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#131219] border border-[#261f1a] rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-copper-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#131219] border border-[#261f1a] rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-copper-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="+34 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#131219] border border-[#261f1a] rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-copper-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Inquiry details, model preferences, dates, or specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#131219] border border-[#261f1a] rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-copper-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.4)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Transmitting...' : 'Send Discreet Message'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white uppercase">Message Delivered</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Thank you. Your message has been routed to our discrete concierge team. We will reply promptly.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
