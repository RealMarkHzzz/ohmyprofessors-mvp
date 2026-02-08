'use client';

import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
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
      <div className={`relative transition-all duration-300 ${isFocused ? 'ring-4 ring-indigo-500/10' : ''}`}>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
          <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-indigo-600' : 'text-zinc-400'}`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder={t.searchPlaceholder}
          className="w-full border-2 border-zinc-900 bg-white pl-12 pr-24 py-4 md:py-5 text-base md:text-lg text-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-none focus:outline-none placeholder:text-zinc-300 font-sans"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button className="bg-zinc-900 text-white px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
            Search
          </button>
        </div>
      </div>

      {isFocused && (
        <div className="absolute top-[110%] left-4 right-4 bg-white border-2 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-3 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Quick Select</h3>
          </div>
          <div className="divide-y divide-zinc-100 max-h-[300px] overflow-y-auto">
            {trendingGuides.map((guide) => (
              <button
                key={guide.code}
                className="w-full flex items-center justify-between p-4 transition-all hover:bg-zinc-50 text-left active:bg-zinc-100"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-black text-zinc-900 text-base tracking-tight">{guide.code}</span>
                    {guide.warning && (
                      <span className="bg-red-50 px-1 py-0.5 rounded text-[8px] font-black text-red-600 border border-red-100 uppercase flex items-center gap-1">
                        <AlertTriangle className="h-2 w-2" />
                        Warning
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 font-serif italic line-clamp-1">{guide.name}</div>
                </div>
                <RatingIndicator rating={guide.rating as any} label={guide.rating === 'Green' ? 'SAFE' : guide.rating === 'Yellow' ? 'WARN' : 'RISK'} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
