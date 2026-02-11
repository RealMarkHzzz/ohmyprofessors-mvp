'use client'

import Link from 'next/link'
import { X, Building2, BookOpen, Tag, PenSquare, Settings, Info } from 'lucide-react'
import { useEffect } from 'react'

interface MoreSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function MoreSheet({ isOpen, onClose }: MoreSheetProps) {
  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  const menuItems = [
    { icon: Building2, label: 'G8 Universities', href: '/universities' },
    { icon: BookOpen, label: 'Departments', href: '/departments' },
    { icon: Tag, label: 'Tags', href: '/tags' },
    { icon: PenSquare, label: 'Write a Review', href: '/write-review', highlight: true },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Info, label: 'About', href: '/about' },
  ]
  
  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/50 z-50
          transition-opacity duration-200
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-2xl
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="More menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">More</h2>
          <button
            onClick={onClose}
            className="
              w-11 h-11 -mr-2.5
              flex items-center justify-center
              rounded-full
              hover:bg-gray-100
              active:bg-gray-200
              transition-colors
            "
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center h-14 px-4
                  hover:bg-gray-50
                  active:bg-gray-100
                  transition-colors
                  ${item.highlight ? 'bg-yellow-50' : ''}
                `}
              >
                <Icon className={`w-6 h-6 mr-4 ${
                  item.highlight ? 'text-blue-600' : 'text-gray-700'
                }`} />
                <span className={`text-base font-medium flex-1 ${
                  item.highlight ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {item.label}
                </span>
                <svg 
                  className="w-4 h-4 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
