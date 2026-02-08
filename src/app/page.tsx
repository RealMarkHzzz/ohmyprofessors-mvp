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
    <main className="flex min-h-screen flex-col items-center justify-start bg-white pb-32">
      {/* Top Navigation / Language Switcher */}
      <nav className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900">
            <span className="text-xl tracking-tighter">OMP.</span>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
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
                    className={`text-[10px] font-black uppercase tracking-widest transition-all hover:text-indigo-600 ${
                      lang === l.code ? 'text-indigo-600 underline underline-offset-4' : 'text-zinc-400'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6">
        {/* Hero Section - Increased top margin for breathing room */}
        <section className="pt-20 pb-16 md:pt-32 md:pb-24 w-full">
          <Hero />
        </section>

        {/* Search Section - Isolated with clear vertical margins */}
        <section className="w-full flex flex-col items-center gap-10 mb-24 md:mb-32">
          <SearchBar />
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300">
              {t.trending}
            </span>
            {['COMP10001', 'BUSS1000', 'PSYC1001'].map(code => (
              <button key={code} className="text-[11px] font-bold text-zinc-500 hover:text-indigo-600 border-b border-zinc-100 hover:border-indigo-600 transition-all px-1">
                {code}
              </button>
            ))}
          </div>
        </section>

        {/* Visual Break / Separator */}
        <div className="h-px w-16 bg-zinc-100 mb-24 md:mb-32" />

        {/* Interactive Cards - Ensuring enough space between grid and other sections */}
        <section className="w-full flex justify-center px-2 mb-32 md:mb-40">
          <HeroCards />
        </section>

        {/* Opt-in Section - Centered and clear */}
        <section className="w-full mb-20">
          <EmailOptIn />
        </section>

        {/* Footer */}
        <footer className="mt-20 flex w-full flex-col items-center gap-6 border-t border-zinc-100 pt-16">
          <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-zinc-200">
            Oh My Professors &bull; Australia &bull; 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
