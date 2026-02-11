'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Star, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { MoreSheet } from './MoreSheet'

export function BottomTabBar() {
  const pathname = usePathname()
  const [showMore, setShowMore] = useState(false)
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'search', label: 'Search', icon: Search, href: '/search' },
    { id: 'top', label: 'Top', icon: Star, href: '/top-rated' },
    { id: 'more', label: 'More', icon: MoreHorizontal, onClick: () => setShowMore(true) },
  ]
  
  return (
    <>
      <nav 
        className="
          fixed bottom-0 left-0 right-0 z-40
          bg-white border-t border-gray-200
          md:hidden
        "
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex h-14">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.href ? pathname === tab.href : false
            
            if (tab.onClick) {
              // More button
              return (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className="
                    flex-1 flex flex-col items-center justify-center gap-1
                    active:scale-95 active:bg-blue-50
                    transition-all duration-150
                  "
                  aria-label={tab.label}
                >
                  <Icon 
                    className={`w-6 h-6 ${
                      showMore ? 'text-[#0D8BD9]' : 'text-[#536471]'
                    }`}
                  />
                  <span className={`text-[11px] font-medium ${
                    showMore ? 'text-[#0D8BD9]' : 'text-[#536471]'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              )
            }
            
            // Link tabs
            return (
              <Link
                key={tab.id}
                href={tab.href!}
                className="
                  flex-1 flex flex-col items-center justify-center gap-1
                  active:scale-95 active:bg-blue-50
                  transition-all duration-150
                "
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-[#0D8BD9] fill-[#0D8BD9]' : 'text-[#536471]'
                  }`}
                />
                <span className={`text-[11px] font-medium ${
                  isActive ? 'text-[#0D8BD9]' : 'text-[#536471]'
                }`}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
      
      {/* More Sheet */}
      <MoreSheet isOpen={showMore} onClose={() => setShowMore(false)} />
    </>
  )
}
