import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import HeroCards from '@/components/HeroCards';
import EmailOptIn from '@/components/EmailOptIn';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 dark:bg-zinc-950">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-16 px-6 py-20 sm:py-32">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <div className="flex w-full flex-col items-center gap-4">
          <SearchBar />
          <p className="text-sm text-zinc-400">
            Trending: <span className="font-medium text-zinc-600 dark:text-zinc-300">COMP10001</span>, 
            <span className="font-medium text-zinc-600 dark:text-zinc-300"> BUSS1000</span>
          </p>
        </div>

        {/* Interactive Cards */}
        <HeroCards />

        {/* Opt-in Section */}
        <EmailOptIn />

        {/* Footer info for SEO/Context */}
        <footer className="mt-10 flex flex-col items-center gap-4 border-t border-zinc-200 pt-10 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-500">
            Trusted by students at USYD, UniMelb, UNSW, and more. <br className="sm:hidden" />
            Empowering the Class of 2029.
          </p>
        </footer>
      </div>
    </main>
  );
}
