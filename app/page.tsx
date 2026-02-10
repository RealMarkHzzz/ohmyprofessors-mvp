'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Professor {
  id: string
  name: string
  department: string
  email: string
}

export default function Home() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadProfessors() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('professors')
        .select('id, name, department, email')
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

  const filteredProfessors = professors.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            🎓 OhMyProfessors
          </h1>
          <p className="text-gray-600 mt-2">
            Rate your professors at Australian universities
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Best Professors
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Read reviews from students at University of Adelaide
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search professors by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 shadow-lg"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{professors.length}</div>
            <div className="text-gray-600 mt-2">Professors</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">1</div>
            <div className="text-gray-600 mt-2">University</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 mt-2">Reviews</div>
          </div>
        </div>

        {/* Professor List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Available Professors
          </h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading professors...</p>
            </div>
          ) : filteredProfessors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No professors found matching your search.' : 'No professors available yet.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProfessors.map((prof) => (
                <div
                  key={prof.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {prof.name}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    📚 {prof.department}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ✉️ {prof.email}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      No reviews yet
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Help Other Students
          </h3>
          <p className="text-lg mb-6">
            Share your experience with professors at University of Adelaide
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Write a Review
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2027 OhMyProfessors | University of Adelaide</p>
          <p className="text-sm mt-2">Beta Version 1.0.0</p>
        </div>
      </footer>
    </div>
  )
}
