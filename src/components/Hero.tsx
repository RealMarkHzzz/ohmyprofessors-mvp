'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GpaRollingNumber from './GpaRollingNumber';
import { useI18n } from './I18nContext';
import { ShieldCheck, TrendingUp } from 'lucide-react';

const Hero = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
      {/* Social Proof Mini-Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-2"
      >
        <TrendingUp className="h-3 w-3 text-indigo-600" />
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 font-sans">
          50,000+ Verified Reviews Active
        </span>
      </motion.div>
      
      <div className="relative inline-block">
        <h1 className="mb-6 text-6xl md:text-[120px] font-serif font-black tracking-tight text-zinc-900 leading-[0.85] md:leading-[0.85]">
          {t.title} <br />
          <span className="text-indigo-600 relative">
            {t.subtitle} <GpaRollingNumber target={7.0} />
            {/* GPA Shield Visualizer */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: 'spring' }}
              className="absolute -right-12 md:-right-20 top-0 md:-top-4 hidden sm:block"
            >
              <div className="relative flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-float rotate-12">
                <ShieldCheck className="h-8 w-8 md:h-12 md:w-12" />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-brand-success border-4 border-white flex items-center justify-center">
                  <span className="text-[10px] font-black">7.0</span>
                </div>
              </div>
            </motion.div>
          </span>
        </h1>
      </div>
      
      <p className="mt-8 text-lg md:text-2xl font-serif text-zinc-500 max-w-2xl mx-auto leading-relaxed italic">
        &ldquo;{t.desc}&rdquo;
      </p>
    </div>
  );
};

export default Hero;
