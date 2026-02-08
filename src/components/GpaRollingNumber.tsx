'use client';

import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const GpaRollingNumber = ({ target }: { target: number }) => {
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(spring, (value) => value.toFixed(1));

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(target);
    }, 500);
    return () => clearTimeout(timer);
  }, [target, spring]);

  return (
    <motion.span className="inline-block tabular-nums font-black">
      {displayValue}
    </motion.span>
  );
};

export default GpaRollingNumber;
