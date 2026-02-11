# Implementation Checklist - Data Acquisition System
**CTO Implementation Guide**  
**Estimated Timeline:** 4 weeks (MVP)

---

## Week 1: Database Foundation

### Day 1-2: Schema Setup

- [ ] **Create Supabase Project**
  - Go to [supabase.com](https://supabase.com)
  - Create new project: `ohmyprofessors`
  - Note down: Project URL, Anon Key, Service Role Key

- [ ] **Run Database Migrations**
  ```sql
  -- File: supabase/migrations/001_initial_schema.sql
  
  -- Universities table
  CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    code TEXT UNIQUE,
    data_source_type TEXT,
    data_source_config JSONB,
    last_sync_at TIMESTAMPTZ,
    last_sync_status TEXT,
    sync_error_count INT DEFAULT 0,
    is_sync_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  
  -- Professors table (extends existing)
  ALTER TABLE professors ADD COLUMN IF NOT EXISTS source_system TEXT;
  ALTER TABLE professors ADD COLUMN IF NOT EXISTS source_id TEXT;
  ALTER TABLE professors ADD COLUMN IF NOT EXISTS source_url TEXT;
  ALTER TABLE professors ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ;
  
  CREATE INDEX IF NOT EXISTS idx_professors_source 
    ON professors(source_system, source_id);
  
  -- Courses table (NEW)
  CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES universities(id),
    course_code TEXT NOT NULL,
    course_name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    credit_points INT,
    level TEXT,
    semester_offered TEXT[],
    last_offered_year INT,
    is_active BOOLEAN DEFAULT true,
    source_system TEXT,
    source_id TEXT,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(university_id, course_code)
  );
  
  -- Professor-Courses junction
  CREATE TABLE professor_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professor_id UUID NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    role TEXT,
    semester TEXT,
    year INT,
    source_system TEXT,
    last_synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(professor_id, course_id, semester, year)
  );
  
  -- Sync jobs tracking
  CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES universities(id),
    job_type TEXT NOT NULL,
    status TEXT NOT NULL,
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    duration_ms INT,
    records_processed INT DEFAULT 0,
    records_inserted INT DEFAULT 0,
    records_updated INT DEFAULT 0,
    records_failed INT DEFAULT 0,
    error_message TEXT,
    error_details JSONB,
    triggered_by TEXT,
    config JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  
  CREATE INDEX idx_sync_jobs_university 
    ON sync_jobs(university_id, created_at DESC);
  
  -- Staging table
  CREATE TABLE raw_data_staging (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES universities(id),
    sync_job_id UUID REFERENCES sync_jobs(id),
    entity_type TEXT NOT NULL,
    raw_data JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMPTZ,
    processing_error TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );
  
  CREATE INDEX idx_staging_unprocessed 
    ON raw_data_staging(university_id, processed) 
    WHERE processed = false;
  ```

- [ ] **Seed Initial Universities**
  ```sql
  -- File: supabase/migrations/002_seed_universities.sql
  
  INSERT INTO universities (name, slug, code, data_source_type, data_source_config, is_sync_enabled) VALUES
  ('University of Queensland', 'university-of-queensland', 'UQ', 'api', '{
    "api_endpoint": "https://researchers.uq.edu.au/api/search",
    "rate_limit_ms": 1000,
    "max_results": 500
  }'::jsonb, true),
  
  ('University of Sydney', 'university-of-sydney', 'USYD', 'scraper', '{
    "base_url": "https://www.sydney.edu.au/science/about/our-people.html",
    "scraper_type": "playwright",
    "rate_limit_ms": 2000,
    "selectors": {
      "staff_list": "a.staff-profile",
      "name": "h1.profile-name",
      "department": ".profile-department",
      "email": "a[href^=\"mailto:\"]"
    }
  }'::jsonb, true),
  
  ('Australian National University', 'australian-national-university', 'ANU', 'scraper', '{
    "base_url": "https://researchers.anu.edu.au/",
    "scraper_type": "playwright",
    "rate_limit_ms": 2000
  }'::jsonb, true);
  ```

- [ ] **Create Circuit Breaker Trigger**
  ```sql
  -- File: supabase/migrations/003_circuit_breaker.sql
  
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
  ```

### Day 3: Environment Setup

- [ ] **Install Supabase CLI**
  ```bash
  npm install -g supabase
  supabase login
  supabase link --project-ref YOUR_PROJECT_ID
  ```

- [ ] **Configure Environment Variables**
  ```bash
  # .env.local
  NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```

---

## Week 2: First Scraper (UQ - API-based)

### Day 4-5: Edge Function Setup

- [ ] **Create Supabase Edge Function**
  ```bash
  supabase functions new sync-university
  ```

- [ ] **Implement UQ Scraper**
  ```typescript
  // supabase/functions/sync-university/index.ts
  
  import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
  import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  
  serve(async (req) => {
    try {
      const { university_id } = await req.json()
      
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      // 1. Get university config
      const { data: university, error: uniError } = await supabase
        .from('universities')
        .select('*')
        .eq('id', university_id)
        .single()
      
      if (uniError) throw uniError
      
      // 2. Create sync job
      const { data: syncJob, error: jobError } = await supabase
        .from('sync_jobs')
        .insert({
          university_id,
          job_type: 'full_sync',
          status: 'running',
          triggered_by: 'api'
        })
        .select()
        .single()
      
      if (jobError) throw jobError
      
      const startTime = Date.now()
      
      // 3. Execute scraper
      const scraper = await import(`./scrapers/${university.code.toLowerCase()}.ts`)
      const rawData = await scraper.scrape(university.data_source_config)
      
      // 4. Store in staging
      const stagingRecords = rawData.map(record => ({
        university_id,
        sync_job_id: syncJob.id,
        entity_type: 'professor',
        raw_data: record
      }))
      
      const { error: stagingError } = await supabase
        .from('raw_data_staging')
        .insert(stagingRecords)
      
      if (stagingError) throw stagingError
      
      // 5. Process staging data
      await processRawData(supabase, university_id, syncJob.id)
      
      // 6. Update sync job
      const duration = Date.now() - startTime
      await supabase
        .from('sync_jobs')
        .update({
          status: 'success',
          completed_at: new Date().toISOString(),
          duration_ms: duration,
          records_processed: rawData.length
        })
        .eq('id', syncJob.id)
      
      return new Response(
        JSON.stringify({ success: true, job_id: syncJob.id }),
        { headers: { "Content-Type": "application/json" } }
      )
      
    } catch (error) {
      console.error('Sync failed:', error)
      
      // Update job status
      if (syncJob?.id) {
        await supabase
          .from('sync_jobs')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error_message: error.message,
            error_details: { stack: error.stack }
          })
          .eq('id', syncJob.id)
      }
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }
  })
  
  async function processRawData(supabase, universityId, syncJobId) {
    // Fetch unprocessed staging records
    const { data: stagingRecords } = await supabase
      .from('raw_data_staging')
      .select('*')
      .eq('university_id', universityId)
      .eq('sync_job_id', syncJobId)
      .eq('processed', false)
    
    for (const record of stagingRecords || []) {
      try {
        const raw = record.raw_data
        
        // Transform to database schema
        const professor = {
          university_id: universityId,
          full_name: raw.name,
          slug: generateSlug(raw.name, universityId),
          email: raw.email,
          department: raw.department,
          title: raw.position,
          bio: raw.bio,
          research_interests: raw.topics || [],
          source_system: raw.source_system,
          source_id: raw.source_id,
          source_url: raw.source_url,
          last_synced_at: new Date().toISOString()
        }
        
        // Upsert professor
        const { error: upsertError } = await supabase
          .from('professors')
          .upsert(professor, {
            onConflict: 'university_id,slug'
          })
        
        if (upsertError) throw upsertError
        
        // Mark as processed
        await supabase
          .from('raw_data_staging')
          .update({ processed: true, processed_at: new Date().toISOString() })
          .eq('id', record.id)
        
      } catch (error) {
        // Log error but continue
        await supabase
          .from('raw_data_staging')
          .update({ 
            processing_error: error.message 
          })
          .eq('id', record.id)
      }
    }
  }
  
  function generateSlug(name: string, universityId: string): string {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return `${slug}-${universityId.substring(0, 8)}`
  }
  ```

- [ ] **Create UQ Scraper Module**
  ```typescript
  // supabase/functions/sync-university/scrapers/uq.ts
  
  export async function scrape(config: any) {
    const apiEndpoint = config.api_endpoint
    const professors = []
    
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'OhMyProfessors/1.0 (Educational; contact@ohmyprofessors.com)'
        },
        body: JSON.stringify({
          filters: {
            positions: ['Professor', 'Associate Professor', 'Senior Lecturer', 'Lecturer']
          },
          pageSize: config.max_results || 500
        })
      })
      
      if (!response.ok) {
        throw new Error(`UQ API returned ${response.status}`)
      }
      
      const data = await response.json()
      
      for (const person of data.results || []) {
        professors.push({
          name: person.name,
          email: person.email,
          department: person.school || person.faculty,
          position: person.position,
          bio: person.bio,
          topics: person.researchInterests || [],
          source_system: 'uq_api',
          source_id: person.id || person.slug,
          source_url: `https://researchers.uq.edu.au/researcher/${person.id}`
        })
      }
      
      console.log(`Scraped ${professors.length} professors from UQ`)
      return professors
      
    } catch (error) {
      console.error('UQ scrape failed:', error)
      throw error
    }
  }
  ```

### Day 6: Testing

- [ ] **Deploy Edge Function**
  ```bash
  supabase functions deploy sync-university --no-verify-jwt
  ```

- [ ] **Test Manually**
  ```bash
  curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/sync-university \
    -H "Authorization: Bearer YOUR_ANON_KEY" \
    -H "Content-Type: application/json" \
    -d '{"university_id": "UQ_UUID_HERE"}'
  ```

- [ ] **Verify Data**
  ```sql
  -- Check sync job
  SELECT * FROM sync_jobs ORDER BY created_at DESC LIMIT 1;
  
  -- Check staging data
  SELECT COUNT(*) FROM raw_data_staging WHERE processed = true;
  
  -- Check professors
  SELECT COUNT(*) FROM professors WHERE university_id = 'UQ_UUID';
  ```

---

## Week 3: Web Scrapers (USYD + ANU)

### Day 7-9: Playwright Scraper

- [ ] **Create USYD Scraper**
  ```typescript
  // supabase/functions/sync-university/scrapers/usyd.ts
  
  import { chromium } from "npm:playwright-core@1.40.0"
  
  export async function scrape(config: any) {
    const browser = await chromium.launch({ headless: true })
    const professors = []
    
    try {
      const page = await browser.newPage()
      await page.setUserAgent('OhMyProfessors/1.0 (Educational)')
      
      // Navigate to staff directory
      await page.goto(config.base_url, { waitUntil: 'networkidle' })
      
      // Get all staff profile links
      const staffLinks = await page.$$eval(
        config.selectors.staff_list,
        (links: any[]) => links.map(a => a.href)
      )
      
      console.log(`Found ${staffLinks.length} staff profiles`)
      
      // Scrape each profile
      for (const url of staffLinks.slice(0, 50)) { // Limit for testing
        await page.goto(url)
        await page.waitForTimeout(config.rate_limit_ms || 2000)
        
        const profile = await page.evaluate((selectors) => {
          const getText = (selector: string) => 
            document.querySelector(selector)?.textContent?.trim() || null
          
          return {
            name: getText(selectors.name),
            department: getText(selectors.department),
            email: getText(selectors.email),
            title: getText(selectors.title || '.profile-position'),
            bio: getText(selectors.bio || '.profile-bio')
          }
        }, config.selectors)
        
        professors.push({
          ...profile,
          source_system: 'usyd_scraper',
          source_id: url.split('/').pop(),
          source_url: url
        })
      }
      
      await page.close()
      return professors
      
    } catch (error) {
      console.error('USYD scrape failed:', error)
      throw error
    } finally {
      await browser.close()
    }
  }
  ```

- [ ] **Test USYD Scraper Locally**
  ```bash
  # Use Deno to test scraper
  deno run --allow-net --allow-env \
    supabase/functions/sync-university/scrapers/usyd.ts
  ```

### Day 10: Deploy & Monitor

- [ ] **Deploy Updated Function**
  ```bash
  supabase functions deploy sync-university
  ```

- [ ] **Test All Universities**
  ```bash
  # Test each university
  for uni in UQ USYD ANU; do
    curl -X POST ... -d "{\"university_code\": \"$uni\"}"
    sleep 60 # Wait between tests
  done
  ```

---

## Week 4: Scheduling & Monitoring

### Day 11: pg_cron Setup

- [ ] **Upgrade to Supabase Pro** (if needed for >2 cron jobs)

- [ ] **Create Cron Schedule**
  ```sql
  -- File: supabase/migrations/004_cron_schedule.sql
  
  -- Enable pg_cron extension
  CREATE EXTENSION IF NOT EXISTS pg_cron;
  
  -- Schedule weekly sync for all enabled universities
  SELECT cron.schedule(
    'sync-all-universities',
    '0 2 * * 0', -- Every Sunday at 2 AM
    $$
    DO $$
    DECLARE
      uni RECORD;
    BEGIN
      FOR uni IN 
        SELECT id, code FROM universities WHERE is_sync_enabled = true
      LOOP
        PERFORM net.http_post(
          url := 'https://YOUR_PROJECT.supabase.co/functions/v1/sync-university',
          headers := jsonb_build_object(
            'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
            'Content-Type', 'application/json'
          ),
          body := jsonb_build_object('university_id', uni.id)
        );
        
        -- Rate limit between universities
        PERFORM pg_sleep(30);
      END LOOP;
    END $$;
    $$
  );
  ```

- [ ] **Verify Cron Jobs**
  ```sql
  SELECT * FROM cron.job;
  SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
  ```

### Day 12-13: Admin Dashboard

- [ ] **Create Sync Status Page**
  ```typescript
  // app/admin/sync/page.tsx
  
  import { createClient } from '@/lib/supabase/server'
  
  export default async function AdminSyncPage() {
    const supabase = createClient()
    
    // Fetch sync status
    const { data: universities } = await supabase
      .from('universities')
      .select(`
        *,
        sync_jobs (
          id,
          status,
          started_at,
          duration_ms,
          records_processed
        )
      `)
      .order('name')
    
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Sync Dashboard</h1>
        
        <div className="grid gap-4">
          {universities?.map(uni => (
            <div key={uni.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{uni.name}</h2>
                  <p className="text-sm text-gray-600">
                    Last sync: {uni.last_sync_at 
                      ? new Date(uni.last_sync_at).toLocaleString()
                      : 'Never'}
                  </p>
                  <p className="text-sm">
                    Status: <span className={
                      uni.last_sync_status === 'success' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }>
                      {uni.last_sync_status || 'Unknown'}
                    </span>
                  </p>
                  <p className="text-sm">
                    Error count: {uni.sync_error_count}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => triggerSync(uni.id)}
                  >
                    Trigger Sync
                  </button>
                  
                  {!uni.is_sync_enabled && (
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded"
                      onClick={() => enableSync(uni.id)}
                    >
                      Re-enable
                    </button>
                  )}
                </div>
              </div>
              
              {/* Recent sync jobs */}
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold">Recent Jobs</h3>
                {uni.sync_jobs?.slice(0, 5).map(job => (
                  <div key={job.id} className="text-sm flex justify-between">
                    <span>{new Date(job.started_at).toLocaleString()}</span>
                    <span>{job.status}</span>
                    <span>{job.records_processed} records</span>
                    <span>{job.duration_ms}ms</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  ```

- [ ] **Create Trigger Sync API Route**
  ```typescript
  // app/api/admin/sync/route.ts
  
  import { createClient } from '@/lib/supabase/server'
  import { NextResponse } from 'next/server'
  
  export async function POST(req: Request) {
    const { university_id } = await req.json()
    
    const supabase = createClient()
    
    // Trigger Edge Function
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/sync-university`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ university_id })
      }
    )
    
    const result = await response.json()
    return NextResponse.json(result)
  }
  ```

### Day 14: Alerting

- [ ] **Set Up Slack Webhook** (optional)
  ```typescript
  // lib/notifications.ts
  
  export async function sendSlackAlert(message: string, severity: 'info' | 'warning' | 'error') {
    const webhook = Deno.env.get('SLACK_WEBHOOK_URL')
    if (!webhook) return
    
    const color = severity === 'error' ? '#ff0000' : severity === 'warning' ? '#ffaa00' : '#00ff00'
    
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attachments: [{
          color,
          text: message,
          footer: 'OhMyProfessors Sync System',
          ts: Date.now() / 1000
        }]
      })
    })
  }
  ```

- [ ] **Add Alerts to Sync Function**
  ```typescript
  // In sync-university/index.ts
  
  import { sendSlackAlert } from '../_shared/notifications.ts'
  
  // On success
  if (status === 'success') {
    await sendSlackAlert(
      `✅ ${university.name} synced successfully (${records} professors)`,
      'info'
    )
  }
  
  // On failure (3rd consecutive)
  if (university.sync_error_count === 3) {
    await sendSlackAlert(
      `🚨 ${university.name} disabled after 3 failures!\nLast error: ${error.message}`,
      'error'
    )
  }
  ```

---

## Verification Checklist

### ✅ Database Health
- [ ] All tables created successfully
- [ ] Indexes exist on frequently queried columns
- [ ] RLS policies enabled on public tables
- [ ] Circuit breaker trigger functioning

### ✅ Scraper Functionality
- [ ] UQ API scraper returns >50 professors
- [ ] USYD web scraper completes without errors
- [ ] ANU web scraper completes without errors
- [ ] Staging data is properly formatted

### ✅ Error Handling
- [ ] Failed scraper triggers circuit breaker after 3 failures
- [ ] Partial failures don't corrupt production data
- [ ] Error messages logged to `sync_jobs.error_message`
- [ ] Slack alerts sent on critical failures

### ✅ Scheduling
- [ ] pg_cron job created successfully
- [ ] Cron runs at scheduled time (test with `0 * * * *` for hourly)
- [ ] Multiple universities sync sequentially (not parallel)

### ✅ Monitoring
- [ ] Admin dashboard displays sync status
- [ ] Manual trigger button works
- [ ] Recent job history visible
- [ ] Can re-enable disabled universities

---

## Performance Benchmarks (Target)

| Metric | Target | Measured |
|--------|--------|----------|
| **UQ Sync Duration** | < 30 seconds | _____ |
| **USYD Sync Duration** | < 5 minutes | _____ |
| **ANU Sync Duration** | < 5 minutes | _____ |
| **Success Rate (30 days)** | > 90% | _____ |
| **False Positives (circuit breaker)** | < 5% | _____ |

---

## Troubleshooting Guide

### Issue: Edge Function Times Out (60s limit)

**Solution:**
```typescript
// Paginate scraping
const batchSize = 50
for (let i = 0; i < staffLinks.length; i += batchSize) {
  const batch = staffLinks.slice(i, i + batchSize)
  // Process batch
  
  if (i + batchSize < staffLinks.length) {
    // Trigger next batch as separate invocation
    await triggerNextBatch(universityId, i + batchSize)
  }
}
```

### Issue: Rate Limited by University

**Solution:**
```typescript
// Increase delay between requests
await page.waitForTimeout(5000) // 5 seconds instead of 2

// Rotate User-Agent
const userAgents = [
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
]
await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)])
```

### Issue: Circuit Breaker Stuck Disabled

**Solution:**
```sql
-- Manually reset error count and re-enable
UPDATE universities
SET sync_error_count = 0,
    is_sync_enabled = true
WHERE code = 'USYD';
```

---

## Next Phase Features (Post-MVP)

- [ ] Incremental sync (only fetch changed records)
- [ ] Course data scraping
- [ ] Professor-course relationship mapping
- [ ] Data quality checks (detect anomalies)
- [ ] User-submitted corrections
- [ ] Photo scraping + storage
- [ ] Email change detection
- [ ] Department restructure handling

---

**Completion Criteria:**
- ✅ 3 universities syncing automatically
- ✅ >90% success rate over 2 weeks
- ✅ Circuit breaker prevents cascade failures
- ✅ Admin dashboard shows real-time status
- ✅ Manual sync trigger works
- ✅ Alerts sent on critical issues

**Sign-off:** CTO → CEO (for production deployment)  
**Last Updated:** 2026-02-11
