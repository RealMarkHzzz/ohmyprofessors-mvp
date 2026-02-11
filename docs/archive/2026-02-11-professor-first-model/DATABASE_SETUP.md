# 🎓 OhMyProfessors - Database Setup

Quick reference for Task 2: Supabase Schema Migration

## 🚀 Quick Start (3 Steps)

### 1️⃣ Setup Environment

```bash
# Create .env.local with your Supabase credentials
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EOF
```

**Get credentials:**
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project > Settings > API
- Copy **URL** and **Service Role Key** (not anon key!)

### 2️⃣ Run Migration

**Via Supabase Dashboard (Easiest):**
1. Open Supabase Dashboard > SQL Editor
2. Copy contents of `supabase/migrations/20260211073500_production_schema.sql`
3. Paste and click **Run**

**Or via CLI:**
```bash
supabase db push
```

### 3️⃣ Import Data

```bash
npm run import:adelaide
```

Expected output:
```
✅ Import completed!
📊 Total professors in database: 39
```

## ✅ Verify Success

```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) FROM professors 
WHERE university_id IN (
  SELECT id FROM universities WHERE slug = 'university-of-adelaide'
);
```

**Expected:** 39 rows

---

## 📂 Files Overview

| File | Purpose |
|------|---------|
| `supabase/migrations/20260211073500_production_schema.sql` | **Migration SQL** (run this first) |
| `scripts/import-adelaide-data.ts` | **Import script** (run after migration) |
| `data/adelaide-professors.json` | **Source data** (39 professors) |
| `docs/TASK2_MIGRATION_GUIDE.md` | **Full documentation** (read if issues) |
| `docs/TASK2_VERIFICATION.sql` | **Test queries** (verify migration) |

---

## 🗄️ Schema Summary

### New Tables (Created by Migration)

- **`courses`** - Course catalog (code, name, offerings)
- **`professor_courses`** - Professor ↔ Course mapping (many-to-many)
- **`sync_jobs`** - Scraping job tracking (for automation)
- **`raw_data_staging`** - Temporary storage (fault isolation)

### Extended Tables

- **`universities`** - Added sync config, error tracking
- **`professors`** - Added ratings, source tracking, soft delete
- **`reviews`** - Added university_id for filtering

### Key Features

- ✅ **Auto-update ratings** when reviews approved
- ✅ **Circuit breaker** disables failing sync jobs
- ✅ **Slug generation** for SEO-friendly URLs
- ✅ **Soft delete** support (keep historical data)

---

## 🧪 Test Migration

```bash
# Run verification SQL
supabase db query -f docs/TASK2_VERIFICATION.sql
```

Or paste contents of `TASK2_VERIFICATION.sql` into Supabase SQL Editor.

---

## 🚨 Common Issues

### Issue: "Extension uuid-ossp does not exist"

**Fix:**
```sql
-- Run this first in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Issue: "Missing environment variables"

**Fix:** Check `.env.local` exists with correct keys (Service Role, not Anon!)

### Issue: Import fails with duplicate slug

**Fix:** Script handles this automatically. If you see errors, delete existing data:
```sql
DELETE FROM professors WHERE source_system = 'adelaide_scraper';
```

---

## 📚 Full Documentation

For detailed explanations, troubleshooting, and architecture:

👉 **Read `docs/TASK2_MIGRATION_GUIDE.md`**

---

## 🎯 Success Checklist

- [ ] Environment variables set (`.env.local`)
- [ ] Migration applied (check Supabase table editor)
- [ ] Adelaide data imported (39 professors)
- [ ] Verification queries pass (run `TASK2_VERIFICATION.sql`)

---

## 🔄 Rollback (if needed)

```sql
-- Drop new tables (be careful!)
DROP TABLE IF EXISTS raw_data_staging CASCADE;
DROP TABLE IF EXISTS sync_jobs CASCADE;
DROP TABLE IF EXISTS professor_courses CASCADE;
DROP TABLE IF EXISTS courses CASCADE;

-- Revert to initial schema
-- Re-run: supabase/migrations/001_enterprise_schema.sql
```

---

## 📞 Support

- **CTO Architecture:** `docs/cto/data-architecture.md`
- **Migration Guide:** `docs/TASK2_MIGRATION_GUIDE.md`
- **Supabase Docs:** https://supabase.com/docs

---

**Last Updated:** 2026-02-11  
**Version:** Task 2 (Production Schema)  
**Status:** ✅ Ready to Deploy
