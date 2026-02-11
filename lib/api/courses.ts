/**
 * Course API
 * 课程优先模式 API 接口层
 */

import { createClient } from '@/lib/supabase/server'
import type { 
  Course, 
  CourseProfessor,
  CourseRow,
  CourseProfessorRow,
  toCourse,
  toCourseProfessor
} from '@/lib/types/course'
import { mockCourses } from '@/lib/data/mock-courses'
import { mockCourseProfessors } from '@/lib/data/mock-course-professors'

// 开发模式：使用 mock 数据（待 Supabase 数据迁移完成后移除）
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && process.env.USE_MOCK_COURSES === 'true'

/**
 * 获取课程列表
 * @param university 可选的大学筛选
 * @returns Course[]
 */
export async function getCourses(university?: string): Promise<Course[]> {
  // 临时使用 mock 数据（待 Supabase 课程数据迁移完成后移除）
  if (USE_MOCK_DATA) {
    let courses = mockCourses
    if (university) {
      courses = courses.filter(c => 
        c.university.toLowerCase().includes(university.toLowerCase())
      )
    }
    return courses.sort((a, b) => b.totalReviews - a.totalReviews)
  }

  const supabase = await createClient()
  
  let query = supabase
    .from('courses')
    .select('*')
    .order('total_reviews', { ascending: false })
  
  if (university) {
    query = query.eq('university', university)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching courses:', error)
    throw new Error(`Failed to fetch courses: ${error.message}`)
  }
  
  // Convert database rows to Course objects
  const { toCourse } = await import('@/lib/types/course')
  return (data || []).map(row => toCourse(row as CourseRow))
}

/**
 * 根据课程代码获取课程信息
 * @param university 大学名称
 * @param code 课程代码（如 "COMP 1012"）
 * @returns Course | null
 */
export async function getCourseByCode(
  university: string,
  code: string
): Promise<Course | null> {
  // 临时使用 mock 数据
  if (USE_MOCK_DATA) {
    const course = mockCourses.find(
      c => c.university.toLowerCase().includes(university.toLowerCase()) &&
           c.code.toLowerCase() === code.toLowerCase()
    )
    return course || null
  }

  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('university', university)
    .eq('code', code)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    console.error('Error fetching course by code:', error)
    throw new Error(`Failed to fetch course: ${error.message}`)
  }
  
  const { toCourse } = await import('@/lib/types/course')
  return toCourse(data as CourseRow)
}

/**
 * 根据课程 ID 获取课程信息
 * @param courseId 课程 ID
 * @returns Course | null
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching course by id:', error)
    throw new Error(`Failed to fetch course: ${error.message}`)
  }
  
  const { toCourse } = await import('@/lib/types/course')
  return toCourse(data as CourseRow)
}

/**
 * 获取教授该课程的所有教授信息
 * @param courseId 课程 ID
 * @returns CourseProfessor[]
 */
export async function getCourseProfessors(
  courseId: string
): Promise<CourseProfessor[]> {
  // 临时使用 mock 数据
  if (USE_MOCK_DATA) {
    return mockCourseProfessors[courseId] || []
  }

  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('course_professors')
    .select(`
      *,
      professors (
        id,
        name,
        slug,
        avatar_url
      )
    `)
    .eq('course_id', courseId)
    .order('rating', { ascending: false })
  
  if (error) {
    console.error('Error fetching course professors:', error)
    throw new Error(`Failed to fetch course professors: ${error.message}`)
  }
  
  const { toCourseProfessor } = await import('@/lib/types/course')
  return (data || []).map(row => toCourseProfessor(row as any))
}

/**
 * 搜索课程
 * @param query 搜索关键词（课程代码或名称）
 * @param university 可选的大学筛选
 * @returns Course[]
 */
export async function searchCourses(
  query: string,
  university?: string
): Promise<Course[]> {
  const supabase = await createClient()
  
  let dbQuery = supabase
    .from('courses')
    .select('*')
    .or(`code.ilike.%${query}%,name.ilike.%${query}%`)
    .order('total_reviews', { ascending: false })
    .limit(20)
  
  if (university) {
    dbQuery = dbQuery.eq('university', university)
  }
  
  const { data, error } = await dbQuery
  
  if (error) {
    console.error('Error searching courses:', error)
    throw new Error(`Failed to search courses: ${error.message}`)
  }
  
  const { toCourse } = await import('@/lib/types/course')
  return (data || []).map(row => toCourse(row as CourseRow))
}

/**
 * 获取热门课程（按评论数排序）
 * @param limit 返回数量限制
 * @param university 可选的大学筛选
 * @returns Course[]
 */
export async function getPopularCourses(
  limit: number = 10,
  university?: string
): Promise<Course[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from('courses')
    .select('*')
    .order('total_reviews', { ascending: false })
    .limit(limit)
  
  if (university) {
    query = query.eq('university', university)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching popular courses:', error)
    throw new Error(`Failed to fetch popular courses: ${error.message}`)
  }
  
  const { toCourse } = await import('@/lib/types/course')
  return (data || []).map(row => toCourse(row as CourseRow))
}

/**
 * 获取高评分课程
 * @param minRating 最低评分阈值
 * @param limit 返回数量限制
 * @param university 可选的大学筛选
 * @returns Course[]
 */
export async function getTopRatedCourses(
  minRating: number = 4.0,
  limit: number = 10,
  university?: string
): Promise<Course[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from('courses')
    .select('*')
    .gte('avg_rating', minRating)
    .gte('total_reviews', 3) // 至少3个评价才算有效
    .order('avg_rating', { ascending: false })
    .limit(limit)
  
  if (university) {
    query = query.eq('university', university)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching top rated courses:', error)
    throw new Error(`Failed to fetch top rated courses: ${error.message}`)
  }
  
  const { toCourse } = await import('@/lib/types/course')
  return (data || []).map(row => toCourse(row as CourseRow))
}
