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
      // 2026 Entance Animation
      const tl = gsap.timeline();
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(".hero-title", { opacity: 0, y: 40, duration: 1, ease: "expo.out" }, "-=0.4")
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
    <div ref={containerRef} className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
      {/* Social Proof Mini-Badge */}
      <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2">
        <TrendingUp className="h-3 w-3 text-indigo-600" />
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 font-sans">
          50,000+ Verified Reviews Active
        </span>
      </div>
      
      <div className="relative inline-block">
        <h1 className="hero-title mb-6 text-6xl md:text-[120px] font-serif font-black tracking-tight text-zinc-900 leading-[0.85] md:leading-[0.85]">
          {t.title} <br />
          <span className="text-indigo-600 relative">
            {t.subtitle} <GpaRollingNumber target={7.0} />
            
            {/* GPA Shield Visualizer */}
            <div className="gpa-shield absolute -right-12 md:-right-20 top-0 md:-top-4 hidden sm:block">
              <div className="relative flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-float rotate-12">
                <ShieldCheck className="h-8 w-8 md:h-12 md:w-12" />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-brand-success border-4 border-white flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">7.0</span>
                </div>
              </div>
            </div>
          </span>
        </h1>
      </div>
      
      <p className="hero-desc mt-8 text-lg md:text-2xl font-serif text-zinc-500 max-w-2xl mx-auto leading-relaxed italic">
        &ldquo;{t.desc}&rdquo;
      </p>
    </div>
  );
};

export default Hero;
