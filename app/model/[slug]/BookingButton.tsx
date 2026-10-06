'use client';

import React, { useState } from 'react';
import { Model } from '@/lib/models';
import { BookingModal } from '@/components/BookingModal';
import { Calendar } from 'lucide-react';

interface BookingButtonProps {
  model: Model;
}

export function BookingButton({ model }: BookingButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Confidential Reservation</span>
      </button>

      <BookingModal
        model={model}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
