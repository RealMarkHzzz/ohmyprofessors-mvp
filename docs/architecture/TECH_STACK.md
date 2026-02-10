# Technology Stack - OhMyProfessors

## Overview
This document outlines the technology choices for the OhMyProfessors platform, optimized for rapid development, scalability, and excellent developer experience.

---

## Core Technologies

### Frontend Framework
- **Next.js 16.1.6** (App Router)
  - Server Components for data fetching
  - Client Components for interactivity
  - Built-in routing and API routes
  - Automatic code splitting
  - Image optimization

### Runtime
- **React 19.2.3**
  - Latest features (Server Actions, use hook)
  - Improved performance
  - Better TypeScript support

### Language
- **TypeScript 5.x**
  - Strict mode enabled
  - Type-safe API calls
  - Better IDE support
  - Reduced runtime errors

---

## UI & Styling

### CSS Framework
- **Tailwind CSS 4.x**
  - Utility-first approach
  - Custom design system
  - Responsive by default
  - Small bundle size (purged unused styles)

### Component Library
- **Custom Components** (shadcn/ui-inspired)
  - `components/ui/Button.tsx`
  - `components/ui/Card.tsx`
  - `components/ui/Input.tsx`
  - Built with Radix UI primitives

### Animation
- **Framer Motion 12.33**
  - Smooth page transitions
  - Interactive hover effects
  - Scroll-based animations

- **GSAP 3.14**
  - Complex timeline animations
  - Hero section effects

### Icons
- **Lucide React 0.563**
  - Modern, consistent icon set
  - Tree-shakeable
  - TypeScript support

---

## Data Management

### State Management (MVP)
- **React Server Components**
  - Fetch data on the server
  - Automatically cached
  - No client-side state needed for static data

- **Client State**
  - React `useState` for local UI state
  - URL search params for filters/search

### Future: Database
- **Option 1: Supabase** (Recommended)
  - PostgreSQL database
  - Real-time subscriptions
  - Built-in authentication
  - RESTful API + Row Level Security
  - Free tier: 500MB database

- **Option 2: Prisma + Vercel Postgres**
  - Type-safe ORM
  - Auto-generated types
  - Migration system
  - Works with any PostgreSQL

### MVP: Mock Data
- **TypeScript files**
  - `lib/data/mock-professors.ts`
  - `lib/data/mock-reviews.ts`
  - Easy to migrate to real DB later

---

## Form Management

### Form Library
- **React Hook Form 7.71**
  - Performant (uncontrolled inputs)
  - Built-in validation
  - TypeScript support
  - Small bundle size (9kb)

### Validation
- **Zod 4.3.6**
  - Type-safe schema validation
  - Excellent TypeScript inference
  - Works seamlessly with React Hook Form
  - Runtime validation

Example:
```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().max(2000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const { register, handleSubmit } = useForm<ReviewFormData>({
  resolver: zodResolver(reviewSchema),
});
```

---

## API Layer

### API Routes
- **Next.js App Router API Routes**
  - File-based routing: `app/api/reviews/route.ts`
  - TypeScript support
  - Edge runtime compatible
  - Built-in request/response handling

Example:
```typescript
// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate with Zod
  // Save to database
  return NextResponse.json({ success: true });
}
```

---

## Utilities

### Class Names
- **clsx 2.1.1** + **tailwind-merge 3.4**
  - Conditional class names
  - Merge Tailwind classes intelligently
  
```typescript
import { cn } from '@/lib/utils';
cn('base-class', condition && 'conditional-class', className);
```

### Class Variance Authority (CVA)
- **cva 0.7.1**
  - Type-safe component variants
  - Used in Button, Card components

---

## Development Tools

### Linting
- **ESLint 9.x** + **eslint-config-next**
  - Next.js best practices
  - React hooks rules
  - TypeScript rules

### Package Manager
- **npm** (default)
  - Lockfile for reproducible builds

---

## Deployment & Hosting

### Platform
- **Vercel** (Recommended)
  - Zero-config deployment
  - Automatic HTTPS
  - Global CDN
  - Edge functions
  - Preview deployments for PRs
  - Environment variables
  - Free tier: 100GB bandwidth/month

### Build Command
```bash
npm run build
```

### Environment Variables
```env
# Supabase (future)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## File Structure

```
ohmyprofessors/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── reviews/
│   │       └── route.ts          # POST /api/reviews
│   ├── professors/
│   │   └── [slug]/
│   │       └── page.tsx          # Professor detail page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── home/                     # Home page components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── ProfessorListClient.tsx
│   ├── shared/                   # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ProfessorCard.tsx
│   ├── search/                   # Search components
│   │   ├── SearchBar.tsx
│   │   └── FilterPanel.tsx
│   └── reviews/                  # Review components
│       ├── ReviewForm.tsx
│       ├── ReviewCard.tsx
│       └── ReviewList.tsx
├── lib/
│   ├── data/                     # Mock data (MVP)
│   │   ├── mock-professors.ts
│   │   └── mock-reviews.ts
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── utils.ts                  # Utility functions
│   └── validations.ts            # Zod schemas
├── public/                       # Static assets
│   └── images/
├── docs/
│   └── architecture/             # Technical docs
│       ├── DATA_MODEL.md
│       └── TECH_STACK.md
└── package.json
```

---

## Performance Optimization

### Code Splitting
- Automatic with Next.js
- Dynamic imports for heavy components
```typescript
const ReviewForm = dynamic(() => import('@/components/reviews/ReviewForm'), {
  loading: () => <LoadingSpinner />,
});
```

### Image Optimization
- Next.js `<Image>` component
- Automatic WebP conversion
- Lazy loading by default
- Responsive images

### Caching Strategy
- Server Components: cached by default
- API Routes: ISR (Incremental Static Regeneration)
- Static assets: CDN cached

---

## Testing Strategy (Future)

### Unit Testing
- **Vitest** (faster than Jest)
- Component testing with React Testing Library

### E2E Testing
- **Playwright** (recommended over Cypress)
- Test critical flows: search, submit review

---

## Migration Path

### Phase 1 (Current - Round 4)
- Mock data in TypeScript files
- Client-side filtering/search
- Local state management

### Phase 2 (Round 5)
- Migrate to Supabase
- Server-side search
- User authentication
- Real-time updates

### Phase 3 (Future)
- Add analytics (PostHog/Mixpanel)
- Implement caching (Redis)
- Add full-text search (Algolia/Meilisearch)
- Progressive Web App (PWA)

---

## Dependencies Summary

### Production Dependencies
```json
{
  "@hookform/resolvers": "^5.2.2",      // React Hook Form + Zod integration
  "@supabase/ssr": "^0.8.0",            // Supabase SSR (future)
  "@supabase/supabase-js": "^2.95.3",   // Supabase client (future)
  "class-variance-authority": "^0.7.1", // Component variants
  "clsx": "^2.1.1",                     // Conditional classes
  "framer-motion": "^12.33.0",          // Animations
  "gsap": "^3.14.2",                    // Complex animations
  "lucide-react": "^0.563.0",           // Icons
  "next": "16.1.6",                     // Framework
  "react": "19.2.3",                    // UI library
  "react-dom": "19.2.3",                // React DOM
  "react-hook-form": "^7.71.1",         // Form management
  "tailwind-merge": "^3.4.0",           // Tailwind class merging
  "zod": "^4.3.6"                       // Validation
}
```

### Dev Dependencies
```json
{
  "@tailwindcss/postcss": "^4",         // Tailwind CSS
  "@types/node": "^20",                 // Node types
  "@types/react": "^19",                // React types
  "@types/react-dom": "^19",            // React DOM types
  "eslint": "^9",                       // Linting
  "eslint-config-next": "16.1.6",       // Next.js ESLint config
  "tailwindcss": "^4",                  // Tailwind
  "typescript": "^5"                    // TypeScript
}
```

---

## Why These Choices?

### Next.js App Router
- ✅ Best DX for React developers
- ✅ Server Components reduce client JS
- ✅ Built-in routing and API
- ✅ Vercel deployment is seamless

### TypeScript
- ✅ Catch bugs at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code

### Tailwind CSS
- ✅ Rapid prototyping
- ✅ Consistent design system
- ✅ No CSS file management
- ✅ Purged CSS = small bundle

### React Hook Form + Zod
- ✅ Best form performance (uncontrolled)
- ✅ Type-safe validation
- ✅ Great DX

### Supabase (Future)
- ✅ PostgreSQL (proven, scalable)
- ✅ Real-time out of the box
- ✅ Built-in auth
- ✅ Generous free tier
- ✅ Easy migration from mock data

---

**Last Updated:** 2026-02-11  
**Version:** 1.0.0
