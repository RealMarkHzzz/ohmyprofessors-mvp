'use client'

import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

interface StickySearchBarProps {
  placeholder?: string
}

export function StickySearchBar({ 
  placeholder = "Search professors, courses, universities..." 
}: StickySearchBarProps = {}) {
  const [query, setQuery] = useState('')
  const [isSticky, setIsSticky] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }
  
  return (
    <div 
      className={`
        transition-all duration-300 z-10 bg-white
        ${isSticky ? 'sticky top-0 shadow-md border-b border-gray-200' : ''}
      `}
    >
      <div className="p-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={`
                w-full pl-12 pr-4 border border-gray-300 rounded-full
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                focus:outline-none transition-all
                ${isSticky ? 'h-10 text-sm' : 'h-12 text-base'}
              `}
            />
            {query && (
              <button
                type="submit"
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  px-4 py-1.5 bg-blue-500 text-white text-sm rounded-full
                  hover:bg-blue-600 transition-colors
                "
              >
                Search
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
