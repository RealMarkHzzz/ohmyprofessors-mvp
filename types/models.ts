/**
 * Domain models derived from database types
 * Add business logic types, API DTOs, etc.
 */

import type { Database } from "./database";

// Table row types
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Professor = Database["public"]["Tables"]["professors"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type University = Database["public"]["Tables"]["universities"]["Row"];

// Insert types (for creating new records)
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type ProfessorInsert = Database["public"]["Tables"]["professors"]["Insert"];
export type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
export type UniversityInsert = Database["public"]["Tables"]["universities"]["Insert"];

// Update types (for partial updates)
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type ProfessorUpdate = Database["public"]["Tables"]["professors"]["Update"];
export type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];
export type UniversityUpdate = Database["public"]["Tables"]["universities"]["Update"];

// Enum types
export type UserRole = Database["public"]["Enums"]["user_role"];
export type ReviewStatus = Database["public"]["Enums"]["review_status"];
export type DifficultyLevel = Database["public"]["Enums"]["difficulty_level"];

// Extended types with relations
export type ProfessorWithUniversity = Professor & {
  university: University;
};

export type ReviewWithProfessor = Review & {
  professor: Professor;
};

export type ReviewWithUser = Review & {
  user: Pick<User, "id" | "full_name" | "avatar_url">;
};

export type ProfessorWithReviews = Professor & {
  reviews: Review[];
  university: University;
};

// API response types
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
};

// Search/Filter types
export type ProfessorFilters = {
  university_id?: string;
  department?: string;
  min_rating?: number;
  search?: string;
};

export type ReviewFilters = {
  professor_id?: string;
  user_id?: string;
  status?: ReviewStatus;
  course_code?: string;
};
