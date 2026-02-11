/**
 * Trend Chart Component
 * Shows DAU/MAU trends over time
 */

'use client';

interface DailyStats {
  date: string;
  dau: number;
  sessions: number;
  page_views: number;
  professor_views: number;
  review_submits: number;
  searches: number;
}

interface TrendChartProps {
  data: DailyStats[];
}

export function TrendChart({ data }: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          DAU Trend (Last 30 Days)
        </h3>
        <p className="text-gray-500 text-sm text-center py-8">
          No data available yet
        </p>
      </div>
    );
  }

  // Calculate max value for scaling
  const maxDau = Math.max(...data.map(d => d.dau), 1);
  const maxHeight = 200; // pixels

  // Take last 30 days and reverse for chronological order
  const chartData = data.slice(0, 30).reverse();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        DAU Trend (Last 30 Days)
      </h3>
      
      {/* Chart */}
      <div className="relative" style={{ height: maxHeight + 40 }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-xs text-gray-500">
          <span>{maxDau}</span>
          <span>{Math.round(maxDau / 2)}</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="absolute left-14 right-0 top-0 bottom-10 flex items-end gap-1">
          {chartData.map((stat, index) => {
            const height = (stat.dau / maxDau) * maxHeight;
            const isWeekend = new Date(stat.date).getDay() % 6 === 0;
            
            return (
              <div
                key={index}
                className="flex-1 group relative"
                style={{ height: maxHeight }}
              >
                {/* Bar */}
                <div
                  className={`absolute bottom-0 w-full rounded-t transition-all hover:opacity-80 ${
                    isWeekend ? 'bg-blue-300' : 'bg-blue-500'
                  }`}
                  style={{ height: `${height}px` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="font-medium mb-1">
                        {new Date(stat.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div>DAU: {stat.dau}</div>
                      <div>Views: {stat.professor_views}</div>
                      <div>Reviews: {stat.review_submits}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* X-axis */}
        <div className="absolute left-14 right-0 bottom-0 h-8 flex items-center justify-between text-xs text-gray-500">
          <span>
            {chartData[0] ? new Date(chartData[0].date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }) : ''}
          </span>
          <span>Today</span>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(data.reduce((sum, d) => sum + d.dau, 0) / data.length)}
          </p>
          <p className="text-xs text-gray-500">Avg DAU</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {data.reduce((sum, d) => sum + d.professor_views, 0)}
          </p>
          <p className="text-xs text-gray-500">Total Views</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {data.reduce((sum, d) => sum + d.review_submits, 0)}
          </p>
          <p className="text-xs text-gray-500">Total Reviews</p>
        </div>
      </div>
    </div>
  );
}
