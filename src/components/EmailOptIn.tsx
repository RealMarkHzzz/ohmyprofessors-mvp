'use client';

import React, { useState } from 'react';
import { useI18n } from './I18nContext';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const EmailOptIn = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-zinc-950 rounded-[48px] p-10 md:p-20 text-white shadow-float overflow-hidden">
        {/* Floating Background Effects */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-emerald-600/20 blur-[120px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Join the High Mark Club</span>
          </div>

          <h3 className="mb-6 text-4xl md:text-6xl font-sans font-black tracking-tight leading-none uppercase italic">
            Access the 2026 <br/> Survival Guide
          </h3>
          <p className="mb-12 text-zinc-400 font-serif text-lg md:text-xl max-w-md leading-relaxed">
            Pure student intelligence. Verified .edu.au entries. <br/> No guesswork, just results.
          </p>
          
          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-indigo-600 p-8 rounded-3xl font-black text-xl uppercase tracking-widest"
            >
              ✓ Welcome to the Club
            </motion.div>
          ) : (
            <div className="w-full max-w-md">
              <form 
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col gap-4 sm:flex-row p-2 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@unimelb.edu.au"
                  className="flex-1 bg-transparent px-6 py-4 font-sans text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-zinc-950 px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Join
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-6 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                Verification required for full intelligence access
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailOptIn;
