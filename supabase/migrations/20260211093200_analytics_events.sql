-- ============================================================================
-- ANALYTICS EVENTS TABLE
-- File: 20260211093200_analytics_events.sql
-- Purpose: Track user interactions for PMF metrics (DAU/MAU/Retention)
-- ============================================================================

-- ============================================================================
-- 1. CREATE ANALYTICS EVENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event identity
  event_type TEXT NOT NULL, -- 'page_view', 'professor_view', 'review_submit', 'search', 'user_return'
  
  -- User tracking (anonymous)
  user_id TEXT NOT NULL,    -- Anonymous ID from localStorage (e.g., 'anon_123abc')
  session_id TEXT NOT NULL, -- Session ID (browser session)
  
  -- Event metadata (flexible JSONB for different event types)
  metadata JSONB,           -- { page?: string, professorId?: string, reviewId?: string, query?: string }
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for DAU/MAU queries (most common)
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_date 
  ON analytics_events(user_id, created_at DESC);

-- Index for event type filtering
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_date 
  ON analytics_events(event_type, created_at DESC);

-- Index for session analysis
CREATE INDEX IF NOT EXISTS idx_analytics_events_session 
  ON analytics_events(session_id, created_at DESC);

-- Composite index for retention cohort analysis
CREATE INDEX IF NOT EXISTS idx_analytics_events_cohort 
  ON analytics_events(user_id, event_type, created_at);

-- Index for recent activity queries (dashboard)
CREATE INDEX IF NOT EXISTS idx_analytics_events_recent 
  ON analytics_events(created_at DESC);

-- ============================================================================
-- 3. ROW LEVEL SECURITY
-- ============================================================================
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public can insert events (anonymous tracking)
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Only admins can read (dashboard access)
CREATE POLICY "Admins can view analytics events"
  ON analytics_events FOR SELECT
  USING (
    -- Service role (server-side queries)
    auth.jwt() ->> 'role' = 'service_role' 
    -- Future: OR check if user has admin role
  );

-- ============================================================================
-- 4. HELPER FUNCTIONS FOR ANALYTICS
-- ============================================================================

-- Function to get DAU (Daily Active Users)
CREATE OR REPLACE FUNCTION get_dau(target_date DATE DEFAULT CURRENT_DATE)
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT user_id)
    FROM analytics_events
    WHERE created_at::DATE = target_date
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get MAU (Monthly Active Users)
CREATE OR REPLACE FUNCTION get_mau(target_month DATE DEFAULT DATE_TRUNC('month', CURRENT_DATE))
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(DISTINCT user_id)
    FROM analytics_events
    WHERE created_at >= target_month
      AND created_at < target_month + INTERVAL '1 month'
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get retention rate
CREATE OR REPLACE FUNCTION get_retention_rate(
  cohort_date DATE,
  days_after INT DEFAULT 7
)
RETURNS NUMERIC AS $$
DECLARE
  cohort_users BIGINT;
  retained_users BIGINT;
BEGIN
  -- Get users who first visited on cohort_date
  WITH first_visits AS (
    SELECT user_id, MIN(created_at::DATE) as first_visit_date
    FROM analytics_events
    GROUP BY user_id
    HAVING MIN(created_at::DATE) = cohort_date
  )
  SELECT COUNT(*) INTO cohort_users FROM first_visits;
  
  -- If no users in cohort, return 0
  IF cohort_users = 0 THEN
    RETURN 0;
  END IF;
  
  -- Get users who returned on target day
  WITH first_visits AS (
    SELECT user_id, MIN(created_at::DATE) as first_visit_date
    FROM analytics_events
    GROUP BY user_id
    HAVING MIN(created_at::DATE) = cohort_date
  )
  SELECT COUNT(DISTINCT ae.user_id) INTO retained_users
  FROM analytics_events ae
  INNER JOIN first_visits fv ON ae.user_id = fv.user_id
  WHERE ae.created_at::DATE = cohort_date + days_after;
  
  RETURN ROUND((retained_users::NUMERIC / cohort_users::NUMERIC) * 100, 2);
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get weekly review count
CREATE OR REPLACE FUNCTION get_weekly_reviews(week_start DATE DEFAULT CURRENT_DATE - 7)
RETURNS BIGINT AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM analytics_events
    WHERE event_type = 'review_submit'
      AND created_at >= week_start
      AND created_at < week_start + INTERVAL '7 days'
  );
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- 5. MATERIALIZED VIEW FOR DASHBOARD (Optional optimization)
-- ============================================================================

-- Daily stats view (refreshed periodically)
CREATE MATERIALIZED VIEW IF NOT EXISTS analytics_daily_stats AS
SELECT 
  created_at::DATE as date,
  COUNT(DISTINCT user_id) as dau,
  COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'professor_view') as professor_views,
  COUNT(*) FILTER (WHERE event_type = 'review_submit') as review_submits,
  COUNT(*) FILTER (WHERE event_type = 'search') as searches,
  COUNT(DISTINCT session_id) as sessions
FROM analytics_events
GROUP BY created_at::DATE
ORDER BY date DESC;

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_analytics_daily_stats_date 
  ON analytics_daily_stats(date DESC);

-- Refresh function (call via cron or on-demand)
CREATE OR REPLACE FUNCTION refresh_analytics_daily_stats()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY analytics_daily_stats;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Analytics events table created successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 What was created:';
  RAISE NOTICE '  - analytics_events table (with RLS policies)';
  RAISE NOTICE '  - 5 performance indexes';
  RAISE NOTICE '  - 4 helper functions: get_dau(), get_mau(), get_retention_rate(), get_weekly_reviews()';
  RAISE NOTICE '  - Materialized view: analytics_daily_stats';
  RAISE NOTICE '';
  RAISE NOTICE '🔄 Next Steps:';
  RAISE NOTICE '  1. Implement client-side tracking: lib/analytics.ts';
  RAISE NOTICE '  2. Create analytics API: lib/api/analytics.ts';
  RAISE NOTICE '  3. Build admin dashboard: app/admin/dashboard/page.tsx';
  RAISE NOTICE '';
END $$;
