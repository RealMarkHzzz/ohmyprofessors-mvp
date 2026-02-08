'use client';

import React, { useState } from 'react';
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
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-none border-2 border-zinc-900 bg-white px-6 py-5 text-lg text-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg className="h-6 w-6 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isFocused && (
        <div className="absolute top-full mt-2 w-full border-2 border-zinc-900 bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">Trending</h3>
          <div className="space-y-3">
            {trendingGuides.map((guide) => (
              <div
                key={guide.code}
                className="flex cursor-pointer items-center justify-between border border-transparent p-2 transition-colors hover:border-zinc-900 hover:bg-zinc-50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900">{guide.code}</span>
                    {guide.warning && (
                      <span className="bg-red-600 px-1.5 py-0.5 text-[10px] font-black text-white uppercase">
                        Warning
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500 font-serif italic">{guide.name}</div>
                </div>
                <RatingIndicator rating={guide.rating as any} label={guide.rating === 'Green' ? 'Safe' : guide.rating === 'Yellow' ? 'Caution' : 'Danger'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
