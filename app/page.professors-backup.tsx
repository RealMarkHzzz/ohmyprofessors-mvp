import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { StickySearchBar } from '@/components/layout/StickySearchBar'
import { ProfessorListClient } from '@/components/home/ProfessorListClient'
import { getProfessors, getAllDepartments, getAllTags } from '@/lib/api/professors'
import { getAllReviews } from '@/lib/api/reviews'

export const metadata = {
  title: 'OhMyProfessors - Find Your Perfect Professor',
  description: 'Real Student Reviews, Real Decisions. Rate and discover professors at Australian universities.',
}

export default async function HomePage() {
  // Fetch data on the server (Server Component)
  const [professors, departments, tags, reviews] = await Promise.all([
    getProfessors(),
    getAllDepartments(),
    getAllTags(),
    getAllReviews(),
  ])
  
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <>
          {/* Simplified Hero + Sticky Search */}
          <div className="py-8 px-6 text-center bg-white border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Find Your Perfect Professor
            </h1>
            <p className="text-base text-gray-600 mb-6">
              Real student reviews from Australia&apos;s G8 universities
            </p>
          </div>
          
          <StickySearchBar />
          
          {/* Professor List */}
          <div className="p-6">
            <ProfessorListClient 
              initialProfessors={professors}
              initialDepartments={departments}
              initialTags={tags}
              initialReviewCount={reviews.length}
            />
          </div>
        </>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}
