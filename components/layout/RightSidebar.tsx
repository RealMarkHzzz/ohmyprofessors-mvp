import { getStats } from '@/lib/api/stats'
import { Star, Users, BookOpen } from 'lucide-react'

export async function RightSidebar() {
  const { totalReviews, totalStudents } = await getStats()
  
  return (
    <div className="p-4 space-y-4">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <div className="text-lg font-bold text-gray-900">{totalReviews.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-700" />
            <div>
              <div className="text-lg font-bold text-gray-900">{totalStudents.toLocaleString()}+</div>
              <div className="text-xs text-gray-600">Students Across G8</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-gray-700" />
            <div>
              <div className="text-sm font-semibold text-gray-900">8 Universities</div>
              <div className="text-xs text-gray-600">Australia&apos;s Group of Eight</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trending Professors - Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">🔥 Trending Professors</h3>
        <div className="text-xs text-gray-500">Coming soon...</div>
      </div>
      
      {/* Platform Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">About Platform</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          OhMyProfessors helps students make informed decisions by providing real reviews 
          from peers across Australia&apos;s top universities.
        </p>
      </div>
    </div>
  )
}
