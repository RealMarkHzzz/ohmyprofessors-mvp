'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Zap, ShieldAlert, LucideIcon } from 'lucide-react';

interface Card {
  title: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  bg: string;
  data: string;
  theme: string;
}

const HeroCards = () => {
  const cards: Card[] = [
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
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}
          className="group relative flex flex-col bg-white rounded-[32px] border border-zinc-100 p-8 transition-all cursor-pointer overflow-hidden"
        >
          {/* Animated Background Pulse */}
          <div className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full ${card.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 group-hover:scale-110 transition-transform duration-500 text-zinc-900">
            <card.Icon className={`h-7 w-7 ${card.color}`} />
          </div>
          
          <h4 className="mb-3 text-xl font-black text-zinc-900 font-sans tracking-tight leading-none uppercase text-left">
            {card.title}
          </h4>
          
          <p className="text-zinc-500 font-serif text-base leading-snug mb-8 text-left">
            {card.description}
          </p>
          
          <div className="mt-auto flex flex-col gap-4">
            <div className="h-px w-full bg-zinc-50" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                {card.data}
              </span>
              <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCards;
