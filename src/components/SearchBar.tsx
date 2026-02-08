'use client';

import React, { useState } from 'react';
import RatingIndicator from './RatingIndicator';

const SearchBar = () => {
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
          placeholder="Enter your unit code (e.g., COMP10001)..."
          className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-6 py-4 text-lg text-zinc-900 shadow-xl transition-all focus:border-blue-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg className="h-6 w-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isFocused && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-50">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">Trending Survival Guides</h3>
          <div className="space-y-3">
            {trendingGuides.map((guide) => (
              <div
                key={guide.code}
                className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{guide.code}</span>
                    {guide.warning && (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        WORKLOAD WARNING
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500">{guide.name}</div>
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
