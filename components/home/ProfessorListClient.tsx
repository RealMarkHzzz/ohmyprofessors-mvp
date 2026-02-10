'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ProfessorCard } from '@/components/shared/ProfessorCard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { getAllProfessors, getAllDepartments, getAllTags } from '@/lib/data/mock-professors'
import { getAllReviews } from '@/lib/data/mock-reviews'
import { searchAndFilterProfessors, type SortOption } from '@/lib/search-utils'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { debounce } from '@/lib/utils'
import gsap from 'gsap'

export function ProfessorListClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const statsRef = useRef<HTMLDivElement>(null)
  const professorListRef = useRef<HTMLDivElement>(null)
  
  // Search and filter state
  const [inputValue, setInputValue] = useState('') // For immediate input feedback
  const [searchQuery, setSearchQuery] = useState('') // For debounced search
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc')
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search handler - using useMemo to avoid recreating on every render
  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      setSearchQuery(value)
    }, 300),
    []
  )

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  // Load data on mount
  useEffect(() => {
    // Simulate loading delay for smooth transition
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  // Get filtered and sorted professors
  const professors = useMemo(() => {
    return searchAndFilterProfessors(
      {
        query: searchQuery,
        department: selectedDepartment,
        minRating,
        tags: selectedTags,
      },
      sortBy
    )
  }, [searchQuery, selectedDepartment, minRating, selectedTags, sortBy])

  // Get stats
  const allProfessors = getAllProfessors()
  const allReviews = getAllReviews()
  const departments = getAllDepartments()
  const availableTags = getAllTags()

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
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        })
      }
    }
  }, [loading, professors.length])

  const handleProfessorClick = (slug: string) => {
    router.push(`/professors/${slug}`)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setInputValue('')
    setSearchQuery('')
    setSelectedDepartment(null)
    setSelectedTags([])
    setMinRating(null)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value)
  }

  const hasActiveFilters = searchQuery || selectedDepartment || selectedTags.length > 0 || minRating !== null

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
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{allProfessors.length}</div>
          <div className="text-gray-600 mt-2">Professors</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{departments.length}</div>
          <div className="text-gray-600 mt-2">Departments</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">{allReviews.length}</div>
          <div className="text-gray-600 mt-2">Reviews</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6">
        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search professors by name, department..."
              value={inputValue}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            variant={showFilters ? 'primary' : 'secondary'}
            onClick={() => setShowFilters(!showFilters)}
            className="px-6"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Desktop Filter Panel */}
        {showFilters && (
          <div className="hidden md:block border-t pt-4 space-y-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(
                      selectedDepartment === dept ? null : dept
                    )}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedDepartment === dept
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      minRating === rating
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating}+ ⭐
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{professors.length}</span> professors
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating-desc">Rating (High to Low)</option>
              <option value="rating-asc">Rating (Low to High)</option>
              <option value="reviews-desc">Most Reviews</option>
              <option value="reviews-asc">Least Reviews</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Drawer Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close filters"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-6">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Department
                </label>
                <div className="flex flex-wrap gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(
                        selectedDepartment === dept ? null : dept
                      )}
                      className={`px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors min-h-[44px] ${
                        selectedDepartment === dept
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? null : rating)}
                      className={`px-4 py-3 rounded-lg text-[15px] font-medium transition-colors min-h-[48px] ${
                        minRating === rating
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                      }`}
                    >
                      {rating}+ ⭐
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tags
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableTags.slice(0, 12).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-3 rounded-full text-[15px] font-medium transition-colors min-h-[48px] ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 active:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[48px]"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors min-h-[48px]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professor List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          {hasActiveFilters ? 'Search Results' : 'All Professors'}
        </h3>

        {professors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No professors found matching your filters.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="secondary">
                Clear Filters
              </Button>
            )}
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
