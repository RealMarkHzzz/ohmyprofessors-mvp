# Data Architecture - OhMyProfessors
**CTO Technical Design Document**  
**Author:** CTO (Werner Vogels Model)  
**Date:** 2026-02-11  
**Status:** RFC - Request for Comments

---

## Executive Summary

This document outlines the technical architecture for acquiring, storing, and maintaining course and professor data across all Australian universities. The design prioritizes **simplicity, fault isolation, and operational excellence** for an independent developer.

### Key Principles (Amazon Leadership Principles Applied)

1. **Everything Fails All The Time** - Design for partial failures
2. **Simple Scales** - Avoid premature complexity
3. **Managed Services First** - Reduce operational burden
4. **Eventual Consistency** - Perfect is the enemy of good
5. **Blast Radius Isolation** - One university failure ≠ system failure

---

## 1. Data Acquisition Architecture

### 1.1 High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Data Acquisition Layer                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│  │ UQ API   │   │ USYD Web │   │ ANU Web  │   │ Manual   │   │
│  │ Scraper  │   │ Scraper  │   │ Scraper  │   │ Upload   │   │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘   │
│       │              │              │              │          │
│       └──────────────┴──────────────┴──────────────┘          │
│                            │                                   │
│                   ┌────────▼────────┐                         │
│                   │  Supabase Edge  │                         │
│                   │    Functions    │                         │
│                   │  (Orchestrator) │                         │
│                   └────────┬────────┘                         │
│                            │                                   │
└────────────────────────────┼───────────────────────────────────┘
                             │
                   ┌─────────▼─────────┐
                   │  Supabase Queue   │
                   │  (pg_cron + jobs) │
                   └─────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌────▼────┐  ┌─────▼─────┐
        │ Raw Data  │  │ Transform│  │ Validated │
        │  Staging  │→ │  Layer   │→ │   Data    │
        └───────────┘  └─────────┘  └───────────┘
                                           │
                       ┌───────────────────┘
                       │
              ┌────────▼────────┐
              │  Production DB  │
              │  (PostgreSQL)   │
              └─────────────────┘
```

### 1.2 Data Source Strategy (Per University)

Each university is an **isolated data source** with its own:

- **Scraper configuration** (stored in `university_scrapers` table)
- **Error budget** (10% failure rate acceptable)
- **Update schedule** (configurable per source)
- **Circuit breaker** (auto-disable after 3 consecutive failures)

#### University Data Source Types

| University | Data Source | Method | Update Frequency | Complexity |
|-----------|-------------|--------|------------------|------------|
| **Phase 1 (MVP)** |
| University of Queensland (UQ) | UQ Maps API | HTTP API | Daily | Low |
| University of Sydney (USYD) | Staff Directory | Web Scraper | Weekly | Medium |
| Australian National University (ANU) | Staff Profiles | Web Scraper | Weekly | Medium |
| **Phase 2** |
| University of Melbourne | API (if available) | API/Scraper | Weekly | TBD |
| Monash University | Staff Directory | Web Scraper | Weekly | Medium |
| UNSW Sydney | Staff Profiles | Web Scraper | Weekly | Medium |
| **Phase 3+** |
| All other Australian universities | Manual + Crowd-sourced | Manual Upload | Ad-hoc | High |

---

## 2. Storage Design (Supabase PostgreSQL)

### 2.1 Core Schema Design

```sql
-- ============================================================================
-- UNIVERSITIES TABLE
-- ============================================================================
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE, -- e.g., 'UQ', 'USYD', 'ANU'
  country TEXT DEFAULT 'Australia',
  state TEXT,
  city TEXT,
  
  -- Data source configuration
  data_source_type TEXT, -- 'api', 'scraper', 'manual'
  data_source_config JSONB, -- Flexible config per source
  
  -- Operational metadata
  last_sync_at TIMESTAMPTZ,
  last_sync_status TEXT, -- 'success', 'partial', 'failed'
  sync_error_count INT DEFAULT 0,
  is_sync_enabled BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_universities_slug ON universities(slug);
CREATE INDEX idx_universities_sync_enabled ON universities(is_sync_enabled) 
  WHERE is_sync_enabled = true;

-- ============================================================================
-- PROFESSORS TABLE (Extended from existing schema)
-- ============================================================================
CREATE TABLE professors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id),
  
  -- Core identity
  full_name TEXT NOT NULL,
  slug TEXT NOT NULL, -- university-scoped: e.g., 'john-smith-uq'
  email TEXT,
  title TEXT, -- 'Professor', 'Associate Professor', etc.
  
  -- Department & location
  department TEXT NOT NULL,
  school TEXT, -- Faculty or School
  office_location TEXT,
  
  -- Profile
  profile_image_url TEXT,
  bio TEXT,
  research_interests TEXT[],
  
  -- Aggregated ratings (computed from reviews)
  rating_overall NUMERIC(3,2) DEFAULT 0,
  rating_difficulty NUMERIC(3,2) DEFAULT 0,
  rating_clarity NUMERIC(3,2) DEFAULT 0,
  rating_helpfulness NUMERIC(3,2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  would_take_again_percent NUMERIC(5,2) DEFAULT 0,
  
  -- Data source tracking
  source_system TEXT, -- 'uq_api', 'usyd_scraper', 'manual'
  source_id TEXT, -- Original ID from source system
  source_url TEXT, -- Original profile URL
  last_synced_at TIMESTAMPTZ,
  
  -- Verification & moderation
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(university_id, slug)
);

CREATE INDEX idx_professors_university ON professors(university_id);
CREATE INDEX idx_professors_department ON professors(department);
CREATE INDEX idx_professors_source ON professors(source_system, source_id);
CREATE INDEX idx_professors_rating ON professors(rating_overall DESC);

-- ============================================================================
-- COURSES TABLE (NEW - Critical for context)
-- ============================================================================
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id),
  
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
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(university_id, course_code)
);

CREATE INDEX idx_courses_university ON courses(university_id);
CREATE INDEX idx_courses_code ON courses(course_code);

-- ============================================================================
-- PROFESSOR_COURSES (Many-to-Many)
-- ============================================================================
CREATE TABLE professor_courses (
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
  
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(professor_id, course_id, semester, year)
);

CREATE INDEX idx_prof_courses_professor ON professor_courses(professor_id);
CREATE INDEX idx_prof_courses_course ON professor_courses(course_id);

-- ============================================================================
-- SYNC JOBS TABLE (Operational tracking)
-- ============================================================================
CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id),
  
  job_type TEXT NOT NULL, -- 'full_sync', 'incremental', 'manual'
  status TEXT NOT NULL, -- 'pending', 'running', 'success', 'failed', 'partial'
  
  -- Metrics
  started_at TIMESTAMPTZ DEFAULT now(),
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
  
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sync_jobs_university ON sync_jobs(university_id, created_at DESC);
CREATE INDEX idx_sync_jobs_status ON sync_jobs(status, created_at DESC);

-- ============================================================================
-- RAW DATA STAGING TABLE
-- ============================================================================
CREATE TABLE raw_data_staging (
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
  
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_staging_unprocessed ON raw_data_staging(university_id, processed) 
  WHERE processed = false;
```

### 2.2 Schema Design Rationale

#### ✅ **Extensibility**
- `data_source_config JSONB` - Each university can have unique scraper config
- `raw_data JSONB` - Flexibility for varying source formats
- `professor_courses` - Future-proof for course-specific reviews

#### ✅ **Fault Isolation**
- `sync_error_count` + `is_sync_enabled` - Auto-disable failing scrapers
- `sync_jobs` table - Track per-university job history
- `raw_data_staging` - Failed records don't corrupt production data

#### ✅ **Operational Visibility**
- `last_sync_at` / `last_sync_status` - Dashboard-ready
- `sync_jobs` metrics - Performance monitoring
- `source_system` / `source_id` - Audit trail

---

## 3. Technology Selection

### 3.1 Data Acquisition: Self-Built Scrapers vs Third-Party

| Option | Pros | Cons | Cost | Verdict |
|--------|------|------|------|---------|
| **Self-Built (Recommended)** | | | | ✅ **SELECTED** |
| Playwright + Supabase Edge Functions | - Full control<br>- No external dependencies<br>- University-specific customization<br>- Free (Supabase Edge Functions) | - Maintenance overhead<br>- Brittle to website changes<br>- Rate limiting complexity | **$0 - $20/month** (Supabase Edge invocations) | **Best for Phase 1-2** |
| **Third-Party Services** | | | | ❌ |
| Apify / Bright Data | - Managed infrastructure<br>- Anti-bot detection<br>- Proxy rotation | - **$99-499/month**<br>- Lock-in<br>- Overkill for AU universities | $99-499/month | Too expensive for MVP |
| Manual + Crowd-sourced | - Zero scraping cost<br>- Human verification | - Slow initial data collection<br>- Requires user incentives | $0 | **Phase 3 fallback** |

#### Decision: **Self-Built Scrapers with Playwright**

**Rationale:**
1. Australian universities don't have aggressive anti-bot measures (unlike e.g., Amazon)
2. Low update frequency (weekly) = lower detection risk
3. ~40 universities × 50-200 professors each = manageable scale
4. Cost: **$0-20/month** vs **$99-499/month** for third-party

### 3.2 Scraping Stack

```typescript
// Supabase Edge Function: /functions/sync-university/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { chromium } from "npm:playwright-core@1.40.0"

serve(async (req) => {
  const { university_id } = await req.json()
  
  // 1. Fetch scraper config from DB
  const config = await getScraperConfig(university_id)
  
  // 2. Launch browser (serverless Chromium)
  const browser = await chromium.launch()
  
  try {
    // 3. Execute university-specific scraper
    const scraper = await import(`./scrapers/${config.university_code}.ts`)
    const rawData = await scraper.scrape(browser, config)
    
    // 4. Store in staging table
    await storeRawData(university_id, rawData)
    
    // 5. Trigger transformation pipeline
    await triggerTransform(university_id)
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    // 6. Log error, increment error counter
    await recordSyncFailure(university_id, error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    })
  } finally {
    await browser.close()
  }
})
```

### 3.3 Scheduling: Supabase pg_cron

```sql
-- Weekly sync for each enabled university
SELECT cron.schedule(
  'sync-universities-weekly',
  '0 2 * * 0', -- Every Sunday at 2 AM
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/sync-university',
    headers := '{"Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb,
    body := json_build_object('university_id', id)::jsonb
  )
  FROM universities
  WHERE is_sync_enabled = true
  $$
);
```

**Why pg_cron?**
- ✅ Built into Supabase (free tier: 2 jobs, paid: unlimited)
- ✅ No external cron service (Vercel Cron costs $20/month)
- ✅ Direct database access for coordination
- ❌ Limited to PostgreSQL server timezone

---

## 4. Update Strategy

### 4.1 Update Frequency Matrix

| Data Type | Update Frequency | Rationale | Method |
|-----------|------------------|-----------|--------|
| **Professor Profiles** | Weekly | Staff changes are rare | Full sync |
| **Courses** | Per semester (3x/year) | Course catalogs stable within semester | Full sync |
| **Professor-Course Links** | Weekly during semester | Enrollment/teaching assignments change | Incremental |
| **Reviews** | Real-time | User-generated content | Event-driven |

### 4.2 Sync Modes

#### Full Sync (Weekly)
```
1. Fetch all professor data from source
2. Store in raw_data_staging
3. Transform & validate
4. Upsert to professors table (UPDATE if exists, INSERT if new)
5. Soft-delete records not in source (deleted_at = now())
```

#### Incremental Sync (Daily - Optional Phase 2)
```
1. Query source for records modified since last_sync_at
2. Process only changed records
3. Faster, but requires source system to expose last_modified
```

### 4.3 Data Freshness SLA

| Metric | Target | Measurement |
|--------|--------|-------------|
| Professor data staleness | < 7 days | `now() - last_synced_at` |
| Sync success rate | > 90% per university | `successful_syncs / total_syncs` |
| Sync duration | < 5 minutes per university | `sync_jobs.duration_ms` |

---

## 5. Fault Tolerance & Error Handling

### 5.1 Failure Modes & Mitigation

| Failure Mode | Impact | Detection | Mitigation |
|--------------|--------|-----------|------------|
| **University website down** | 1 university data stale | HTTP 5xx errors | - Exponential backoff retry (3 attempts)<br>- Alert after 24h downtime<br>- Serve stale data |
| **Website structure changed** | Scraper fails to parse | Zero records extracted | - Schema validation before commit<br>- Alert on record count drop > 50%<br>- Manual scraper update |
| **Rate limiting** | IP blocked | HTTP 429 or CAPTCHA | - Respectful delays (2-5s between pages)<br>- Rotate User-Agent<br>- Accept temporary failure |
| **Database deadlock** | Sync job fails | PostgreSQL deadlock error | - Retry with jitter<br>- Reduce transaction size |
| **Edge Function timeout** | Partial sync | Deno timeout (max 60s) | - Paginate scraping (e.g., 50 professors/batch)<br>- Use background job queue |

### 5.2 Circuit Breaker Pattern

```sql
-- Automatically disable university after 3 consecutive failures
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
        is_sync_enabled = true
    WHERE id = NEW.university_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_circuit_breaker
  AFTER INSERT ON sync_jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_sync_circuit_breaker();
```

### 5.3 Blast Radius Isolation

**Principle:** One university failure must NOT impact others.

✅ **Implemented:**
- Each university has isolated scraper config
- Sync jobs run sequentially (not parallel) to avoid resource contention
- Staging table prevents corrupt data from reaching production
- Circuit breaker auto-disables failing universities

❌ **NOT Implemented (out of scope):**
- Multi-region database replication (Supabase free tier = single region)
- Real-time failover (acceptable for weekly sync cadence)

---

## 6. Operational Complexity Assessment

### 6.1 Maintenance Effort (Per Year)

| Task | Frequency | Effort | Automation |
|------|-----------|--------|------------|
| **Monitor sync health** | Daily | 5 min/day | ✅ Slack alerts via webhook |
| **Fix broken scrapers** | ~1x/semester per university | 1-2 hours | ❌ Manual (website changes unpredictable) |
| **Add new university** | ~5x/year (growth) | 4-6 hours | ⚠️ Semi-automated (template scraper) |
| **Database schema migration** | ~2x/year | 2-4 hours | ✅ Supabase migration system |
| **Scaling adjustments** | As needed | 1-2 hours | ✅ Supabase auto-scaling |

**Total Annual Effort:** ~40-60 hours (assuming 10 universities)

### 6.2 Cost Breakdown (Monthly)

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| **Supabase Database** | Free → Pro | $0 → $25 | Free tier: 500 MB, 2 GB transfer<br>Upgrade at ~1000 professors |
| **Supabase Edge Functions** | Free | $0 | 500K invocations/month free<br>~10 universities × 4 syncs/month = 40 invocations |
| **Vercel Hosting** | Hobby | $0 | Next.js frontend |
| **Monitoring (Sentry)** | Free | $0 | 5K errors/month free |
| **Total (MVP)** | | **$0-25/month** | |

**Scaling Projection (100 universities):**
- Supabase Pro: $25/month (database)
- Edge Functions: $0 (still under free tier)
- **Total: ~$25-50/month**

---

## 7. Phased Implementation Roadmap

### Phase 1: MVP (Weeks 1-4)
**Goal:** Prove the architecture with 3 universities

- [ ] Implement database schema (Section 2.1)
- [ ] Build scraper for UQ (API-based, easiest)
- [ ] Build scrapers for USYD + ANU (web scraping)
- [ ] Deploy to Supabase Edge Functions
- [ ] Set up pg_cron scheduling
- [ ] Basic monitoring (Slack webhooks)

**Success Metrics:**
- 3 universities syncing successfully
- < 5 minute sync time per university
- > 90% sync success rate

### Phase 2: Scale (Weeks 5-8)
**Goal:** Add 5 more universities + operational tooling

- [ ] Add Melbourne, Monash, UNSW, UTS, UWA
- [ ] Build admin dashboard (Next.js page)
  - Sync job history
  - Error logs
  - Manual trigger buttons
- [ ] Implement circuit breaker (Section 5.2)
- [ ] Add data quality checks (e.g., "did we lose 50% of professors?")

### Phase 3: Optimization (Weeks 9-12)
**Goal:** Reduce maintenance overhead

- [ ] Scraper health tests (automated checks for website changes)
- [ ] Template-based scraper generation (reduce new university effort)
- [ ] User-submitted professor corrections (crowd-sourced fixes)
- [ ] Incremental sync mode (reduce load)

---

## 8. Alternatives Considered (& Why Rejected)

### 8.1 Option A: Third-Party Data Provider
**Example:** Acquire data from RateMyProfessors API (if available)

❌ **Rejected because:**
- No official API for Australian universities
- Data quality unknown (user-generated, unverified)
- Licensing restrictions (can't redistribute)
- No course-level granularity

### 8.2 Option B: Full Decentralized (User-Submitted Only)
**Model:** Wikipedia-style crowd-sourced data

❌ **Rejected because:**
- Slow initial data collection (cold start problem)
- Data quality inconsistency (requires heavy moderation)
- User trust issues ("Is this professor real?")
- **Acceptable as Phase 3 supplement, not primary source**

### 8.3 Option C: Real-Time Scraping (On-Demand)
**Model:** Scrape professor data when user searches

❌ **Rejected because:**
- Slow user experience (3-10s page load)
- University rate limiting (IP bans likely)
- High Edge Function costs (10K searches/month = $5-10)
- Cache invalidation complexity

---

## 9. Monitoring & Observability

### 9.1 Key Metrics Dashboard

```sql
-- Sync health overview (for admin dashboard)
SELECT 
  u.name,
  u.last_sync_at,
  u.last_sync_status,
  u.sync_error_count,
  u.is_sync_enabled,
  (SELECT COUNT(*) FROM professors WHERE university_id = u.id) as total_professors,
  (SELECT AVG(duration_ms) FROM sync_jobs WHERE university_id = u.id AND created_at > now() - interval '30 days') as avg_sync_duration_ms
FROM universities u
ORDER BY u.last_sync_at DESC NULLS LAST;
```

### 9.2 Alerting Rules

| Alert | Condition | Severity | Action |
|-------|-----------|----------|--------|
| **Sync failure** | 3 consecutive failures | High | Slack notification, disable auto-sync |
| **Data drop** | Professor count drops > 30% | Critical | Rollback staging data, investigate |
| **Slow sync** | Duration > 10 minutes | Medium | Optimize scraper, add pagination |
| **No syncs** | No successful sync in 14 days | High | Check pg_cron, Edge Function logs |

### 9.3 Logging Strategy

- **Edge Function logs:** Supabase built-in logging (7 day retention)
- **Application errors:** Sentry.io (free tier: 5K events/month)
- **Audit trail:** `sync_jobs` table (permanent retention)

---

## 10. Security & Compliance

### 10.1 Data Privacy (Australian Privacy Act)

| Data Type | Sensitivity | Storage | Compliance |
|-----------|-------------|---------|------------|
| Professor names, departments | Public | PostgreSQL | ✅ Publicly available data |
| Professor emails | Semi-public | PostgreSQL | ✅ From public university directories |
| User reviews | User-generated | PostgreSQL | ✅ Anonymized display, require login |
| Scraping logs | Internal | Supabase logs | ✅ No PII |

**Risk Assessment:** ✅ **LOW** - All scraped data is publicly accessible on university websites.

### 10.2 Rate Limiting & Ethical Scraping

```typescript
// Respectful scraping configuration
const SCRAPER_CONFIG = {
  USER_AGENT: 'OhMyProfessors/1.0 (Educational; contact@ohmyprofessors.com)',
  DELAY_BETWEEN_PAGES: 2000, // 2 seconds
  CONCURRENT_REQUESTS: 1, // Sequential only
  RESPECT_ROBOTS_TXT: true,
  MAX_RETRIES: 3,
  TIMEOUT: 30000 // 30 seconds
}
```

**Compliance:**
- ✅ Respect `robots.txt` (check `/robots.txt` before scraping)
- ✅ Identify scraper in User-Agent
- ✅ Low request rate (1 page every 2 seconds)
- ✅ Scrape during off-peak hours (2-5 AM)

---

## 11. FAQ / Decision Log

### Q: Why not use Puppeteer instead of Playwright?
**A:** Playwright has better Deno support (Supabase Edge Functions run on Deno, not Node.js). Puppeteer requires Node.js polyfills.

### Q: Why pg_cron instead of Vercel Cron?
**A:** 
- Vercel Cron costs $20/month (Hobby plan doesn't include cron)
- pg_cron is free on Supabase Pro ($25/month, but we need Pro for database size anyway)
- pg_cron runs closer to data (no network latency)

### Q: Why not real-time sync?
**A:** 
- Professor data changes infrequently (weekly is sufficient)
- Universities don't expose real-time APIs
- Real-time = higher cost + complexity for negligible user value

### Q: What if a university blocks our scraper?
**A:**
1. Fallback to manual upload (admin interface)
2. Contact university IT for API access (if large university)
3. Reduce sync frequency (monthly instead of weekly)
4. Use proxy rotation (last resort, adds cost)

### Q: How do we handle merges/duplicates?
**A:**
- Use `source_id` + `university_id` as natural key
- On sync, `UPSERT` based on (university_id, source_id)
- Manual merge tool in admin dashboard (Phase 3)

---

## 12. Conclusion & Recommendation

### ✅ Recommended Architecture

1. **Data Acquisition:** Self-built Playwright scrapers in Supabase Edge Functions
2. **Storage:** PostgreSQL (Supabase) with staging → production pipeline
3. **Scheduling:** pg_cron for weekly syncs
4. **Fault Tolerance:** Circuit breaker + per-university error budgets
5. **Cost:** $0-25/month for MVP, scales to ~$50/month at 100 universities

### 🎯 Success Criteria (3 Months)

- [ ] 10+ universities with automated sync
- [ ] 90%+ sync success rate
- [ ] < 10 hours/month maintenance effort
- [ ] Zero critical incidents (data corruption, privacy breach)

### 🚀 Next Steps

1. **Week 1:** Implement database schema + UQ scraper
2. **Week 2:** Add USYD + ANU scrapers
3. **Week 3:** Deploy to production, monitor for 1 week
4. **Week 4:** Review metrics, iterate on error handling

---

**Document Status:** Ready for implementation  
**Review by:** CEO (market validation), PM (roadmap alignment)  
**Last Updated:** 2026-02-11

---

## Appendix A: Example Scraper Code

```typescript
// /functions/sync-university/scrapers/uq.ts
export async function scrapeUQ(browser, config) {
  const page = await browser.newPage()
  const professors = []
  
  // UQ has a public API for staff directory
  const response = await fetch('https://researchers.uq.edu.au/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filters: { positions: ['Professor', 'Associate Professor'] }
    })
  })
  
  const data = await response.json()
  
  for (const person of data.results) {
    professors.push({
      full_name: person.name,
      email: person.email,
      department: person.school,
      title: person.position,
      source_id: person.id,
      source_url: `https://researchers.uq.edu.au/researcher/${person.id}`,
      bio: person.bio,
      research_interests: person.topics || []
    })
  }
  
  await page.close()
  return professors
}

// /functions/sync-university/scrapers/usyd.ts
export async function scrapeUSYD(browser, config) {
  const page = await browser.newPage()
  const professors = []
  
  // USYD requires web scraping
  await page.goto('https://www.sydney.edu.au/science/about/our-people.html')
  
  const staffLinks = await page.$$eval('a.staff-profile', links =>
    links.map(a => a.href)
  )
  
  for (const url of staffLinks) {
    await page.goto(url)
    await page.waitForTimeout(2000) // Respectful delay
    
    const profile = await page.evaluate(() => ({
      full_name: document.querySelector('h1.profile-name')?.textContent,
      title: document.querySelector('.profile-title')?.textContent,
      department: document.querySelector('.profile-department')?.textContent,
      email: document.querySelector('a[href^="mailto:"]')?.textContent,
      bio: document.querySelector('.profile-bio')?.textContent
    }))
    
    professors.push({
      ...profile,
      source_url: url,
      source_id: url.split('/').pop()
    })
  }
  
  await page.close()
  return professors
}
```

## Appendix B: Database Migration Scripts

```sql
-- Migration 001: Initial schema
-- Run via Supabase Dashboard > SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_cron extension (Supabase Pro only)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Run all CREATE TABLE statements from Section 2.1
-- (See full schema above)

-- Create RLS policies (Row Level Security)
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;

-- Public read access to universities & professors
CREATE POLICY "Public read universities" 
  ON universities FOR SELECT 
  USING (true);

CREATE POLICY "Public read professors" 
  ON professors FOR SELECT 
  USING (deleted_at IS NULL);

-- Only admins can modify sync data
CREATE POLICY "Admin only sync_jobs" 
  ON sync_jobs 
  USING (auth.jwt() ->> 'role' = 'admin');
```
