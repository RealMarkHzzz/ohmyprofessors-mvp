# Data Model Design - OhMyProfessors

## Overview
This document defines the data schema for the OhMyProfessors platform. We use a relational database structure optimized for professor reviews and search functionality.

---

## Database Schema

### 1. Professor Table
Stores professor information and aggregated metrics.

```typescript
interface Professor {
  id: string;                    // UUID, Primary Key
  name: string;                  // Full name
  email: string;                 // University email (unique)
  department: string;            // e.g., "Computer Science"
  university: string;            // e.g., "University of Adelaide"
  avatar_url: string | null;     // Profile image URL
  bio: string | null;            // Short biography
  title: string;                 // e.g., "Associate Professor", "Lecturer"
  slug: string;                  // URL-friendly identifier (unique)
  overall_rating: number;        // Calculated: average of all review ratings (0-5)
  total_reviews: number;         // Calculated: count of reviews
  created_at: Date;              // Timestamp
  updated_at: Date;              // Timestamp
}
```

**Indexes:**
- `email` (unique)
- `slug` (unique)
- `department`
- `overall_rating` (for sorting)
- `university`

**Constraints:**
- `overall_rating` must be between 0 and 5
- `name` and `email` are required

---

### 2. Review Table
Stores student reviews for professors.

```typescript
interface Review {
  id: string;                    // UUID, Primary Key
  professor_id: string;          // Foreign Key → Professor.id
  user_id: string | null;        // Foreign Key → User.id (nullable for anonymous)
  rating: number;                // Overall rating (1-5)
  difficulty: number;            // Course difficulty (1-5)
  course_code: string;           // e.g., "CS101"
  course_name: string;           // e.g., "Introduction to Programming"
  content: string | null;        // Review text (optional)
  tags: string[];                // Array of tags (e.g., ["Helpful", "Tough Grader"])
  helpful_count: number;         // Count of "helpful" votes
  semester: string;              // e.g., "2024 Semester 1"
  would_take_again: boolean;     // Would student take again?
  attendance_mandatory: boolean; // Is attendance required?
  created_at: Date;              // Timestamp
  updated_at: Date;              // Timestamp
}
```

**Indexes:**
- `professor_id` (for professor detail queries)
- `user_id`
- `created_at` (for sorting)
- `rating`

**Constraints:**
- `rating` must be between 1 and 5
- `difficulty` must be between 1 and 5
- `professor_id` is required
- `course_code` and `course_name` are required

---

### 3. Course Table
Stores course information (optional, for future expansion).

```typescript
interface Course {
  id: string;                    // UUID, Primary Key
  code: string;                  // Course code (unique)
  name: string;                  // Course name
  department: string;            // Department
  professor_id: string | null;   // Foreign Key → Professor.id (nullable)
  description: string | null;    // Course description
  credits: number;               // Credit hours
  created_at: Date;              // Timestamp
  updated_at: Date;              // Timestamp
}
```

**Indexes:**
- `code` (unique)
- `professor_id`
- `department`

---

### 4. User Table
Stores user information (simplified for MVP).

```typescript
interface User {
  id: string;                    // UUID, Primary Key
  email: string | null;          // Email (unique, nullable for anonymous)
  username: string | null;       // Display name
  is_verified: boolean;          // Email verification status
  is_anonymous: boolean;         // True for anonymous reviewers
  university: string | null;     // User's university
  created_at: Date;              // Timestamp
  updated_at: Date;              // Timestamp
}
```

**Indexes:**
- `email` (unique, partial index where not null)

**Constraints:**
- Either `email` or `is_anonymous` must be true

---

### 5. Tag Table (Optional)
Predefined tags for reviews.

```typescript
interface Tag {
  id: string;                    // UUID, Primary Key
  name: string;                  // Tag name (unique)
  category: string;              // e.g., "Teaching Style", "Grading", "Workload"
  description: string | null;    // Tag description
  created_at: Date;              // Timestamp
}
```

**Predefined Tags:**
- **Teaching Style**: "Clear Explanations", "Engaging", "Disorganized"
- **Grading**: "Easy Grader", "Tough Grader", "Fair Grader"
- **Workload**: "Heavy Workload", "Light Workload"
- **Support**: "Helpful", "Available", "Unapproachable"

---

## Relationships

```
Professor (1) ──< (N) Review
User (1) ──< (N) Review
Professor (1) ──< (N) Course (optional)
```

---

## Computed Fields

### overall_rating (Professor)
```sql
SELECT AVG(rating) 
FROM Review 
WHERE professor_id = ? 
GROUP BY professor_id
```

### total_reviews (Professor)
```sql
SELECT COUNT(*) 
FROM Review 
WHERE professor_id = ?
```

---

## Query Patterns

### 1. Get Professor with Reviews
```sql
SELECT p.*, COUNT(r.id) as total_reviews, AVG(r.rating) as overall_rating
FROM Professor p
LEFT JOIN Review r ON p.id = r.professor_id
WHERE p.id = ?
GROUP BY p.id
```

### 2. Search Professors
```sql
SELECT * FROM Professor
WHERE 
  name ILIKE ? OR
  department ILIKE ? OR
  EXISTS (
    SELECT 1 FROM Review r
    WHERE r.professor_id = Professor.id
    AND r.course_code ILIKE ?
  )
ORDER BY overall_rating DESC
LIMIT ?
```

### 3. Filter by Department
```sql
SELECT * FROM Professor
WHERE department = ?
ORDER BY overall_rating DESC
```

---

## Migration Strategy

For MVP (Round 4), we'll use **mock data** stored in TypeScript files:
- `lib/data/mock-professors.ts`
- `lib/data/mock-reviews.ts`

For future rounds, migrate to:
- **Supabase** (PostgreSQL with real-time subscriptions)
- **Prisma ORM** for type-safe queries

---

## Data Validation

All data inputs use **Zod schemas** for validation:

```typescript
import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  difficulty: z.number().min(1).max(5),
  course_code: z.string().min(1).max(20),
  course_name: z.string().min(1).max(200),
  content: z.string().max(2000).optional(),
  tags: z.array(z.string()).max(10),
  semester: z.string().min(1),
  would_take_again: z.boolean(),
  attendance_mandatory: z.boolean(),
});
```

---

## Performance Considerations

1. **Indexes**: All foreign keys and frequently queried fields
2. **Caching**: Cache professor aggregates (overall_rating, total_reviews)
3. **Pagination**: Use cursor-based pagination for large result sets
4. **Denormalization**: Store computed fields (overall_rating, total_reviews) in Professor table

---

## Security

1. **Anonymous Reviews**: Allow users to submit reviews without authentication
2. **Rate Limiting**: Limit reviews per IP address per day
3. **Moderation**: Flag system for inappropriate content
4. **SQL Injection**: Use parameterized queries (Prisma handles this)

---

**Last Updated:** 2026-02-11  
**Version:** 1.0.0
