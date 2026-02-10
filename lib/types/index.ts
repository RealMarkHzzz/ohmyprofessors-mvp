// TypeScript type definitions for OhMyProfessors

export interface Professor {
  id: string;
  name: string;
  email: string;
  department: string;
  university: string;
  avatar_url: string | null;
  bio: string | null;
  title: string;
  slug: string;
  overall_rating: number;
  total_reviews: number;
  difficulty_rating: number;
  would_take_again_percent: number;
  tags: string[];
  created_at: string;
}

export interface Review {
  id: string;
  professor_id: string;
  user_id: string | null;
  rating: number;
  difficulty: number;
  course_code: string;
  course_name: string;
  content: string | null;
  tags: string[];
  helpful_count: number;
  semester: string;
  would_take_again: boolean;
  attendance_mandatory: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  professor_id: string | null;
}

export interface User {
  id: string;
  email: string | null;
  username: string | null;
  is_verified: boolean;
  is_anonymous: boolean;
  university: string | null;
  created_at: string;
}

export type DepartmentType = 
  | 'Computer Science' 
  | 'Mathematics' 
  | 'Engineering' 
  | 'Physics' 
  | 'Chemistry' 
  | 'Biology';

export type TagType = 
  | 'Easy Grader'
  | 'Tough Grader'
  | 'Fair Grader'
  | 'Helpful'
  | 'Available'
  | 'Unapproachable'
  | 'Clear Explanations'
  | 'Engaging'
  | 'Disorganized'
  | 'Heavy Workload'
  | 'Light Workload'
  | 'Lots of Homework'
  | 'Skip Class? You Won\'t Pass'
  | 'Gives Good Feedback'
  | 'Respected'
  | 'Amazing Lectures';

export interface SearchFilters {
  query: string;
  department: string | null;
  minRating: number | null;
  tags: string[];
}

export type SortOption = 
  | 'rating-desc'
  | 'rating-asc'
  | 'reviews-desc'
  | 'reviews-asc'
  | 'name-asc'
  | 'name-desc';
