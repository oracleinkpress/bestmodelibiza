'use client';

import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function JoinAgencyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    city: 'Ibiza',
    nationality: '',
    height: '',
    measurements: '',
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `MODEL CASTING APPLICATION - ${formData.name} (${formData.city})`,
          message: `Age: ${formData.age}\nNationality: ${formData.nationality}\nHeight: ${formData.height}\nMeasurements: ${formData.measurements}\nLocation: ${formData.city}\nNotes: ${formData.message}`,
        }),
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Model Recruitment 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Join Best Model Ibiza
        </h1>
        <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          We invite confident, elegant ladies and gentlemen to join our prestigious roster. Enjoy high earnings, premium clientele, complete privacy, and full autonomy.
        </p>
      </div>

      {/* Perks Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0f1019] border border-[#202232] text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-gold-400 mx-auto" />
          <h4 className="text-white font-bold text-xs">Maximum Discretion</h4>
          <p className="text-[11px] text-neutral-400">Strictly confidential handling of your private data.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f1019] border border-[#202232] text-center space-y-1">
          <Heart className="w-6 h-6 text-gold-400 mx-auto" />
          <h4 className="text-white font-bold text-xs">Verified High-End Clients</h4>
          <p className="text-[11px] text-neutral-400">Polite, screened gentlemen & international executives.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f1019] border border-[#202232] text-center space-y-1">
          <Sparkles className="w-6 h-6 text-gold-400 mx-auto" />
          <h4 className="text-white font-bold text-xs">Flexible Scheduling</h4>
          <p className="text-[11px] text-neutral-400">Work when and where you want, with direct payouts.</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="bg-[#0e0f17] p-8 sm:p-10 rounded-3xl border border-[#222436] shadow-2xl">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">
              Confidential Application Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Name / Model Alias *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scarlett"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+34 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Age *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Must be 18+"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Nationality *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spanish, Colombian..."
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Current Location / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ibiza, Madrid..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Height &amp; Weight
                </label>
                <input
                  type="text"
                  placeholder="e.g. 170 cm / 55 kg"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="contact@..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Tell Us About Yourself / Travel Preferences
              </label>
              <textarea
                rows={3}
                placeholder="Languages spoken, availability, in-call/out-call preferences..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#151722] border border-[#262838] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Transmitting Details...' : 'Submit Casting Application'}</span>
            </button>

            <p className="text-[11px] text-neutral-500 text-center">
              You can also contact our talent coordinator directly on WhatsApp at +34 678 012 530.
            </p>
          </form>
        ) : (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white uppercase">Application Received</h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our casting director will review your details and contact you discretely via WhatsApp within 24 hours.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
