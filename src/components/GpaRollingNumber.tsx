'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const GpaRollingNumber = ({ target }: { target: number }) => {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(spring, (value) => value.toFixed(1));

  useEffect(() => {
    spring.set(target);
  }, [target, spring]);

  return (
    <motion.span className="inline-block tabular-nums text-indigo-600 font-bold min-w-[1.2em]">
      {displayValue}
    </motion.span>
  );
};

export default GpaRollingNumber;
