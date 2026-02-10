'use client'

import { useState } from 'react'
import { Review } from '@/lib/types'
import { POSITIVE_TAGS, NEGATIVE_TAGS, NEUTRAL_TAGS, type ReviewTag } from '@/lib/validations'
import { Star, ThumbsUp, Calendar, BookOpen, TrendingUp } from 'lucide-react'
import { formatDistanceToNow } from '@/lib/utils'

interface ReviewCardProps {
  review: Review
}

// 替换硬编码的标签判断
function getTagColor(tag: string): string {
  if (POSITIVE_TAGS.includes(tag as ReviewTag)) return 'bg-green-100 text-green-800'
  if (NEGATIVE_TAGS.includes(tag as ReviewTag)) return 'bg-red-100 text-red-800'
  if (NEUTRAL_TAGS.includes(tag as ReviewTag)) return 'bg-gray-100 text-gray-800'
  return 'bg-gray-100 text-gray-800'
}

function TagBadge({ tag }: { tag: string }) {
  const colorClass = getTagColor(tag)

  return (
    <span className={`
      inline-block px-3 py-1 rounded-full text-xs font-medium
      ${colorClass}
    `}>
      {tag}
    </span>
  )
}

export function ReviewCard({ review }: ReviewCardProps) {
  const timeAgo = formatDistanceToNow(new Date(review.created_at))
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count)
  const [isHelpful, setIsHelpful] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleHelpful = async () => {
    if (isHelpful || isLoading) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/reviews/${review.id}/helpful`, {
        method: 'PATCH',
      })

      const result = await response.json()

      if (result.success) {
        setHelpfulCount(result.review.helpful_count)
        setIsHelpful(true)
      }
    } catch (error) {
      console.error('Failed to mark as helpful:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Course Info */}
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-semibold text-gray-900 text-lg">
              {review.course_code} - {review.course_name}
            </h4>
          </div>
          
          {/* Semester and Date */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {review.semester}
            </span>
            <span className="text-gray-400">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg px-4 py-2 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {review.rating.toFixed(1)}
          </div>
          <div className="flex justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-gray-600">Difficulty</span>
          </div>
          <div className="text-lg font-semibold text-orange-600">
            {review.difficulty}/5
          </div>
        </div>

        <div className="text-center border-l border-r border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Would Take Again?</div>
          <div className={`text-lg font-semibold ${
            review.would_take_again ? 'text-green-600' : 'text-red-600'
          }`}>
            {review.would_take_again ? 'Yes ✓' : 'No ✗'}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Attendance</div>
          <div className={`text-lg font-semibold ${
            review.attendance_mandatory ? 'text-blue-600' : 'text-gray-600'
          }`}>
            {review.attendance_mandatory ? 'Required' : 'Not Required'}
          </div>
        </div>
      </div>

      {/* Tags */}
      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {review.tags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
      )}

      {/* Review Content */}
      {review.content && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {review.content}
          </p>
        </div>
      )}

      {/* Footer - Helpful Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button 
          onClick={handleHelpful}
          disabled={isHelpful || isLoading}
          className={`
            flex items-center gap-2 text-sm transition-all duration-150
            ${isHelpful 
              ? 'text-blue-600 cursor-default' 
              : 'text-gray-600 hover:text-blue-600 cursor-pointer'
            }
            ${isLoading && 'opacity-50 cursor-wait'}
          `}
        >
          <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-blue-600' : ''}`} />
          <span>{isHelpful ? 'Marked as Helpful' : 'Helpful'}</span>
          {helpfulCount > 0 && (
            <span className={isHelpful ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              ({helpfulCount})
            </span>
          )}
        </button>

        <div className="text-xs text-gray-400">
          Anonymous Student
        </div>
      </div>
    </div>
  )
}
