/**
 * Stats Cards Component
 * Displays key PMF metrics in card format
 */

'use client';

import type { DashboardStats } from '@/lib/api/analytics';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards: Array<{
    title: string;
    value: string;
    subtitle: string;
    trend: 'up' | 'down' | 'neutral';
    detail: string;
    target?: number;
  }> = [
    {
      title: 'DAU',
      value: stats.dau.toLocaleString(),
      subtitle: 'Daily Active Users',
      trend: 'neutral',
      detail: `${stats.todayPageViews} page views today`,
    },
    {
      title: 'DAU/MAU',
      value: `${stats.dauMauRatio.toFixed(1)}%`,
      subtitle: 'Stickiness Ratio',
      trend: stats.dauMauRatio >= 20 ? 'up' : 'down',
      detail: `Target: > 20%`,
      target: 20,
    },
    {
      title: '7-Day Retention',
      value: `${stats.retention7Day.toFixed(1)}%`,
      subtitle: 'Users Return Rate',
      trend: stats.retention7Day >= 30 ? 'up' : 'down',
      detail: `Target: > 30%`,
      target: 30,
    },
    {
      title: 'Weekly Reviews',
      value: stats.weeklyReviews.toLocaleString(),
      subtitle: 'New Reviews (7d)',
      trend: stats.weeklyReviews >= 20 ? 'up' : 'down',
      detail: `Target: > 20 reviews`,
      target: 20,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down' | 'neutral';
  detail: string;
  target?: number;
}

function StatCard({ title, value, subtitle, trend, detail, target }: StatCardProps) {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`px-2 py-1 rounded ${trendColors[trend]}`}>
          <span className="text-lg">{trendIcons[trend]}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-1">{subtitle}</p>
      <p className="text-xs text-gray-400">{detail}</p>
    </div>
  );
}
