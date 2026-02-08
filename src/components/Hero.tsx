'use client';

import React from 'react';
import GpaRollingNumber from './GpaRollingNumber';
import { useI18n } from './I18nContext';

const Hero = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Live for 2026 Semester 1
      </div>
      
      <h1 className="mb-8 text-6xl md:text-9xl font-serif font-black tracking-tight text-zinc-900 leading-[0.9]">
        {t.title} <br />
        <span className="text-indigo-600 block mt-4">
          {t.subtitle} <GpaRollingNumber target={7.0} />
        </span>
      </h1>
      
      <p className="mb-12 text-xl md:text-2xl font-serif text-zinc-600 max-w-2xl mx-auto leading-relaxed italic">
        &ldquo;{t.desc}&rdquo;
      </p>
    </div>
  );
};

export default Hero;
