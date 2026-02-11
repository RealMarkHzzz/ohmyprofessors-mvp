/**
 * Course Detail Loading State
 * Next.js 自动显示加载状态（Suspense fallback）
 */

import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'

export default function Loading() {
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <div className="p-6 animate-pulse">
          {/* Course Info Skeleton */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200 mb-6">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
            
            {/* Metadata Skeleton */}
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            
            {/* Stats Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Professor Comparison Skeleton */}
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          
          {/* Table Skeleton */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="h-12 bg-gray-100"></div>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}
