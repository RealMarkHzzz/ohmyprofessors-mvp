import React from 'react';
import { Flame, Star, LucideIcon } from 'lucide-react';

interface Card {
  title: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  border: string;
  tag: string;
}

const HeroCards = () => {
  const cards: Card[] = [
    {
      title: 'WAM Boosters',
      description: 'The units where average marks are highest.',
      Icon: Flame,
      color: 'bg-orange-50/50',
      border: 'border-orange-200',
      tag: 'HOT'
    },
    {
      title: 'Easy Electives',
      description: 'Coursework that won\'t steal your weekends.',
      Icon: Star,
      color: 'bg-yellow-50/50',
      border: 'border-yellow-200',
      tag: 'NEW'
    }
  ];

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`group relative flex cursor-pointer flex-col bg-white border-2 border-zinc-900 p-8 transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none`}
        >
          <div className="absolute top-4 right-4 flex h-6 items-center bg-zinc-900 px-2 text-[10px] font-black text-white uppercase tracking-widest">
            {card.tag}
          </div>
          
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-indigo-50 transition-colors">
            <card.Icon className="h-7 w-7 text-zinc-900" />
          </div>
          
          <h4 className="mb-3 text-2xl font-black text-zinc-900 uppercase tracking-tighter italic">
            {card.title}
          </h4>
          
          <p className="text-zinc-600 font-serif text-lg leading-snug">
            {card.description}
          </p>
          
          <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-600">
            View Intelligence
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCards;
