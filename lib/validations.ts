import { z } from 'zod';

/**
 * Validation schemas for OhMyProfessors
 */

// Review submission schema
export const reviewSchema = z.object({
  professor_id: z.string().min(1, 'Professor ID is required'),
  rating: z.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  difficulty: z.number()
    .min(1, 'Difficulty must be at least 1')
    .max(5, 'Difficulty must be at most 5'),
  course_code: z.string()
    .min(1, 'Course code is required')
    .max(20, 'Course code must be 20 characters or less')
    .regex(/^[A-Z]{2,4}\d{4}$/, 'Course code must be in format like CS2510 or MATH1120'),
  course_name: z.string()
    .min(1, 'Course name is required')
    .max(200, 'Course name must be 200 characters or less'),
  content: z.string()
    .max(2000, 'Review must be 2000 characters or less')
    .optional()
    .nullable(),
  tags: z.array(z.string())
    .min(1, 'Select at least one tag')
    .max(10, 'Select at most 10 tags'),
  semester: z.string()
    .min(1, 'Semester is required')
    .regex(/^\d{4} Semester [12]$/, 'Semester must be in format like "2025 Semester 1"'),
  would_take_again: z.boolean(),
  attendance_mandatory: z.boolean(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

// Search and filter schema
export const searchFiltersSchema = z.object({
  query: z.string().optional().default(''),
  department: z.string().optional().nullable(),
  minRating: z.number().min(0).max(5).optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
});

export type SearchFiltersData = z.infer<typeof searchFiltersSchema>;

// Professor slug validation
export const professorSlugSchema = z.string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Invalid professor slug format');

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type PaginationData = z.infer<typeof paginationSchema>;

// Sort option schema
export const sortOptionSchema = z.enum([
  'rating-desc',
  'rating-asc',
  'reviews-desc',
  'reviews-asc',
  'name-asc',
  'name-desc',
]);

export type SortOptionData = z.infer<typeof sortOptionSchema>;
