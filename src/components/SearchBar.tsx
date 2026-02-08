'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, MapPin, GraduationCap, ArrowRight } from 'lucide-react';
import RatingIndicator from './RatingIndicator';
import { useI18n } from './I18nContext';

const SearchBar = () => {
  const { t } = useI18n();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const overlayRef = useRef(null);

  const capsules = [
    { code: 'COMP10001', label: 'Trending', icon: <Flame className="h-3 w-3 text-orange-500" /> },
    { code: 'UniMelb', label: 'G8', icon: <GraduationCap className="h-3 w-3 text-indigo-500" /> },
    { code: 'Sydney', label: 'Hot', icon: <MapPin className="h-3 w-3 text-red-500" /> },
  ];

  useLayoutEffect(() => {
    if (isFocused && overlayRef.current) {
      gsap.fromTo(".suggestion-item", 
        { opacity: 0, x: -10 }, 
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isFocused]);

  return (
    <div className="relative w-full max-w-3xl px-4 z-[200]">
      {/* Search Container */}
      <motion.div 
        layout
        className={`relative group bg-white rounded-[32px] border-2 transition-all duration-500 ${
          isFocused ? 'border-indigo-600 shadow-float scale-[1.03]' : 'border-zinc-200 shadow-soft hover:border-zinc-300'
        }`}
      >
        <div className="absolute left-8 top-1/2 -translate-y-1/2">
          <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-indigo-600' : 'text-zinc-400'}`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder="Search courses, professors, or universities..."
          className="w-full bg-transparent pl-18 pr-32 py-7 text-xl text-zinc-900 focus:outline-none placeholder:text-zinc-300 font-medium"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button className="flex items-center gap-2 bg-indigo-600 text-white pl-6 pr-4 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-md">
            Find Truth
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Dynamic Suggestions Overlay */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            ref={overlayRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[115%] left-4 right-4 bg-white rounded-3xl border border-zinc-100 shadow-float p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Omni-Search Intelligence</span>
              <span className="text-[10px] font-bold text-indigo-600 underline cursor-pointer">Browse by University</span>
            </div>
            
            <div className="space-y-2">
              {[
                { type: 'Professor', name: 'Alistair Moffat', sub: 'UniMelb • Computer Science', rating: 'Green' },
                { type: 'Course', name: 'BUSS1000', sub: 'USYD • Business Environment', rating: 'Yellow' },
                { type: 'Course', name: 'COMP10001', sub: 'UniMelb • Foundations of Computing', rating: 'Green' },
              ].map((res, i) => (
                <button key={i} className="suggestion-item w-full flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors uppercase">
                      {res.type[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{res.name}</div>
                      <div className="text-xs text-zinc-500 font-serif italic">{res.sub}</div>
                    </div>
                  </div>
                  <RatingIndicator rating={res.rating as any} label={res.rating === 'Green' ? 'SAFE' : 'WARN'} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Capsule Shortcuts */}
      {!isFocused && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {capsules.map((c) => (
            <button key={c.code} className="flex items-center gap-2 bg-white border border-zinc-100 px-4 py-2 rounded-full shadow-soft hover:shadow-md hover:border-indigo-200 transition-all group">
              {c.icon}
              <span className="text-xs font-bold text-zinc-500 group-hover:text-indigo-600">{c.code}</span>
              <span className="text-[8px] font-black text-zinc-300 uppercase">{c.label}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
