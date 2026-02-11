-- ============================================================================
-- VERIFICATION & TESTING QUERIES
-- Execute these in Supabase SQL Editor after migration
-- ============================================================================

-- ============================================================================
-- 1. VERIFY MIGRATION SUCCESS
-- ============================================================================

-- Check if all new tables exist
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE columns.table_name = tables.table_name) as column_count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'universities', 'professors', 'courses', 'professor_courses',
    'sync_jobs', 'raw_data_staging', 'reviews'
  )
ORDER BY table_name;

-- Expected: 7 rows

-- ============================================================================
-- 2. CHECK TRIGGERS
-- ============================================================================

-- List all custom triggers
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name IN (
    'sync_circuit_breaker',
    'update_ratings_on_review_approval',
    'update_universities_updated_at',
    'update_professors_updated_at',
    'update_courses_updated_at'
  )
ORDER BY event_object_table, trigger_name;

-- Expected: 5+ rows

-- ============================================================================
-- 3. CHECK FUNCTIONS
-- ============================================================================

-- List custom functions
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'check_sync_circuit_breaker',
    'update_professor_ratings',
    'generate_professor_slug',
    'update_updated_at_column'
  )
ORDER BY routine_name;

-- Expected: 4 rows

-- ============================================================================
-- 4. VERIFY UNIVERSITY OF ADELAIDE
-- ============================================================================

-- Check Adelaide university data
SELECT 
  id,
  name,
  slug,
  short_name,
  state,
  city,
  data_source_type,
  is_sync_enabled,
  last_sync_status
FROM universities
WHERE slug = 'university-of-adelaide';

-- Expected: 1 row with updated metadata

-- ============================================================================
-- 5. CHECK PROFESSORS (after import)
-- ============================================================================

-- Count professors by university
SELECT 
  u.name as university,
  u.short_name,
  COUNT(p.id) as professor_count,
  COUNT(CASE WHEN p.deleted_at IS NULL THEN 1 END) as active_count,
  COUNT(CASE WHEN p.rating_overall > 0 THEN 1 END) as rated_count
FROM universities u
LEFT JOIN professors p ON p.university_id = u.id
GROUP BY u.id, u.name, u.short_name
ORDER BY professor_count DESC;

-- Expected (after import): Adelaide = 39 professors

-- ============================================================================
-- 6. VERIFY PROFESSOR DATA QUALITY
-- ============================================================================

-- Check for missing critical fields
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN name IS NULL OR name = '' THEN 1 END) as missing_name,
  COUNT(CASE WHEN slug IS NULL OR slug = '' THEN 1 END) as missing_slug,
  COUNT(CASE WHEN email IS NULL OR email = '' THEN 1 END) as missing_email,
  COUNT(CASE WHEN department IS NULL THEN 1 END) as missing_department,
  COUNT(CASE WHEN source_system IS NULL THEN 1 END) as missing_source
FROM professors
WHERE deleted_at IS NULL;

-- Expected: All counts should be reasonable (email can be NULL)

-- ============================================================================
-- 7. CHECK UNIQUE CONSTRAINTS
-- ============================================================================

-- Verify no duplicate slugs within same university
SELECT 
  university_id,
  slug,
  COUNT(*) as duplicate_count
FROM professors
WHERE deleted_at IS NULL
GROUP BY university_id, slug
HAVING COUNT(*) > 1;

-- Expected: 0 rows (no duplicates)

-- ============================================================================
-- 8. TEST SLUG GENERATION FUNCTION
-- ============================================================================

-- Test slug generation
SELECT generate_professor_slug(
  'Professor Ian Reid',
  (SELECT id FROM universities WHERE slug = 'university-of-adelaide')
) as generated_slug;

-- Expected: Returns a slug like 'ian-reid' or 'ian-reid-2'

-- ============================================================================
-- 9. TEST CIRCUIT BREAKER (Simulation)
-- ============================================================================

-- Insert a test sync job (failed)
INSERT INTO sync_jobs (
  university_id,
  job_type,
  status,
  records_processed,
  error_message,
  triggered_by
)
SELECT 
  id,
  'manual',
  'failed',
  0,
  'Test circuit breaker',
  'manual'
FROM universities
WHERE slug = 'university-of-adelaide'
RETURNING *;

-- Check if error count incremented
SELECT 
  name,
  sync_error_count,
  is_sync_enabled
FROM universities
WHERE slug = 'university-of-adelaide';

-- Clean up test data
DELETE FROM sync_jobs WHERE error_message = 'Test circuit breaker';

-- Reset error count
UPDATE universities 
SET sync_error_count = 0, is_sync_enabled = true
WHERE slug = 'university-of-adelaide';

-- ============================================================================
-- 10. SAMPLE QUERIES (for frontend development)
-- ============================================================================

-- Get top-rated professors
SELECT 
  p.name,
  p.title,
  p.department,
  p.rating_overall,
  p.total_reviews,
  p.would_take_again_percent,
  u.short_name as university
FROM professors p
JOIN universities u ON p.university_id = u.id
WHERE p.deleted_at IS NULL
  AND p.total_reviews > 0
ORDER BY p.rating_overall DESC, p.total_reviews DESC
LIMIT 10;

-- Get professors by department
SELECT 
  name,
  title,
  email,
  office_location,
  profile_url
FROM professors
WHERE department = 'Computer Science'
  AND deleted_at IS NULL
  AND university_id IN (
    SELECT id FROM universities WHERE slug = 'university-of-adelaide'
  )
ORDER BY name;

-- Get professor with full details
SELECT 
  p.*,
  u.name as university_name,
  u.short_name as university_short,
  (SELECT COUNT(*) FROM reviews WHERE professor_id = p.id AND status = 'approved') as approved_reviews_count
FROM professors p
JOIN universities u ON p.university_id = u.id
WHERE p.slug = 'ian-reid'
  AND p.deleted_at IS NULL;

-- ============================================================================
-- 11. CHECK RLS POLICIES
-- ============================================================================

-- List all RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Expected: Multiple policies for each table

-- ============================================================================
-- 12. PERFORMANCE CHECK
-- ============================================================================

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('universities', 'professors', 'courses', 'sync_jobs')
ORDER BY tablename, indexname;

-- Expected: Multiple indexes per table

-- ============================================================================
-- 13. DATA INTEGRITY CHECK
-- ============================================================================

-- Check for orphaned records
SELECT 
  'orphaned professors' as issue,
  COUNT(*) as count
FROM professors p
WHERE NOT EXISTS (SELECT 1 FROM universities u WHERE u.id = p.university_id)

UNION ALL

SELECT 
  'orphaned reviews' as issue,
  COUNT(*) as count
FROM reviews r
WHERE NOT EXISTS (SELECT 1 FROM professors p WHERE p.id = r.professor_id);

-- Expected: 0 orphaned records

-- ============================================================================
-- SUCCESS CRITERIA CHECKLIST
-- ============================================================================

DO $$
DECLARE
  table_count INT;
  trigger_count INT;
  function_count INT;
  adelaide_count INT;
BEGIN
  -- Count tables
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('courses', 'professor_courses', 'sync_jobs', 'raw_data_staging');
  
  -- Count triggers
  SELECT COUNT(*) INTO trigger_count
  FROM information_schema.triggers
  WHERE trigger_schema = 'public'
    AND trigger_name IN ('sync_circuit_breaker', 'update_ratings_on_review_approval');
  
  -- Count functions
  SELECT COUNT(*) INTO function_count
  FROM information_schema.routines
  WHERE routine_schema = 'public'
    AND routine_name IN ('check_sync_circuit_breaker', 'generate_professor_slug');
  
  -- Count Adelaide professors
  SELECT COUNT(*) INTO adelaide_count
  FROM professors p
  WHERE p.university_id IN (SELECT id FROM universities WHERE slug = 'university-of-adelaide')
    AND p.deleted_at IS NULL;
  
  RAISE NOTICE '============================================================';
  RAISE NOTICE '✅ MIGRATION VERIFICATION RESULTS';
  RAISE NOTICE '============================================================';
  RAISE NOTICE '';
  RAISE NOTICE 'New Tables Created:        % / 4', table_count;
  RAISE NOTICE 'Triggers Active:           % / 2', trigger_count;
  RAISE NOTICE 'Helper Functions Created:  % / 2', function_count;
  RAISE NOTICE 'Adelaide Professors:       %', adelaide_count;
  RAISE NOTICE '';
  
  IF table_count = 4 AND trigger_count >= 2 AND function_count >= 2 THEN
    RAISE NOTICE '✅ MIGRATION SUCCESSFUL!';
    RAISE NOTICE '';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '  1. Run: npm run import:adelaide';
    RAISE NOTICE '  2. Verify Adelaide professors count = 39';
    RAISE NOTICE '  3. Test professor search on frontend';
  ELSE
    RAISE WARNING '⚠️  MIGRATION INCOMPLETE - Check errors above';
  END IF;
  
  RAISE NOTICE '============================================================';
END $$;
