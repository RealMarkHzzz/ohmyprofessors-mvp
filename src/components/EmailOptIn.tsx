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
    <div className="w-full max-w-md rounded-3xl bg-blue-600 p-8 text-white shadow-2xl sm:p-10">
      <h3 className="mb-2 text-2xl font-bold">Join the Beta</h3>
      <p className="mb-6 text-blue-100">
        Be the first to get the 2026 Freshmen Survival Guide for your university.
      </p>
      
      {submitted ? (
        <div className="rounded-xl bg-blue-500/50 p-4 text-center font-medium text-white backdrop-blur-sm">
          🎉 You're on the list! Watch your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-xl bg-white/10 px-4 py-3 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 font-bold text-blue-600 transition-transform active:scale-95 hover:bg-blue-50"
          >
            Join Now
          </button>
        </form>
      )}
      <p className="mt-4 text-center text-xs text-blue-200">
        No spam. Only GPA-saving updates.
      </p>
    </div>
  );
};

export default EmailOptIn;
