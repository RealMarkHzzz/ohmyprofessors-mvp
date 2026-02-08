'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, ShieldAlert, LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface CardItem {
  title: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  bg: string;
  data: string;
  theme: string;
}

const HeroCards = () => {
  const cards: CardItem[] = [
    {
      title: 'WAM Boosters',
      description: 'The units where average marks are consistently highest.',
      Icon: Flame,
      color: 'text-orange-500',
      bg: 'bg-orange-50/30',
      data: '128 Units Indexed',
      theme: 'Success'
    },
    {
      title: 'Easy Electives',
      description: 'High reward coursework that won\'t steal your weekends.',
      Icon: Star,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50/30',
      data: '42 Guides Ready',
      theme: 'Neutral'
    },
    {
      title: 'Hard Markers',
      description: 'The 10 units where you might value sleep more than the grade.',
      Icon: ShieldAlert,
      color: 'text-red-500',
      bg: 'bg-red-50/30',
      data: 'Top 10 Risk List',
      theme: 'Danger'
    },
    {
      title: 'Real-time Feed',
      description: 'See exactly what students are saying right this second.',
      Icon: Zap,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50/30',
      data: 'Live Intelligence',
      theme: 'Success'
    }
  ];

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 font-sans">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{ y: -8 }}
          className="flex"
        >
          <Card className="group relative flex flex-col w-full bg-background rounded-[32px] border-2 border-border p-2 transition-all cursor-pointer overflow-hidden hover:border-primary hover:shadow-cinematic">
            {/* Animated Background Pulse */}
            <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full ${card.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <CardHeader className="p-6">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary border border-border group-hover:scale-110 transition-transform duration-500 text-foreground">
                <card.Icon className={`h-7 w-7 ${card.color}`} />
              </div>
              <CardTitle className="text-xl font-black text-foreground font-sans tracking-tight leading-none uppercase">
                {card.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground font-serif text-base leading-snug pt-2">
                {card.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="mt-auto px-6 pb-6">
              <div className="h-px w-full bg-border/50 mb-4" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {card.data}
                </span>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCards;
