'use client'

import { useState } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <span className="font-heading font-bold text-lg text-gray-900">
              OhMyProfessors
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#features" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#professors" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Professors
            </a>
            <a 
              href="#about" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Write Review
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <a href="#features" className="block text-sm text-gray-500 hover:text-gray-900">
              Features
            </a>
            <a href="#professors" className="block text-sm text-gray-500 hover:text-gray-900">
              Professors
            </a>
            <a href="#about" className="block text-sm text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#contact" className="block text-sm text-gray-500 hover:text-gray-900">
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">
                Sign In
              </Button>
              <Button size="sm" className="w-full">
                Write Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
