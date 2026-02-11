/**
 * Home Page - Course First Mode
 * 课程优先模式首页
 * 
 * 备注：原教授列表首页已备份到 app/page.professors-backup.tsx
 */

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { StickySearchBar } from '@/components/layout/StickySearchBar'
import { CourseList } from '@/components/courses/CourseList'
import { getCourses } from '@/lib/api/courses'

export const metadata = {
  title: 'OhMyProfessors - Find Your Best Course & Professor',
  description: 'Compare professors by course. Real student reviews for Australian universities. Make informed decisions about your classes.',
}

export default async function HomePage() {
  // Fetch courses from database
  // 如果数据库还没有课程数据，会返回空数组
  let courses: Awaited<ReturnType<typeof getCourses>> = []
  try {
    courses = await getCourses()
  } catch (error) {
    console.error('Error fetching courses:', error)
    courses = []
  }
  
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
