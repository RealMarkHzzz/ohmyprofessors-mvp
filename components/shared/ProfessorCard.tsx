'use client'

import { useEffect, useRef } from 'react'
import { BookOpen, Mail, Star } from 'lucide-react'
import { setupProfessorCardHover } from '@/lib/animations/gsap-animations'

interface ProfessorCardProps {
  id: string
  name: string
  department: string
  email: string
  overall_rating?: number
  total_reviews?: number
  tags?: string[]
  avatar_url?: string | null
  title?: string
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
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-800',
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
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      )
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 opacity-50" />
      )
    } else {
      stars.push(
        <Star key={i} className="w-5 h-5 text-gray-300" />
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
  overall_rating,
  total_reviews = 0,
  tags = [],
  avatar_url,
  title,
  onClick,
}: ProfessorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      setupProfessorCardHover(cardRef.current)
    }
  }, [])

  const limitedTags = tags.slice(0, 3)

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="
        border border-gray-200
        rounded-lg p-6 cursor-pointer 
        bg-white/80
        backdrop-blur-sm
        transition-shadow
        hover:shadow-lg
      "
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        {avatar_url && (
          <img 
            src={avatar_url} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        )}
        
        <div className="flex-1 min-w-0">
          {/* Professor Name - P0 Requirement (24px Bold) */}
          <h4 className="text-2xl font-bold text-gray-900 mb-1 truncate">
            {name}
          </h4>
          
          {/* Title */}
          {title && (
            <p className="text-sm text-gray-600 mb-2">{title}</p>
          )}
        </div>
      </div>
      
      {/* Rating + Stars - P0 Requirement (18px) */}
      {total_reviews > 0 && overall_rating ? (
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg font-medium text-gray-900">
            {overall_rating.toFixed(1)}
          </span>
          <StarRating rating={overall_rating} />
          <span className="text-sm text-gray-600">
            ({total_reviews} {total_reviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      ) : (
        <div className="mb-4">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
            No reviews yet
          </span>
        </div>
      )}

      {/* Semantic Tags - P0 Requirement */}
      {limitedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {limitedTags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
      )}
      
      {/* Tertiary Information: Department & Email */}
      <div className="space-y-1">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          {department}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-2 truncate">
          <Mail className="w-3 h-3 text-gray-400" />
          {email}
        </p>
      </div>
    </div>
  )
}
