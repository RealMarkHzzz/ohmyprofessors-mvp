'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import LiveFeed from '@/components/LiveFeed';
import { useI18n } from '@/components/I18nContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { lang, setLang } = useI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white selection:bg-indigo-50 selection:text-indigo-900">
      {/* Block 1: Professional Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
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
          {/* Diffused Background Logic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-indigo-50/50 blur-[160px] rounded-full -z-10" />
          
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
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-900">Intelligence Briefings</span>
            <div className="h-12 w-px bg-gradient-to-b from-zinc-900 to-transparent" />
          </motion.div>
        </section>

        {/* Block 4: Visual University Belt (Placeholder for now) */}
        <section className="w-full py-12 flex justify-center border-y border-zinc-50 overflow-hidden px-6">
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale filter transition-all hover:grayscale-0">
            {['UniMelb', 'USYD', 'UNSW', 'Monash', 'UQ', 'ANU'].map(uni => (
              <span key={uni} className="font-serif text-xl font-bold italic tracking-tighter">{uni}</span>
            ))}
          </div>
        </section>

        {/* Block 5: The Intelligence Grid */}
        <section className="w-full py-32 flex flex-col items-center gap-20">
          <div className="text-center px-6">
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter text-zinc-900 italic mb-4">Inside the Database</h2>
            <p className="text-zinc-400 font-sans text-xs font-bold uppercase tracking-[0.3em]">Peer-verified academic survival data</p>
          </div>
          <HeroCards />
        </section>

        {/* Block 6: Conversion Zone */}
        <section className="w-full py-40 bg-zinc-50/50 border-y border-zinc-100 flex flex-col items-center">
          <EmailOptIn />
        </section>

        {/* Block 7: Minimalist Footer */}
        <footer className="w-full py-20 px-6 flex flex-col items-center gap-10">
          <div className="flex gap-8">
            {['Policy', 'Legal', 'Integrity', 'Terms'].map(link => (
              <button key={link} className="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-indigo-600 transition-colors">{link}</button>
            ))}
          </div>
          <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-zinc-200">
            Oh My Professors &bull; Built for the Class of 2029 &bull; AU
          </p>
        </footer>
      </div>
    </main>
  );
}
