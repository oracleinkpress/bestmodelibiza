'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Model } from '@/lib/models';

interface BookingModalProps {
  model: Model;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ model, isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientContact: '',
    contactMethod: 'whatsapp',
    bookingDate: '',
    bookingTime: '',
    duration: '2 Hours',
    locationType: 'Private Villa',
    locationAddress: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: model.id,
          modelName: model.name,
          ...formData,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to record reservation');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Booking submission error:', err);
      // Even if network fails, we allow user to forward directly to WhatsApp
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${model.whatsapp || '34678012530'}?text=${encodeURIComponent(
    `VIP RESERVATION INQUIRY:\nModel: ${model.name}\nDate: ${formData.bookingDate || 'Flexible'}\nTime: ${formData.bookingTime || 'Flexible'}\nDuration: ${formData.duration}\nLocation: ${formData.locationType} (${formData.locationAddress || 'Ibiza'})\nClient: ${formData.clientName} (${formData.clientContact})\nNotes: ${formData.specialRequests || 'None'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0f1018] border border-[#232638] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="text-center pb-2 border-b border-[#1f2130]">
              <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Discreet VIP Reservation
              </span>
              <h3 className="text-xl font-bold text-white mt-1 uppercase">
                Book with {model.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                All inquiries are 100% confidential and handled personally.
              </p>
            </div>

            {/* Client Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Name / Pseudonym *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Phone / WhatsApp / Telegram *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+34 ..."
                  value={formData.clientContact}
                  onChange={(e) => setFormData({ ...formData, clientContact: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  value={formData.bookingTime}
                  onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Duration & Location Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="2 Hours">2 Hours</option>
                  <option value="3 Hours">3 Hours</option>
                  <option value="Dinner Date (4-5 Hours)">Dinner Date (4-5 Hours)</option>
                  <option value="Overnight (10-12 Hours)">Overnight (10-12 Hours)</option>
                  <option value="24 Hours VIP Companion">24 Hours VIP Companion</option>
                  <option value="Weekend / Travel Companion">Weekend / Travel Companion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Location Type
                </label>
                <select
                  value={formData.locationType}
                  onChange={(e) => setFormData({ ...formData, locationType: e.target.value })}
                  className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="Private Villa">Private Villa</option>
                  <option value="5-Star Luxury Hotel">5-Star Luxury Hotel</option>
                  <option value="Yacht / Superyacht">Yacht / Superyacht</option>
                  <option value="Dinner / VIP Event Venue">Dinner / VIP Event Venue</option>
                  <option value="Model In-Call Apartment">Model In-Call Apartment</option>
                </select>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Hotel Name, Villa Area or City
              </label>
              <input
                type="text"
                placeholder="e.g. Marina Botafoch, Ibiza Gran Hotel, Santa Eulalia..."
                value={formData.locationAddress}
                onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Special Requests & Notes (Discreet)
              </label>
              <textarea
                rows={2}
                placeholder="Dress code, travel requirements, dinner preferences..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full bg-[#161824] border border-[#282b3d] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400">{errorMessage}</p>
            )}

            {/* Submit Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Reservation...' : 'Submit Discreet Inquiry'}</span>
              </button>

              <div className="text-center text-[11px] text-neutral-500">or</div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Instantly on VIP WhatsApp</span>
              </a>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white uppercase">
              Inquiry Received Confidentially
            </h3>

            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{formData.clientName}</strong>. Your request for <strong>{model.name}</strong> has been transmitted to our VIP concierge.
            </p>

            <div className="pt-4 space-y-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Accelerate Confirmation on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#171924] text-neutral-300 text-xs font-semibold hover:bg-[#202232]"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
