'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Ultimate Yacht Companion Guide: Cruising Ibiza & Formentera',
    excerpt: 'Everything you need to know about chartering luxury catamarans and superyachts with elegant hostesses in the Balearic waters.',
    image: '/stock/bestmodel-ibiza1.jpg',
    category: 'YACHT CHARTERS',
    readTime: '4 min read',
    date: 'Summer 2026',
    link: '/services',
  },
  {
    id: 2,
    title: 'Confidential Dining: Top Michelin Venues for VIP Dates in Ibiza',
    excerpt: 'From Sublimotion and L’Atelier de Joël Robuchon to beachfront sunset tables at Cala Jondal: premier culinary companionship.',
    image: '/stock/bestmodel-ibiza7.jpg',
    category: 'FINE DINING',
    readTime: '5 min read',
    date: 'June 2026',
    link: '/services',
  },
  {
    id: 3,
    title: 'Private Villa Etiquette: Secluded Companionship in Ibiza & Marbella',
    excerpt: 'How our discrete out-call villa arrangements guarantee complete privacy, respectful protocol, and peace of mind.',
    image: '/stock/bestmodel-ibiza8.jpg',
    category: 'PRIVATE VILLAS',
    readTime: '6 min read',
    date: 'May 2026',
    link: '/services',
  },
  {
    id: 4,
    title: 'Fly-Me-To-You: International Travel to Dubai, Monaco & London',
    excerpt: 'Planning seamless overseas travel with multilingual companions holding active EU, US, and UAE visas.',
    image: '/stock/bestmodel-ibiza3.webp',
    category: 'GLOBAL TRAVEL',
    readTime: '5 min read',
    date: 'April 2026',
    link: '/city/travel-girl',
  },
];

export function VipBlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1f1a16]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold text-copper-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Ibiza VIP Editorial &amp; Lifestyle
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            VIP Guides &amp; Experiences
          </h2>
          <p className="mt-2 text-sm text-neutral-300 max-w-xl">
            Curated travel advice, yacht protocol, luxury dining guides, and confidential insights for our international clientele.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-copper-400 hover:text-copper-300 transition-colors uppercase tracking-wider"
        >
          <span>View All VIP Services</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Curved Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group relative bg-[#09090e] rounded-[30px] overflow-hidden border border-[#221c17] hover:border-copper-500/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,125,85,0.22)] flex flex-col p-2.5"
          >
            {/* Curved Image Frame (24px radius) */}
            <Link href={post.link} className="block relative aspect-[16/10] overflow-hidden rounded-[22px] bg-[#14141d]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-copper-500 text-black text-[10px] font-black uppercase tracking-wider shadow">
                  {post.category}
                </span>
              </div>
            </Link>

            {/* Post Content */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center gap-3 text-[10px] text-neutral-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-copper-400" />
                    {post.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-copper-400" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={post.link}>
                  <h3 className="text-sm font-bold text-white group-hover:text-copper-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e1916] flex items-center justify-between">
                <Link
                  href={post.link}
                  className="text-xs font-bold text-copper-400 group-hover:text-copper-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
