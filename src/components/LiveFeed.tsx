'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LiveFeed = () => {
  const activities = [
    { text: "USYD student rated BUSS1000", time: "2m ago" },
    { text: "UniMelb survival guide updated", time: "15m ago" },
    { text: "New high mark alert for COMP10001", time: "32m ago" },
    { text: "Monash user joined the club", time: "1h ago" },
  ];

  return (
    <div className="w-full bg-zinc-50 border-y border-zinc-100 py-3 overflow-hidden select-none">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap px-6"
      >
        {[...activities, ...activities].map((act, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-sans">
              {act.text}
            </span>
            <span className="text-[9px] font-black text-zinc-300">{act.time}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LiveFeed;
