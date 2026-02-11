/**
 * Funnel Chart Component
 * Visualizes user behavior funnel: Visit → View → Review
 */

'use client';

import type { FunnelData } from '@/lib/api/analytics';

interface FunnelChartProps {
  data: FunnelData;
}

export function FunnelChart({ data }: FunnelChartProps) {
  const stages = [
    {
      name: 'Total Visitors',
      count: data.totalVisitors,
      percentage: 100,
      color: 'bg-blue-500',
    },
    {
      name: 'Viewed Professors',
      count: data.professorViewers,
      percentage: data.conversionToView,
      color: 'bg-indigo-500',
    },
    {
      name: 'Submitted Reviews',
      count: data.reviewSubmitters,
      percentage: data.conversionToReview,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        User Behavior Funnel (Last 7 Days)
      </h3>
      
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const nextStage = index < stages.length - 1 ? stages[index + 1] : null;
          const dropOff = nextStage 
            ? (stage.percentage - nextStage.percentage).toFixed(1) 
            : null;
          
          return (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {stage.name}
                </span>
                <span className="text-sm text-gray-500">
                  {stage.count} ({stage.percentage.toFixed(1)}%)
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className={`${stage.color} h-full flex items-center justify-center text-white text-xs font-medium transition-all duration-500`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  {stage.percentage > 10 && `${stage.percentage.toFixed(1)}%`}
                </div>
              </div>
              
              {/* Drop-off indicator */}
              {dropOff && (
                <div className="absolute -bottom-2 left-0 text-xs text-red-600">
                  ↓ {dropOff}% drop-off
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Overall Conversion:</strong> {data.conversionToReview.toFixed(1)}% of visitors submit reviews
        </p>
      </div>
    </div>
  );
}
