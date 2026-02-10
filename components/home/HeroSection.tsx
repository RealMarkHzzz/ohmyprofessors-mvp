'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TRENDING_TAGS = [
  'Computer Science',
  'Mathematics',
  'Engineering',
  'Physics',
  'Biology',
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sloganRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entry animation
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

    timeline
      .from(sloganRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        subtitleRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        searchBarRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.3'
      )
      .from(
        tagsRef.current?.children ?? [],
        {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
        },
        '-=0.2'
      )

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div ref={heroRef} className="text-center mb-16">
      {/* Main Slogan - P0 Requirement */}
      <h2
        ref={sloganRef}
        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4"
      >
        Find Your Perfect Professor
      </h2>

      {/* Subtitle - P0 Requirement */}
      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10"
      >
        Real Student Reviews, Real Decisions
      </p>

      {/* Enhanced Search Bar - P0 Requirement */}
      <div ref={searchBarRef} className="max-w-3xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by professor name or course code..."
            className="w-full px-8 py-5 text-lg 
              border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              rounded-2xl
              focus:outline-none 
              focus:border-blue-500 dark:focus:border-blue-400
              focus:ring-4 focus:ring-blue-500/10
              shadow-lg
              transition-all duration-200
              min-h-[56px]"
            style={{
              borderRadius: '16px',
            }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Trending Tags - P0 Requirement */}
      <div ref={tagsRef} className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
          Popular searches:
        </span>
        {TRENDING_TAGS.map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 
              bg-gray-100 dark:bg-gray-800 
              hover:bg-gray-200 dark:hover:bg-gray-700
              text-gray-700 dark:text-gray-300
              text-sm font-medium 
              rounded-full 
              transition-colors duration-200
              border border-gray-200 dark:border-gray-700"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
