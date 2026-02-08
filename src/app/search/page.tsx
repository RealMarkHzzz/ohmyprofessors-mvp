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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function SearchResults() {
  const { lang, setLang, t } = useI18n();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-background selection:bg-accent selection:text-accent-foreground overflow-x-hidden pb-32 font-sans">
      {/* 2026 Ambient Layer */}
      <BackgroundAmbient />

      {/* Block 1: Consistent Header */}
      <nav className="sticky top-0 z-[500] w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif font-black text-foreground text-xl tracking-tighter italic underline decoration-primary decoration-4 underline-offset-2">
            OMP.
          </Link>
          
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                type="text" 
                defaultValue="UniMelb USYD"
                className="w-full h-12 pl-12 pr-4 bg-muted border-2 border-transparent rounded-full focus-visible:ring-0 focus:bg-background focus:border-foreground transition-all text-sm font-medium"
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
                    lang === l.code ? 'text-primary underline underline-offset-4' : 'text-muted-foreground hover:text-foreground'
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
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-foreground italic">
              Intelligence <span className="text-primary font-sans uppercase not-italic text-4xl md:text-6xl align-middle ml-2 leading-none">Feed.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-6">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-success animate-pulse" />
                <p className="text-muted-foreground font-sans text-[10px] font-black uppercase tracking-[0.3em]">5 Verified Analysis Matches Found</p>
              </div>
              <Button variant="outline" className="h-12 rounded-full border-2 border-foreground px-8 font-black uppercase tracking-widest shadow-neo hover:bg-accent transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                <Filter className="mr-2 h-4 w-4" /> Filter Result
              </Button>
            </div>
          </motion.div>
        </header>

        {/* Tabs - Integrated into Swiss Style */}
        <Tabs defaultValue="all" className="w-full mb-16" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b-2 border-border w-full justify-start rounded-none h-auto p-0 gap-8">
            {['all', 'professors', 'subjects', 'universities'].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab}
                className="px-0 py-6 text-[11px] font-black uppercase tracking-[0.3em] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary rounded-none transition-all text-muted-foreground hover:text-foreground"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Grid - Neo-brutalism Style */}
        <div className="grid grid-cols-1 gap-12">
          {mockData.professors.map((prof, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={prof.id}
            >
              <Link href={`/professor/${prof.id}`} className="block group">
                <Card className="relative bg-background border-2 border-foreground p-8 md:p-12 shadow-neo-lg hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden rounded-[40px]">
                  {/* Visual Accent */}
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border-primary/10">
                          {prof.university}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{prof.department}</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-7xl font-sans font-black mb-8 tracking-tighter uppercase text-foreground group-hover:text-primary transition-colors leading-[0.9]">
                        {prof.name}
                      </h2>
                      
                      <div className="bg-secondary p-8 border-l-[6px] border-foreground mb-10 rounded-r-[2rem] shadow-sm">
                        <p className="text-foreground/80 font-serif text-2xl italic leading-relaxed">
                          &ldquo;{prof.sentiment}&rdquo;
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {prof.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-[10px] font-black uppercase tracking-widest border-border bg-background px-4 py-2 text-muted-foreground rounded-full group-hover:border-primary/20 group-hover:text-primary transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:w-72 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/50 pt-8 md:pt-0 md:pl-12">
                      <div className="text-center md:text-right">
                        <div className="text-8xl font-sans font-black text-foreground tracking-tighter leading-none">{prof.rating}</div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-4">Student Intelligence Score</div>
                      </div>
                      
                      <div className="mt-16 space-y-5">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">GPA IMPACT RISK</span>
                          <RatingIndicator rating={prof.gpaRisk as any} label={prof.gpaRisk} />
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden border border-border/20">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${prof.gpaRiskValue}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${
                              prof.gpaRiskValue > 70 ? 'bg-brand-danger' : prof.gpaRiskValue > 40 ? 'bg-brand-warning' : 'bg-brand-success'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="mt-12 flex items-center justify-end gap-3 text-[10px] font-black text-primary uppercase tracking-[0.3em] group-hover:translate-x-3 transition-transform">
                        ACCESS INTELLIGENCE <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
