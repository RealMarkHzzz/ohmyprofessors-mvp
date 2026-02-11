'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema, type ReviewFormData, REVIEW_TAGS } from '@/lib/validations'
import { trackReviewSubmit } from '@/lib/analytics'
import { StarRating } from './StarRating'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewFormProps {
  professorId: string
  professorName: string
  onSuccess?: () => void
  onCancel?: () => void
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function ReviewForm({ professorId, professorName, onSuccess, onCancel }: ReviewFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      professor_id: professorId,
      rating: 0,
      difficulty: 0,
      tags: [],
      would_take_again: false,
      attendance_mandatory: false
    }
  })

  const selectedTags = watch('tags') || []
  const rating = watch('rating')
  const difficulty = watch('difficulty')
  const wouldTakeAgain = watch('would_take_again')
  const attendanceMandatory = watch('attendance_mandatory')

  const toggleTag = (tag: typeof REVIEW_TAGS[number]) => {
    const currentTags = selectedTags
    if (currentTags.includes(tag)) {
      setValue('tags', currentTags.filter(t => t !== tag))
    } else {
      if (currentTags.length < 10) {
        setValue('tags', [...currentTags, tag])
      }
    }
  }

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit review')
      }

      // Track review submission
      trackReviewSubmit(result.data.id, professorId);

      setSubmitState('success')
      
      // 延迟重置和关闭
      setTimeout(() => {
        reset()
        setSubmitState('idle')
        onSuccess?.()
      }, 1500)
    } catch (error) {
      setSubmitState('error')
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred')
      
      // 3秒后重置错误状态
      setTimeout(() => {
        setSubmitState('idle')
      }, 3000)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Write a Review
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            for {professorName}
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        {/* Course Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Course Information</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="course_code" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Course Code <span className="text-red-500">*</span>
              </label>
              <input
                id="course_code"
                type="text"
                placeholder="e.g., CS2510"
                {...register('course_code')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800',
                  'text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  errors.course_code
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-zinc-300 dark:border-zinc-700'
                )}
                disabled={submitState === 'submitting'}
              />
              {errors.course_code && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.course_code.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Semester <span className="text-red-500">*</span>
              </label>
              <input
                id="semester"
                type="text"
                placeholder="e.g., 2025 Semester 1"
                {...register('semester')}
                className={cn(
                  'w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800',
                  'text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  errors.semester
                    ? 'border-red-500 dark:border-red-500'
                    : 'border-zinc-300 dark:border-zinc-700'
                )}
                disabled={submitState === 'submitting'}
              />
              {errors.semester && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.semester.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="course_name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              id="course_name"
              type="text"
              placeholder="e.g., Software Engineering"
              {...register('course_name')}
              className={cn(
                'w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800',
                'text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.course_name
                  ? 'border-red-500 dark:border-red-500'
                  : 'border-zinc-300 dark:border-zinc-700'
              )}
              disabled={submitState === 'submitting'}
            />
            {errors.course_name && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.course_name.message}</p>
            )}
          </div>
        </div>

        {/* Ratings */}
        <div className="space-y-4">
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Ratings</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StarRating
              value={rating}
              onChange={(value) => setValue('rating', value)}
              label="Overall Rating"
              required
              error={errors.rating?.message}
              disabled={submitState === 'submitting'}
            />

            <StarRating
              value={difficulty}
              onChange={(value) => setValue('difficulty', value)}
              label="Difficulty Level"
              required
              error={errors.difficulty?.message}
              disabled={submitState === 'submitting'}
            />
          </div>
        </div>

        {/* Would Take Again & Attendance */}
        <div className="space-y-3">
          <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Additional Info</h4>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={wouldTakeAgain}
                onChange={(e) => setValue('would_take_again', e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                disabled={submitState === 'submitting'}
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                I would take this professor again
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={attendanceMandatory}
                onChange={(e) => setValue('attendance_mandatory', e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                disabled={submitState === 'submitting'}
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                Attendance was mandatory
              </span>
            </label>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
              Tags <span className="text-red-500">*</span>
            </h4>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {selectedTags.length} / 10 selected
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {REVIEW_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={submitState === 'submitting' || (!isSelected && selectedTags.length >= 10)}
                  className={cn(
                    'px-4 py-2.5 rounded-full text-[15px] font-medium transition-all duration-150 min-h-[40px]',
                    'border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600',
                    submitState === 'submitting' && 'opacity-50 cursor-not-allowed',
                    !isSelected && selectedTags.length >= 10 && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
          
          {errors.tags && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
          )}
        </div>

        {/* Written Review */}
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Your Review (Optional)
          </label>
          <textarea
            id="content"
            rows={4}
            placeholder="Share your experience with this professor... (optional, but appreciated!)"
            {...register('content')}
            className={cn(
              'w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800',
              'text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'resize-none',
              errors.content
                ? 'border-red-500 dark:border-red-500'
                : 'border-zinc-300 dark:border-zinc-700'
            )}
            disabled={submitState === 'submitting'}
          />
          {errors.content && (
            <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
          )}
        </div>

        {/* Error Message */}
        {submitState === 'error' && errorMessage && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
          </div>
        )}

        {/* Success Message */}
        {submitState === 'success' && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">Review submitted successfully!</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitState === 'submitting' || submitState === 'success'}
            className={cn(
              'flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'flex items-center justify-center gap-2',
              submitState === 'submitting' || submitState === 'success'
                ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
            )}
          >
            {submitState === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : submitState === 'success' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Submitted!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Review
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitState === 'submitting'}
              className="px-6 py-3 rounded-lg font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
