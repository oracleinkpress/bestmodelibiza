import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Best Model Ibiza',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-neutral-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-neutral-400">Last updated: 2026</p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Advertising Platform Disclaimer</h2>
        <p>
          Best Model Ibiza acts solely as an advertising medium and directory platform. The agency does not employ or contract independent models beyond representation and marketing services. All adult models featured are at least 18 years of age.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Adult Content &amp; Age Verification</h2>
        <p>
          By accessing this website, you certify that you are of legal adult age in your jurisdiction (at least 18 years old, or 21 where applicable). You agree that viewing images of adult models is lawful in your location.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Code of Conduct &amp; Mutual Respect</h2>
        <p>
          Clients are expected to treat models with utmost courtesy, dignity, and respect at all times. Any disrespectful or unlawful behavior will result in immediate termination of companionship and permanent blacklisting from our network.
        </p>
      </section>
    </div>
  );
}
