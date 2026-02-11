'use client'

import { Target, AlertTriangle, TrendingUp } from 'lucide-react'
import { FeatureCard } from '@/components/ui/Card'

const features = [
  {
    icon: <Target className="w-16 h-16 text-gray-950" />,
    title: 'Find the Best Professors',
    description: 'Make informed decisions with reviews from verified students across all G8 universities',
    metric: 'Average GPA improvement: +0.5',
  },
  {
    icon: <AlertTriangle className="w-16 h-16 text-gray-950" />,
    title: 'Avoid Bad Courses',
    description: 'Learn about course difficulty and teaching styles before enrollment',
    metric: '92% of students avoid poor choices',
  },
  {
    icon: <TrendingUp className="w-16 h-16 text-gray-950" />,
    title: 'Boost Your GPA',
    description: 'Choose the right professor and excel in your studies',
    metric: 'Real example: 3.2 → 3.7 GPA',
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="text-gray-950">OhMyProfessors</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive professor reviews across Australia's top universities
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
