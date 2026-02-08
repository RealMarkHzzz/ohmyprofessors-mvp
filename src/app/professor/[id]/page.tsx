'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockData } from '@/lib/data';
import RatingIndicator from '@/components/RatingIndicator';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import LiveFeed from '@/components/LiveFeed';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, ExternalLink, MessageCircle, Globe } from 'lucide-react';
import { useI18n } from '@/components/I18nContext';

export default function ProfessorDetail() {
  const { lang, setLang } = useI18n();
  const params = useParams();
  const prof = mockData.professors.find(p => p.id === params.id) || mockData.professors[0];

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] pb-32 selection:bg-indigo-50 selection:text-indigo-900 overflow-x-hidden">
      <BackgroundAmbient />
      
      {/* Block 1: Consistent Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif font-black text-zinc-900 text-xl tracking-tighter italic underline decoration-indigo-500 decoration-4 underline-offset-2">
            OMP.
          </Link>
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
      </nav>

      <LiveFeed />

      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        {/* Profile Header */}
        <header className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-16 border-b-4 border-zinc-900/5">
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-32 w-32 md:h-48 md:w-48 bg-zinc-900 rounded-[3rem] flex items-center justify-center text-white text-5xl md:text-7xl font-black shadow-cinematic uppercase italic tracking-tighter"
            >
              {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] bg-indigo-50 px-3 py-1 rounded-full">{prof.university}</span>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{prof.department}</span>
              </div>
              <h1 className="text-6xl md:text-[100px] font-serif font-black tracking-tighter text-zinc-900 leading-[0.85] uppercase italic">{prof.name}</h1>
              <p className="text-2xl text-zinc-400 font-serif italic mt-6 leading-none tracking-tight">{prof.title}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-4">Intelligence Integrity</div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-green-500/20 rounded-2xl shadow-soft">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-xs font-black text-green-600 uppercase tracking-widest">Verified Identity</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Intelligence Core */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Natural Language Summary Card (The "Vibe") */}
            <motion.section 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-white shadow-float relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-96 w-96 bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-200 mb-12 relative z-10">AI Vibe Briefing</h3>
              <p className="text-4xl md:text-6xl font-serif italic leading-[1.1] tracking-tight relative z-10 text-left">
                &ldquo;{prof.sentiment}&rdquo;
              </p>
              <div className="mt-16 flex flex-wrap gap-4 relative z-10">
                {prof.tags.map(tag => (
                  <span key={tag} className="px-6 py-3 bg-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-white/5 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Academic Intelligence */}
            <section className="space-y-10">
              <h2 className="text-4xl font-serif font-black tracking-tighter italic border-b border-zinc-100 pb-6 flex items-center gap-4">
                Full Intelligence. 
                <span className="text-xs font-sans not-italic text-zinc-300 font-bold uppercase tracking-[0.3em]">Peer-verified insights</span>
              </h2>
              <div className="bg-white border-2 border-zinc-900 p-12 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute -top-4 -left-4 bg-indigo-600 text-white p-3 shadow-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <p className="text-2xl font-serif leading-relaxed text-zinc-700 italic">
                  {prof.summary}
                </p>
              </div>
            </section>

            {/* Subjects */}
            <section className="space-y-8 pb-20">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">Survival Guides by Course</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prof.subjects.map(sub => (
                  <div key={sub} className="flex items-center justify-between p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] hover:border-zinc-900 hover:shadow-soft transition-all cursor-pointer group">
                    <span className="font-sans font-black text-zinc-900 text-lg tracking-tighter uppercase">{sub}</span>
                    <ExternalLink className="h-5 w-5 text-zinc-200 group-hover:text-indigo-600 transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Intelligence Dashboard (Sidebar) */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* Score Card - Neo-Brutalism */}
            <div className="bg-white border-2 border-zinc-900 rounded-[3.5rem] p-10 shadow-[12px_12px_0px_0px_rgba(79,70,229,0.1)]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 text-center">Score Card</h3>
              <div className="flex justify-around items-end h-48 gap-5 mb-12">
                {prof.distribution.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="w-full bg-zinc-100 rounded-t-xl group-hover:bg-indigo-600 transition-colors relative"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">{val}%</div>
                    </motion.div>
                    <span className="text-xs font-black text-zinc-300 group-hover:text-zinc-900 transition-colors">{'FDCBA'[i]}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-10 border-t border-zinc-50 grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-5xl font-sans font-black text-zinc-900 tracking-tighter">{prof.rating}</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-2">Avg Rating</div>
                </div>
                <div className="border-l border-zinc-100">
                  <div className="text-5xl font-sans font-black text-zinc-900 tracking-tighter">{prof.difficulty}</div>
                  <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-2">Hardness</div>
                </div>
              </div>
            </div>

            {/* GPA Risk Module - High Contrast */}
            <div className="bg-zinc-900 rounded-[3.5rem] p-10 text-center relative overflow-hidden shadow-float">
              <div className={`absolute top-0 left-0 w-full h-3 ${
                prof.gpaRiskValue > 70 ? 'bg-red-500' : prof.gpaRiskValue > 40 ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-8 mt-4">GPA Risk Prediction</h3>
              <div className="text-8xl font-sans font-black tracking-tighter text-white mb-4 italic leading-none">{prof.gpaRiskValue}%</div>
              <div className="flex justify-center mb-8">
                <RatingIndicator rating={prof.gpaRisk as any} label={`${prof.gpaRisk} RISK`} />
              </div>
              <p className="text-xs text-zinc-500 font-serif italic px-4 leading-relaxed">Intelligence based on 150+ student historical data snapshots.</p>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-zinc-900 text-white py-8 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-cinematic flex items-center justify-center gap-4 group">
              <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" /> 
              Submit Intelligence
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
