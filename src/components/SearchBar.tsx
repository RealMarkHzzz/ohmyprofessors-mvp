'use client';

import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import RatingIndicator from './RatingIndicator';
import { useI18n } from './I18nContext';

const SearchBar = () => {
  const { t } = useI18n();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const trendingGuides = [
    { code: 'COMP10001', name: 'Foundations of Computing', rating: 'Green', warning: false },
    { code: 'BUSS1000', name: 'Business Environment', rating: 'Yellow', warning: true },
    { code: 'PSYC1001', name: 'Psychology 1A', rating: 'Red', warning: true },
  ];

  return (
    <div className="relative w-full max-w-2xl group px-4">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
          <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-indigo-600' : 'text-zinc-400'}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder={t.searchPlaceholder}
          className="w-full border-2 border-zinc-900 bg-white pl-14 pr-6 py-6 text-xl text-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:outline-none placeholder:text-zinc-300 font-sans"
        />
      </div>

      {isFocused && (
        <div className="absolute top-[110%] left-4 right-4 bg-white border-2 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Survival Database</h3>
            <span className="text-[10px] font-bold text-zinc-400">34,201 REVIEWS</span>
          </div>
          <div className="divide-y divide-zinc-100">
            {trendingGuides.map((guide) => (
              <button
                key={guide.code}
                className="w-full flex items-center justify-between p-5 transition-all hover:bg-zinc-50 text-left active:bg-zinc-100"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-black text-zinc-900 text-lg tracking-tight">{guide.code}</span>
                    {guide.warning && (
                      <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded text-[9px] font-black text-red-600 border border-red-100 uppercase">
                        <AlertTriangle className="h-3 w-3" />
                        Hard Marker
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500 font-serif font-medium">{guide.name}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <RatingIndicator rating={guide.rating as any} label={guide.rating === 'Green' ? 'SAFE' : guide.rating === 'Yellow' ? 'CAUTION' : 'RISKY'} />
                  <span className="text-[9px] font-bold text-zinc-300">Updated 2h ago</span>
                </div>
              </button>
            ))}
          </div>
          <div className="p-3 bg-zinc-50/50 text-center">
            <p className="text-[10px] text-zinc-400 font-medium italic">Can&apos;t find your unit? Join the waitlist below.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
