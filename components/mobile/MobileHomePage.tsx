/**
 * Mobile Home Page Component
 * 移动端首页
 */
'use client'

import { useRouter } from 'next/navigation'
import { MobileHeader } from './MobileHeader'
import { MobileCourseList } from './MobileCourseList'
import { BottomTabBar } from './BottomTabBar'
import type { Course } from '@/lib/types/course'

interface MobileHomePageProps {
  courses: Course[]
}

export function MobileHomePage({ courses }: MobileHomePageProps) {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gray-50 pb-[calc(4rem+env(safe-area-inset-bottom))]">
      {/* Sticky Header */}
      <MobileHeader 
        title="OhMyProfessors"
        showSearch={true}
        onSearchClick={() => router.push('/search')}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-6 border-b-2 border-blue-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Find Your Perfect Course
        </h1>
        <p className="text-sm text-gray-600">
          Search by course, compare professors, read real reviews
        </p>
      </div>
      
      {/* Stats Bar */}
      <div className="sticky top-14 z-30 bg-white border-b px-4 py-2">
        <p className="text-sm text-gray-600">
          📚 {courses.length} {courses.length === 1 ? 'Course' : 'Courses'} Available
        </p>
      </div>
      
      {/* Course List */}
      <MobileCourseList courses={courses} />
      
      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  )
}
