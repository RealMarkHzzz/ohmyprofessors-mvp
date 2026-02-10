'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  label?: string
  error?: string | undefined
}

const sizeConfig = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-10 h-10'
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  disabled = false,
  required = false,
  label,
  error
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const handleClick = (rating: number) => {
    if (disabled) return
    // 允许取消选择：点击当前值会清空
    if (value === rating) {
      onChange(0)
    } else {
      onChange(rating)
    }
  }

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const displayValue = hoverValue !== null ? hoverValue : value

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => {
          const isFilled = rating <= displayValue
          const isHovered = hoverValue !== null && rating <= hoverValue
          
          return (
            <button
              key={rating}
              type="button"
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
              className={cn(
                'p-2 -m-2 transition-all duration-150 ease-out min-w-[44px] min-h-[44px] flex items-center justify-center',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm'
              )}
              aria-label={`Rate ${rating} out of ${max}`}
            >
              <Star
                className={cn(
                  sizeConfig[size],
                  'transition-colors duration-150',
                  isFilled
                    ? isHovered
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'fill-yellow-400 text-yellow-400'
                    : 'fill-transparent text-zinc-300 dark:text-zinc-600',
                  isHovered && !isFilled && 'text-yellow-400'
                )}
              />
            </button>
          )
        })}
        
        {value > 0 && (
          <span className="ml-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {value}.0
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
