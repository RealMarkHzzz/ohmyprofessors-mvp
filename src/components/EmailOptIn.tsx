'use client';

import React, { useState } from 'react';

const EmailOptIn = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="w-full max-w-lg border-2 border-zinc-900 bg-white p-10 text-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="mb-3 text-3xl font-black uppercase tracking-tighter">Join the waitlist</h3>
      <p className="mb-8 text-zinc-600 font-serif text-lg leading-relaxed">
        Be the first to access the 2026 survival database. Pure intelligence, no fluff.
      </p>
      
      {submitted ? (
        <div className="bg-zinc-900 p-6 text-center font-bold text-white uppercase tracking-widest">
          ✓ Added to intelligence list
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student email"
            className="flex-1 border-2 border-zinc-900 px-5 py-4 font-sans focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-8 py-4 font-black text-white uppercase tracking-widest transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]"
          >
            Access
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailOptIn;
