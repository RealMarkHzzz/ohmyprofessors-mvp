/**
 * Analytics API
 * Server-side functions to query analytics data for dashboard
 * 
 * @module lib/api/analytics
 */

import { createClient } from '@/lib/supabase/server';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DashboardStats {
  dau: number;
  mau: number;
  dauMauRatio: number;
  retention7Day: number;
  weeklyReviews: number;
  todayPageViews: number;
  todayProfessorViews: number;
}

export interface RetentionCohort {
  cohortDate: string;
  cohortSize: number;
  day1: number;
  day3: number;
  day7: number;
}

export interface FunnelData {
  totalVisitors: number;
  professorViewers: number;
  reviewSubmitters: number;
  conversionToView: number; // %
  conversionToReview: number; // %
}

export interface RecentActivity {
  id: string;
  eventType: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ============================================================================
// DASHBOARD METRICS
// ============================================================================

/**
 * Get Daily Active Users (DAU)
 * @param date - Target date (defaults to today)
 */
export async function getDAU(date: Date = new Date()): Promise<number> {
  const supabase = await createClient();
  
  const targetDate = date.toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .rpc('get_dau', { target_date: targetDate } as never);
  
  if (error) {
    console.error('Error fetching DAU:', error);
    return 0;
  }
  
  return (data as number) || 0;
}

/**
 * Get Monthly Active Users (MAU)
 * @param month - Target month (defaults to current month)
 */
export async function getMAU(month: Date = new Date()): Promise<number> {
  const supabase = await createClient();
  
  // Get first day of month
  const targetMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  
  const { data, error } = await supabase
    .rpc('get_mau', { target_month: targetMonth } as never);
  
  if (error) {
    console.error('Error fetching MAU:', error);
    return 0;
  }
  
  return (data as number) || 0;
}

/**
 * Get retention rate for a cohort
 * @param cohortDate - Date when users first visited
 * @param daysAfter - Number of days after first visit (default: 7)
 */
export async function getRetention(
  cohortDate: Date,
  daysAfter: number = 7
): Promise<number> {
  const supabase = await createClient();
  
  const targetDate = cohortDate.toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .rpc('get_retention_rate', {
      cohort_date: targetDate,
      days_after: daysAfter,
    } as never);
  
  if (error) {
    console.error('Error fetching retention:', error);
    return 0;
  }
  
  return (data as number) || 0;
}

/**
 * Get weekly review count
 * @param weekStart - Start of week (defaults to 7 days ago)
 */
export async function getWeeklyReviews(
  weekStart: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
): Promise<number> {
  const supabase = await createClient();
  
  const targetDate = weekStart.toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .rpc('get_weekly_reviews', { week_start: targetDate } as never);
  
  if (error) {
    console.error('Error fetching weekly reviews:', error);
    return 0;
  }
  
  return (data as number) || 0;
}

/**
 * Get comprehensive dashboard stats
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  // Fetch all metrics in parallel
  const [dau, mau, retention7Day, weeklyReviews] = await Promise.all([
    getDAU(today),
    getMAU(today),
    getRetention(sevenDaysAgo, 7),
    getWeeklyReviews(sevenDaysAgo),
  ]);
  
  // Calculate DAU/MAU ratio
  const dauMauRatio = mau > 0 ? (dau / mau) * 100 : 0;
  
  // Get today's page views and professor views
  const supabase = await createClient();
  const todayStart = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  
  const { data: todayEvents } = await supabase
    .from('analytics_events')
    .select('event_type')
    .gte('created_at', todayStart);
  
  const todayPageViews = (todayEvents || []).filter((e: any) => e.event_type === 'page_view').length;
  const todayProfessorViews = (todayEvents || []).filter((e: any) => e.event_type === 'professor_view').length;
  
  return {
    dau,
    mau,
    dauMauRatio: Math.round(dauMauRatio * 100) / 100,
    retention7Day: Math.round(retention7Day * 100) / 100,
    weeklyReviews,
    todayPageViews,
    todayProfessorViews,
  };
}

// ============================================================================
// RETENTION ANALYSIS
// ============================================================================

/**
 * Get retention cohorts for the last N days
 * @param days - Number of days to analyze (default: 14)
 */
export async function getRetentionCohorts(days: number = 14): Promise<RetentionCohort[]> {
  const supabase = await createClient();
  const cohorts: RetentionCohort[] = [];
  const today = new Date();
  
  for (let i = days; i >= 7; i--) {
    const cohortDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const cohortDateStr = cohortDate.toISOString().split('T')[0] || '';
    
    // Get cohort size and retention rates
    const [day1, day3, day7] = await Promise.all([
      getRetention(cohortDate, 1),
      getRetention(cohortDate, 3),
      getRetention(cohortDate, 7),
    ]);
    
    const { count } = await supabase
      .from('analytics_events')
      .select('user_id', { count: 'exact', head: true })
      .gte('created_at', cohortDateStr)
      .lt('created_at', new Date(cohortDate.getTime() + 24 * 60 * 60 * 1000).toISOString());
    
    cohorts.push({
      cohortDate: cohortDateStr,
      cohortSize: count || 0,
      day1,
      day3,
      day7,
    });
  }
  
  return cohorts;
}

// ============================================================================
// FUNNEL ANALYSIS
// ============================================================================

/**
 * Get user behavior funnel data
 * Tracks: Visit → View Professor → Submit Review
 */
export async function getFunnelData(
  days: number = 7
): Promise<FunnelData> {
  const supabase = await createClient();
  
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  
  // Get all events in the period
  const { data: events } = await supabase
    .from('analytics_events')
    .select('user_id, event_type')
    .gte('created_at', since);
  
  if (!events) {
    return {
      totalVisitors: 0,
      professorViewers: 0,
      reviewSubmitters: 0,
      conversionToView: 0,
      conversionToReview: 0,
    };
  }
  
  // Count unique users at each stage
  const totalVisitors = new Set(events.map((e: any) => e.user_id)).size;
  const professorViewers = new Set(
    events.filter((e: any) => e.event_type === 'professor_view').map((e: any) => e.user_id)
  ).size;
  const reviewSubmitters = new Set(
    events.filter((e: any) => e.event_type === 'review_submit').map((e: any) => e.user_id)
  ).size;
  
  // Calculate conversion rates
  const conversionToView = totalVisitors > 0
    ? (professorViewers / totalVisitors) * 100
    : 0;
  const conversionToReview = totalVisitors > 0
    ? (reviewSubmitters / totalVisitors) * 100
    : 0;
  
  return {
    totalVisitors,
    professorViewers,
    reviewSubmitters,
    conversionToView: Math.round(conversionToView * 100) / 100,
    conversionToReview: Math.round(conversionToReview * 100) / 100,
  };
}

// ============================================================================
// RECENT ACTIVITY
// ============================================================================

/**
 * Get recent analytics events (for activity log)
 * @param limit - Number of events to return (default: 50)
 */
export async function getRecentActivity(limit: number = 50): Promise<RecentActivity[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('analytics_events')
    .select('id, event_type, metadata, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
  
  return (data || []).map((event: any) => ({
    id: event.id,
    eventType: event.event_type,
    metadata: (event.metadata as Record<string, unknown>) || {},
    createdAt: event.created_at,
  }));
}

// ============================================================================
// TREND ANALYSIS
// ============================================================================

/**
 * Get daily stats for the last N days
 * @param days - Number of days to fetch (default: 30)
 */
export async function getDailyStats(days: number = 30) {
  const supabase = await createClient();
  
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  
  // Try to use materialized view first (faster)
  const { data: viewData } = await supabase
    .from('analytics_daily_stats')
    .select('*')
    .gte('date', since.split('T')[0])
    .order('date', { ascending: false });
  
  if (viewData && viewData.length > 0) {
    return viewData;
  }
  
  // Fallback: query events table directly
  const { data: events } = await supabase
    .from('analytics_events')
    .select('created_at, user_id, event_type, session_id')
    .gte('created_at', since);
  
  if (!events) return [];
  
  // Group by date
  const statsByDate = (events || []).reduce((acc: any, event: any) => {
    const date = event.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = {
        date,
        users: new Set(),
        sessions: new Set(),
        pageViews: 0,
        professorViews: 0,
        reviewSubmits: 0,
        searches: 0,
      };
    }
    
    acc[date].users.add(event.user_id);
    acc[date].sessions.add(event.session_id);
    
    if (event.event_type === 'page_view') acc[date].pageViews++;
    if (event.event_type === 'professor_view') acc[date].professorViews++;
    if (event.event_type === 'review_submit') acc[date].reviewSubmits++;
    if (event.event_type === 'search') acc[date].searches++;
    
    return acc;
  }, {} as Record<string, any>);
  
  // Convert to array and format
  return Object.values(statsByDate).map((stats: any) => ({
    date: stats.date,
    dau: stats.users.size,
    sessions: stats.sessions.size,
    page_views: stats.pageViews,
    professor_views: stats.professorViews,
    review_submits: stats.reviewSubmits,
    searches: stats.searches,
  })).sort((a, b) => b.date.localeCompare(a.date));
}
