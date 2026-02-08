'use client';

import React, { useState } from 'react';
import { useI18n } from './I18nContext';
import { Send, CheckCircle2 } from 'lucide-react';

const EmailOptIn = () => {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="relative bg-zinc-900 p-10 md:p-16 text-white shadow-[20px_20px_0px_0px_rgba(79,70,229,0.1)] overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="mb-4 text-4xl font-black uppercase tracking-tighter italic leading-none">
            {t.joinBeta}
          </h3>
          <p className="mb-10 text-zinc-400 font-serif text-xl max-w-md">
            {t.waitlistDesc}
          </p>
          
          {submitted ? (
            <div className="flex w-full items-center justify-center gap-3 border-2 border-green-500/50 bg-green-500/10 p-6 text-green-400">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-bold text-lg uppercase tracking-widest">{t.added}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 sm:flex-row max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@unimelb.edu.au"
                  className="w-full border-2 border-zinc-700 bg-zinc-800 px-6 py-5 font-sans text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 bg-indigo-600 px-10 py-5 font-black text-white uppercase tracking-widest transition-all hover:bg-indigo-500 active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              >
                {t.access}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
          
          <p className="mt-8 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            Identity verification via .edu.au required for full access
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailOptIn;
