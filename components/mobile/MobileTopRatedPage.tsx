/**
 * Mobile Top Rated Page Component
 * 移动端 Top Rated 页面
 */
'use client'

import { useState } from 'react'
import { MobileHeader } from './MobileHeader'
import { BottomTabBar } from './BottomTabBar'

type TabType = 'courses' | 'professors'

export function MobileTopRatedPage() {
  const [activeTab, setActiveTab] = useState<TabType>('courses')
  
  return (
    <div className="min-h-screen bg-gray-50 pb-[calc(4rem+env(safe-area-inset-bottom))]">
      {/* Sticky Header */}
      <MobileHeader 
        title="Top Rated"
        showBack={false}
      />
      
      {/* Tab Switcher */}
      <div className="sticky top-14 z-30 bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('courses')}
            className={`
              flex-1 py-3 text-sm font-medium
              transition-colors
              ${activeTab === 'courses'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
              }
            `}
          >
            Courses
          </button>
          
          <button
            onClick={() => setActiveTab('professors')}
            className={`
              flex-1 py-3 text-sm font-medium
              transition-colors
              ${activeTab === 'professors'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600'
              }
            `}
          >
            Professors
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="mt-4 px-4">
        {activeTab === 'courses' ? (
          // Top Rated Courses
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              🏆 Top Rated Courses
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-500">
                Top rated courses coming soon...
              </p>
            </div>
          </div>
        ) : (
          // Top Rated Professors
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              🏆 Top Rated Professors
            </h2>
            <div className="text-center py-8">
              <p className="text-gray-500">
                Top rated professors coming soon...
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  )
}
