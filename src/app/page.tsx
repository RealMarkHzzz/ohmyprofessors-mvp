'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import LiveFeed from '@/components/LiveFeed';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import { useI18n } from '@/components/I18nContext';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { lang, setLang } = useI18n();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-transparent">
      {/* 2026 Ambient Intelligence Layer */}
      <BackgroundAmbient />

      {/* Cinematic Dimming Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-[2px] z-[400] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Block 1: Professional Header (Weakened) */}
      <nav className={`sticky top-0 z-[500] w-full border-b border-transparent transition-all duration-700 ${
        isSearchFocused ? 'opacity-10 scale-[0.98] blur-sm' : 'opacity-100'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900 opacity-20 hover:opacity-100 transition-opacity">
            <span className="text-xl tracking-tighter italic">OMP.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              {[
                { code: 'en', label: 'EN' },
                { code: 'zh', label: '中' },
                { code: 'hi', label: 'हि' },
                { code: 'vi', label: 'VN' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as any)}
                  className={`text-[10px] font-bold transition-all ${
                    lang === l.code ? 'text-indigo-600 underline underline-offset-4' : 'text-zinc-300 hover:text-zinc-600'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Block 2: Social Proof Ticker (Weakened on focus) */}
      <div className={`w-full transition-all duration-700 ${isSearchFocused ? 'opacity-5 blur-md' : 'opacity-100'}`}>
        <LiveFeed />
      </div>

      <div className="relative w-full flex flex-col items-center">
        {/* Block 3: The "Absolute Center" Hub */}
        <section className="w-full flex flex-col items-center justify-center h-[90vh] md:h-screen px-6 -mt-16 md:-mt-20">
          <motion.div 
            animate={{ 
              y: isSearchFocused ? -40 : 0,
              opacity: isSearchFocused ? 0.4 : 1,
              scale: isSearchFocused ? 0.95 : 1
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16"
          >
            <Hero />
          </motion.div>
          
          <SearchBar onFocusChange={setIsSearchFocused} />

          <motion.div 
            animate={{ opacity: isSearchFocused ? 0 : 0.2 }}
            className="mt-20 flex flex-col items-center gap-2"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-900 font-sans">Start Exploration</span>
            <div className="h-12 w-px bg-gradient-to-b from-zinc-900 to-transparent" />
          </motion.div>
        </section>

        {/* Following Sections (Heavily Weakened on Focus) */}
        <div className={`w-full transition-all duration-700 ${
          isSearchFocused ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          {/* Block 4: Visual University Belt */}
          <section className="w-full py-16 flex justify-center border-y border-zinc-100/50 bg-white/20 backdrop-blur-sm overflow-hidden px-6">
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale filter">
              {['UniMelb', 'USYD', 'UNSW', 'Monash', 'UQ', 'ANU'].map(uni => (
                <span key={uni} className="font-serif text-2xl font-bold italic tracking-tighter text-zinc-900">{uni}</span>
              ))}
            </div>
          </section>

          {/* Block 5: The Intelligence Grid */}
          <section className="w-full py-32 flex flex-col items-center gap-24">
            <div className="text-center px-6">
              <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-zinc-900 italic mb-6">Inside the Database</h2>
              <p className="text-zinc-400 font-sans text-[10px] font-black uppercase tracking-[0.4em]">Peer-verified academic survival data</p>
            </div>
            <HeroCards />
          </section>

          {/* Block 6: Conversion Zone */}
          <section className="w-full py-40 flex flex-col items-center">
            <EmailOptIn />
          </section>

          {/* Block 7: Footer */}
          <footer className="w-full py-20 px-6 flex flex-col items-center gap-10 border-t border-zinc-100">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-zinc-200 font-sans">
              Oh My Professors &bull; Built for the Class of 2029 &bull; AU
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
