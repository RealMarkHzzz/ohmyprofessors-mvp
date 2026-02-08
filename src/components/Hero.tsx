import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
        🎓 2026 Freshmen Survival Guide
      </div>
      <h1 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
        Oh My Professors <br />
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Your GPA Guardian
        </span>
      </h1>
      <p className="mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        Don&apos;t let a bad professor ruin your first year. Get honest reviews, 
        GPA safety ratings, and survival guides from seniors who&apos;ve been there.
      </p>
    </div>
  );
};

export default Hero;
