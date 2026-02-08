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

  // Command + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
      }
      if (e.key === '/') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl z-[1000] px-4">
      {/* The Super Bar */}
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          y: isFocused ? -5 : 0 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative group bg-white rounded-[32px] md:rounded-full border-2 transition-all duration-500 overflow-hidden ${
          isFocused 
            ? 'border-indigo-600 shadow-cinematic glow-indigo' 
            : 'border-zinc-200 shadow-soft hover:border-zinc-300'
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
          className="w-full bg-transparent pl-18 pr-48 py-6 md:py-8 text-xl md:text-2xl text-zinc-900 focus:outline-none placeholder:text-zinc-200 font-sans tracking-tight"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md border border-zinc-100 bg-zinc-50 text-[10px] font-black text-zinc-400">
            <Command className="h-3 w-3" /> K
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 text-white pl-6 pr-4 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-md">
            <span>Find Truth</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Cinematic Suggestions */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-[115%] left-4 right-4 bg-white rounded-[32px] border border-zinc-100 shadow-cinematic p-8 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8 px-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">AI-Powered Intelligence</span>
              <div className="flex gap-4">
                <span className="text-[10px] font-bold text-indigo-600 underline cursor-pointer">Professors</span>
                <span className="text-[10px] font-bold text-zinc-400 cursor-pointer hover:text-zinc-900">Universities</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { type: 'Professor', name: 'Alistair Moffat', sub: 'UniMelb • Computer Science', rating: 'Green' },
                { type: 'Course', name: 'BUSS1000', sub: 'USYD • Business Environment', rating: 'Yellow' },
                { type: 'Course', name: 'COMP10001', sub: 'UniMelb • Foundations of Computing', rating: 'Green' },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 rounded-2xl hover:bg-zinc-50 transition-all group border border-transparent hover:border-zinc-100">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all uppercase">
                      {res.type[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-zinc-900 text-lg group-hover:text-indigo-600 transition-colors tracking-tight">{res.name}</div>
                      <div className="text-sm text-zinc-400 font-serif italic">{res.sub}</div>
                    </div>
                  </div>
                  <RatingIndicator rating={res.rating as any} label={res.rating === 'Green' ? 'SAFE' : 'WARN'} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
