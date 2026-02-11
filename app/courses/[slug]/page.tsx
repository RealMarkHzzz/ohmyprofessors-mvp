/**
 * Course Detail Page
 * 课程详情页 - 展示课程信息和教授对比
 * 优化：Streaming SSR + Suspense 边界
 */

import { Suspense } from 'react'
import { getCourseByCode, getCourseProfessors } from '@/lib/api/courses'
import { ProfessorComparisonTable } from '@/components/courses/ProfessorComparisonTable'
import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

// 课程信息组件（异步，独立 Suspense 边界）
async function CourseInfo({ university, code }: { university: string; code: string }) {
  const course = await getCourseByCode(university, code)
  if (!course) {
    notFound()
  }
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-500 mb-6">
      <h1 className="text-4xl font-bold text-gray-950 mb-2">
        {course.code}
      </h1>
      <h2 className="text-xl text-gray-700 mb-4">
        {course.name}
      </h2>
      
      {/* Course Metadata */}
      <div className="flex gap-4 text-sm text-gray-600 mb-4 flex-wrap">
        <span className="flex items-center gap-1">
          🏛️ {course.university}
        </span>
        <span className="flex items-center gap-1">
          💼 {course.department}
        </span>
        {course.credits && (
          <span className="flex items-center gap-1">
            📚 {course.credits} credits
          </span>
        )}
      </div>
      
      {/* Course Description */}
      {course.description && (
        <p className="text-gray-700 mb-4 leading-relaxed">
          {course.description}
        </p>
      )}
      
      {/* Course Stats */}
      <div className="text-lg font-semibold text-gray-900">
        ⭐ {course.avgRating.toFixed(1)} average rating 
        <span className="text-gray-600 font-normal"> 
          ({course.totalReviews} review{course.totalReviews !== 1 ? 's' : ''})
        </span>
      </div>
    </div>
  )
}

// 教授对比组件（异步，独立 Suspense 边界）
async function ProfessorComparison({ courseId }: { courseId: string }) {
  const professors = await getCourseProfessors(courseId)
  
  return (
    <>
      <h3 className="text-2xl font-bold text-gray-950 mb-4">
        Compare Professors Teaching This Course
      </h3>
      
      <ProfessorComparisonTable professors={professors} />
      
      {professors.length > 0 && (
        <p className="text-sm text-gray-600 mt-4">
          Click on a professor's name to view their full profile and reviews.
        </p>
      )}
    </>
  )
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  
  // 解析 slug: "university-of-adelaide-comp-1012" -> university="university of adelaide", code="COMP 1012"
  // 策略：从后往前找课程代码（通常是字母+数字组合）
  const parts = slug.split('-')
  if (parts.length < 2) {
    notFound()
  }
  
  // 查找课程代码的起始位置（通常是 COMP、MATH 等）
  let codeStartIndex = -1
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const nextPart = parts[i + 1]
    // 检查是否是课程代码开头（纯字母，通常 3-4 个字符）
    if (part && /^[a-z]{2,5}$/i.test(part)) {
      // 检查下一个部分是否是数字
      if (nextPart && /^\d+/.test(nextPart)) {
        codeStartIndex = i
        break
      }
    }
  }
  
  if (codeStartIndex === -1 || codeStartIndex === 0) {
    notFound()
  }
  
  // 大学名称是课程代码之前的所有部分
  const university = parts.slice(0, codeStartIndex).join(' ')
  // 课程代码是剩余部分
  const code = parts.slice(codeStartIndex).join(' ').toUpperCase()
  
  // 先获取课程 ID（用于教授列表查询）
  const course = await getCourseByCode(university, code)
  if (!course) {
    notFound()
  }
  
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <div className="p-6">
          {/* 课程信息：使用 Suspense，先显示 Loading，再加载数据 */}
          <Suspense fallback={
            <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200 mb-6 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          }>
            <CourseInfo university={university} code={code} />
          </Suspense>
          
          {/* 教授对比：使用 Suspense，独立加载（不阻塞课程信息） */}
          <Suspense fallback={
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-64 bg-gray-100 rounded"></div>
            </div>
          }>
            <ProfessorComparison courseId={course.id} />
          </Suspense>
        </div>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}

// Generate static params for popular courses (optional, for better performance)
export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params
  const parts = slug.split('-')
  
  if (parts.length < 2) {
    return {
      title: 'Course Not Found',
    }
  }
  
  // 使用相同的解析逻辑
  let codeStartIndex = -1
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    const nextPart = parts[i + 1]
    if (part && /^[a-z]{2,5}$/i.test(part)) {
      if (nextPart && /^\d+/.test(nextPart)) {
        codeStartIndex = i
        break
      }
    }
  }
  
  if (codeStartIndex === -1 || codeStartIndex === 0) {
    return {
      title: 'Course Not Found',
    }
  }
  
  const university = parts.slice(0, codeStartIndex).join(' ')
  const code = parts.slice(codeStartIndex).join(' ').toUpperCase()
  
  const course = await getCourseByCode(university, code)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }
  
  return {
    title: `${course.code} - ${course.name} | OhMyProfessors`,
    description: `Compare professors teaching ${course.code} (${course.name}) at ${course.university}. Read reviews and find the best instructor for you.`,
  }
}
