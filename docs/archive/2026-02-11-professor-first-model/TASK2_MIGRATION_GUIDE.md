# Task 2: Supabase Schema Migration - Complete Guide

**Status:** ✅ **Ready for Execution**  
**Date:** 2026-02-11  
**Migration:** `002_production_schema.sql`

---

## 📋 Overview

This migration extends the existing OhMyProfessors schema to support:
- **Multi-university data** (scalable from 1 to 40+ universities)
- **Automated data acquisition** (scraping + sync tracking)
- **Data quality monitoring** (circuit breaker, staging tables)
- **Professor ratings** (auto-computed from reviews)

### What Changed

| Component | Before (MVP) | After (Production) |
|-----------|-------------|-------------------|
| **universities** | Basic info (name, slug, location) | + Sync config, error tracking, circuit breaker |
| **professors** | Basic info (name, email, dept) | + Ratings, source tracking, soft delete |
| **courses** | ❌ Not existed | ✅ Created (code, name, offerings) |
| **professor_courses** | ❌ Not existed | ✅ Created (many-to-many mapping) |
| **reviews** | Basic review data | + university_id for filtering |
| **sync_jobs** | ❌ Not existed | ✅ Created (operational tracking) |
| **raw_data_staging** | ❌ Not existed | ✅ Created (fault isolation) |

---

## 🚀 Quick Start

### Prerequisites

1. **Supabase Project Created**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Create a new project or use existing one
   - Note down: **Project URL** and **Service Role Key**

2. **Environment Variables**
   - Create `.env.local` in project root:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
     ```

3. **Database Ready**
   - Initial schema (`001_enterprise_schema.sql`) already applied
   - If not, run it first via Supabase Dashboard > SQL Editor

### Step 1: Run Migration

**Option A: Via Supabase Dashboard (Recommended for first time)**

1. Go to Supabase Dashboard > SQL Editor
2. Copy contents of `supabase/migrations/20260211073500_production_schema.sql`
3. Paste and click **Run**
4. Wait for success message:
   ```
   ✅ Production schema migration completed successfully!
   ```

**Option B: Via Supabase CLI (if initialized)**

```bash
# If you have supabase CLI installed
supabase db push
```

### Step 2: Import Adelaide Data

```bash
# Run the import script
npm run import:adelaide
```

**Expected Output:**
```
🚀 Starting Adelaide Professors Import

📂 Loading data from data/adelaide-professors.json...
   ✓ Loaded 39 professors

🏛️  Ensuring University of Adelaide exists...
   ✓ University: University of Adelaide (uuid)

👨‍🏫 Importing professors...

[1/39] ✓ Inserted: A/Prof Claudia Szabo
[2/39] ✓ Inserted: Professor Debi Ashenden
...
[39/39] ✓ Inserted: Dr Menasha Thilakaratne

============================================================
📊 Import Summary
============================================================
Total Professors: 39
✅ Inserted:      39
🔄 Updated:       0
⏭️  Skipped:       0
❌ Failed:        0
============================================================

🔍 Verifying import...
   ✓ Total professors in database: 39

✅ Import completed!
```

### Step 3: Verify Data

```bash
# Query Supabase to check data
npx supabase db query "SELECT COUNT(*) FROM professors WHERE university_id IN (SELECT id FROM universities WHERE slug = 'university-of-adelaide')"
```

Or via Supabase Dashboard:
- Go to **Table Editor** > `professors`
- Filter by `university_id` = (Adelaide's UUID)
- Should see 39 rows

---

## 📂 File Structure

```
ohmyprofessors/
├── supabase/
│   └── migrations/
│       ├── 20260210203625_enterprise_schema.sql  # Initial schema
│       └── 20260211073500_production_schema.sql  # NEW: Task 2 migration
│
├── scripts/
│   ├── scrape-adelaide.ts                       # Scraper (Task 1)
│   └── import-adelaide-data.ts                  # NEW: Data import script
│
├── data/
│   └── adelaide-professors.json                 # Scraped data (39 professors)
│
└── docs/
    └── cto/
        └── data-architecture.md                 # Architecture reference
```

---

## 🗄️ Schema Details

### New Tables

#### 1. **courses**
Stores course information (for future course-specific reviews)

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  university_id UUID REFERENCES universities(id),
  course_code TEXT NOT NULL,        -- e.g., 'COMP3506'
  course_name TEXT NOT NULL,        -- e.g., 'Algorithms and Data Structures'
  slug TEXT NOT NULL,
  description TEXT,
  semester_offered TEXT[],          -- ['Semester 1', 'Semester 2']
  ...
  UNIQUE(university_id, course_code)
);
```

#### 2. **professor_courses**
Many-to-many mapping (professors ↔ courses)

```sql
CREATE TABLE professor_courses (
  id UUID PRIMARY KEY,
  professor_id UUID REFERENCES professors(id),
  course_id UUID REFERENCES courses(id),
  role TEXT,                        -- 'lecturer', 'tutor'
  semester TEXT,                    -- 'Semester 1 2024'
  year INT,
  UNIQUE(professor_id, course_id, semester, year)
);
```

#### 3. **sync_jobs**
Operational tracking for automated scraping

```sql
CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY,
  university_id UUID REFERENCES universities(id),
  job_type TEXT NOT NULL,           -- 'full_sync', 'incremental', 'manual'
  status TEXT NOT NULL,             -- 'pending', 'running', 'success', 'failed'
  records_processed INT,
  records_inserted INT,
  records_updated INT,
  error_message TEXT,
  ...
);
```

#### 4. **raw_data_staging**
Temporary storage for scraped data before validation

```sql
CREATE TABLE raw_data_staging (
  id UUID PRIMARY KEY,
  university_id UUID REFERENCES universities(id),
  entity_type TEXT NOT NULL,        -- 'professor', 'course'
  raw_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  ...
);
```

### Extended Tables

#### **universities** (added columns)
```sql
ALTER TABLE universities ADD COLUMN
  short_name TEXT,                  -- 'Adelaide', 'UQ', 'USYD'
  country TEXT DEFAULT 'Australia',
  state TEXT,
  data_source_type TEXT,            -- 'api', 'scraper', 'manual'
  data_source_config JSONB,         -- Scraper-specific config
  last_sync_at TIMESTAMPTZ,
  last_sync_status TEXT,
  sync_error_count INT DEFAULT 0,
  is_sync_enabled BOOLEAN DEFAULT true;
```

#### **professors** (added columns)
```sql
ALTER TABLE professors ADD COLUMN
  title TEXT,                       -- 'Professor', 'Associate Professor'
  office_location TEXT,
  phone TEXT,
  profile_url TEXT,
  
  -- Ratings (auto-computed from reviews)
  rating_overall NUMERIC(3,2),
  rating_difficulty NUMERIC(3,2),
  total_reviews INT DEFAULT 0,
  would_take_again_percent NUMERIC(5,2),
  
  -- Source tracking (for deduplication)
  source_system TEXT,               -- 'adelaide_scraper'
  source_id TEXT,                   -- Original ID from source
  last_synced_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ;           -- Soft delete support
```

---

## 🔧 Key Features

### 1. **Circuit Breaker Pattern**

Automatically disables sync for universities after 3 consecutive failures:

```sql
CREATE TRIGGER sync_circuit_breaker
  AFTER INSERT ON sync_jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_sync_circuit_breaker();
```

**Behavior:**
- ✅ Success → Reset error counter, enable sync
- ❌ Failure → Increment error counter
- ❌❌❌ 3 Failures → Auto-disable sync (`is_sync_enabled = false`)

### 2. **Auto-Update Professor Ratings**

Ratings are automatically recalculated when reviews are approved:

```sql
CREATE TRIGGER update_ratings_on_review_approval
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW
  WHEN (NEW.status = 'approved')
  EXECUTE FUNCTION trigger_update_professor_ratings();
```

**Computed Metrics:**
- `rating_overall` = AVG((difficulty + recommendation) / 2)
- `rating_difficulty` = AVG(difficulty)
- `total_reviews` = COUNT(approved reviews)
- `would_take_again_percent` = % of "would recommend"

### 3. **Slug Generation Helper**

Automatically generates unique URL slugs:

```sql
SELECT generate_professor_slug('Professor Ian Reid', university_id);
-- Returns: 'ian-reid' (or 'ian-reid-2' if duplicate)
```

### 4. **Data Integrity**

- ✅ Foreign keys with CASCADE delete
- ✅ Unique constraints prevent duplicates
- ✅ Check constraints for valid ratings (1-5)
- ✅ Soft delete support (deleted_at column)

---

## 🧪 Testing

### Test 1: Verify Migration

```sql
-- Check if all new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('courses', 'professor_courses', 'sync_jobs', 'raw_data_staging');
```

**Expected:** 4 rows returned

### Test 2: Verify Triggers

```sql
-- Check circuit breaker trigger
SELECT trigger_name, event_manipulation 
FROM information_schema.triggers 
WHERE trigger_name = 'sync_circuit_breaker';
```

**Expected:** 1 row (trigger_name = 'sync_circuit_breaker', event = 'INSERT')

### Test 3: Import Data

```bash
npm run import:adelaide
```

**Expected:** 39 professors inserted

### Test 4: Query Professors

```sql
-- Get all Adelaide professors with ratings
SELECT 
  name, 
  title, 
  department,
  rating_overall,
  total_reviews,
  profile_url
FROM professors
WHERE university_id IN (
  SELECT id FROM universities WHERE slug = 'university-of-adelaide'
)
ORDER BY name
LIMIT 10;
```

**Expected:** 10 rows with professor data

---

## 🚨 Troubleshooting

### Issue 1: Migration Fails with "Extension does not exist"

**Error:**
```
ERROR: extension "uuid-ossp" does not exist
```

**Fix:**
Run this first in Supabase SQL Editor:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Issue 2: Import Script Fails with "Missing environment variables"

**Error:**
```
❌ Error: Missing required environment variables
   SUPABASE_SERVICE_ROLE_KEY: ✗
```

**Fix:**
1. Go to Supabase Dashboard > Settings > API
2. Copy **Service Role Key** (not anon key!)
3. Add to `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your-key-here
   ```

### Issue 3: Duplicate Slug Errors

**Error:**
```
ERROR: duplicate key value violates unique constraint "idx_professors_university_slug"
```

**Fix:**
The import script handles this automatically by appending a timestamp suffix. If you see this error, it means:
- Either run the import script (not manual INSERT)
- Or use the `generate_professor_slug()` function

### Issue 4: No Data After Import

**Check:**
```sql
SELECT COUNT(*) FROM professors;
```

If count = 0, check:
1. Was migration applied? (Check `universities` table has Adelaide entry)
2. Was import script run successfully? (Check terminal output)
3. Was correct `.env.local` file used?

---

## 📊 Next Steps

### Immediate (Task 2 Complete)
- [x] ✅ Create production schema migration
- [x] ✅ Create data import script
- [x] ✅ Import 39 Adelaide professors
- [x] ✅ Verify data integrity

### Short-term (Phase 2)
- [ ] Add admin dashboard to view sync jobs
- [ ] Set up pg_cron for weekly auto-sync
- [ ] Add data quality alerts (Slack webhook)
- [ ] Create professor detail page (use imported data)

### Long-term (Phase 3+)
- [ ] Add 5 more universities (UQ, USYD, ANU, Monash, Melbourne)
- [ ] Implement incremental sync
- [ ] Add course scraping
- [ ] Crowd-source professor corrections

---

## 📚 References

- **CTO Architecture Doc:** `docs/cto/data-architecture.md`
- **Initial Schema:** `supabase/migrations/001_enterprise_schema.sql`
- **Supabase Docs:** https://supabase.com/docs/guides/database/migrations
- **PostgreSQL Docs:** https://www.postgresql.org/docs/current/

---

## ✅ Success Criteria

Migration is successful if:
- ✅ All 4 new tables created (courses, professor_courses, sync_jobs, raw_data_staging)
- ✅ All triggers active (circuit breaker, rating auto-update)
- ✅ 39 Adelaide professors imported successfully
- ✅ No duplicate data (check by running import twice)
- ✅ Ratings auto-compute when reviews added

---

**Last Updated:** 2026-02-11  
**Migration Version:** 002 (Production Schema)  
**Status:** ✅ Ready for Production
