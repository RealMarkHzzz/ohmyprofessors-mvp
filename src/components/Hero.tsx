'use client';

import React from 'react';
import GpaRollingNumber from './GpaRollingNumber';
import { useI18n } from './I18nContext';

const Hero = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
      <h1 className="mb-6 text-5xl md:text-8xl font-serif font-extrabold tracking-tight text-zinc-900 leading-tight">
        {t.title} <br />
        <span className="text-indigo-600 italic">
          {t.subtitle} <GpaRollingNumber target={7.0} />
        </span>
      </h1>
      <p className="mb-12 text-lg md:text-xl font-serif text-zinc-600 max-w-2xl mx-auto leading-relaxed">
        {t.desc}
      </p>
    </div>
  );
};

export default Hero;
