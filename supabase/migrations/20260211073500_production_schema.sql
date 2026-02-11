-- ============================================================================
-- PRODUCTION SCHEMA MIGRATION
-- File: 002_production_schema.sql
-- Date: 2026-02-11
-- Purpose: Extend existing schema for multi-university support + data acquisition
-- ============================================================================

-- ============================================================================
-- 1. EXTEND UNIVERSITIES TABLE (add data acquisition metadata)
-- ============================================================================
ALTER TABLE universities 
  ADD COLUMN IF NOT EXISTS short_name TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Australia',
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  
  -- Data source configuration
  ADD COLUMN IF NOT EXISTS data_source_type TEXT, -- 'api', 'scraper', 'manual'
  ADD COLUMN IF NOT EXISTS data_source_config JSONB,
  
  -- Operational metadata
  ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_sync_status TEXT, -- 'success', 'partial', 'failed'
  ADD COLUMN IF NOT EXISTS sync_error_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_sync_enabled BOOLEAN DEFAULT true;

-- Add indexes for sync operations
CREATE INDEX IF NOT EXISTS idx_universities_sync_enabled 
  ON universities(is_sync_enabled) 
  WHERE is_sync_enabled = true;

-- ============================================================================
-- 2. EXTEND PROFESSORS TABLE (add scraping + rating metadata)
-- ============================================================================
ALTER TABLE professors 
  -- Add missing core fields
  ADD COLUMN IF NOT EXISTS title TEXT, -- 'Professor', 'Associate Professor', etc.
  ADD COLUMN IF NOT EXISTS office_location TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS profile_url TEXT, -- University profile URL
  
  -- Profile enrichment
  ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS research_interests TEXT[],
  
  -- Aggregated ratings (computed from reviews)
  ADD COLUMN IF NOT EXISTS rating_overall NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rating_difficulty NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rating_clarity NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rating_helpfulness NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_reviews INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS would_take_again_percent NUMERIC(5,2) DEFAULT 0,
  
  -- Data source tracking
  ADD COLUMN IF NOT EXISTS source_system TEXT, -- 'adelaide_scraper', 'uq_api', 'manual'
  ADD COLUMN IF NOT EXISTS source_id TEXT, -- Original ID from source system
  ADD COLUMN IF NOT EXISTS source_url TEXT, -- Original scrape URL
  ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ,
  
  -- Soft delete support
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Update unique constraint to be university-scoped
DROP INDEX IF EXISTS idx_professors_slug;
ALTER TABLE professors DROP CONSTRAINT IF EXISTS professors_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS idx_professors_university_slug 
  ON professors(university_id, slug);

-- Add index for source system lookups (prevent duplicates on re-sync)
CREATE INDEX IF NOT EXISTS idx_professors_source 
  ON professors(source_system, source_id);

-- Add index for rating queries
CREATE INDEX IF NOT EXISTS idx_professors_rating 
  ON professors(rating_overall DESC);

-- Add index for department filtering
CREATE INDEX IF NOT EXISTS idx_professors_department 
  ON professors(department);

-- ============================================================================
-- 3. CREATE COURSES TABLE (NEW)
-- ============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  
  -- Course identity
  course_code TEXT NOT NULL, -- e.g., 'COMP3506'
  course_name TEXT NOT NULL, -- e.g., 'Algorithms and Data Structures'
  slug TEXT NOT NULL, -- e.g., 'comp3506-algorithms-data-structures'
  
  -- Course details
  description TEXT,
  credit_points INT,
  level TEXT, -- 'undergraduate', 'postgraduate'
  semester_offered TEXT[], -- ['Semester 1', 'Semester 2', 'Summer']
  
  -- Metadata
  last_offered_year INT,
  is_active BOOLEAN DEFAULT true,
  
  -- Data source tracking
  source_system TEXT,
  source_id TEXT,
  last_synced_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(university_id, course_code)
);

CREATE INDEX IF NOT EXISTS idx_courses_university ON courses(university_id);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(course_code);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);

-- ============================================================================
-- 4. CREATE PROFESSOR_COURSES TABLE (Many-to-Many)
-- ============================================================================
CREATE TABLE IF NOT EXISTS professor_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professor_id UUID NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Teaching metadata
  role TEXT, -- 'lecturer', 'tutor', 'coordinator'
  semester TEXT, -- 'Semester 1 2024'
  year INT,
  
  -- Data source
  source_system TEXT,
  last_synced_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(professor_id, course_id, semester, year)
);

CREATE INDEX IF NOT EXISTS idx_prof_courses_professor ON professor_courses(professor_id);
CREATE INDEX IF NOT EXISTS idx_prof_courses_course ON professor_courses(course_id);

-- ============================================================================
-- 5. EXTEND REVIEWS TABLE (add university_id for filtering)
-- ============================================================================
ALTER TABLE reviews 
  ADD COLUMN IF NOT EXISTS university_id UUID REFERENCES universities(id);

-- Backfill university_id from professors (for existing reviews)
UPDATE reviews 
SET university_id = p.university_id
FROM professors p
WHERE reviews.professor_id = p.id
  AND reviews.university_id IS NULL;

-- Add index for university-scoped queries
CREATE INDEX IF NOT EXISTS idx_reviews_university ON reviews(university_id);

-- ============================================================================
-- 6. CREATE SYNC_JOBS TABLE (Operational tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id),
  
  job_type TEXT NOT NULL, -- 'full_sync', 'incremental', 'manual'
  status TEXT NOT NULL, -- 'pending', 'running', 'success', 'failed', 'partial'
  
  -- Metrics
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INT,
  
  -- Results
  records_processed INT DEFAULT 0,
  records_inserted INT DEFAULT 0,
  records_updated INT DEFAULT 0,
  records_failed INT DEFAULT 0,
  
  -- Error tracking
  error_message TEXT,
  error_details JSONB,
  
  -- Metadata
  triggered_by TEXT, -- 'cron', 'manual', 'api'
  config JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sync_jobs_university ON sync_jobs(university_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sync_jobs_status ON sync_jobs(status, created_at DESC);

-- ============================================================================
-- 7. CREATE RAW_DATA_STAGING TABLE (Fault isolation)
-- ============================================================================
CREATE TABLE IF NOT EXISTS raw_data_staging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id),
  sync_job_id UUID REFERENCES sync_jobs(id),
  
  -- Raw data
  entity_type TEXT NOT NULL, -- 'professor', 'course'
  raw_data JSONB NOT NULL,
  
  -- Processing status
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMPTZ,
  processing_error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_staging_unprocessed 
  ON raw_data_staging(university_id, processed) 
  WHERE processed = false;

-- ============================================================================
-- 8. UPDATE TRIGGERS (add to new tables)
-- ============================================================================
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES FOR NEW TABLES
-- ============================================================================
-- Courses: Public read
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  USING (true);

-- Professor courses: Public read
ALTER TABLE professor_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Professor courses are viewable by everyone"
  ON professor_courses FOR SELECT
  USING (true);

-- Sync jobs: Admin only (use service role)
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sync jobs viewable by admins"
  ON sync_jobs FOR SELECT
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

-- Raw data staging: Admin only
ALTER TABLE raw_data_staging ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staging data admin only"
  ON raw_data_staging FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 10. CIRCUIT BREAKER TRIGGER (Auto-disable failing universities)
-- ============================================================================
CREATE OR REPLACE FUNCTION check_sync_circuit_breaker()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'failed' THEN
    UPDATE universities
    SET sync_error_count = sync_error_count + 1,
        is_sync_enabled = CASE 
          WHEN sync_error_count >= 2 THEN false 
          ELSE is_sync_enabled 
        END
    WHERE id = NEW.university_id;
  ELSIF NEW.status = 'success' THEN
    UPDATE universities
    SET sync_error_count = 0,
        is_sync_enabled = true,
        last_sync_at = NEW.completed_at,
        last_sync_status = 'success'
    WHERE id = NEW.university_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_circuit_breaker
  AFTER INSERT ON sync_jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_sync_circuit_breaker();

-- ============================================================================
-- 11. HELPER FUNCTIONS
-- ============================================================================

-- Function to generate professor slug from name
CREATE OR REPLACE FUNCTION generate_professor_slug(
  prof_name TEXT,
  uni_id UUID
)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 1;
BEGIN
  -- Convert to lowercase, replace spaces with hyphens
  base_slug := lower(regexp_replace(prof_name, '[^a-zA-Z0-9\s]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  final_slug := base_slug;
  
  -- Check for uniqueness within university
  WHILE EXISTS (
    SELECT 1 FROM professors 
    WHERE slug = final_slug 
      AND university_id = uni_id
  ) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Function to update professor ratings from reviews
CREATE OR REPLACE FUNCTION update_professor_ratings(prof_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE professors
  SET 
    rating_overall = COALESCE((
      SELECT AVG((difficulty + CASE WHEN would_recommend THEN 5 ELSE 1 END) / 2.0)::NUMERIC(3,2)
      FROM reviews
      WHERE professor_id = prof_id AND status = 'approved'
    ), 0),
    rating_difficulty = COALESCE((
      SELECT AVG(difficulty)::NUMERIC(3,2)
      FROM reviews
      WHERE professor_id = prof_id AND status = 'approved'
    ), 0),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE professor_id = prof_id AND status = 'approved'
    ),
    would_take_again_percent = COALESCE((
      SELECT (COUNT(*) FILTER (WHERE would_recommend) * 100.0 / COUNT(*))::NUMERIC(5,2)
      FROM reviews
      WHERE professor_id = prof_id AND status = 'approved'
    ), 0)
  WHERE id = prof_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update professor ratings when review is approved
CREATE OR REPLACE FUNCTION trigger_update_professor_ratings()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' THEN
    PERFORM update_professor_ratings(NEW.professor_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ratings_on_review_approval
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  WHEN (NEW.status = 'approved')
  EXECUTE FUNCTION trigger_update_professor_ratings();

-- ============================================================================
-- 12. UPDATE ADELAIDE UNIVERSITY SEED DATA
-- ============================================================================
UPDATE universities
SET 
  short_name = 'Adelaide',
  state = 'South Australia',
  city = 'Adelaide',
  data_source_type = 'scraper',
  data_source_config = jsonb_build_object(
    'scraper_type', 'adelaide_directory',
    'base_url', 'https://www.adelaide.edu.au/directory',
    'departments', ARRAY['Computer Science']
  ),
  is_sync_enabled = true
WHERE slug = 'university-of-adelaide';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Production schema migration completed successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Schema Summary:';
  RAISE NOTICE '  - Extended: universities, professors, reviews tables';
  RAISE NOTICE '  - Created: courses, professor_courses, sync_jobs, raw_data_staging';
  RAISE NOTICE '  - Added: Circuit breaker trigger, rating auto-update';
  RAISE NOTICE '  - Added: Helper functions for slug generation';
  RAISE NOTICE '';
  RAISE NOTICE '🔄 Next Steps:';
  RAISE NOTICE '  1. Run data import script: npm run import:adelaide';
  RAISE NOTICE '  2. Verify data in Supabase Dashboard';
  RAISE NOTICE '  3. Test professor search + filtering';
  RAISE NOTICE '';
END $$;
