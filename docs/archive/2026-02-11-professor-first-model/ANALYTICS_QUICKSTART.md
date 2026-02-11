# 🚀 Analytics System - Quick Start Guide

## Setup (5 minutes)

### 1. Run Database Migration
```bash
cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors
supabase db push
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Admin Dashboard
```
http://localhost:3000/admin/dashboard
```

---

## What's Included

✅ **Event Tracking System**
- Auto-tracks page views
- Tracks professor views
- Tracks review submissions
- Tracks search queries

✅ **Admin Dashboard**
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- DAU/MAU Ratio (stickiness)
- 7-day Retention
- Weekly Review Count
- User Behavior Funnel
- Real-time Activity Log

✅ **Privacy-First**
- Anonymous user IDs (no PII)
- No third-party analytics
- GDPR-compliant

---

## Testing Event Tracking

Open browser console and visit:

1. **Homepage** → See: `[Analytics] page_view {page: "/"}`
2. **Professor Page** → See: `[Analytics] professor_view {...}`
3. **Submit Review** → See: `[Analytics] review_submit {...}`
4. **Search** → See: `[Analytics] search {query: "..."}`

---

## Key Files

```
lib/
├── analytics.ts           # Client-side tracking functions
└── api/analytics.ts       # Server-side data queries

app/
└── admin/dashboard/
    └── page.tsx          # Dashboard page

components/
├── analytics/
│   └── AnalyticsProvider.tsx  # Auto-track wrapper
└── dashboard/
    ├── StatsCards.tsx    # Metrics cards
    ├── TrendChart.tsx    # DAU trend
    ├── FunnelChart.tsx   # Conversion funnel
    └── ActivityLog.tsx   # Recent events

supabase/migrations/
└── 20260211093200_analytics_events.sql  # Database schema
```

---

## Dashboard Metrics Explained

| Metric | What It Measures | Target | Why It Matters |
|--------|------------------|--------|----------------|
| **DAU** | Daily Active Users | - | Shows daily engagement |
| **DAU/MAU** | % of monthly users who visit daily | > 20% | Indicates product stickiness |
| **7-day Retention** | % of users who return after 7 days | > 30% | Critical PMF indicator |
| **Weekly Reviews** | New reviews in last 7 days | > 20 | UGC growth metric |

---

## Troubleshooting

### Dashboard shows all zeros
- Check if events are being inserted: 
  ```sql
  SELECT COUNT(*) FROM analytics_events;
  ```
- Make sure you browsed the site (tracked events)
- Wait a few seconds for data to propagate

### Events not tracking
- Open browser console → Check for `[Analytics]` logs
- In production, events are silent (check Supabase table)
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`

### TypeScript errors
- Run: `npm run build`
- Check for missing imports
- Ensure all files are saved

---

## Next Steps

1. ✅ Run migration (`supabase db push`)
2. ✅ Test locally (`npm run dev`)
3. ✅ Browse site to generate events
4. ✅ Check dashboard (`/admin/dashboard`)
5. 🚀 Deploy to production
6. 📊 Monitor metrics weekly

---

## Full Documentation

See: `docs/TASK5_ANALYTICS_REPORT.md`

---

**Questions?** Check the implementation report or Supabase logs.
