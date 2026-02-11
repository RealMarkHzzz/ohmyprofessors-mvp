'use client'

import { Home, Search, Star, Building2, BarChart3, BookOpen, Tag, PenSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/#search' },
  { icon: Star, label: 'Top Rated', href: '/?filter=top-rated' },
  { icon: Building2, label: 'G8 Universities', href: '/universities' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: BookOpen, label: 'Departments', href: '/departments' },
  { icon: Tag, label: 'Tags', href: '/tags' },
]

export function LeftSidebar() {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="h-16 flex items-center mb-4">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
          OhMy<span className="text-blue-500">Professors</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 h-12 px-4 rounded-full
                font-medium transition-colors
                ${isActive 
                  ? 'bg-gray-200 text-gray-900 border-l-4 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      {/* CTA Button */}
      <Link
        href="/submit-review"
        className="
          flex items-center justify-center gap-2
          w-full h-12 rounded-full
          bg-blue-500 text-white font-semibold
          hover:bg-blue-600 transition-colors
          shadow-md hover:shadow-lg
        "
      >
        <PenSquare className="w-5 h-5" />
        Write a Review
      </Link>
      
      {/* Footer */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        © 2026 OhMyProfessors
      </div>
    </div>
  )
}
