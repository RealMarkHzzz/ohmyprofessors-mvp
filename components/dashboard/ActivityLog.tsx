/**
 * Activity Log Component
 * Shows recent user interactions
 */

'use client';

import type { RecentActivity } from '@/lib/api/analytics';

interface ActivityLogProps {
  activities: RecentActivity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No activity yet. Start tracking events!
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: RecentActivity }) {
  const eventTypeIcons: Record<string, string> = {
    page_view: '👁️',
    professor_view: '👨‍🏫',
    review_submit: '✍️',
    search: '🔍',
    user_return: '🔄',
  };

  const eventTypeLabels: Record<string, string> = {
    page_view: 'Page View',
    professor_view: 'Professor View',
    review_submit: 'Review Submitted',
    search: 'Search',
    user_return: 'User Returned',
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getActivityDetail = (activity: RecentActivity): string => {
    const meta = activity.metadata as Record<string, any>;
    
    switch (activity.eventType) {
      case 'page_view':
        return (meta.page as string) || 'Unknown page';
      case 'professor_view':
        return (meta.professorName as string) || `Professor ${String(meta.professorId).substring(0, 8)}...`;
      case 'review_submit':
        return `Review for ${String(meta.professorId).substring(0, 8)}...`;
      case 'search':
        return `"${meta.query as string}"`;
      default:
        return '';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="text-2xl flex-shrink-0">
        {eventTypeIcons[activity.eventType] || '📊'}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {eventTypeLabels[activity.eventType] || activity.eventType}
        </p>
        <p className="text-sm text-gray-600 truncate">
          {getActivityDetail(activity)}
        </p>
      </div>
      
      <div className="text-xs text-gray-400 flex-shrink-0">
        {formatTime(activity.createdAt)}
      </div>
    </div>
  );
}
