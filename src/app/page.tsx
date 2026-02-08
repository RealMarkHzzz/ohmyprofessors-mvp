import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 font-serif">
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-20 px-6 py-24 md:py-32">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <div className="flex w-full flex-col items-center gap-6 -mt-8">
          <SearchBar />
          <p className="text-sm text-zinc-400 font-sans tracking-wide uppercase">
            Quick check: <span className="font-semibold text-zinc-600">COMP10001</span>, 
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
        <footer className="mt-12 flex flex-col items-center gap-4 border-t border-zinc-200 pt-12 w-full">
          <p className="text-center text-xs text-zinc-400 font-sans uppercase tracking-widest">
            Oh My Professors &copy; 2026 • Supporting AU Higher Ed
          </p>
        </footer>
      </div>
    </main>
  );
}
