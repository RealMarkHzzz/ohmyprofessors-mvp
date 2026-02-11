import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'

export default function SearchPage() {
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Search Courses</h1>
          <p className="text-gray-600">Search functionality coming soon...</p>
        </div>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}
