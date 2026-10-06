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
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-copper-500 via-copper-600 to-copper-500 hover:from-copper-400 hover:to-copper-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(200,125,85,0.4)] flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Confidential VIP Reservation</span>
      </button>

      <BookingModal
        model={model}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
