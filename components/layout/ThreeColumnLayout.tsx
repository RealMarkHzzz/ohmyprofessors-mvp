'use client'

import { BottomTabBar } from '@/components/mobile/BottomTabBar'

export function ThreeColumnLayout({
  leftSidebar,
  mainContent,
  rightSidebar,
}: {
  leftSidebar: React.ReactNode
  mainContent: React.ReactNode
  rightSidebar: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1240px] mx-auto flex">
          {/* Left Sidebar - 隐藏在移动端 */}
          <aside className="w-60 sticky top-0 h-screen border-r border-gray-200 bg-white hidden md:block">
            {leftSidebar}
          </aside>
          
          {/* Main Content - 移动端全宽 */}
          <main className="w-full md:w-[600px] border-r border-gray-200 bg-white pb-14 md:pb-0">
            {mainContent}
          </main>
          
          {/* Right Sidebar - 隐藏在移动端 */}
          <aside className="w-80 sticky top-0 h-screen bg-gray-50 overflow-y-auto hidden md:block">
            {rightSidebar}
          </aside>
        </div>
      </div>
      
      {/* Mobile Bottom Tab Bar */}
      <BottomTabBar />
    </>
  )
}
