/**
 * Mobile Course Card Component
 * 移动端课程卡片
 */
'use client'

import Link from 'next/link'
import { BookOpen, Star, Users, MessageCircle } from 'lucide-react'
import type { Course } from '@/lib/types/course'

interface MobileCourseCardProps {
  course: Course
}

export function MobileCourseCard({ course }: MobileCourseCardProps) {
  // 使用 course.code 作为 slug（如果没有独立的 slug 字段）
  const slug = course.code.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <Link href={`/courses/${slug}`}>
      <div className="
        bg-white
        px-4 py-4
        active:bg-gray-50
        transition-colors
        min-h-[120px]
        flex flex-col justify-between
        border-b border-gray-200
      ">
        {/* 课程代码 */}
        <div className="text-xs font-semibold text-blue-600 mb-1">
          {course.code}
        </div>
        
        {/* 课程名称 */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.name}
        </h3>
        
        {/* 学院 */}
        <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          {course.department}
        </div>
        
        {/* 统计信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-700">
          {course.avgRating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              {course.avgRating.toFixed(1)}
            </span>
          )}
          
          {course.professorCount > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.professorCount}
            </span>
          )}
          
          {course.totalReviews > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {course.totalReviews}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
