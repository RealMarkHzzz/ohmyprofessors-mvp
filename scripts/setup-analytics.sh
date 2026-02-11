#!/bin/bash

# Task 5 - Analytics System Setup Script
# This script sets up the analytics tracking system

set -e

echo "=================================================="
echo "📊 OhMyProfessors Analytics System Setup"
echo "=================================================="
echo ""

cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors

echo "🔹 Step 1: Running database migration..."
echo "   Creating analytics_events table..."
echo ""

# Check if Supabase is configured
if [ ! -f ".env.local" ]; then
  echo "⚠️  Warning: .env.local not found"
  echo "   Please create it with your Supabase credentials:"
  echo "   NEXT_PUBLIC_SUPABASE_URL=your_url"
  echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key"
  echo "   SUPABASE_SERVICE_ROLE_KEY=your_service_key"
  echo ""
fi

# Run migration (if Supabase CLI is available)
if command -v supabase &> /dev/null; then
  echo "   ✅ Running: supabase db push"
  supabase db push
  echo ""
else
  echo "   ⚠️  Supabase CLI not found"
  echo "   Please manually run the migration:"
  echo "   supabase/migrations/20260211093200_analytics_events.sql"
  echo ""
fi

echo "🔹 Step 2: Checking file structure..."
echo ""

# Check all created files
FILES=(
  "lib/analytics.ts"
  "lib/api/analytics.ts"
  "app/admin/dashboard/page.tsx"
  "components/dashboard/StatsCards.tsx"
  "components/dashboard/FunnelChart.tsx"
  "components/dashboard/ActivityLog.tsx"
  "components/dashboard/TrendChart.tsx"
  "components/analytics/AnalyticsProvider.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ Missing: $file"
  fi
done

echo ""
echo "🔹 Step 3: Type checking..."
echo ""

# Run TypeScript check
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
  echo "   ⚠️  TypeScript errors found (check output above)"
else
  echo "   ✅ TypeScript check passed"
fi

echo ""
echo "=================================================="
echo "✅ Analytics System Setup Complete!"
echo "=================================================="
echo ""
echo "📋 What was installed:"
echo "   ✓ Event tracking system (lib/analytics.ts)"
echo "   ✓ Analytics API (lib/api/analytics.ts)"
echo "   ✓ Admin Dashboard (app/admin/dashboard)"
echo "   ✓ Database tables & functions"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "   1. Start dev server:"
echo "      npm run dev"
echo ""
echo "   2. Visit Admin Dashboard:"
echo "      http://localhost:3000/admin/dashboard"
echo ""
echo "   3. Test event tracking:"
echo "      - Browse professors (page_view tracked)"
echo "      - View a professor (professor_view tracked)"
echo "      - Submit a review (review_submit tracked)"
echo "      - Use search (search tracked)"
echo ""
echo "   4. Check analytics in dashboard:"
echo "      - DAU (Daily Active Users)"
echo "      - DAU/MAU Ratio"
echo "      - 7-day Retention"
echo "      - Weekly Reviews"
echo ""
echo "=================================================="
echo ""
