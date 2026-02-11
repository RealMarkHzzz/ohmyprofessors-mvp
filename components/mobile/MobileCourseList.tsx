/**
 * Mobile Course List Component
 * 移动端课程列表
 */
'use client'

import { MobileCourseCard } from './MobileCourseCard'
import type { Course } from '@/lib/types/course'

interface MobileCourseListProps {
  courses: Course[]
}

export function MobileCourseList({ courses }: MobileCourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 text-lg mb-2">
            📚 No courses available yet
          </p>
          <p className="text-gray-500 text-sm">
            We're currently adding course data. Check back soon!
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="divide-y divide-gray-200">
      {courses.map(course => (
        <MobileCourseCard 
          key={course.id}
          course={course}
        />
      ))}
    </div>
  )
}
