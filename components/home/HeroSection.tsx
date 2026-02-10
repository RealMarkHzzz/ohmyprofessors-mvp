'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

const TRENDING_TAGS = [
  'Computer Science',
  'Mathematics',
  'Engineering',
  'Physics',
  'Biology',
]

export function HeroSection() {
  const sloganRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const chatCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enhanced entry animation with GSAP
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
      .from(
        chatCardRef.current,
        {
          x: 20,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.5'
      )

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <section className="section bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <span className="text-xl">🎓</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Trusted by 10,000+ Students
              </span>
            </div>
            
            {/* Heading */}
            <h1 
              ref={sloganRef}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-gray-100"
            >
              Find Your Perfect{' '}
              <span className="gradient-text">Professor</span>
            </h1>
            
            {/* Description */}
            <p 
              ref={subtitleRef}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Real student reviews and ratings to help you make informed decisions about your courses and professors.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button>
                Browse Professors
              </Button>
              <Button variant="secondary">
                Write a Review
              </Button>
            </div>
          </div>
          
          {/* Right - Search Demo Card */}
          <div ref={chatCardRef}>
            <Card className="shadow-xl">
              {/* Search Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  OP
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    OhMyProfessors Search
                  </div>
                  <div className="text-sm text-green-500 dark:text-green-400">
                    Ready to help
                  </div>
                </div>
              </div>
              
              {/* Search Bar */}
              <div ref={searchBarRef} className="mb-4">
                <Input
                  type="text"
                  placeholder="Search by professor name or course code..."
                  className="w-full"
                />
              </div>
              
              {/* Trending Tags */}
              <div ref={tagsRef} className="space-y-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Popular searches:
                </span>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TAGS.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sample Results */}
              <div className="mt-6 space-y-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Recent reviews:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex text-yellow-400">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Prof. Smith - CS101</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex text-yellow-400">
                      {'★★★★☆'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Dr. Johnson - MATH201</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
        </div>
      </div>
    </section>
  )
}
