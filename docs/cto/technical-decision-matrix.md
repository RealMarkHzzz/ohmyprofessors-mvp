# Technical Decision Matrix - Data Acquisition
**CTO Reference Document**  
**Last Updated:** 2026-02-11

This document provides detailed technical comparisons for key architectural decisions.

---

## 1. Scraping Technology Comparison

### Option 1: Playwright (Recommended ✅)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Deno Support** | ⭐⭐⭐⭐⭐ | Native Deno package via npm: |
| **Browser Automation** | ⭐⭐⭐⭐⭐ | Chromium, Firefox, WebKit support |
| **Anti-Detection** | ⭐⭐⭐⭐ | Stealth mode, realistic fingerprints |
| **Documentation** | ⭐⭐⭐⭐⭐ | Excellent, active community |
| **Performance** | ⭐⭐⭐⭐ | Fast, parallelizable |
| **Learning Curve** | ⭐⭐⭐⭐ | Easy for web devs |
| **Cost** | ⭐⭐⭐⭐⭐ | Open source, $0 |
| **Maintenance** | ⭐⭐⭐⭐ | Auto-updates browser binaries |
| **Total** | **36/40** | |

**Code Example:**
```typescript
import { chromium } from "npm:playwright-core@1.40.0"

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto('https://example.com/staff')
const data = await page.$$eval('.staff-card', cards => 
  cards.map(card => ({
    name: card.querySelector('h3').textContent,
    department: card.querySelector('.dept').textContent
  }))
)
```

**Verdict:** Best balance of features, cost, and compatibility with Supabase Edge Functions.

---

### Option 2: Puppeteer

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Deno Support** | ⭐⭐ | Requires Node.js polyfills |
| **Browser Automation** | ⭐⭐⭐⭐⭐ | Chromium only, but mature |
| **Anti-Detection** | ⭐⭐⭐ | Less stealth than Playwright |
| **Documentation** | ⭐⭐⭐⭐⭐ | Extensive |
| **Performance** | ⭐⭐⭐⭐ | Similar to Playwright |
| **Learning Curve** | ⭐⭐⭐⭐ | Easy |
| **Cost** | ⭐⭐⭐⭐⭐ | Open source, $0 |
| **Maintenance** | ⭐⭐⭐⭐ | Stable |
| **Total** | **31/40** | |

**Blockers:**
- ❌ Deno compatibility issues (Supabase Edge Functions use Deno)
- ❌ Requires Node.js shims, adds complexity

---

### Option 3: Cheerio (HTML Parsing Only)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Deno Support** | ⭐⭐⭐⭐⭐ | Works perfectly |
| **Browser Automation** | ⭐ | No JavaScript execution |
| **Anti-Detection** | ⭐⭐⭐⭐⭐ | Simple HTTP requests (stealthy) |
| **Documentation** | ⭐⭐⭐⭐ | jQuery-like API |
| **Performance** | ⭐⭐⭐⭐⭐ | Extremely fast (no browser overhead) |
| **Learning Curve** | ⭐⭐⭐⭐⭐ | Very easy |
| **Cost** | ⭐⭐⭐⭐⭐ | $0 |
| **Maintenance** | ⭐⭐⭐⭐⭐ | Minimal |
| **Total** | **34/40** | |

**Limitations:**
- ❌ Can't scrape JavaScript-rendered pages
- ❌ University staff directories often use React/Vue (client-side rendering)

**When to Use:** Static HTML pages only (rare in 2026)

---

### Option 4: Third-Party (Apify, Bright Data)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Deno Support** | ⭐⭐⭐⭐⭐ | REST API (language-agnostic) |
| **Browser Automation** | ⭐⭐⭐⭐⭐ | Managed infrastructure |
| **Anti-Detection** | ⭐⭐⭐⭐⭐ | IP rotation, CAPTCHA solving |
| **Documentation** | ⭐⭐⭐⭐ | Good API docs |
| **Performance** | ⭐⭐⭐⭐⭐ | Distributed, scalable |
| **Learning Curve** | ⭐⭐⭐ | API learning required |
| **Cost** | ⭐ | **$99-499/month** |
| **Maintenance** | ⭐⭐⭐⭐⭐ | Fully managed |
| **Total** | **32/40** | |

**Blocker:**
- ❌ **Cost:** $99-499/month vs $0 for Playwright
- ❌ **Overkill:** Australian universities don't have aggressive anti-bot measures

**When to Use:** 
- High-volume scraping (>1M pages/month)
- Sites with advanced anti-bot (e.g., LinkedIn, Amazon)

---

## 2. Scheduling Mechanism Comparison

### Option 1: Supabase pg_cron (Recommended ✅)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Cost** | ⭐⭐⭐⭐⭐ | Free on Pro plan ($25/month) |
| **Reliability** | ⭐⭐⭐⭐ | PostgreSQL-native, battle-tested |
| **Configuration** | ⭐⭐⭐⭐ | SQL-based, versioned with migrations |
| **Observability** | ⭐⭐⭐ | Logs in `cron.job_run_details` table |
| **Flexibility** | ⭐⭐⭐⭐ | Cron syntax (minute precision) |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ | One SQL statement |
| **Total** | **25/30** | |

**Code Example:**
```sql
SELECT cron.schedule(
  'sync-universities',
  '0 2 * * 0', -- Every Sunday at 2 AM
  $$
  SELECT net.http_post(
    url := 'https://project.supabase.co/functions/v1/sync',
    headers := '{"Authorization": "Bearer KEY"}'::jsonb
  )
  $$
);
```

**Pros:**
- ✅ No external service dependency
- ✅ Runs close to database (low latency)
- ✅ Atomic with database transactions

**Cons:**
- ⚠️ Limited to 2 jobs on Free tier (need Pro)
- ⚠️ PostgreSQL server timezone (not configurable per job)

---

### Option 2: Vercel Cron

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Cost** | ⭐⭐ | **$20/month** (Pro plan required) |
| **Reliability** | ⭐⭐⭐⭐⭐ | Managed by Vercel |
| **Configuration** | ⭐⭐⭐⭐ | `vercel.json` config |
| **Observability** | ⭐⭐⭐⭐ | Vercel dashboard logs |
| **Flexibility** | ⭐⭐⭐⭐ | Cron syntax |
| **Setup Complexity** | ⭐⭐⭐⭐⭐ | Simple config file |
| **Total** | **24/30** | |

**Code Example:**
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/sync",
    "schedule": "0 2 * * 0"
  }]
}
```

**Pros:**
- ✅ Integrated with Next.js deployment
- ✅ Automatic retries on failure

**Cons:**
- ❌ **$20/month extra cost** (Hobby plan doesn't support cron)
- ❌ HTTP request to Supabase (adds latency vs. pg_cron)

---

### Option 3: GitHub Actions (Free Tier)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Cost** | ⭐⭐⭐⭐⭐ | 2,000 minutes/month free |
| **Reliability** | ⭐⭐⭐ | Subject to GitHub availability |
| **Configuration** | ⭐⭐⭐ | YAML workflows |
| **Observability** | ⭐⭐⭐⭐ | Workflow run logs |
| **Flexibility** | ⭐⭐⭐⭐ | Cron syntax |
| **Setup Complexity** | ⭐⭐⭐ | Requires GitHub Actions knowledge |
| **Total** | **22/30** | |

**Code Example:**
```yaml
# .github/workflows/sync.yml
name: Sync Universities
on:
  schedule:
    - cron: '0 2 * * 0' # Every Sunday at 2 AM UTC
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Supabase Function
        run: |
          curl -X POST https://project.supabase.co/functions/v1/sync \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_KEY }}"
```

**Pros:**
- ✅ Free (within 2,000 min/month)
- ✅ Easy to version control

**Cons:**
- ❌ Cron jobs can be delayed by up to 10 minutes (not guaranteed execution)
- ❌ Requires GitHub repository (external dependency)
- ❌ Less reliable than pg_cron for critical jobs

---

## 3. Data Storage Pattern Comparison

### Option 1: Staging → Production Pipeline (Recommended ✅)

**Flow:**
```
Raw Data → Staging Table → Validation → Production Tables
```

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Data Integrity** | ⭐⭐⭐⭐⭐ | Failed records don't corrupt production |
| **Rollback Capability** | ⭐⭐⭐⭐⭐ | Can reprocess from staging |
| **Debugging** | ⭐⭐⭐⭐⭐ | Raw data preserved for analysis |
| **Performance** | ⭐⭐⭐ | Extra table = extra I/O |
| **Complexity** | ⭐⭐⭐ | Requires transformation logic |
| **Storage Cost** | ⭐⭐⭐ | Staging table consumes space |
| **Total** | **24/30** | |

**Schema:**
```sql
CREATE TABLE raw_data_staging (
  id UUID PRIMARY KEY,
  entity_type TEXT, -- 'professor', 'course'
  raw_data JSONB, -- Original scraped data
  processed BOOLEAN DEFAULT false
);

CREATE TABLE professors (
  id UUID PRIMARY KEY,
  full_name TEXT,
  -- ... normalized fields
);
```

**When to Use:**
- ✅ Data quality is critical
- ✅ Multiple data sources with varying formats
- ✅ Need audit trail of scraped data

---

### Option 2: Direct Insert (No Staging)

**Flow:**
```
Raw Data → Validation → Direct INSERT/UPDATE
```

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Data Integrity** | ⭐⭐ | Partial failures can corrupt data |
| **Rollback Capability** | ⭐ | Difficult without staging |
| **Debugging** | ⭐⭐ | No raw data preserved |
| **Performance** | ⭐⭐⭐⭐⭐ | Fastest (no extra table) |
| **Complexity** | ⭐⭐⭐⭐⭐ | Simpler code |
| **Storage Cost** | ⭐⭐⭐⭐⭐ | Minimal |
| **Total** | **18/30** | |

**When to Use:**
- ⚠️ Only for simple, trusted data sources
- ⚠️ When storage is extremely limited
- ❌ **Not recommended for multi-university system**

---

### Option 3: Event Sourcing (Append-Only Log)

**Flow:**
```
All changes → Event Log → Materialized Views
```

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Data Integrity** | ⭐⭐⭐⭐⭐ | Complete audit trail |
| **Rollback Capability** | ⭐⭐⭐⭐⭐ | Replay events to any point in time |
| **Debugging** | ⭐⭐⭐⭐⭐ | Full history preserved |
| **Performance** | ⭐⭐ | Rebuilding views is expensive |
| **Complexity** | ⭐ | High architectural complexity |
| **Storage Cost** | ⭐ | Grows indefinitely |
| **Total** | **19/30** | |

**Blocker:**
- ❌ **Over-engineered for this use case**
- ❌ Requires expertise in event sourcing patterns
- ❌ Storage costs grow with every sync

**When to Use:**
- ✅ Financial systems (audit requirements)
- ✅ Systems with strict compliance needs
- ❌ **Not for MVP professor data**

---

## 4. Error Handling Strategy Comparison

### Strategy 1: Circuit Breaker (Recommended ✅)

**Pattern:** Auto-disable source after N consecutive failures

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Blast Radius** | ⭐⭐⭐⭐⭐ | Isolates failing universities |
| **Auto-Recovery** | ⭐⭐⭐ | Requires manual re-enable |
| **User Impact** | ⭐⭐⭐⭐ | Other universities unaffected |
| **Implementation** | ⭐⭐⭐⭐ | Simple trigger logic |
| **Observability** | ⭐⭐⭐⭐⭐ | Clear state (enabled/disabled) |
| **Total** | **21/25** | |

**Code:**
```sql
CREATE TRIGGER sync_circuit_breaker
  AFTER INSERT ON sync_jobs
  FOR EACH ROW
  EXECUTE FUNCTION check_sync_circuit_breaker();
```

---

### Strategy 2: Exponential Backoff Retry

**Pattern:** Retry with increasing delays (1s, 2s, 4s, 8s...)

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Blast Radius** | ⭐⭐⭐ | Can amplify issues if all retries fail |
| **Auto-Recovery** | ⭐⭐⭐⭐⭐ | Automatically recovers from transient failures |
| **User Impact** | ⭐⭐⭐ | Delays but eventual success |
| **Implementation** | ⭐⭐⭐ | Requires retry queue logic |
| **Observability** | ⭐⭐⭐ | Can be noisy in logs |
| **Total** | **17/25** | |

**When to Use:**
- ✅ Transient network errors
- ✅ Rate limiting (with backoff)
- ⚠️ **Complement to circuit breaker, not replacement**

---

### Strategy 3: Dead Letter Queue (DLQ)

**Pattern:** Move failed jobs to separate queue for manual review

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| **Blast Radius** | ⭐⭐⭐⭐⭐ | Failed jobs isolated |
| **Auto-Recovery** | ⭐⭐ | Requires manual intervention |
| **User Impact** | ⭐⭐⭐⭐ | No cascading failures |
| **Implementation** | ⭐⭐⭐ | Requires DLQ table + UI |
| **Observability** | ⭐⭐⭐⭐⭐ | Clear separation of failed jobs |
| **Total** | **19/25** | |

**Schema:**
```sql
CREATE TABLE sync_jobs_dlq (
  id UUID PRIMARY KEY,
  original_job_id UUID,
  failure_reason TEXT,
  retry_count INT,
  requires_manual_review BOOLEAN DEFAULT true
);
```

**When to Use:**
- ✅ Complex failure scenarios (e.g., data format changed)
- ✅ When you need human review before retry
- ✅ **Phase 2 enhancement**

---

## 5. Cost Projection Matrix

### Scenario A: MVP (3 Universities, 500 Professors)

| Component | Tier | Monthly Cost |
|-----------|------|--------------|
| Supabase Database | Free | $0 |
| Supabase Edge Functions | Free | $0 |
| Vercel Hosting | Hobby | $0 |
| **Total** | | **$0/month** |

**Storage:** ~50 MB (well under 500 MB free tier limit)  
**Edge Function Invocations:** ~12/month (well under 500K free limit)

---

### Scenario B: Phase 2 (10 Universities, 2,000 Professors)

| Component | Tier | Monthly Cost |
|-----------|------|--------------|
| Supabase Database | Pro | $25 |
| Supabase Edge Functions | Free | $0 |
| Vercel Hosting | Hobby | $0 |
| **Total** | | **$25/month** |

**Rationale for Pro:**
- Need pg_cron (>2 jobs)
- Database size: ~200 MB (exceeds free tier)
- Daily backups (included in Pro)

---

### Scenario C: Full Scale (40 Universities, 10,000 Professors)

| Component | Tier | Monthly Cost |
|-----------|------|--------------|
| Supabase Database | Pro | $25 |
| Database Add-ons (8 GB storage) | | $10 |
| Supabase Edge Functions | Free | $0 |
| Vercel Hosting | Pro (for analytics) | $20 |
| Monitoring (Sentry) | Team | $26 |
| **Total** | | **$81/month** |

**Storage Calculation:**
- 10,000 professors × 5 KB average = 50 MB
- 50,000 reviews × 2 KB = 100 MB
- Staging data + logs: ~500 MB
- Total: ~650 MB (Pro plan includes 8 GB)

---

## 6. Final Recommendation Summary

| Decision Point | Recommended Option | Reasoning |
|----------------|-------------------|-----------|
| **Scraping Tech** | Playwright | Deno support, cost ($0), feature-rich |
| **Scheduling** | pg_cron | Free (with Pro), database-native |
| **Storage Pattern** | Staging Pipeline | Data integrity, rollback capability |
| **Error Handling** | Circuit Breaker | Blast radius isolation, simple |
| **Hosting** | Supabase + Vercel | Minimal ops, generous free tiers |

**Total MVP Cost:** $0-25/month  
**Total Scale Cost (40 unis):** $50-100/month

---

**Next Steps:**
1. ✅ Implement Playwright scraper for UQ (API-based, easiest)
2. ✅ Test circuit breaker with simulated failures
3. ✅ Deploy to Supabase staging environment
4. Monitor for 1 week before adding more universities

**Last Updated:** 2026-02-11  
**Review Schedule:** After Phase 1 completion (Week 4)
