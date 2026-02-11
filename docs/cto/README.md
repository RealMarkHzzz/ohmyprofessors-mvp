# CTO Documentation Index
**OhMyProfessors - Data Acquisition Architecture**

---

## 📚 Document Overview

This directory contains the complete technical architecture for acquiring and managing university professor data across Australia.

### Core Documents

1. **[data-architecture.md](./data-architecture.md)** ⭐ **START HERE**
   - Complete technical architecture
   - Database schema design
   - Technology selection rationale
   - Fault tolerance strategy
   - Cost projections
   - **Length:** Comprehensive (60+ sections)
   - **Audience:** CTO, Technical Team, Investors

2. **[data-flow-diagram.md](./data-flow-diagram.md)**
   - Visual ASCII diagrams
   - Data pipeline flow
   - Circuit breaker state machine
   - Security & access control
   - **Length:** Quick reference
   - **Audience:** Visual learners, Onboarding

3. **[technical-decision-matrix.md](./technical-decision-matrix.md)**
   - Technology comparison tables
   - Scoring methodology
   - Cost breakdowns by scenario
   - When to use each option
   - **Length:** Medium (decision reference)
   - **Audience:** Technical decision makers

4. **[implementation-checklist.md](./implementation-checklist.md)** 🛠️ **IMPLEMENTATION GUIDE**
   - Week-by-week roadmap
   - Code snippets ready to copy-paste
   - SQL migrations
   - Testing procedures
   - Troubleshooting guide
   - **Length:** Detailed (4-week plan)
   - **Audience:** Developers, Implementation team

---

## 🚀 Quick Start (For Developers)

### Option A: Just Want the TL;DR?
1. Read **Section 1 (Executive Summary)** in `data-architecture.md`
2. Review **Option 1 recommendations** in `technical-decision-matrix.md`
3. Skip to **Week 1** in `implementation-checklist.md`

### Option B: Need to Present to CEO/Investors?
1. Read **Executive Summary** + **Section 6 (Cost)** + **Section 12 (Conclusion)** in `data-architecture.md`
2. Use diagrams from `data-flow-diagram.md` for slides
3. Reference cost table from `technical-decision-matrix.md`

### Option C: Ready to Build?
1. Follow `implementation-checklist.md` **Day 1-14**
2. Reference code examples from `data-architecture.md` **Appendix A**
3. Use `data-flow-diagram.md` to understand component interactions

---

## 🎯 Key Architectural Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| **Scraping Tech** | Playwright | Deno support, $0 cost, feature-rich |
| **Scheduling** | pg_cron | Database-native, free on Supabase Pro |
| **Storage** | Staging → Production | Data integrity, rollback capability |
| **Error Handling** | Circuit Breaker | Blast radius isolation |
| **Hosting** | Supabase + Vercel | Minimal ops, generous free tiers |
| **Cost (MVP)** | **$0-25/month** | Supabase Free → Pro |
| **Cost (Scale)** | **$50-100/month** | 40 universities, 10K professors |

---

## 📊 System Overview (One-Page Summary)

### Data Flow
```
University Websites → Playwright Scraper → Staging Table → Validation → Production DB → Next.js Frontend
                ↓                              ↓                             ↓
           pg_cron (weekly)          Circuit Breaker         Admin Dashboard
```

### Core Components

1. **Supabase Edge Functions** (Deno)
   - `sync-university` - Main orchestrator
   - Scrapers: `uq.ts`, `usyd.ts`, `anu.ts`
   - Runs weekly via pg_cron

2. **Database Tables** (PostgreSQL)
   - `universities` - Source configuration
   - `professors` - Normalized data
   - `courses` - Course catalog
   - `sync_jobs` - Operational tracking
   - `raw_data_staging` - Pre-validation buffer

3. **Admin Dashboard** (Next.js)
   - Sync status monitoring
   - Manual trigger
   - Error logs
   - Data quality metrics

### Error Handling Strategy

```
Scraper Fails → Log Error → Increment Counter → If count ≥ 3 → Disable University → Send Alert
     ↓
Scraper Succeeds → Reset Counter → Re-enable University
```

### Success Metrics (3 Months)

- ✅ 10+ universities syncing
- ✅ 90%+ success rate
- ✅ <10 hours/month maintenance
- ✅ Zero data corruption incidents

---

## 🛠️ Tech Stack Summary

### Infrastructure
- **Database:** Supabase PostgreSQL
- **Backend:** Supabase Edge Functions (Deno)
- **Frontend:** Next.js 16 + TypeScript + Tailwind
- **Scheduling:** pg_cron (PostgreSQL extension)
- **Monitoring:** Supabase Dashboard + Slack webhooks

### Scraping
- **Browser Automation:** Playwright (Chromium)
- **HTML Parsing:** Built-in Playwright APIs
- **Rate Limiting:** Custom delays (2-5s between requests)
- **Anti-Detection:** Stealth mode, User-Agent rotation

### DevOps
- **Version Control:** Git + GitHub
- **Migrations:** Supabase CLI (`supabase migration`)
- **Deployment:** Supabase CLI (`supabase functions deploy`)
- **Monitoring:** Supabase logs + `sync_jobs` table

---

## 📈 Roadmap

### Phase 1: MVP (Weeks 1-4) ✅ CURRENT
- 3 universities (UQ, USYD, ANU)
- Basic scraping + storage
- Circuit breaker
- Admin dashboard

### Phase 2: Scale (Weeks 5-8)
- 5 more universities
- Data quality checks
- Improved error handling
- Performance optimization

### Phase 3: Enhancements (Weeks 9-12)
- Course data scraping
- Professor-course relationships
- Incremental sync
- User-submitted corrections

---

## 🔒 Security & Compliance

### Data Privacy
- ✅ All scraped data is publicly available
- ✅ No sensitive personal information
- ✅ Compliant with Australian Privacy Act
- ✅ Respectful scraping practices

### Rate Limiting
- ✅ 2-5 second delays between requests
- ✅ Sequential (not parallel) scraping
- ✅ User-Agent identification
- ✅ Respect `robots.txt`

### Access Control
- ✅ Row Level Security (RLS) on all tables
- ✅ Admin-only sync triggers
- ✅ Public read-only access to professor data
- ✅ API key rotation policy

---

## 📞 Support & Contacts

### Questions About...

**Architecture Design?**
→ Read `data-architecture.md` Section 8 (Alternatives Considered)

**Technology Choices?**
→ Read `technical-decision-matrix.md` for comparisons

**Implementation Steps?**
→ Follow `implementation-checklist.md` week-by-week

**Data Flow?**
→ Review diagrams in `data-flow-diagram.md`

**Specific Issues?**
→ Check `implementation-checklist.md` Troubleshooting Guide

---

## 🎓 Learning Resources

### New to Supabase?
- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [pg_cron Documentation](https://github.com/citusdata/pg_cron)

### New to Playwright?
- [Playwright Docs](https://playwright.dev/)
- [Web Scraping Best Practices](https://developers.google.com/search/docs/advanced/guidelines/webmaster-guidelines)

### New to Werner Vogels' Architecture Style?
- [All Things Distributed](https://www.allthingsdistributed.com/) (his blog)
- Key principles:
  - Everything fails all the time
  - Simple scales better than complex
  - Managed services > DIY infrastructure
  - Eventual consistency is acceptable

---

## 📝 Document Change Log

| Date | Document | Change | Author |
|------|----------|--------|--------|
| 2026-02-11 | All | Initial creation | CTO Agent |
| - | - | - | - |

---

## ✅ Sign-Off

### Technical Review
- [ ] CTO (Architecture approval)
- [ ] Lead Developer (Implementation feasibility)
- [ ] DevOps (Operational readiness)

### Business Review
- [ ] CEO (Strategic alignment)
- [ ] CFO (Cost approval: $0-25/month → $50-100/month scale)
- [ ] Product Manager (Roadmap integration)

---

## 📂 File Structure

```
docs/cto/
├── README.md                          ← You are here
├── data-architecture.md               ← Main technical spec (29 KB)
├── data-flow-diagram.md               ← Visual diagrams (14 KB)
├── technical-decision-matrix.md       ← Technology comparison (14 KB)
└── implementation-checklist.md        ← 4-week implementation guide (25 KB)

Total Documentation: ~82 KB (comprehensive)
```

---

## 🚨 Critical Reminders

1. **Always test in staging first**
   - Create separate Supabase project for testing
   - Never run untested scrapers in production

2. **Respect university servers**
   - Maintain 2-5s delays between requests
   - Scrape during off-peak hours (2-5 AM)
   - Stop immediately if rate-limited

3. **Monitor circuit breaker**
   - Check disabled universities daily
   - Investigate root cause before re-enabling
   - Update scraper if website structure changed

4. **Cost monitoring**
   - Review Supabase usage weekly
   - Set billing alerts at $50/month
   - Optimize queries if database size exceeds 500 MB

5. **Data quality**
   - Verify professor count after each sync
   - Alert if count drops >30% (likely scraper broken)
   - Manual review of first 10 professors per university

---

**Last Updated:** 2026-02-11  
**Next Review:** After Phase 1 completion (Week 4)  
**Maintained By:** CTO Team

---

*"Everything fails all the time. Design for it."* — Werner Vogels
