'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      setupProfessorCardHover(cardRef.current)
    }
  }, [])

  const handleClick = () => {
    if (onClick) {
      setIsLoading(true)
      onClick()
    }
  }

  const limitedTags = tags.slice(0, 3)

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      className="
        group
        relative
        border-2 border-gray-200
        rounded-lg p-6 cursor-pointer 
        bg-white
        transition-all duration-200
        hover:border-blue-500
        hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)]
        hover:bg-blue-50/30
        hover:-translate-y-1
        active:scale-[0.98]
        active:shadow-[0_2px_8px_rgb(37,99,235,0.2)]
        active:border-blue-600
        focus:outline-none
        focus:ring-4
        focus:ring-blue-500/50
        focus:border-blue-500
      "
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        {avatar_url && (
          <Image 
            src={avatar_url} 
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            unoptimized
          />
        )}
        
        <div className="flex-1 min-w-0">
          {/* Professor Name - Enhanced UX with larger font, extrabold weight, and hover effect */}
          <h4 className="
            text-[28px] md:text-3xl 
            font-extrabold 
            text-gray-950 
            mb-2
            leading-tight
            line-clamp-2
            group-hover:text-blue-600
            transition-colors
          ">
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
