/**
 * Course Data Models
 * 课程优先模式核心数据结构
 */

export interface Course {
  id: string
  code: string                    // 如 "COMP 1012"
  name: string                    // 如 "Computer Science I"
  department: string
  university: string
  description?: string | undefined
  credits?: number | undefined
  avgRating: number
  totalReviews: number
  professorCount: number
  createdAt: string
  updatedAt: string
}

export interface CourseProfessor {
  courseId: string
  professorId: string
  professorName: string
  professorSlug: string
  semester: string                // 如 "2024 S1"
  rating: number
  reviewCount: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topTags: string[]
}

// Database row types (snake_case from Supabase)
export interface CourseRow {
  id: string
  code: string
  name: string
  department: string
  university: string
  description: string | null
  credits: number | null
  avg_rating: number
  total_reviews: number
  professor_count: number
  created_at: string
  updated_at: string
}

export interface CourseProfessorRow {
  id: string
  course_id: string
  professor_id: string
  semester: string | null
  rating: number
  review_count: number
  difficulty: string | null
  top_tags: string[] | null
  created_at: string
}

// Helper function to convert database row to Course
export function toCourse(row: CourseRow): Course {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    department: row.department,
    university: row.university,
    description: row.description ?? undefined,
    credits: row.credits ?? undefined,
    avgRating: row.avg_rating,
    totalReviews: row.total_reviews,
    professorCount: row.professor_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// Helper function to convert database row to CourseProfessor
export function toCourseProfessor(
  row: CourseProfessorRow & { professors?: { name: string; slug: string } }
): CourseProfessor {
  return {
    courseId: row.course_id,
    professorId: row.professor_id,
    professorName: row.professors?.name || '',
    professorSlug: row.professors?.slug || '',
    semester: row.semester || 'Unknown',
    rating: row.rating,
    reviewCount: row.review_count,
    difficulty: (row.difficulty as 'Easy' | 'Medium' | 'Hard') || 'Medium',
    topTags: row.top_tags || [],
  }
}
