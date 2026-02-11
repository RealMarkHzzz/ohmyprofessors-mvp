/**
 * Search Page with Device Detection
 * 搜索页（设备检测 + 组件级分叉）
 */

import { headers } from 'next/headers'
import { isMobileDevice } from '@/lib/utils/device'
import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { MobileSearchPage } from '@/components/mobile/MobileSearchPage'

export const metadata = {
  title: 'Search - OhMyProfessors',
  description: 'Search for courses and professors',
}

export default async function SearchPage() {
  // Server-side Device Detection
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = isMobileDevice(userAgent)
  
  // 移动端：全屏搜索页
  if (isMobile) {
    return <MobileSearchPage />
  }
  
  // 桌面端：三列布局
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
