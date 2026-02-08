'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import GpaRollingNumber from './GpaRollingNumber';
import { useI18n } from './I18nContext';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const Hero = () => {
  const { t } = useI18n();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-badge", { opacity: 0, y: 10, duration: 0.8, ease: "power3.out" })
        .from(".hero-title", { opacity: 0, y: 20, duration: 1, ease: "expo.out" }, "-=0.4")
        .from(".hero-desc", { opacity: 0, duration: 1 }, "-=0.6")
        .from(".gpa-shield", { 
          scale: 0, 
          rotation: -45, 
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)" 
        }, "-=0.8");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto relative">
      {/* 1. Structural Fix: Badge is now definitely above and spaced */}
      <div className="hero-badge mb-12 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-5 py-2">
        <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 font-sans">
          50,000+ Verified Reviews Active
        </span>
      </div>
      
      <div className="relative inline-block">
        <h1 className="hero-title mb-6 text-5xl md:text-8xl font-serif font-black tracking-tight text-zinc-900 leading-[1.0]">
          {t.title} <br />
          <span className="text-indigo-600 relative inline-block mt-2">
            {t.subtitle} <GpaRollingNumber target={7.0} />
            
            {/* GPA Shield Visualizer - Reduced size to prevent overlap */}
            <div className="gpa-shield absolute -right-12 md:-right-16 top-0 md:-top-4 hidden sm:block pointer-events-none">
              <div className="relative flex h-14 w-14 md:h-20 md:w-24 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-float rotate-12">
                <ShieldCheck className="h-6 w-6 md:h-10 md:w-10" />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 md:h-8 md:w-8 rounded-full bg-brand-success border-2 border-white flex items-center justify-center">
                  <span className="text-[8px] md:text-[10px] font-black text-white">7.0</span>
                </div>
              </div>
            </div>
          </span>
        </h1>
      </div>
      
      <p className="hero-desc mt-6 text-base md:text-xl font-serif text-zinc-500 max-w-xl mx-auto leading-relaxed italic opacity-70">
        &ldquo;{t.desc}&rdquo;
      </p>
    </div>
  );
};

export default Hero;
