'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundAmbient = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only run animation on desktop for battery efficiency
    if (window.innerWidth < 768) return;

    let ctx = gsap.context(() => {
      // Logic: 3 Floating Intelligence Blobs
      const blobs = ['.blob-1', '.blob-2', '.blob-3'];
      
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: "random(-150, 150)",
          y: "random(-100, 100)",
          scale: "random(0.8, 1.2)",
          duration: 25 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 overflow-hidden bg-[#F8F9FA]">
      {/* Layer 1: GSAP Animated Blobs */}
      <div className="absolute inset-0 opacity-40 blur-[120px]">
        <div className="blob-1 absolute top-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-200/30" />
        <div className="blob-2 absolute top-[40%] right-[10%] h-[600px] w-[600px] rounded-full bg-blue-100/20" />
        <div className="blob-3 absolute bottom-[10%] left-[30%] h-[450px] w-[450px] rounded-full bg-emerald-50/40" />
      </div>

      {/* Layer 2: Noise Texture (Manual Overlap) */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-multiply pointer-events-none" />

      {/* Layer 3: Subtle Frosted Glass / Fog */}
      <div className="absolute inset-0 backdrop-blur-[20px] pointer-events-none" />
    </div>
  );
};

export default BackgroundAmbient;
