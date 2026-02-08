import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
      <h1 className="mb-6 text-5xl md:text-7xl font-serif font-extrabold tracking-tight text-zinc-900 leading-tight">
        University choice <br />
        <span className="text-indigo-600 italic">without the guesswork</span>
      </h1>
      <p className="mb-12 text-lg md:text-xl font-serif text-zinc-600 max-w-2xl mx-auto leading-relaxed">
        The simplest way to discover and rate professors at Australian universities. 
        Honest feedback from peers to help you build the perfect semester.
      </p>
    </div>
  );
};

export default Hero;
