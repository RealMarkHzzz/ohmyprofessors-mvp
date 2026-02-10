/**
 * Database types (auto-generated from Supabase)
 * Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
 * 
 * For now, this is a placeholder. Replace with actual generated types.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          university_id: string | null
          role: "student" | "admin" | "moderator"
          email_verified: boolean
          is_active: boolean
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          university_id?: string | null
          role?: "student" | "admin" | "moderator"
          email_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          university_id?: string | null
          role?: "student" | "admin" | "moderator"
          email_verified?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      professors: {
        Row: {
          id: string
          university_id: string
          full_name: string
          slug: string
          department: string
          title: string | null
          email: string | null
          office_location: string | null
          profile_image_url: string | null
          bio: string | null
          research_interests: string[] | null
          rating_overall: number
          rating_difficulty: number
          rating_clarity: number
          rating_helpfulness: number
          total_reviews: number
          would_take_again_percent: number
          is_verified: boolean
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          university_id: string
          full_name: string
          slug: string
          department: string
          title?: string | null
          email?: string | null
          office_location?: string | null
          profile_image_url?: string | null
          bio?: string | null
          research_interests?: string[] | null
          rating_overall?: number
          rating_difficulty?: number
          rating_clarity?: number
          rating_helpfulness?: number
          total_reviews?: number
          would_take_again_percent?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          university_id?: string
          full_name?: string
          slug?: string
          department?: string
          title?: string | null
          email?: string | null
          office_location?: string | null
          profile_image_url?: string | null
          bio?: string | null
          research_interests?: string[] | null
          rating_overall?: number
          rating_difficulty?: number
          rating_clarity?: number
          rating_helpfulness?: number
          total_reviews?: number
          would_take_again_percent?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          professor_id: string
          user_id: string
          course_code: string
          course_name: string
          academic_year: string
          semester: string
          rating_overall: number
          rating_difficulty: number
          rating_clarity: number
          rating_helpfulness: number
          would_take_again: boolean | null
          attendance_mandatory: boolean | null
          textbook_required: boolean | null
          tags: string[] | null
          difficulty: "easy" | "medium" | "hard" | "very_hard"
          title: string
          content: string
          grade_received: string | null
          status: "pending" | "approved" | "rejected" | "flagged"
          upvotes: number
          downvotes: number
          is_anonymous: boolean
          is_verified_student: boolean
          flagged_count: number
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          professor_id: string
          user_id: string
          course_code: string
          course_name: string
          academic_year: string
          semester: string
          rating_overall: number
          rating_difficulty: number
          rating_clarity: number
          rating_helpfulness: number
          would_take_again?: boolean | null
          attendance_mandatory?: boolean | null
          textbook_required?: boolean | null
          tags?: string[] | null
          difficulty: "easy" | "medium" | "hard" | "very_hard"
          title: string
          content: string
          grade_received?: string | null
          status?: "pending" | "approved" | "rejected" | "flagged"
          upvotes?: number
          downvotes?: number
          is_anonymous?: boolean
          is_verified_student?: boolean
          flagged_count?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          professor_id?: string
          user_id?: string
          course_code?: string
          course_name?: string
          academic_year?: string
          semester?: string
          rating_overall?: number
          rating_difficulty?: number
          rating_clarity?: number
          rating_helpfulness?: number
          would_take_again?: boolean | null
          attendance_mandatory?: boolean | null
          textbook_required?: boolean | null
          tags?: string[] | null
          difficulty?: "easy" | "medium" | "hard" | "very_hard"
          title?: string
          content?: string
          grade_received?: string | null
          status?: "pending" | "approved" | "rejected" | "flagged"
          upvotes?: number
          downvotes?: number
          is_anonymous?: boolean
          is_verified_student?: boolean
          flagged_count?: number
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      universities: {
        Row: {
          id: string
          name: string
          slug: string
          country: string
          state: string | null
          city: string
          website: string | null
          logo_url: string | null
          description: string | null
          student_count: number | null
          is_verified: boolean
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          country: string
          state?: string | null
          city: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          student_count?: number | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          country?: string
          state?: string | null
          city?: string
          website?: string | null
          logo_url?: string | null
          description?: string | null
          student_count?: number | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "student" | "admin" | "moderator"
      review_status: "pending" | "approved" | "rejected" | "flagged"
      difficulty_level: "easy" | "medium" | "hard" | "very_hard"
    }
  }
}
