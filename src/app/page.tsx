'use client';

import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';
import { useI18n } from '@/components/I18nContext';

export default function Home() {
  const { lang, setLang, t } = useI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar / Lang Switcher */}
      <nav className="w-full max-w-5xl flex justify-end px-6 py-6 gap-4">
        {[
          { code: 'en', label: 'EN' },
          { code: 'zh', label: '中文' },
          { code: 'hi', label: 'हिन्दी' },
          { code: 'vi', label: 'Tiếng Việt' }
        ].map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code as any)}
            className={`text-xs font-bold tracking-widest uppercase transition-colors ${
              lang === l.code ? 'text-indigo-600 underline underline-offset-4' : 'text-zinc-400 hover:text-zinc-900'
            }`}
          >
            {l.label}
          </button>
        ))}
      </nav>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-20 px-6 py-12 md:py-24">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <div className="flex w-full flex-col items-center gap-6 -mt-8">
          <SearchBar />
          <p className="text-sm text-zinc-400 font-sans tracking-wide uppercase">
            {t.trending}: <span className="font-semibold text-zinc-600">COMP10001</span>, 
            <span className="font-semibold text-zinc-600"> BUSS1000</span>
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="w-full flex justify-center">
          <HeroCards />
        </div>

        {/* Opt-in Section */}
        <EmailOptIn />

        {/* Footer info */}
        <footer className="mt-12 flex flex-col items-center gap-4 border-t border-zinc-100 pt-12 w-full">
          <p className="text-center text-[10px] text-zinc-300 font-sans uppercase tracking-[0.2em]">
            Oh My Professors &copy; 2026 • Australia
          </p>
        </footer>
      </div>
    </main>
  );
}
