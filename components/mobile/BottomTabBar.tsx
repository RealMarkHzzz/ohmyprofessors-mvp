/**
 * Bottom Tab Bar Navigation
 * 底部导航栏（移动端主导航）
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Star, MoreHorizontal } from 'lucide-react'

interface Tab {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

const tabs: Tab[] = [
  { id: 'home', icon: Home, label: 'Home', href: '/' },
  { id: 'search', icon: Search, label: 'Search', href: '/search' },
  { id: 'top-rated', icon: Star, label: 'Top Rated', href: '/top-rated' },
  { id: 'more', icon: MoreHorizontal, label: 'More', href: '/more' },
]

export function BottomTabBar() {
  const pathname = usePathname()
  
  // 判断当前激活的 Tab
  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/search')) return 'search'
    if (pathname.startsWith('/top-rated')) return 'top-rated'
    return 'more'
  }
  
  const activeTab = getActiveTab()
  
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      z-50
      bg-white border-t border-gray-200
      safe-bottom
    ">
      <div className="flex items-center justify-around h-16">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <Link 
              key={tab.id}
              href={tab.href}
              className={`
                flex flex-col items-center justify-center
                w-full h-full
                text-xs
                transition-colors
                active:bg-gray-50
                ${isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
                }
              `}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={isActive ? 'font-semibold' : 'font-normal'}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
