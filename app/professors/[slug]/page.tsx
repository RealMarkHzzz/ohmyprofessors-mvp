'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { getProfessorBySlug } from '@/lib/data/mock-professors'
import { getReviewsByProfessorId, getRatingDistribution } from '@/lib/data/mock-reviews'
import { getRatingDistributionPercent } from '@/lib/search-utils'
import { ArrowLeft, Star, Mail, BookOpen, TrendingUp, Users, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ReviewCard } from '@/components/reviews/ReviewCard'
import gsap from 'gsap'

interface ProfessorPageProps {
  params: {
    slug: string
  }
}

export default function ProfessorPage({ params }: ProfessorPageProps) {
  const router = useRouter()
  const professor = getProfessorBySlug(params.slug)
  const reviews = professor ? getReviewsByProfessorId(professor.id) : []
  const ratingDist = professor ? getRatingDistribution(professor.id) : {}
  const ratingPercent = getRatingDistributionPercent(ratingDist)

  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (professor) {
      // Entry animations
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
      
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        })
      }

      if (reviewsRef.current) {
        gsap.from(reviewsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power2.out',
        })
      }
    }
  }, [professor])

  if (!professor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Professor Not Found</h1>
          <Button onClick={() => router.push('/')} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const averageDifficulty = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.difficulty, 0) / reviews.length).toFixed(1)
    : 'N/A'

  const wouldTakeAgainPercent = reviews.length > 0
    ? Math.round((reviews.filter(r => r.would_take_again).length / reviews.length) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to All Professors</span>
        </button>

        {/* Professor Header */}
        <div ref={headerRef} className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            {professor.avatar_url && (
              <img 
                src={professor.avatar_url}
                alt={professor.name}
                className="w-32 h-32 rounded-full object-cover flex-shrink-0"
              />
            )}
            
            <div className="flex-1">
              {/* Name and Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {professor.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{professor.title}</p>
              
              {/* Department and Email */}
              <div className="flex flex-wrap gap-4 mb-4">
                <p className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  {professor.department}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400" />
                  {professor.email}
                </p>
              </div>

              {/* Bio */}
              {professor.bio && (
                <p className="text-gray-700 leading-relaxed">
                  {professor.bio}
                </p>
              )}

              {/* Tags */}
              {professor.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {professor.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overall Rating Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 text-center min-w-[180px]">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {professor.overall_rating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(professor.overall_rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {professor.total_reviews} {professor.total_reviews === 1 ? 'review' : 'reviews'}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Difficulty</div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{averageDifficulty}</div>
            <div className="text-xs text-gray-500 mt-1">out of 5</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Would Take Again</div>
              <ThumbsUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">{wouldTakeAgainPercent}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {reviews.filter(r => r.would_take_again).length} of {reviews.length}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Reviews</div>
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-purple-600">{professor.total_reviews}</div>
            <div className="text-xs text-gray-500 mt-1">student reviews</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-2">Rating Distribution</div>
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-4">{rating}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${ratingPercent[rating] || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {ratingPercent[rating] || 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Student Reviews ({reviews.length})
            </h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Write a Review
            </Button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to share your experience with {professor.name}!
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Write the First Review
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Review Guidelines */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 Review Guidelines
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Include specific course codes and semester information</li>
            <li>• Rate difficulty and workload objectively</li>
            <li>• Avoid personal attacks or inappropriate content</li>
            <li>• Focus on teaching style, grading, and learning outcomes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
