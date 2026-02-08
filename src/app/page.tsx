'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import LiveFeed from '@/components/LiveFeed';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import { useI18n } from '@/components/I18nContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { lang, setLang } = useI18n();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-transparent selection:bg-indigo-50 selection:text-indigo-900">
      {/* 2026 Ambient Intelligence Layer */}
      <BackgroundAmbient />

      {/* Block 1: Professional Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-zinc-100 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900">
            <span className="text-xl tracking-tighter italic underline decoration-indigo-500 decoration-4 underline-offset-2">OMP.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 mr-6 border-r border-zinc-100 pr-6">
              {['Universities', 'Rankings', 'About'].map(nav => (
                <button key={nav} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-indigo-600 transition-colors">{nav}</button>
              ))}
            </div>
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
                    lang === l.code ? 'text-indigo-600 underline underline-offset-4' : 'text-zinc-400 hover:text-zinc-600'
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
      <LiveFeed />

      <div className="relative w-full flex flex-col items-center">
        {/* Block 3: The "Action Hub" Hero */}
        <section className="w-full flex flex-col items-center justify-center min-h-[85vh] py-20 px-6 overflow-hidden">
          <Hero />
          
          <div className="w-full flex flex-col items-center gap-12 mt-16 relative">
            <SearchBar />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-20 flex flex-col items-center gap-2 opacity-30"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-900 font-sans">Intelligence Briefings</span>
            <div className="h-12 w-px bg-gradient-to-b from-zinc-900 to-transparent" />
          </motion.div>
        </section>

        {/* Block 4: Visual University Belt */}
        <section className="w-full py-16 flex justify-center border-y border-zinc-100/50 bg-white/20 backdrop-blur-sm overflow-hidden px-6">
          <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale filter transition-all hover:grayscale-0">
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

        {/* Block 7: Minimalist Footer */}
        <footer className="w-full py-20 px-6 flex flex-col items-center gap-10 border-t border-zinc-100">
          <div className="flex gap-8">
            {['Policy', 'Legal', 'Integrity', 'Terms'].map(link => (
              <button key={link} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-indigo-600 transition-colors font-sans">{link}</button>
            ))}
          </div>
          <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-zinc-200 font-sans">
            Oh My Professors &bull; Built for the Class of 2029 &bull; AU
          </p>
        </footer>
      </div>
    </main>
  );
}
