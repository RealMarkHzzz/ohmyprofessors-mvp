'use client'

import { Target, AlertTriangle, TrendingUp } from 'lucide-react'
import { FeatureCard } from '@/components/ui/Card'

const features = [
  {
    icon: <Target className="w-16 h-16 text-gray-950" />,
    title: '找到最好的教授',
    description: '基于真实学生评价，帮你选择最适合的授课教授',
    metric: '平均 GPA 提升 0.5 分',
  },
  {
    icon: <AlertTriangle className="w-16 h-16 text-gray-950" />,
    title: '避开烂课',
    description: '提前了解课程难度和教授风格，避免踩雷',
    metric: '92% 学生避免选错课',
  },
  {
    icon: <TrendingUp className="w-16 h-16 text-gray-950" />,
    title: '提升 GPA',
    description: '选对教授，事半功倍，轻松拿高分',
    metric: '真实案例：3.2 → 3.7',
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            为什么选择{' '}
            <span className="text-gray-950">OhMyProfessors</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            选对教授，少走弯路，轻松提升 GPA
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="stagger-item">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
