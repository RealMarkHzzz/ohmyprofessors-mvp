'use client';

import React, { useState } from 'react';
import { mockData } from '@/lib/data';
import RatingIndicator from '@/components/RatingIndicator';
import { Search, ArrowRight, Filter } from 'lucide-react';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import Link from 'next/link';

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-20">
      <BackgroundAmbient />
      
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-black text-zinc-900 tracking-tighter italic underline decoration-indigo-500 decoration-4 underline-offset-2">
            OMP.
          </Link>
          <div className="relative w-full max-w-md ml-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input 
              type="text" 
              defaultValue="UniMelb USYD"
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-sans"
            />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-5xl font-serif font-black mb-4 tracking-tight">Intelligence Feed.</h1>
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 font-sans text-xs font-bold uppercase tracking-widest">5 Analysis Matches Found</p>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 transition-all">
              <Filter className="h-3 w-3" /> Filter
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex space-x-10 border-b border-zinc-100 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {['all', 'professors', 'subjects', 'universities'].map((tab) => (
            <button 
              key={tab}
              className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                activeTab === tab ? 'text-zinc-900' : 'text-zinc-300 hover:text-zinc-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-8">
          {mockData.professors.map((prof) => (
            <Link 
              href={`/professor/${prof.id}`}
              key={prof.id} 
              className="group bg-white border-2 border-zinc-900 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{prof.university}</span>
                    <span className="h-1 w-1 rounded-full bg-zinc-200" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{prof.department}</span>
                  </div>
                  <h2 className="text-3xl font-sans font-black mb-4 tracking-tighter uppercase">{prof.name}</h2>
                  <div className="bg-zinc-50 p-6 border-l-4 border-indigo-600 mb-6">
                    <p className="text-zinc-600 font-serif text-xl italic leading-relaxed">
                      &ldquo;{prof.sentiment}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prof.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest bg-zinc-100 px-3 py-1 text-zinc-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-56 flex flex-col justify-between border-l border-zinc-50 pl-0 md:pl-8">
                  <div className="text-center md:text-right">
                    <div className="text-5xl font-sans font-black text-zinc-900 tracking-tighter">{prof.rating}</div>
                    <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-1">Student Score</div>
                  </div>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">GPA Risk</span>
                      <RatingIndicator rating={prof.gpaRisk as any} label={prof.gpaRisk} />
                    </div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          prof.gpaRiskValue > 70 ? 'bg-red-500' : prof.gpaRiskValue > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${prof.gpaRiskValue}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-end gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Analysis <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
