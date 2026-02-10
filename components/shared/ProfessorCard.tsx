'use client'

import { useEffect, useRef } from 'react'
import { setupProfessorCardHover } from '@/lib/animations/gsap-animations'

interface ProfessorCardProps {
  id: string
  name: string
  department: string
  email: string
  reviewCount?: number
  averageRating?: number
  onClick?: () => void
}

export function ProfessorCard({
  id,
  name,
  department,
  email,
  reviewCount = 0,
  averageRating,
  onClick,
}: ProfessorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      setupProfessorCardHover(cardRef.current)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-6 cursor-pointer bg-white transition-shadow"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
    >
      <h4 className="text-xl font-semibold text-gray-900 mb-2">
        {name}
      </h4>
      
      <p className="text-gray-600 mb-1">
        📚 {department}
      </p>
      
      <p className="text-gray-500 text-sm mb-4">
        ✉️ {email}
      </p>

      <div className="flex items-center gap-3">
        {reviewCount > 0 ? (
          <>
            {averageRating && (
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                ⭐ {averageRating.toFixed(1)}
              </span>
            )}
            <span className="text-sm text-gray-600">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </>
        ) : (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            No reviews yet
          </span>
        )}
      </div>
    </div>
  )
}
