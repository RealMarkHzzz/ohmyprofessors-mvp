/**
 * Top Rated Page with Device Detection
 * Top Rated 页（设备检测 + 组件级分叉）
 */

import { headers } from 'next/headers'
import { isMobileDevice } from '@/lib/utils/device'
import { ThreeColumnLayout } from '@/components/layout/ThreeColumnLayout'
import { LeftSidebar } from '@/components/layout/LeftSidebar'
import { RightSidebar } from '@/components/layout/RightSidebar'
import { MobileTopRatedPage } from '@/components/mobile/MobileTopRatedPage'

export const metadata = {
  title: 'Top Rated - OhMyProfessors',
  description: 'Top rated courses and professors',
}

export default async function TopRatedPage() {
  // Server-side Device Detection
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = isMobileDevice(userAgent)
  
  // 移动端：Tab 切换式布局
  if (isMobile) {
    return <MobileTopRatedPage />
  }
  
  // 桌面端：三列布局
  return (
    <ThreeColumnLayout
      leftSidebar={<LeftSidebar />}
      mainContent={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Top Rated Courses</h1>
          <p className="text-gray-600">Top rated courses will be displayed here...</p>
        </div>
      }
      rightSidebar={<RightSidebar />}
    />
  )
}
