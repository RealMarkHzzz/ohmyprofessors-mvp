'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { animateProfessorDetailEntry } from '@/lib/animations/gsap-animations'

interface Professor {
  id: string
  name: string
  department: string
  email: string
  slug: string
  university_id: string
}

interface ProfessorPageProps {
  params: {
    slug: string
  }
}

export default function ProfessorPage({ params }: ProfessorPageProps) {
  const router = useRouter()
  const [professor, setProfessor] = useState<Professor | null>(null)
  const [loading, setLoading] = useState(true)

  // Animation refs
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const reviewListRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    async function loadProfessor() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('professors')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (error) {
        console.error('Error loading professor:', error)
      } else {
        setProfessor(data)
      }
      setLoading(false)
    }

    loadProfessor()
  }, [params.slug])

  // Page entry animation
  useEffect(() => {
    if (!loading && professor) {
      const timeline = animateProfessorDetailEntry({
        backButton: backButtonRef.current,
        header: headerRef.current,
        stats: statsRef.current,
        reviewList: reviewListRef.current,
        cta: ctaRef.current,
      })

      return () => {
        timeline.kill()
      }
    }
    return undefined
  }, [loading, professor])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading professor details..." />
      </div>
    )
  }

  if (!professor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Professor Not Found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          ref={backButtonRef}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <span>←</span>
          <span>Back to All Professors</span>
        </button>

        {/* Professor Header */}
        <div ref={headerRef} className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {professor.name}
          </h1>
          <p className="text-xl text-gray-600 mb-1">
            📚 {professor.department}
          </p>
          <p className="text-gray-500">
            ✉️ {professor.email}
          </p>
        </div>

        {/* Review Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">N/A</div>
            <div className="text-gray-600 mt-2">Average Difficulty</div>
            <div className="text-xs text-gray-500 mt-1">(1-5 scale)</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">N/A</div>
            <div className="text-gray-600 mt-2">Average Workload</div>
            <div className="text-xs text-gray-500 mt-1">(hours/week)</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">N/A</div>
            <div className="text-gray-600 mt-2">Recommend Rate</div>
            <div className="text-xs text-gray-500 mt-1">(percentage)</div>
          </div>
        </div>

        {/* Review List */}
        <div ref={reviewListRef} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Student Reviews
          </h2>

          {/* Empty State */}
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share your experience with {professor.name}!
            </p>
            <button
              ref={ctaRef}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              ✍️ Write the First Review
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            💡 Review Guidelines
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Be honest and constructive</li>
            <li>• Include specific course codes</li>
            <li>• Rate difficulty and workload objectively</li>
            <li>• Avoid personal attacks or inappropriate content</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
