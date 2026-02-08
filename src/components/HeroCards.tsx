import React from 'react';

const HeroCards = () => {
  const cards = [
    {
      title: 'Top 5 Easy A Electives',
      description: 'The easiest units to boost your GPA in Semester 1.',
      icon: '🔥',
      color: 'bg-orange-50 dark:bg-orange-900/10',
      border: 'border-orange-100 dark:border-orange-900/30'
    },
    {
      title: 'Professors to Avoid',
      description: 'The 10 units where you might value sleep more than the grade.',
      icon: '😴',
      color: 'bg-purple-50 dark:bg-purple-900/10',
      border: 'border-purple-100 dark:border-purple-900/30'
    }
  ];

  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-4 px-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`group flex cursor-pointer flex-col rounded-2xl border ${card.border} ${card.color} p-6 transition-all hover:scale-[1.02] hover:shadow-lg`}
        >
          <div className="mb-4 text-3xl">{card.icon}</div>
          <h4 className="mb-2 font-bold text-zinc-900 dark:text-zinc-100">{card.title}</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroCards;
