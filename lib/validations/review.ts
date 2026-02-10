import { z } from "zod";

/**
 * Validation schemas for review-related operations
 */

export const reviewSchema = z.object({
  professor_id: z.string().uuid("Invalid professor ID"),
  course_code: z
    .string()
    .min(2, "Course code must be at least 2 characters")
    .max(20, "Course code must not exceed 20 characters")
    .regex(/^[A-Z0-9\s-]+$/i, "Invalid course code format"),
  course_name: z
    .string()
    .min(3, "Course name must be at least 3 characters")
    .max(100, "Course name must not exceed 100 characters"),
  academic_year: z
    .string()
    .regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
  semester: z.enum(["Fall", "Spring", "Summer", "Winter"], {
    message: "Invalid semester",
  }),
  
  // Ratings (1-5)
  rating_overall: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  rating_difficulty: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  rating_clarity: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  rating_helpfulness: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
  
  // Boolean fields
  would_take_again: z.boolean().optional(),
  attendance_mandatory: z.boolean().optional(),
  textbook_required: z.boolean().optional(),
  
  // Tags
  tags: z
    .array(z.string().min(1).max(50))
    .max(10, "Maximum 10 tags allowed")
    .optional(),
  
  difficulty: z.enum(["easy", "medium", "hard", "very_hard"], {
    message: "Invalid difficulty level",
  }),
  
  // Content
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  content: z
    .string()
    .min(20, "Review must be at least 20 characters")
    .max(5000, "Review must not exceed 5000 characters"),
  grade_received: z
    .string()
    .regex(/^[A-F][+-]?$|^Pass$|^Fail$|^CR$|^NC$/i, "Invalid grade format")
    .optional(),
  
  is_anonymous: z.boolean().default(false),
});

export const reviewUpdateSchema = reviewSchema.partial().extend({
  id: z.string().uuid(),
});

export const reviewVoteSchema = z.object({
  review_id: z.string().uuid(),
  vote: z.enum(["-1", "1"]).transform((val) => parseInt(val)),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>;
export type ReviewVoteInput = z.infer<typeof reviewVoteSchema>;
