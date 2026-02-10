'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ProfessorCard } from '@/components/shared/ProfessorCard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { animateProfessorList } from '@/lib/animations/gsap-animations'
import gsap from 'gsap'

interface Professor {
  id: string
  name: string
  department: string
  email: string
  slug: string
}

export function ProfessorListClient() {
  const router = useRouter()
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const statsRef = useRef<HTMLDivElement>(null)
  const professorListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadProfessors() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('professors')
        .select('id, name, department, email, slug')
        .order('name')

      if (error) {
        console.error('Error loading professors:', error)
      } else {
        setProfessors(data || [])
      }
      setLoading(false)
    }

    loadProfessors()
  }, [])

  // Stats entry animation
  useEffect(() => {
    if (!loading && statsRef.current) {
      gsap.from(statsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }
  }, [loading])

  // Professor list stagger animation
  useEffect(() => {
    if (!loading && professorListRef.current) {
      const cards = professorListRef.current.querySelectorAll<HTMLElement>('[data-professor-card]')
      if (cards.length > 0) {
        animateProfessorList(Array.from(cards))
      }
    }
  }, [loading, professors.length])

  const handleProfessorClick = (slug: string) => {
    router.push(`/professors/${slug}`)
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner message="Loading professors..." />
      </div>
    )
  }

  return (
    <>
      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{professors.length}</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Professors</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">1</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">University</div>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
          <div className="text-gray-600 dark:text-gray-400 mt-2">Reviews</div>
        </div>
      </div>

      {/* Professor List */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Available Professors
        </h3>

        {professors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No professors available yet.
            </p>
          </div>
        ) : (
          <div ref={professorListRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {professors.map((prof) => (
              <div key={prof.id} data-professor-card>
                <ProfessorCard
                  {...prof}
                  onClick={() => handleProfessorClick(prof.slug)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
