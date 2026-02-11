# Data Flow Architecture - Visual Reference

## 1. End-to-End Data Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           UNIVERSITY DATA SOURCES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │    UQ      │  │   USYD     │  │    ANU     │  │   Manual   │           │
│  │  (API)     │  │ (Scraper)  │  │ (Scraper)  │  │  (Admin)   │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
│        │               │               │               │                    │
└────────┼───────────────┼───────────────┼───────────────┼────────────────────┘
         │               │               │               │
         └───────────────┴───────────────┴───────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   pg_cron Scheduler│
                    │  (Weekly Trigger)  │
                    └─────────┬──────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ��                    │                    │
    ┌────▼─────┐       ┌─────▼──────┐      ┌─────▼──────┐
    │ UQ Sync  │       │ USYD Sync  │      │ ANU Sync   │
    │ Function │       │  Function  │      │  Function  │
    └────┬─────┘       └─────┬──────┘      └─────┬──────┘
         │                   │                    │
         │                   │                    │
         └───────────────────┼────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │  Supabase Edge   │
                    │    Functions     │
                    │  (Orchestrator)  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
         ┌────▼──────┐  ┌───▼────┐  ┌──────▼───────┐
         │  Extract  │  │Validate│  │   Transform  │
         │ Raw Data  │→ │ Schema │→ │  Normalize   │
         └───────────┘  └────────┘  └──────┬───────┘
                                            │
                              ┌─────────────▼──────────────┐
                              │   raw_data_staging table   │
                              │   (JSONB storage)          │
                              └─────────────┬──────────────┘
                                            │
                              ┌─────────────▼──────────────┐
                              │   Data Processing Layer    │
                              │   - Deduplication          │
                              │   - Slug generation        │
                              │   - Validation             │
                              └─────────────┬──────────────┘
                                            │
                    ┌───────────────────────┼────────────────────────┐
                    │                       │                        │
            ┌───────▼────────┐    ┌────────▼─────────┐    ┌────────▼─────────┐
            │  universities  │    │   professors     │    │     courses      │
            │     table      │    │      table       │    │      table       │
            └────────────────┘    └──────────────────┘    └──────────────────┘
                                            │
                                  ┌─────────┴──────────┐
                                  │                    │
                         ┌────────▼────────┐  ┌───────▼────────┐
                         │professor_courses│  │    reviews     │
                         │     table       │  │     table      │
                         └─────────────────┘  └────────────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
              ┌─────▼──────┐            ┌───────▼────────┐
              │  Next.js   │            │   Supabase     │
              │  Frontend  │◄───────────┤   Realtime     │
              └────────────┘            └────────────────┘
                    │
              ┌─────▼──────┐
              │   Users    │
              └────────────┘
```

## 2. Fault Tolerance Flow

```
                        Sync Job Starts
                              │
                    ┌─────────▼─────────┐
                    │  Create sync_job  │
                    │  (status=running) │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Launch Playwright │
                    │     Browser        │
                    └─────────┬──────────┘
                              │
                    ┌────────��▼──────────┐
                    │  Scrape Website    │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Error Check     │
                    └──┬────────────┬───┘
                       │            │
                 ┌─────▼──┐    ┌───▼─────┐
                 │SUCCESS │    │ FAILURE │
                 └─────┬──┘    └───┬─────┘
                       │            │
         ┌─────────────▼───┐   ┌───▼──────────────┐
         │ Store in Staging│   │ Log Error        │
         │ Process Data    │   │ Increment Counter│
         │ Update Success  │   │ Check Threshold  │
         └─────────┬───────┘   └───┬──────────────┘
                   │                │
                   │          ┌─────▼─────────┐
                   │          │ Error Count   │
                   │          │     >= 3?     │
                   │          └──┬────────┬───┘
                   │             │        │
                   │         ┌───▼──┐  ┌──▼───────────┐
                   │         │ YES  │  │   NO         │
                   │         └───┬──┘  └──┬───────────┘
                   │             │        │
                   │    ┌────────▼─────┐  │
                   │    │ DISABLE SYNC │  │
                   │    │ Send Alert   │  │
                   │    └──────────────┘  │
                   │                      │
                   └──────────┬───────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Job Complete      │
                    │  Notify Dashboard  │
                    └────────────────────┘
```

## 3. Data Transformation Pipeline

```
Raw Data (JSONB)                Validated Data              Production Schema
─────────────────              ───────────────��            ──────────────────

{                                                          professors table:
  "name": "Dr John Smith",     ┌─────────────┐            ┌──────────────────┐
  "email": "j.smith@uq...",    │  Validate   │            │ id: uuid         │
  "dept": "Computer Sci",  ───►│  - Email    │───────────►│ full_name: text  │
  "position": "Assoc Prof",    │  - Name     │            │ email: text      │
  "url": "https://...",        │  - Dept     │            │ department: text │
  "bio": "Lorem ipsum..."      └─────────────┘            │ title: text      │
}                                     │                    │ slug: text       │
                                      │                    │ ...              │
                                      │                    └──────────────────┘
                                      │
                              ┌───────▼────────┐
                              │   Transform    │
                              │  - Normalize   │
                              │  - Slug gen    │
                              │  - Dedupe      │
                              └───────┬────────┘
                                      │
                              ┌───────▼────────┐
                              │   UPSERT       │
                              │  ON CONFLICT   │
                              │  (uni_id, slug)│
                              └────────────────┘
```

## 4. Circuit Breaker State Machine

```
                    ┌──────────┐
                    │  CLOSED  │ (Normal operation)
                    │ Errors=0 │
                    └────┬─────┘
                         │
                   ┌─────▼─────┐
                   │   Sync    │
                   │  Attempt  │
                   └─────┬─────┘
                         │
                    ┌────▼────┐
                    │ Success?│
                    └──┬───┬──┘
                       │   │
                   ┌───▼┐ ┌▼───┐
                   │YES │ │ NO │
                   └───┬┘ └┬───┘
                       │   │
              ┌────────▼┐  │
              │ Reset   │  │
              │ Counter │  │
              └────────┬┘  │
                       │   │
                       │   └──►┌──────────────┐
                       │       │ Increment    │
                       │       │ Error Count  │
                       │       └──────┬───────┘
                       │              │
                       │         ┌────▼────┐
                       │         │ Count   │
                       │         │   >= 3? │
                       │         └──┬───┬──┘
                       │            │   │
                       │        ┌───▼┐ ┌▼──┐
                       │        │YES│ │NO │
                       │        └───┬┘ └┬──┘
                       │            │   │
                       │      ┌─────▼───▼─────┐
                       │      │  State: OPEN  │
                       │      │ (Auto-disabled)│
                       │      └───────┬────────┘
                       │              │
                       │      ┌───────▼────────┐
                       │      │  Send Alert    │
                       │      │  Log to Slack  │
                       │      └───────┬────────┘
                       │              │
                       │      ┌───────▼────────┐
                       │      │ Manual Review  │
                       │      │   Required     │
                       │      └───────┬────────┘
                       │              │
                       │      ┌───────▼────────┐
                       │      │ Admin Fixes    │
                       │      │  & Re-enables  │
                       │      └───────┬────────┘
                       │              │
                       └──────────────┘
```

## 5. Monitoring Dashboard Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard (Next.js)                │
├────────���────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Sync Status  │  │ Error Logs   │  │ Data Quality │    │
│  │              │  │              │  │              │    │
│  │ UQ:    ✓     │  │ USYD: 3 fails│  │ Professors:  │    │
│  │ USYD:  ✗     │  │ Reason: 429  │  │   1,234      │    │
│  │ ANU:   ✓     │  │              │  │ Courses: 567 │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                 │                 │             │
└─────────┼─────────────────┼─────────────────┼─────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                  ┌─────────▼──────────┐
                  │  Supabase Realtime │
                  │  (Subscriptions)   │
                  └─────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
    ┌─────▼──────┐   ┌──────▼──────┐   ┌─────▼──────┐
    │universities│   │  sync_jobs  │   │ professors │
    │   table    │   │    table    │   │   table    │
    └────────────┘   └─────────────┘   └────────────┘
```

## 6. Security & Access Control

```
┌────────────────────────────────────────────────────────┐
│                    Request Flow                        │
└────────────────────────────────────────────────────────┘

  Public User                Admin User
      │                          │
      │                          │
   ┌──▼────┐                ┌────▼───┐
   │ Next  │                │ Next   │
   │ .js   │                │  .js   │
   │ App   │                │  App   │
   └──┬────┘                └────┬───┘
      │                          │
      │ GET /api/professors      │ POST /api/sync/trigger
      │                          │
   ┌──▼──────────────────────────▼───┐
   │      Supabase API               │
   │  (Row Level Security Enabled)   │
   └──┬──────────────────────────┬───┘
      │                          │
      │                          │
   ┌──▼────────────┐       ┌─────▼──────────┐
   │  RLS Policy:  │       │  RLS Policy:   │
   │  Public Read  │       │  Admin Only    │
   │  (professors) │       │  (sync_jobs)   │
   └──┬────────────┘       └─────┬──────────┘
      │                          │
      │ ✓ Allowed                │ Check JWT role
      │                          │
   ┌──▼────────────┐       ┌─────▼──────────┐
   │  SELECT *     │       │  Role = admin? │
   │  FROM         │       │  ✓ Yes → Allow │
   │  professors   │       │  ✗ No → Deny   │
   └───────────────┘       └────────────────┘
```

---

**Legend:**
- `┌─┐` Boxes = Components/Tables
- `│` Pipes = Data flow
- `►` Arrows = Process direction
- `✓` Checkmark = Success
- `✗` X-mark = Failure
