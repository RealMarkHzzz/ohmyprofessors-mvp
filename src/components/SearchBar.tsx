'use client';

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Command } from 'lucide-react';
import RatingIndicator from './RatingIndicator';
import { useI18n } from './I18nContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onFocusChange?: (isFocused: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocusChange }) => {
  const { t } = useI18n();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

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
    <div className="relative w-full max-w-4xl z-[1000] px-4 mx-auto font-sans">
      {/* The Super Bar (Shadcn + Motion) */}
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.03 : 1,
          y: isFocused ? -10 : 0 
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative"
      >
        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder="Search courses, professors, or universities..."
          className={`w-full h-20 md:h-24 pl-16 pr-48 text-xl md:text-2xl rounded-full border-2 bg-background transition-all duration-500 focus-visible:ring-0 ${
            isFocused ? 'border-primary shadow-cinematic' : 'border-border shadow-neo hover:border-muted-foreground/30'
          }`}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
          {!isFocused && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-muted text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <Command className="h-3 w-3" /> K
            </div>
          )}
          <Button 
            size="lg"
            className={`rounded-full px-8 h-14 font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
              isFocused ? 'bg-primary' : 'bg-foreground'
            }`}
          >
            <span>Find Truth</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Cinematic Suggestions */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[115%] left-4 right-4 z-[1100]"
          >
            <Card className="rounded-[32px] border-2 border-foreground shadow-neo-lg p-8 overflow-hidden bg-background">
              <div className="flex items-center justify-between mb-8 px-2 border-b pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-success animate-pulse" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Omni-Search Active</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-[10px] font-bold text-primary underline cursor-pointer decoration-2 underline-offset-4">Top Matches</span>
                  <span className="text-[10px] font-bold text-muted-foreground cursor-pointer hover:text-foreground transition-colors uppercase">By Department</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { type: 'Professor', name: 'Alistair Moffat', sub: 'UniMelb • Computing', rating: 'Green' },
                  { type: 'Course', name: 'BUSS1000', sub: 'USYD • Business Environment', rating: 'Yellow' },
                  { type: 'Course', name: 'COMP10001', sub: 'UniMelb • Foundations of Computing', rating: 'Green' },
                ].map((res, i) => (
                  <button key={i} className="suggestion-item w-full flex items-center justify-between p-5 rounded-2xl hover:bg-accent transition-all group border-2 border-transparent hover:border-border">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-2xl bg-muted border flex items-center justify-center text-[10px] font-black text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all uppercase shadow-sm">
                        {res.type[0]}
                      </div>
                      <div className="text-left">
                        <div className="font-black text-foreground text-lg group-hover:text-primary transition-colors tracking-tighter uppercase leading-none">{res.name}</div>
                        <div className="text-sm text-muted-foreground font-serif italic font-medium mt-1">{res.sub}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <RatingIndicator rating={res.rating as any} label={res.rating === 'Green' ? 'SAFE' : 'WARN'} />
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t flex justify-center">
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">End of Intelligence Briefing</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
