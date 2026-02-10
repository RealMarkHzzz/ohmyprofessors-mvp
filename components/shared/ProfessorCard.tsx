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
  tags?: string[]
  onClick?: () => void
}

// Tag sentiment mapping - P0 Requirement
const TAG_TYPES = {
  positive: ['Easy Grader', 'Helpful', 'Clear Explanations', 'Amazing Lecturer', 'Gives Good Feedback'],
  negative: ['Tough Grader', 'Heavy Workload', 'Strict', 'Hard Exams'],
  neutral: ['Lots of Homework', 'Attendance Mandatory', 'Pop Quizzes', 'Group Projects'],
}

function getTagType(tag: string): 'positive' | 'negative' | 'neutral' {
  if (TAG_TYPES.positive.some(t => tag.toLowerCase().includes(t.toLowerCase()))) return 'positive'
  if (TAG_TYPES.negative.some(t => tag.toLowerCase().includes(t.toLowerCase()))) return 'negative'
  return 'neutral'
}

function TagBadge({ tag }: { tag: string }) {
  const type = getTagType(tag)
  
  const colorClasses = {
    positive: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    negative: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  }

  return (
    <span className={`
      inline-block px-3 py-1.5 rounded-full text-xs font-medium
      ${colorClasses[type]}
    `}>
      {tag}
    </span>
  )
}

function StarRating({ rating }: { rating: number }) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    } else {
      stars.push(
        <svg key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>
}

export function ProfessorCard({
  id,
  name,
  department,
  email,
  reviewCount = 0,
  averageRating,
  tags = [],
  onClick,
}: ProfessorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      setupProfessorCardHover(cardRef.current)
    }
  }, [])

  // Mock tags for demonstration (P0 requirement)
  const displayTags = tags.length > 0 ? tags : ['Clear Explanations', 'Heavy Workload', 'Helpful']
  const limitedTags = displayTags.slice(0, 3)

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="
        border border-gray-200 dark:border-gray-700
        rounded-lg p-6 cursor-pointer 
        bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-sm
        transition-shadow
      "
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
    >
      {/* Primary Information: Professor Name - P0 Requirement (24px Bold) */}
      <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {name}
      </h4>
      
      {/* Secondary Information: Rating + Stars - P0 Requirement (18px) */}
      {reviewCount > 0 && averageRating ? (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {averageRating.toFixed(1)}
          </span>
          <StarRating rating={averageRating} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      ) : (
        <div className="mb-4">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-3 py-1.5 rounded-full">
            No reviews yet
          </span>
        </div>
      )}

      {/* Semantic Tags - P0 Requirement */}
      <div className="flex flex-wrap gap-2 mb-4">
        {limitedTags.map((tag, index) => (
          <TagBadge key={index} tag={tag} />
        ))}
      </div>
      
      {/* Tertiary Information: Department & Email */}
      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📚 {department}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          ✉️ {email}
        </p>
      </div>
    </div>
  )
}
