'use client'

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1240px] mx-auto flex">
        {/* Left Sidebar - 240px */}
        <aside className="w-60 sticky top-0 h-screen border-r border-gray-200 bg-white">
          {leftSidebar}
        </aside>
        
        {/* Main Content - 600px */}
        <main className="w-[600px] border-r border-gray-200 bg-white">
          {mainContent}
        </main>
        
        {/* Right Sidebar - 320px */}
        <aside className="w-80 sticky top-0 h-screen bg-gray-50 overflow-y-auto">
          {rightSidebar}
        </aside>
      </div>
    </div>
  )
}
