/**
 * CourseList Component
 * 课程列表组件
 */

'use client'

import { CourseCard } from './CourseCard'
import type { Course } from '@/lib/types/course'

interface CourseListProps {
  initialCourses: Course[]
}

export function CourseList({ initialCourses }: CourseListProps) {
  // 未来可以在这里添加客户端筛选、排序等功能
  
  if (initialCourses.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 text-lg">No courses found.</p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3 p-4">
      {initialCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
