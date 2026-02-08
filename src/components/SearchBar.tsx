'use client';

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Flame, MapPin, GraduationCap, ArrowRight, Command } from 'lucide-react';
import RatingIndicator from './RatingIndicator';
import { useI18n } from './I18nContext';

interface SearchBarProps {
  onFocusChange?: (isFocused: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocusChange }) => {
  const { t } = useI18n();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    onFocusChange?.(isFocused);
  }, [isFocused, onFocusChange]);

  // Command + K / Slash listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (((e.metaKey || e.ctrlKey) && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useLayoutEffect(() => {
    if (isFocused) {
      gsap.fromTo(".suggestion-item", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [isFocused]);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl z-[1000] px-4 mx-auto">
      {/* 2. Component Evolution: The Super Bar (Spotlight Style) */}
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.03 : 1,
          y: isFocused ? -10 : 0 
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative group bg-white rounded-3xl md:rounded-full border-2 transition-all duration-500 overflow-hidden ${
          isFocused 
            ? 'border-indigo-600 shadow-cinematic glow-indigo' 
            : 'border-zinc-200 shadow-soft hover:border-zinc-300'
        }`}
      >
        <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-indigo-600' : 'text-zinc-400'}`} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder="Search courses, professors, or universities..."
          className="w-full bg-transparent pl-18 pr-48 py-6 md:py-8 text-xl md:text-2xl text-zinc-900 focus:outline-none placeholder:text-zinc-200 font-sans tracking-tight"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
          {!isFocused && (
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md border border-zinc-100 bg-zinc-50 text-[10px] font-black text-zinc-400">
              <Command className="h-3 w-3" /> K
            </div>
          )}
          <button className={`flex items-center gap-2 bg-zinc-900 text-white pl-6 pr-4 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-md ${
            isFocused ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:bg-zinc-800'
          }`}>
            <span>Find Truth</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* 3. Interaction Magic: Cinematic Suggestions Transformation */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[115%] left-4 right-4 bg-white rounded-[32px] border-2 border-zinc-900 shadow-cinematic p-8 overflow-hidden z-[1100]"
          >
            <div className="flex items-center justify-between mb-8 px-2 border-b border-zinc-50 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Omni-Search Active</span>
              </div>
              <div className="flex gap-6">
                <span className="text-[10px] font-bold text-indigo-600 underline cursor-pointer decoration-2 underline-offset-4">Top Matches</span>
                <span className="text-[10px] font-bold text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors">By Department</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { type: 'Professor', name: 'Alistair Moffat', sub: 'UniMelb • Computing', rating: 'Green' },
                { type: 'Course', name: 'BUSS1000', sub: 'USYD • Business Environment', rating: 'Yellow' },
                { type: 'Course', name: 'COMP10001', sub: 'UniMelb • Foundations of Computing', rating: 'Green' },
              ].map((res, i) => (
                <button key={i} className="suggestion-item w-full flex items-center justify-between p-5 rounded-2xl hover:bg-indigo-50/50 transition-all group border-2 border-transparent hover:border-indigo-100">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all uppercase shadow-sm">
                      {res.type[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-sans font-black text-zinc-900 text-lg group-hover:text-indigo-600 transition-colors tracking-tighter uppercase">{res.name}</div>
                      <div className="text-xs text-zinc-400 font-serif italic font-medium">{res.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RatingIndicator rating={res.rating as any} label={res.rating === 'Green' ? 'SAFE' : 'WARN'} />
                    <ArrowRight className="h-4 w-4 text-zinc-200 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-50 flex justify-center">
              <p className="text-[10px] text-zinc-300 font-black uppercase tracking-widest">End of Intelligence Briefing</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
