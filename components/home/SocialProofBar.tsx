import { Star, Users, BookOpen } from 'lucide-react'
import { getStats } from '@/lib/api/stats'

export async function SocialProofBar() {
  const { totalReviews, totalStudents } = await getStats()

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* 指标 1: 评价数量 */}
          <div className="flex flex-col items-center">
            <Star className="w-12 h-12 text-gray-900 mb-2" />
            <div className="text-3xl font-bold text-gray-950">
              {totalReviews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              条真实评价
            </div>
          </div>

          {/* 指标 2: 学生数量 */}
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-gray-900 mb-2" />
            <div className="text-3xl font-bold text-gray-950">
              {totalStudents.toLocaleString()}+
            </div>
            <div className="text-sm text-gray-600 mt-1">
              阿德莱德学生使用
            </div>
          </div>

          {/* 指标 3: University Logo */}
          <div className="flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-gray-900 mb-2" />
            <div className="text-lg font-semibold text-gray-950 mt-2">
              University of Adelaide
            </div>
            <div className="text-sm text-gray-600 mt-1">
              官方认证数据源
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
