/**
 * User Menu Component
 * 用户菜单（桌面端和移动端）
 */
'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { User, LogOut, Settings, Heart } from 'lucide-react'
import { AuthModal } from './AuthModal'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  const handleSignOut = async () => {
    await signOut()
    setShowMenu(false)
  }
  
  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="
            px-4 py-2
            bg-blue-600 hover:bg-blue-700
            text-white text-sm font-medium rounded-lg
            transition-colors
          "
        >
          Sign in
        </button>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    )
  }
  
  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="
          w-10 h-10
          bg-blue-100 hover:bg-blue-200
          text-blue-600
          rounded-full
          flex items-center justify-center
          transition-colors
        "
        aria-label="User menu"
      >
        <User className="w-5 h-5" />
      </button>
      
      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu */}
          <div className="
            absolute right-0 mt-2 w-56
            bg-white rounded-lg shadow-lg border border-gray-200
            py-2
            z-50
          ">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">
                {user.email}
              </p>
            </div>
            
            {/* Menu Items */}
            <button
              className="
                w-full px-4 py-2
                flex items-center gap-3
                text-sm text-gray-700 hover:bg-gray-50
                transition-colors
              "
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            
            <button
              className="
                w-full px-4 py-2
                flex items-center gap-3
                text-sm text-gray-700 hover:bg-gray-50
                transition-colors
              "
            >
              <Heart className="w-4 h-4" />
              My Reviews
            </button>
            
            <div className="border-t border-gray-200 my-1" />
            
            <button
              onClick={handleSignOut}
              className="
                w-full px-4 py-2
                flex items-center gap-3
                text-sm text-red-600 hover:bg-red-50
                transition-colors
              "
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
