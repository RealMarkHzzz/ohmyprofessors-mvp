# OhMyProfessors - CTO 架构设计

**Version:** 1.0  
**Date:** 2026-02-10  
**Author:** PA (Main Orchestrator)  
**Tech Lead:** Werner Vogels (CTO Persona)

---

## 1. System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Browser)                   │
│  Next.js 16 App Router + React 19 + TypeScript + Tailwind   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Edge Runtime (Vercel)                      │
│  - Static Generation (SSG)                                   │
│  - Server-Side Rendering (SSR)                               │
│  - API Routes (Serverless Functions)                         │
│  - Middleware (Auth, Rate Limiting)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend Services (Supabase)                   │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ PostgreSQL   │ Auth Service │ Realtime Subscriptions   │ │
│  │ (Database)   │ (JWT)        │ (WebSocket)              │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└───────────────────────���─────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 16 (App Router) | RSC, streaming, built-in optimization |
| **UI Framework** | React 19 | Concurrent features, Server Components |
| **Language** | TypeScript 5 (Strict Mode) | Type safety, developer experience |
| **Styling** | Tailwind CSS v4 | Utility-first, performance, consistency |
| **Component Library** | shadcn/ui + Radix UI | Accessible, customizable, headless |
| **Animation** | Framer Motion | Declarative, performant animations |
| **Backend** | Supabase | PostgreSQL, Auth, Realtime, RLS |
| **ORM** | Supabase Client | Type-safe queries, real-time subscriptions |
| **Forms** | React Hook Form + Zod | Validation, performance, DX |
| **State Management** | React Context + Server State | Minimal client state, leverage RSC |
| **Deployment** | Vercel | Edge network, zero-config, preview deploys |

---

## 2. Directory Structure

### Standard Project Layout

```
ohmyprofessors/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group: Authentication
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── verify-email/
│   │       └── page.tsx
│   ├── (marketing)/              # Route group: Marketing pages
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── terms/
│   │       └── page.tsx
│   ├── (platform)/               # Route group: Core features
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── professors/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx      # Professor detail page
│   │   │   └── page.tsx          # Professor list
│   │   ├── courses/
│   │   │   ├── [code]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── submit-review/
│   │       └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── reviews/
│   │   │   ├── route.ts          # GET, POST /api/reviews
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE /api/reviews/:id
│   │   ├── professors/
│   │   │   └── route.ts
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts      # Supabase auth callback
│   ├── layout.tsx                # Root layout (Header + Footer)
│   ├── page.tsx                  # Homepage
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── loading.tsx               # Global loading state
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (shadcn components)
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── navigation.tsx
│   ├── forms/                    # Form components
│   │   ├── review-form.tsx
│   │   ├── professor-search-form.tsx
│   │   └── login-form.tsx
│   └── features/                 # Feature-specific components
│       ├── professor-card.tsx
│       ├── review-list.tsx
│       ├── rating-display.tsx
│       └── tag-cloud.tsx
│
├── lib/                          # Library code
│   ├── supabase/
│   │   ├── client.ts             # Client-side Supabase client
│   │   ├── server.ts             # Server-side Supabase client
│   │   └── middleware.ts         # Supabase middleware
│   ├── utils/
│   │   ├── cn.ts                 # Class name utility (clsx + twMerge)
│   │   ├── format.ts             # Date, number formatting
│   │   └── slugify.ts            # URL slug generation
│   ├── validators/               # Zod schemas
│   │   ├── review.ts
│   │   ├── professor.ts
│   │   └── user.ts
│   └── constants/
│       ├── routes.ts             # App routes
│       ├── universities.ts       # University list
│       └── tags.ts               # Review tags
│
├── types/                        # TypeScript types
│   ├── database.ts               # Supabase generated types
│   ├── review.ts
│   ├── professor.ts
│   └── user.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-reviews.ts
│   ├── use-professors.ts
│   ├── use-auth.ts
│   └── use-debounce.ts
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── supabase/                     # Supabase configuration
│   ├── migrations/               # Database migrations
│   │   └── 20260210_initial_schema.sql
│   ├── seed.sql                  # Seed data
│   └── config.toml               # Supabase local config
│
├── docs/                         # Documentation
│   ├── CEO_STRATEGY.md
│   ├── CTO_ARCHITECTURE.md       # This document
│   ├── PRODUCT_SPEC.md
│   └── SETUP_GUIDE.md
│
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/                      # Utility scripts
│   ├── generate-types.sh         # Generate Supabase types
│   └── seed-database.sh
│
├── .vscode/                      # VSCode configuration
│   └── settings.json
│
├── .env.local                    # Local environment variables (gitignored)
├── .env.example                  # Environment variable template
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── README.md
```

---

## 3. Data Model (Supabase Schema)

### Entity-Relationship Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  universities│         │  professors  │         │    users     │
│──────────────│         │──────────────│         │──────────────│
│ id (PK)      │────┐    │ id (PK)      │    ┌────│ id (PK)      │
│ name         │    │    │ name         │    │    │ email        │
│ slug         │    └───→│ university_id│    │    │ created_at   │
│ created_at   │         │ slug         │    │    └──────────────┘
└──────────────┘         │ department   │    │             │
                         │ created_at   │    │             │
                         └──────────────┘    │             │
                                │            │             │
                                │            │             │
                         ┌──────▼────────────▼─────┐       │
                         │       reviews           │       │
                         │─────────────────────────│       │
                         │ id (PK)                 │       │
                         │ professor_id (FK)       │       │
                         │ user_id (FK)            │◄──────┘
                         │ course_code             │
                         │ difficulty (1-5)        │
                         │ workload (hours/week)   │
                         │ would_recommend (bool)  │
                         │ exam_format (tags)      │
                         │ comment                 │
                         │ upvotes                 │
                         │ created_at              │
                         └─────────────────────────┘
                                      │
                                      │
                              ┌───────▼────────┐
                              │  review_votes  │
                              │────────────────│
                              │ review_id (FK) │
                              │ user_id (FK)   │
                              │ vote_type      │ (upvote/downvote)
                              │ created_at     │
                              └────────────────┘
```

### Supabase DDL (SQL Schema)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universities table
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professors table
CREATE TABLE professors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    department TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    university_id UUID REFERENCES universities(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    course_code TEXT NOT NULL,
    difficulty INTEGER CHECK (difficulty >= 1 AND difficulty <= 5),
    workload INTEGER CHECK (workload >= 0 AND workload <= 100), -- hours/week
    would_recommend BOOLEAN NOT NULL,
    exam_format TEXT[], -- Array of tags: ['open-book', 'closed-book', 'take-home']
    comment TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure users can only review each professor+course once
    UNIQUE(professor_id, user_id, course_code)
);

-- Review votes table
CREATE TABLE review_votes (
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (review_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_professors_university ON professors(university_id);
CREATE INDEX idx_professors_slug ON professors(slug);
CREATE INDEX idx_reviews_professor ON reviews(professor_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- Row Level Security (RLS) policies
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

-- Universities: Public read
CREATE POLICY "Universities are viewable by everyone"
    ON universities FOR SELECT
    USING (true);

-- Professors: Public read
CREATE POLICY "Professors are viewable by everyone"
    ON professors FOR SELECT
    USING (true);

-- Profiles: Users can view own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Profiles: Users can update own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Reviews: Public read for approved reviews
CREATE POLICY "Approved reviews are viewable by everyone"
    ON reviews FOR SELECT
    USING (status = 'approved');

-- Reviews: Authenticated users can create
CREATE POLICY "Authenticated users can create reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Reviews: Users can update own pending reviews
CREATE POLICY "Users can update own pending reviews"
    ON reviews FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending');

-- Review votes: Authenticated users can vote
CREATE POLICY "Authenticated users can vote"
    ON review_votes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own votes"
    ON review_votes FOR SELECT
    USING (auth.uid() = user_id);
```

---

## 4. Authentication & Authorization

### Supabase Auth Integration

**Authentication Flow:**

```
1. User registers with .edu.au email
   ↓
2. Supabase sends verification email
   ↓
3. User clicks verification link
   ↓
4. Redirect to /auth/callback
   ↓
5. Middleware sets session cookie
   ↓
6. User redirected to dashboard
```

**Implementation:**

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

---

## 5. Performance Optimization

### Rendering Strategy

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Homepage | SSG | Static, high traffic, infrequent updates |
| Professor List | ISR (60s) | Semi-dynamic, cacheable, frequent access |
| Professor Detail | ISR (60s) + Client | Dynamic reviews, cacheable profile |
| Submit Review | CSR | Authenticated, form-heavy, low traffic |
| Dashboard | SSR | Personalized, auth-required |

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Image optimization, SSG/ISR, CDN |
| **FID** | < 100ms | Code splitting, lazy loading, minimize JS |
| **CLS** | < 0.1 | Reserve space for images, avoid layout shifts |
| **TTFB** | < 600ms | Edge deployment (Vercel), database indexes |

### Image Optimization

```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['supabase.co'], // For user avatars
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}

export default nextConfig
```

### Code Splitting

```typescript
// app/professors/[slug]/page.tsx
import dynamic from 'next/dynamic'

// Lazy load heavy review form component
const ReviewForm = dynamic(() => import('@/components/forms/review-form'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Client-side only
})
```

---

## 6. SEO Optimization

### Metadata Generation

```typescript
// app/professors/[slug]/page.tsx
import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient()
  const { data: professor } = await supabase
    .from('professors')
    .select('name, department, university:universities(name)')
    .eq('slug', params.slug)
    .single()

  if (!professor) {
    return {
      title: 'Professor Not Found',
    }
  }

  return {
    title: `${professor.name} Reviews | ${professor.university.name}`,
    description: `Read student reviews for ${professor.name} at ${professor.university.name}. Ratings on difficulty, workload, and teaching style.`,
    openGraph: {
      title: `${professor.name} Reviews`,
      description: `Student reviews for ${professor.name} - ${professor.department}`,
      type: 'profile',
    },
  }
}
```

### Structured Data (Schema.org)

```typescript
// components/features/professor-structured-data.tsx
export function ProfessorStructuredData({ professor, avgRating, reviewCount }: Props) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: professor.name,
    jobTitle: 'Professor',
    affiliation: {
      '@type': 'Organization',
      name: professor.university.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

---

## 7. Development Standards

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,                        // ✅ Strict mode
    "noUncheckedIndexedAccess": true,     // ✅ Prevent undefined access
    "noUnusedLocals": true,               // ✅ No unused variables
    "noUnusedParameters": true,           // ✅ No unused parameters
    "noFallthroughCasesInSwitch": true,   // ✅ Switch case safety
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files** | kebab-case | `professor-card.tsx` |
| **Components** | PascalCase | `ProfessorCard` |
| **Functions** | camelCase | `getProfessorBySlug` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_REVIEW_LENGTH` |
| **Types/Interfaces** | PascalCase | `Professor`, `Review` |
| **Hooks** | camelCase (use prefix) | `useProfessors` |

### Git Workflow

```bash
# Branch naming
feature/professor-search   # New feature
fix/review-form-validation # Bug fix
docs/setup-guide           # Documentation
refactor/api-routes        # Code refactoring

# Commit message format (Conventional Commits)
feat: add professor search with autocomplete
fix: resolve review submission validation error
docs: update setup guide with Supabase steps
refactor: extract review form logic to custom hook
```

---

## 8. Environment Variables

### `.env.example`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Optional - for notifications)
RESEND_API_KEY=your-resend-api-key
```

---

## 9. Deployment Configuration

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["syd1"], // Sydney region for Adelaide users
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

---

## 10. Testing Strategy

### Test Pyramid

```
       ┌────────┐
       │  E2E   │  (10% - Playwright)
       └────────┘
      ┌──────────┐
      │Integration│  (30% - Vitest + Testing Library)
      └──────────┘
     ┌────────────┐
     │    Unit    │  (60% - Vitest)
     └────────────┘
```

### Example Test

```typescript
// tests/unit/utils/slugify.test.ts
import { describe, it, expect } from 'vitest'
import { slugify } from '@/lib/utils/slugify'

describe('slugify', () => {
  it('converts name to URL-safe slug', () => {
    expect(slugify('Dr. John Smith')).toBe('dr-john-smith')
  })

  it('handles special characters', () => {
    expect(slugify('François Müller')).toBe('francois-muller')
  })
})
```

---

## 11. Monitoring & Observability

### Recommended Tools

| Tool | Purpose | Priority |
|------|---------|----------|
| **Vercel Analytics** | Core Web Vitals, page views | High |
| **Sentry** | Error tracking, performance monitoring | High |
| **PostHog** | Product analytics, feature flags | Medium |
| **Supabase Logs** | Database queries, auth events | High |

---

## 12. Security Considerations

### Checklist

- ✅ **Row Level Security (RLS):** Enabled on all Supabase tables
- ✅ **HTTPS Only:** Enforced via Vercel
- ✅ **CORS:** Configured in API routes
- ✅ **Rate Limiting:** Implement in middleware (future)
- ✅ **Input Validation:** Zod schemas for all forms
- ✅ **XSS Protection:** React escapes by default
- ✅ **CSRF Protection:** SameSite cookies
- ✅ **Content Moderation:** Manual review queue for reports

---

## 13. Next Steps

### Week 1 (Implementation)
- [ ] Create standard directory structure
- [ ] Configure TypeScript + ESLint
- [ ] Setup Supabase project
- [ ] Run initial migration (schema.sql)
- [ ] Generate TypeScript types from Supabase

### Week 2 (Core Development)
- [ ] Implement authentication flow
- [ ] Build professor search + detail pages
- [ ] Create review submission form
- [ ] Setup RLS policies

### Week 3 (Testing & Polish)
- [ ] Write unit tests (60% coverage target)
- [ ] E2E tests for critical flows
- [ ] Performance optimization (Lighthouse score > 90)
- [ ] Metadata + SEO setup

### Week 4 (Launch Prep)
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Setup monitoring (Sentry, Analytics)
- [ ] Security audit checklist

---

**Last Updated:** 2026-02-10  
**Document Owner:** CTO (Werner Vogels Persona)  
**Review Cycle:** Weekly during development

---

*"Everything fails, all the time." - Werner Vogels*  
*Design for failure: RLS policies, error boundaries, graceful degradation.*
