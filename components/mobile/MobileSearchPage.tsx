/**
 * Mobile Search Page Component
 * 移动端全屏搜索页
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X, Search as SearchIcon } from 'lucide-react'

export function MobileSearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  
  const handleClear = () => {
    setQuery('')
  }
  
  const handleBack = () => {
    router.back()
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <header className="
        sticky top-0 z-50
        bg-white border-b
        px-4 py-3
        flex items-center gap-3
        safe-top
      ">
        {/* 返回按钮 */}
        <button 
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-lg transition-colors"
          aria-label="返回"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* 搜索框 */}
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses or professors..."
            className="
              w-full h-10
              pl-10 pr-10
              bg-gray-100 rounded-lg
              text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            autoFocus
          />
          
          {/* 清除按钮 */}
          {query.length > 0 && (
            <button 
              onClick={handleClear}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                w-6 h-6
                flex items-center justify-center
                bg-gray-300 hover:bg-gray-400 rounded-full
                text-white
                transition-colors
              "
              aria-label="清除"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>
      
      {/* Search Results or Suggestions */}
      <div className="mt-4">
        {query.length > 0 ? (
          // Search Results
          <div className="px-4">
            <p className="text-sm text-gray-500 mb-4">
              Results for "{query}"
            </p>
            {/* TODO: 实际的搜索结果列表 */}
            <div className="text-center py-8">
              <p className="text-gray-500">
                Search functionality coming soon...
              </p>
            </div>
          </div>
        ) : (
          // Suggestions
          <>
            {/* Recent Searches */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Recent Searches
              </h3>
              <div className="space-y-2">
                {/* Placeholder for recent searches */}
                <p className="text-sm text-gray-500">
                  No recent searches
                </p>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="px-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Popular Searches
              </h3>
              <div className="space-y-2">
                {['Computer Science', 'Data Structures', 'Calculus', 'Physics'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="
                      w-full px-4 py-3
                      bg-gray-50 hover:bg-gray-100
                      rounded-lg
                      text-left text-sm
                      transition-colors
                    "
                  >
                    🔥 {term}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
