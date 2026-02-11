/**
 * ProfessorComparisonTable Component
 * 教授对比表格组件 - 课程详情页核心 UI
 */

'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import type { CourseProfessor } from '@/lib/types/course'

interface ProfessorComparisonTableProps {
  professors: CourseProfessor[]
}

export function ProfessorComparisonTable({ professors }: ProfessorComparisonTableProps) {
  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'Hard': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }
  
  const difficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '🟢'
      case 'Medium': return '🟡'
      case 'Hard': return '🔴'
      default: return '⚪'
    }
  }
  
  if (professors.length === 0) {
    return (
      <div className="p-8 text-center border border-gray-200 rounded-xl bg-gray-50">
        <p className="text-gray-600">No professors found for this course.</p>
      </div>
    )
  }
  
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Professor
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Rating
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Difficulty
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Reviews
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Top Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr
              key={`${prof.professorId}-${prof.semester}`}
              className="border-t border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <td className="px-4 py-4">
                <Link 
                  href={`/professors/${prof.professorSlug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  <div className="font-medium text-gray-900">{prof.professorName}</div>
                  {prof.semester && (
                    <div className="text-sm text-gray-500">{prof.semester}</div>
                  )}
                </Link>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">
                    {prof.rating.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`${difficultyColor(prof.difficulty)} font-medium`}>
                  {difficultyIcon(prof.difficulty)} {prof.difficulty}
                </span>
              </td>
              <td className="px-4 py-4 text-gray-700">
                {prof.reviewCount}
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2 flex-wrap">
                  {prof.topTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
