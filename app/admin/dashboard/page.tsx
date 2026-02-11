/**
 * Admin Dashboard Page
 * Real-time metrics for tracking Product-Market Fit (PMF)
 * 
 * Key Metrics:
 * - DAU (Daily Active Users)
 * - MAU (Monthly Active Users)
 * - DAU/MAU Ratio (target > 20%)
 * - 7-day Retention (target > 30%)
 * - Weekly Review Count (target > 20)
 */

import { Suspense } from 'react';
import { getDashboardStats, getFunnelData, getRecentActivity, getDailyStats } from '@/lib/api/analytics';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { FunnelChart } from '@/components/dashboard/FunnelChart';
import { ActivityLog } from '@/components/dashboard/ActivityLog';
import { TrendChart } from '@/components/dashboard/TrendChart';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching for real-time data

async function DashboardContent() {
  // Fetch all data in parallel
  const [stats, funnelData, recentActivity, dailyStats] = await Promise.all([
    getDashboardStats(),
    getFunnelData(7),
    getRecentActivity(20),
    getDailyStats(30),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Track Product-Market Fit metrics in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Trend Chart */}
          <TrendChart data={dailyStats} />
          
          {/* Funnel Chart */}
          <FunnelChart data={funnelData} />
        </div>

        {/* Activity Log */}
        <ActivityLog activities={recentActivity} />

        {/* Refresh Notice */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Dashboard auto-refreshes every 5 minutes
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-96"></div>
        </div>
      </div>
    </div>
  );
}
