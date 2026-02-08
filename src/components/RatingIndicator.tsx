import React from 'react';

type Rating = 'Green' | 'Yellow' | 'Red';

interface RatingIndicatorProps {
  rating: Rating;
  label?: string;
}

const RatingIndicator: React.FC<RatingIndicatorProps> = ({ rating, label }) => {
  const colors = {
    Green: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    Yellow: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]',
    Red: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  const textColors = {
    Green: 'text-green-700 dark:text-green-400',
    Yellow: 'text-yellow-700 dark:text-yellow-400',
    Red: 'text-red-700 dark:text-red-400',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${colors[rating]}`} />
      {label && <span className={`text-sm font-medium ${textColors[rating]}`}>{label}</span>}
    </div>
  );
};

export default RatingIndicator;
