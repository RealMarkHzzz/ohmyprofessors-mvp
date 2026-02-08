'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockData } from '@/lib/data';
import RatingIndicator from '@/components/RatingIndicator';
import BackgroundAmbient from '@/components/BackgroundAmbient';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react';

export default function ProfessorDetail() {
  const params = useParams();
  const prof = mockData.professors.find(p => p.id === params.id) || mockData.professors[0];

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-32">
      <BackgroundAmbient />
      
      <nav className="p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/search" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Intelligence
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Header */}
        <div className="lg:col-span-3 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
          <div className="flex gap-8 items-center">
            <div className="h-24 w-24 md:h-32 md:w-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-float uppercase">
              {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">{prof.university}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-300" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{prof.department}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-zinc-900 leading-none">{prof.name}</h1>
              <p className="text-xl text-zinc-500 font-serif italic mt-4">{prof.title}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-2 text-right">Verification Status</div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-green-100 rounded-full">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Identity Confirmed</span>
            </div>
          </div>
        </div>

        {/* Intelligence Core */}
        <div className="lg:col-span-2 space-y-12">
          {/* Natural Language Summary Card */}
          <section className="bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-white shadow-cinematic relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-indigo-600/20 blur-[100px] rounded-full" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 relative z-10">AI Vibe Analysis</h3>
            <p className="text-3xl md:text-5xl font-serif italic leading-tight tracking-tight relative z-10">
              &ldquo;{prof.sentiment}&rdquo;
            </p>
            <div className="mt-12 flex gap-4 relative z-10">
              {prof.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Academic Intelligence */}
          <section className="space-y-8">
            <h2 className="text-3xl font-serif font-black tracking-tight italic border-b border-zinc-100 pb-4">Peer Intelligence.</h2>
            <div className="bg-white border-2 border-zinc-900 p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl font-serif leading-relaxed text-zinc-600">
                {prof.summary}
              </p>
            </div>
          </section>

          {/* Subjects */}
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Current Assignments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prof.subjects.map(sub => (
                <div key={sub} className="flex items-center justify-between p-6 bg-white border border-zinc-100 rounded-3xl hover:border-indigo-600 transition-colors cursor-pointer group">
                  <span className="font-sans font-black text-zinc-900 tracking-tight">{sub}</span>
                  <ExternalLink className="h-4 w-4 text-zinc-200 group-hover:text-indigo-600 transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Intelligence Dashboard (Sidebar) */}
        <div className="space-y-8">
          <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-soft">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 text-center">Score Card</h3>
            <div className="flex justify-around items-end h-40 gap-4">
              {prof.distribution.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div 
                    className="w-full bg-indigo-600 rounded-t-lg transition-all duration-1000 delay-300"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] font-black text-zinc-300">{'FDCBA'[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-50 flex justify-between items-center">
              <div>
                <div className="text-4xl font-black text-zinc-900 tracking-tighter">{prof.rating}</div>
                <div className="text-[8px] font-black text-zinc-400 uppercase">Avg Rating</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-zinc-900 tracking-tighter">{prof.difficulty}</div>
                <div className="text-[8px] font-black text-zinc-400 uppercase">Difficulty</div>
              </div>
            </div>
          </div>

          {/* GPA Risk Module */}
          <div className="bg-white border-2 border-zinc-900 rounded-[3rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${
              prof.gpaRiskValue > 70 ? 'bg-red-500' : prof.gpaRiskValue > 40 ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">GPA Risk Level</h3>
            <div className="text-6xl font-sans font-black tracking-tighter text-zinc-900 mb-2">{prof.gpaRiskValue}%</div>
            <RatingIndicator rating={prof.gpaRisk as any} label={`${prof.gpaRisk} PROBABILITY`} />
            <p className="mt-6 text-xs text-zinc-400 font-serif italic">Risk derived from 150+ student grade histories.</p>
          </div>

          <button className="w-full bg-indigo-600 text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3">
            <MessageCircle className="h-5 w-5" /> Submit Intelligence
          </button>
        </div>
      </div>
    </main>
  );
}
