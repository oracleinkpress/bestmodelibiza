import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Best Model Ibiza',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-neutral-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Privacy &amp; Discretion Policy</h1>
      <p className="text-xs text-neutral-400">Last updated: 2026</p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Total Client Confidentiality</h2>
        <p>
          We strictly uphold client anonymity. Inquiries received through our contact forms or direct VIP communication channels are never sold, shared, or distributed to third parties under any circumstances.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Data Storage &amp; Encryption</h2>
        <p>
          Any booking correspondence is encrypted in transit and purged regularly to maintain client and model safety. We do not store sensitive payment credentials.
        </p>
      </section>
    </div>
  );
}
