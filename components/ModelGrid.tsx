'use client';

import React, { useState, useMemo } from 'react';
import { Model } from '@/lib/models';
import { ModelCard } from './ModelCard';
import { Search, Sparkles, Filter, X, SlidersHorizontal, MapPin } from 'lucide-react';

interface ModelGridProps {
  initialModels: Model[];
  preselectedCategory?: string;
  preselectedCity?: string;
}

export function ModelGrid({
  initialModels,
  preselectedCategory = 'all',
  preselectedCity = 'all',
}: ModelGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(preselectedCategory);
  const [selectedCity, setSelectedCity] = useState<string>(preselectedCity);
  const [selectedHair, setSelectedHair] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Available cities list extracted from data
  const citiesList = useMemo(() => {
    const set = new Set<string>();
    initialModels.forEach(m => {
      m.cities?.forEach(c => set.add(c));
    });
    return Array.from(set).sort();
  }, [initialModels]);

  // Hair colors list
  const hairColors = useMemo(() => {
    const set = new Set<string>();
    initialModels.forEach(m => {
      if (m.hair) set.add(m.hair.trim());
    });
    return Array.from(set).filter(Boolean).sort();
  }, [initialModels]);

  // Filtered & sorted models
  const filteredModels = useMemo(() => {
    return initialModels.filter((m) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = m.name?.toLowerCase().includes(q);
        const matchNat = m.nationality?.toLowerCase().includes(q);
        const matchCity = m.cities?.some(c => c.toLowerCase().includes(q));
        const matchHair = m.hair?.toLowerCase().includes(q);
        if (!matchName && !matchNat && !matchCity && !matchHair) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'vip') {
          if (!m.is_vip) return false;
        } else if (selectedCategory === 'girl_model') {
          const isGirl = m.categories?.some(c => c.toLowerCase().includes('girl'));
          if (!isGirl) return false;
        } else if (selectedCategory === 'guy-model') {
          const isGuy = m.categories?.some(c => c.toLowerCase().includes('guy'));
          if (!isGuy) return false;
        } else if (selectedCategory === 'trans-model') {
          const isTrans = m.categories?.some(c => c.toLowerCase().includes('trans'));
          if (!isTrans) return false;
        }
      }

      // City filter
      if (selectedCity !== 'all') {
        const matchCity = m.cities?.some(c => c.toLowerCase().includes(selectedCity.toLowerCase()));
        if (!matchCity) return false;
      }

      // Hair filter
      if (selectedHair !== 'all') {
        if (m.hair?.toLowerCase() !== selectedHair.toLowerCase()) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.is_vip && !b.is_vip) return -1;
        if (!a.is_vip && b.is_vip) return 1;
        return (b.gallery?.length || 0) - (a.gallery?.length || 0);
      }
      if (sortBy === 'newest') {
        return b.id - a.id;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [initialModels, searchQuery, selectedCategory, selectedCity, selectedHair, sortBy]);

  const displayedModels = filteredModels.slice(0, visibleCount);
  const hasMore = visibleCount < filteredModels.length;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('all');
    setSelectedHair('all');
    setSortBy('featured');
  };

  return (
    <section id="models-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search & Filter Control Bar */}
      <div className="bg-[#0b0b10] p-5 sm:p-6 rounded-[30px] border border-[#241e1a] shadow-2xl space-y-4 mb-8">
        
        {/* Top Search & Category Pills */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-copper-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model name, nationality, hair..."
              className="w-full bg-[#131219] text-white text-sm pl-11 pr-10 py-3 rounded-2xl border border-[#2c231d] focus:outline-none focus:border-copper-500 focus:ring-1 focus:ring-copper-500 transition-colors placeholder:text-neutral-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs with Curved Pill Styling */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Models' },
              { id: 'vip', label: 'VIP Exclusive', isVip: true },
              { id: 'girl_model', label: 'Girls' },
              { id: 'guy-model', label: 'Guys' },
              { id: 'trans-model', label: 'Trans' },
            ].map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? cat.isVip
                        ? 'bg-gradient-to-r from-copper-500 to-copper-600 text-white shadow-[0_0_20px_rgba(200,125,85,0.45)]'
                        : 'bg-[#1e1b26] text-copper-300 border border-copper-500/50 shadow-md'
                      : 'bg-[#121118] text-neutral-300 hover:text-white hover:bg-[#181622] border border-[#241e1b]'
                  }`}
                >
                  {cat.isVip && <Sparkles className={`w-3.5 h-3.5 ${active ? 'fill-white' : 'text-copper-400'}`} />}
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Secondary Row: City Filter, Sort & Advanced Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-[#1f1a16] text-xs">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* City Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#131219] px-3.5 py-2 rounded-xl border border-[#28211b]">
              <MapPin className="w-3.5 h-3.5 text-copper-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#101017] text-white">All Locations ({citiesList.length})</option>
                {citiesList.map(c => (
                  <option key={c} value={c} className="bg-[#101017] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Hair Color filter if opened */}
            {showAdvancedFilters && (
              <div className="flex items-center gap-1.5 bg-[#131219] px-3.5 py-2 rounded-xl border border-[#28211b]">
                <span className="text-neutral-400">Hair:</span>
                <select
                  value={selectedHair}
                  onChange={(e) => setSelectedHair(e.target.value)}
                  className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#101017] text-white">Any Hair Color</option>
                  {hairColors.map(h => (
                    <option key={h} value={h} className="bg-[#101017] text-white">{h}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Toggle advanced */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl border transition-all ${
                showAdvancedFilters
                  ? 'bg-copper-500/20 text-copper-300 border-copper-500/40'
                  : 'bg-[#131219] text-neutral-400 hover:text-white border-[#28211b]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvancedFilters ? 'Less Filters' : 'More Filters'}</span>
            </button>

            {(searchQuery || selectedCategory !== 'all' || selectedCity !== 'all' || selectedHair !== 'all') && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2 ml-1"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#131219] text-neutral-200 px-3.5 py-2 rounded-xl border border-[#28211b] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured & VIP</option>
              <option value="newest">Recently Added</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          <span>Available Models</span>
          <span className="px-3 py-0.5 rounded-full bg-copper-500/15 text-copper-400 text-xs font-bold border border-copper-500/30">
            {filteredModels.length}
          </span>
        </h2>
        {selectedCity !== 'all' && (
          <span className="text-xs text-copper-400 font-medium">
            Location: {selectedCity}
          </span>
        )}
      </div>

      {/* Grid of Models with Curves */}
      {displayedModels.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-[#0a0a0e] rounded-[30px] border border-[#221c17]">
          <Sparkles className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No models match your criteria</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
            Try adjusting your search query or resetting filters to browse all 236 portfolios.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-600 text-white font-bold text-xs hover:from-copper-400 hover:to-copper-500 transition-all shadow-[0_0_20px_rgba(200,125,85,0.4)]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + 24)}
            className="px-9 py-3.5 rounded-2xl bg-[#121118] hover:bg-gradient-to-r hover:from-copper-500 hover:to-copper-600 hover:text-white text-copper-300 font-bold text-xs uppercase tracking-wider border border-copper-500/40 hover:border-copper-500 transition-all shadow-lg"
          >
            Load More Portfolios ({filteredModels.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </section>
  );
}
