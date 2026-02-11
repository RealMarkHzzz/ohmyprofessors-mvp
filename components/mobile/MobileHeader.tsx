/**
 * Mobile Header Component
 * 移动端顶部导航栏
 */
'use client'

import { ArrowLeft, Search } from 'lucide-react'

interface MobileHeaderProps {
  title: string
  showSearch?: boolean
  showBack?: boolean
  onBack?: () => void
  onSearchClick?: () => void
  rightAction?: React.ReactNode
}

export function MobileHeader({ 
  title, 
  showSearch = false,
  showBack = false,
  onBack,
  onSearchClick,
  rightAction
}: MobileHeaderProps) {
  return (
    <header className="
      sticky top-0 z-40
      h-14
      bg-white/95 backdrop-blur-md
      border-b border-gray-200
      px-4
      flex items-center justify-between
      safe-top
    ">
      {/* 左侧：返回按钮或 Logo */}
      <div className="flex items-center gap-2 flex-1">
        {showBack ? (
          <button 
            onClick={onBack || (() => window.history.back())}
            className="w-10 h-10 flex items-center justify-center -ml-2 active:bg-gray-100 rounded-lg transition-colors"
            aria-label="返回"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        ) : null}
        
        <div className="font-bold text-lg text-gray-900 truncate">
          {title}
        </div>
      </div>
      
      {/* 右侧：搜索按钮或自定义操作 */}
      <div className="flex items-center gap-2">
        {showSearch && (
          <button 
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center active:bg-gray-100 rounded-lg transition-colors"
            aria-label="搜索"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
        )}
        
        {rightAction}
      </div>
    </header>
  )
}
