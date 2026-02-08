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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfessorDetail() {
  const { lang, setLang } = useI18n();
  const params = useParams();
  const prof = mockData.professors.find(p => p.id === params.id) || mockData.professors[0];

  return (
    <main className="relative min-h-screen bg-background pb-32 selection:bg-accent selection:text-accent-foreground overflow-x-hidden font-sans">
      <BackgroundAmbient />
      
      {/* Block 1: Consistent Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif font-black text-foreground text-xl tracking-tighter italic underline decoration-primary decoration-4 underline-offset-2">
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
                  lang === l.code ? 'text-primary underline underline-offset-4' : 'text-muted-foreground hover:text-foreground'
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
        <header className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-16 border-b-2 border-border/50">
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Avatar className="h-32 w-32 md:h-56 md:w-56 rounded-[4rem] border-4 border-foreground shadow-cinematic">
                <AvatarFallback className="bg-foreground text-background text-5xl md:text-8xl font-black italic tracking-tighter">
                  {prof.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                  {prof.university}
                </Badge>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{prof.department}</span>
              </div>
              <h1 className="text-6xl md:text-[120px] font-serif font-black tracking-tighter text-foreground leading-[0.8] uppercase italic drop-shadow-sm">{prof.name}</h1>
              <p className="text-2xl text-muted-foreground font-serif italic mt-8 leading-none tracking-tight">{prof.title}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.5em]">Identity Status</span>
            <Badge variant="outline" className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-brand-success/30 rounded-2xl shadow-soft">
              <ShieldCheck className="h-5 w-5 text-brand-success" />
              <span className="text-[10px] font-black text-brand-success uppercase tracking-widest">Verified Academic</span>
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Intelligence Core */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Natural Language Summary Card (The "Vibe") */}
            <motion.section 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-primary rounded-[5rem] p-12 md:p-24 text-primary-foreground shadow-float relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-white/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-110" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/50 mb-12 relative z-10">AI Sentiment Intelligence</h3>
              <p className="text-4xl md:text-7xl font-serif italic leading-[1.05] tracking-tight relative z-10 text-left">
                &ldquo;{prof.sentiment}&rdquo;
              </p>
              <div className="mt-20 flex flex-wrap gap-4 relative z-10">
                {prof.tags.map(tag => (
                  <Badge key={tag} className="px-6 py-3 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 backdrop-blur-md hover:bg-white/20 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.section>

            {/* Academic Intelligence */}
            <section className="space-y-12">
              <h2 className="text-5xl font-serif font-black tracking-tighter italic border-b border-border pb-8 flex items-center gap-6">
                Intelligence Brief. 
                <span className="text-[10px] font-sans not-italic text-muted-foreground font-black uppercase tracking-[0.4em]">Decoded Peer data</span>
              </h2>
              <Card className="bg-background border-2 border-foreground p-12 md:p-20 shadow-neo-lg relative rounded-[3rem]">
                <div className="absolute -top-6 -left-6 bg-primary text-primary-foreground p-5 shadow-xl rounded-2xl rotate-[-5deg]">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="text-3xl font-serif leading-relaxed text-foreground/80 italic">
                  {prof.summary}
                </p>
              </Card>
            </section>

            {/* Subjects */}
            <section className="space-y-10 pb-20">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">Current Strategic Units</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {prof.subjects.map(sub => (
                  <Card key={sub} className="flex items-center justify-between p-10 bg-background border-2 border-border/50 rounded-[3rem] hover:border-foreground hover:shadow-neo transition-all cursor-pointer group">
                    <span className="font-sans font-black text-foreground text-xl tracking-tighter uppercase leading-none">{sub}</span>
                    <div className="h-12 w-12 rounded-full border-2 border-border group-hover:border-primary group-hover:bg-primary/5 flex items-center justify-center transition-all">
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Intelligence Dashboard (Sidebar) */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Score Card - Neo-Brutalism */}
            <Card className="bg-background border-2 border-foreground rounded-[4rem] p-12 shadow-neo">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground mb-16 text-center">Score Metrics</h3>
              <div className="flex justify-around items-end h-56 gap-6 mb-16">
                {prof.distribution.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-5 group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="w-full bg-muted border border-border rounded-t-xl group-hover:bg-primary group-hover:border-primary transition-all duration-500 relative"
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{val}%</div>
                    </motion.div>
                    <span className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors uppercase">{'FDCBA'[i]}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-12 opacity-50" />
              
              <div className="grid grid-cols-2 gap-10 text-center">
                <div>
                  <div className="text-6xl font-sans font-black text-foreground tracking-tighter leading-none">{prof.rating}</div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-4">Mean Score</div>
                </div>
                <div className="border-l-2 border-border/50">
                  <div className="text-6xl font-sans font-black text-foreground tracking-tighter leading-none">{prof.difficulty}</div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-4">Intensity</div>
                </div>
              </div>
            </Card>

            {/* GPA Risk Module - High Contrast */}
            <Card className="bg-foreground rounded-[4rem] p-12 text-center relative overflow-hidden shadow-float">
              <div className={`absolute top-0 left-0 w-full h-4 ${
                prof.gpaRiskValue > 70 ? 'bg-brand-danger' : prof.gpaRiskValue > 40 ? 'bg-brand-warning' : 'bg-brand-success'
              }`} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-500 mb-10 mt-4">GPA Impact Prediction</h3>
              <div className="text-9xl font-sans font-black tracking-tighter text-background mb-6 italic leading-none">{prof.gpaRiskValue}%</div>
              <div className="flex justify-center mb-10">
                <RatingIndicator rating={prof.gpaRisk as any} label={`${prof.gpaRisk} PROBABILITY`} />
              </div>
              <p className="text-xs text-zinc-500 font-serif italic px-6 leading-relaxed">Derived from 150+ academic cycle snapshots.</p>
            </Card>

            {/* Action Button */}
            <Button size="lg" className="w-full h-24 rounded-full font-black uppercase tracking-[0.3em] text-[11px] bg-foreground hover:bg-primary transition-all active:scale-[0.97] shadow-neo-lg flex items-center justify-center gap-4 group">
              <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" /> 
              Transmit Intel
            </Button>
          </aside>
        </div>
      </div>
    </main>
  );
}
