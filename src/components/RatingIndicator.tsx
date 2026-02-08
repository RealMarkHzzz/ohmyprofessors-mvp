import React from 'react';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

type Rating = 'Green' | 'Yellow' | 'Red';

interface RatingIndicatorProps {
  rating: Rating;
  label?: string;
}

const RatingIndicator: React.FC<RatingIndicatorProps> = ({ rating, label }) => {
  const configs = {
    Green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      icon: <ShieldCheck className="h-3 w-3" />,
      border: 'border-green-200'
    },
    Yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      icon: <Shield className="h-3 w-3" />,
      border: 'border-yellow-200'
    },
    Red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      icon: <ShieldAlert className="h-3 w-3" />,
      border: 'border-red-200'
    },
  };

  const config = configs[rating];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border ${config.border} ${config.bg}`}>
      <span className={config.text}>{config.icon}</span>
      {label && <span className={`text-[10px] font-black tracking-wider uppercase ${config.text}`}>{label}</span>}
    </div>
  );
};

export default RatingIndicator;
