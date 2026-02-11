/**
 * Desktop Home Page Component
 * 桌面端首页（保持原有三列布局）
 */

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { StickySearchBar } from '@/components/layout/StickySearchBar'
import { CourseList } from '@/components/courses/CourseList'
import type { Course } from '@/lib/types/course'

interface DesktopHomePageProps {
  courses: Course[]
}

export function DesktopHomePage({ courses }: DesktopHomePageProps) {
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <>
          {/* Hero Section */}
          <div className="py-8 px-6 text-center bg-gradient-to-r from-blue-50 to-white border-b-2 border-blue-500">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Find Your Perfect Course & Professor
            </h1>
            <p className="text-base text-gray-600 mb-6">
              Search by course, compare professors, read real student reviews
            </p>
          </div>
          
          {/* Sticky Search Bar */}
          <StickySearchBar placeholder="Search courses (e.g., COMP 1012, Data Structures)..." />
          
          {/* Course List */}
          {courses.length > 0 ? (
            <CourseList initialCourses={courses} />
          ) : (
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
          )}
        </>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}
