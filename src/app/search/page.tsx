'use client';

import React, { useState } from 'react';
import { mockData } from '@/lib/data';
import RatingIndicator from '@/components/RatingIndicator';
import { Search, ArrowRight, Filter, Globe } from 'lucide-react';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import LiveFeed from '@/components/LiveFeed';
import { useI18n } from '@/components/I18nContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SearchResults() {
  const { lang, setLang, t } = useI18n();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-[#F8F9FA] selection:bg-indigo-50 selection:text-indigo-900 overflow-x-hidden pb-32">
      {/* 2026 Ambient Layer */}
      <BackgroundAmbient />

      {/* Block 1: Consistent Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif font-black text-zinc-900 text-xl tracking-tighter italic underline decoration-indigo-500 decoration-4 underline-offset-2">
            OMP.
          </Link>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                defaultValue="UniMelb USYD"
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-2 border-zinc-100 rounded-full focus:bg-white focus:border-zinc-900 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-sm font-sans font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
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
                  className={`text-[10px] font-bold transition-all ${
                    lang === l.code ? 'text-indigo-600 underline underline-offset-4' : 'text-zinc-300 hover:text-zinc-600'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Block 2: Live Feed */}
      <LiveFeed />

      <div className="w-full max-w-5xl px-6 py-16 md:py-24">
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-zinc-900 italic">
              Intelligence <span className="text-indigo-600 font-sans uppercase not-italic text-4xl md:text-6xl align-middle ml-2">Feed.</span>
            </h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-zinc-400 font-sans text-[10px] font-black uppercase tracking-[0.3em]">5 Verified Analysis Matches</p>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:text-indigo-600 transition-colors bg-white border-2 border-zinc-900 px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Filter className="h-3 w-3" /> Filter Result
              </button>
            </div>
          </motion.div>
        </header>

        {/* Tabs - Integrated into Swiss Style */}
        <div className="flex space-x-10 border-b-2 border-zinc-900/5 mb-16 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {['all', 'professors', 'subjects', 'universities'].map((tab) => (
            <button 
              key={tab}
              className={`pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab ? 'text-zinc-900' : 'text-zinc-300 hover:text-zinc-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="searchTab" className="absolute bottom-[-2px] left-0 w-full h-1 bg-indigo-600" />}
            </button>
          ))}
        </div>

        {/* Results Grid - Neo-brutalism Style */}
        <div className="grid grid-cols-1 gap-10">
          {mockData.professors.map((prof, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={prof.id}
            >
              <Link 
                href={`/professor/${prof.id}`}
                className="group block bg-white border-2 border-zinc-900 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row justify-between gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-2 py-1 rounded">{prof.university}</span>
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{prof.department}</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-sans font-black mb-6 tracking-tighter uppercase text-zinc-900 group-hover:text-indigo-600 transition-colors leading-none">
                      {prof.name}
                    </h2>
                    
                    <div className="bg-zinc-50/80 p-8 border-l-4 border-zinc-900 mb-8 rounded-r-2xl">
                      <p className="text-zinc-600 font-serif text-2xl italic leading-relaxed">
                        &ldquo;{prof.sentiment}&rdquo;
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {prof.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest border border-zinc-100 bg-white px-4 py-2 text-zinc-400 rounded-full group-hover:border-indigo-100 group-hover:text-indigo-400 transition-colors shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-100 pt-8 md:pt-0 md:pl-12">
                    <div className="text-center md:text-right">
                      <div className="text-7xl font-sans font-black text-zinc-900 tracking-tighter leading-none">{prof.rating}</div>
                      <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mt-3">Peer Score</div>
                    </div>
                    
                    <div className="mt-12 space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">GPA RISK</span>
                        <RatingIndicator rating={prof.gpaRisk as any} label={prof.gpaRisk} />
                      </div>
                      <div className="h-2 bg-zinc-50 border border-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${prof.gpaRiskValue}%` }}
                          className={`h-full rounded-full ${
                            prof.gpaRiskValue > 70 ? 'bg-red-500' : prof.gpaRiskValue > 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-12 flex items-center justify-end gap-3 text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                      FULL INTELLIGENCE <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
