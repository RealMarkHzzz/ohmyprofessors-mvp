import { z } from "zod";

/**
 * Validation schemas for professor-related operations
 */

export const professorSchema = z.object({
  university_id: z.string().uuid("Invalid university ID"),
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  department: z
    .string()
    .min(2, "Department must be at least 2 characters")
    .max(100),
  title: z.string().max(100).optional(),
  email: z.string().email("Invalid email address").optional(),
  office_location: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  research_interests: z.array(z.string().max(100)).max(20).optional(),
});

export const professorUpdateSchema = professorSchema.partial().extend({
  id: z.string().uuid(),
});

export const professorSearchSchema = z.object({
  query: z.string().min(1).max(200).optional(),
  university_id: z.string().uuid().optional(),
  department: z.string().max(100).optional(),
  min_rating: z
    .number()
    .min(0)
    .max(5)
    .optional()
    .or(z.string().transform((val) => parseFloat(val))),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type ProfessorInput = z.infer<typeof professorSchema>;
export type ProfessorUpdateInput = z.infer<typeof professorUpdateSchema>;
export type ProfessorSearchInput = z.infer<typeof professorSearchSchema>;
