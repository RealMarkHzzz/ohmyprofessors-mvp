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
    <main className="flex min-h-screen flex-col items-center justify-start bg-white pb-20">
      {/* Top Navigation / Language Switcher */}
      <nav className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-serif font-black text-zinc-900">
            <span className="text-xl">OMP.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Globe className="h-4 w-4 text-zinc-400" />
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
                  className={`text-xs font-bold tracking-tighter transition-all hover:text-indigo-600 ${
                    lang === l.code ? 'text-indigo-600' : 'text-zinc-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-24 px-6 pt-16 md:pt-32">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <div className="flex w-full flex-col items-center gap-8 -mt-12">
          <SearchBar />
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {t.trending}:
            </span>
            {['COMP10001', 'BUSS1000', 'PSYC1001'].map(code => (
              <button key={code} className="text-xs font-bold text-zinc-600 hover:text-indigo-600 hover:underline underline-offset-4 transition-colors">
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-32 bg-zinc-100" />

        {/* Interactive Cards */}
        <div className="w-full flex justify-center px-4">
          <HeroCards />
        </div>

        {/* Opt-in Section */}
        <EmailOptIn />

        {/* Footer */}
        <footer className="mt-20 flex w-full flex-col items-center gap-6 border-t border-zinc-100 pt-16">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">
            Oh My Professors &bull; Australia &bull; 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
