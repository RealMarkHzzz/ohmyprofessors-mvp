'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import { useI18n } from '@/components/I18nContext';
import { Globe } from 'lucide-react';

export default function Home() {
  const { lang, setLang, t } = useI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white selection:bg-indigo-50 selection:text-indigo-900">
      {/* Block 1: Compact Header */}
      <nav className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 md:py-4">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900">
            <span className="text-lg tracking-tighter">OMP.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Globe className="h-3.5 w-3.5 text-zinc-300" />
            <div className="flex gap-3">
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

      {/* Block 2: The "Above the Fold" Hub */}
      <section className="w-full max-w-5xl px-6 flex flex-col items-center justify-center min-h-[calc(80vh-60px)] gap-10 py-10">
        <Hero />
        
        <div className="w-full flex flex-col items-center gap-6">
          <SearchBar />
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300">
              {t.trending}:
            </span>
            {['COMP10001', 'BUSS1000', 'PSYC1001'].map(code => (
              <button key={code} className="text-[10px] font-bold text-zinc-400 hover:text-indigo-600 transition-colors">
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Peeking Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1 opacity-20">
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-900">Scroll</span>
          <div className="h-4 w-[1px] bg-zinc-900" />
        </div>
      </section>

      {/* Block 3: Secondary Intelligence Grid */}
      <section className="w-full max-w-5xl px-6 py-20 bg-zinc-50/50 border-y border-zinc-100 flex flex-col items-center gap-12">
        <div className="text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Quick Intelligence</h2>
          <div className="h-px w-8 bg-zinc-200 mx-auto" />
        </div>
        <HeroCards />
      </section>

      {/* Block 4: Conversion Zone */}
      <section className="w-full max-w-5xl px-6 py-32 flex flex-col items-center">
        <EmailOptIn />
      </section>

      {/* Block 5: Minimal Footer */}
      <footer className="w-full border-t border-zinc-100 py-12 flex flex-col items-center gap-4">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-200">
          Oh My Professors &bull; Australia &bull; 2026
        </p>
      </footer>
    </main>
  );
}
