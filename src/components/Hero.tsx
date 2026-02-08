'use client';

import React from 'react';
import GpaRollingNumber from './GpaRollingNumber';
import { useI18n } from './I18nContext';

const Hero = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
      {/* Badge: Compact & Subtle */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        Live for 2026
      </div>
      
      {/* Slogan: Scaled for Screen Real Estate */}
      <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-serif font-black tracking-tight text-zinc-900 leading-[1.1]">
        {t.title} <br />
        <span className="text-indigo-600">
          {t.subtitle} <GpaRollingNumber target={7.0} />
        </span>
      </h1>
      
      {/* Description: Concise & Centered */}
      <p className="mb-0 text-sm md:text-base font-serif text-zinc-500 max-w-lg mx-auto leading-relaxed italic">
        &ldquo;{t.desc}&rdquo;
      </p>
    </div>
  );
};

export default Hero;
