/**
 * CourseCard Component
 * 课程卡片组件 - 课程优先模式核心 UI
 */

'use client'

import Link from 'next/link'
import { Star, Users, BookOpen, ChevronRight } from 'lucide-react'
import type { Course } from '@/lib/types/course'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  // 动态评分颜色
  const ratingColor = 
    course.avgRating >= 4.5 ? 'bg-green-100 text-green-700' :
    course.avgRating >= 4.0 ? 'bg-blue-100 text-blue-700' :
    course.avgRating >= 3.5 ? 'bg-yellow-100 text-yellow-700' :
    'bg-gray-100 text-gray-700'
  
  // 生成 URL slug: adelaide-comp-1012
  const universitySlug = course.university
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  const codeSlug = course.code.toLowerCase().replace(/\s+/g, '-')
  const slug = `${universitySlug}-${codeSlug}`
  
  return (
    <Link
      href={`/courses/${slug}`}
      className="
        block p-5 min-h-[200px]
        border border-gray-200 rounded-xl
        bg-white
        hover:border-blue-500 hover:-translate-y-0.5
        hover:shadow-lg
        transition-all duration-200
        group
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-2xl font-bold text-gray-950">
          {course.code}
        </h3>
        {course.avgRating > 0 && (
          <span className={`px-2 py-1 rounded-lg text-sm font-semibold ${ratingColor}`}>
            <Star className="w-4 h-4 inline mr-1" />
            {course.avgRating.toFixed(1)}
          </span>
        )}
      </div>
      
      {/* Course Name */}
      <h4 className="text-base font-medium text-gray-700 mb-4 line-clamp-2">
        {course.name}
      </h4>
      
      {/* Metadata */}
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{course.university}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span>{course.professorCount} professor{course.professorCount !== 1 ? 's' : ''} teaching</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 flex-shrink-0" />
          <span>{course.totalReviews} review{course.totalReviews !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      {/* CTA */}
      <div className="flex justify-end mt-auto pt-2">
        <span className="text-blue-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Compare Professors
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
