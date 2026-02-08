'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import LiveFeed from '@/components/LiveFeed';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import { useI18n } from '@/components/I18nContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { lang, setLang } = useI18n();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-[#F8F9FA] selection:bg-indigo-50 selection:text-indigo-900 overflow-x-hidden">
      {/* 2026 Ambient Intelligence Layer */}
      <BackgroundAmbient />

      {/* Cinematic Dimming Overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-[4px] z-[400] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Block 1: Professional Header */}
      <nav className={`fixed top-0 z-[500] w-full border-b border-transparent transition-all duration-700 ${
        isSearchFocused ? 'opacity-0 blur-sm pointer-events-none' : 'opacity-100'
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900 opacity-20 hover:opacity-100 transition-opacity text-xl italic">
            OMP.
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              {[
                { code: 'en', label: 'EN' },
                { code: 'zh', label: '中' },
                { code: 'hi', label: 'हि' },
                { code: 'vi', label: 'VN' }
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as any)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all ${
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

      {/* Block 2: Social Proof Ticker */}
      <div className={`fixed top-[64px] w-full z-[450] transition-all duration-700 ${isSearchFocused ? 'opacity-0 blur-md pointer-events-none' : 'opacity-100'}`}>
        <LiveFeed />
      </div>

      <div className="relative w-full flex flex-col items-center">
        {/* Block 3: The "Absolute Center" Hub */}
        <section className="relative w-full h-screen flex flex-col items-center px-6">
          
          {/* Static container for positioning at 40% */}
          <div className="absolute top-[40%] -translate-y-1/2 w-full flex flex-col items-center gap-8 md:gap-12">
            
            {/* HERO - This FADES on search focus */}
            <motion.div 
              animate={{ 
                opacity: isSearchFocused ? 0.3 : 1,
                scale: isSearchFocused ? 0.95 : 1,
                filter: isSearchFocused ? 'blur(2px)' : 'blur(0px)'
              }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Hero />
            </motion.div>
            
            {/* SEARCH BAR - This stays BRIGHT and high z-index */}
            <div className="w-full flex flex-col items-center gap-8 relative z-[1000]">
              <SearchBar onFocusChange={setIsSearchFocused} />
              
              <motion.div 
                animate={{ opacity: isSearchFocused ? 0 : 1, y: isSearchFocused ? 10 : 0 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Popular:</span>
                {['COMP10001', 'BUSS1000', 'PSYC1001'].map(code => (
                  <button key={code} className="bg-white border border-zinc-100 px-3 py-1 rounded-md text-[10px] font-bold text-zinc-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
                    {code}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ opacity: isSearchFocused ? 0 : 0.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-900 font-sans tracking-widest">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-zinc-900 to-transparent" />
          </motion.div>
        </section>

        {/* Following Sections */}
        <div className={`w-full transition-all duration-700 ${
          isSearchFocused ? 'opacity-0 translate-y-20 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}>
          {/* Block 4: Intelligence Grid */}
          <section className="w-full py-32 flex flex-col items-center gap-24">
            <div className="text-center px-6">
              <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-zinc-900 italic mb-6">Database.</h2>
              <p className="text-zinc-400 font-sans text-[10px] font-black uppercase tracking-[0.5em]">Peer-verified academic survival data</p>
            </div>
            <HeroCards />
          </section>

          {/* Block 5: Conversion Zone */}
          <section className="w-full py-40 flex flex-col items-center">
            <EmailOptIn />
          </section>

          {/* Block 6: Footer */}
          <footer className="w-full py-20 px-6 flex flex-col items-center gap-10 border-t border-zinc-100">
            <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-zinc-200 font-sans tracking-widest">
              Oh My Professors &bull; Australia &bull; 2026
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
